/**
 * On-disk skill scan for the management panel.
 *
 * The web profile disables the *global* `skill-filesystem` provider (skills are
 * registered per agent preset), so `ctx.skills.list()` at the global scope reads
 * empty. A management panel wants the ground truth of what is installed on disk,
 * so this scans the same roots `skill-filesystem` knows about and parses each
 * `SKILL.md` frontmatter — independent of preset activation.
 */
import { homedir } from 'node:os'
import { join } from 'node:path'
import { readdir, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { BUNDLED_SKILLS } from '@dsh-plugins/bundled-skills'
import { SKILL_NAME_PATTERN, type SkillScope, type SkillView } from './types.ts'

/** A source label per root, matching the registry's SkillSource vocabulary. */
const ROOTS: ReadonlyArray<{ rel: string[]; source: string }> = [
  { rel: ['.dsh', 'skills'], source: 'user-dsh' },        // $HOME/.dsh/skills
  { rel: ['.agents', 'skills'], source: 'user-agents' },  // $HOME/.agents/skills
]

const FILESYSTEM_SOURCES = new Set(['user-agents', 'user-dsh', 'project-agents', 'project-dsh'])

/**
 * Skills this plugin ships and re-installs. They sit in `~/.agents/skills` like any
 * user skill, so `source` can't tell them apart — deletion must consult this set.
 * Derived from the bundled list so a future bundled skill is protected automatically.
 */
export const PROTECTED_SKILL_NAMES: ReadonlySet<string> = new Set(
  BUNDLED_SKILLS.filter(skill => skill.bootstrap).map(skill => skill.name),
)

/** Extract `name` / `description` from a SKILL.md's leading YAML frontmatter. */
function parseFrontmatter(markdown: string): { name?: string; description?: string } {
  const normalized = markdown.replace(/\r\n/g, '\n')
  if (!normalized.startsWith('---\n')) return {}
  const end = normalized.indexOf('\n---', 4)
  if (end < 0) return {}
  const result: { name?: string; description?: string } = {}
  for (const line of normalized.slice(4, end).split('\n')) {
    const match = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line)
    if (match === null) continue
    const key = match[1]
    const value = (match[2] ?? '').trim().replace(/^["']|["']$/g, '')
    if (key === 'name') result.name = value
    else if (key === 'description') result.description = value
  }
  return result
}

/** The `.agents/skills` + `.dsh/skills` roots to scan for a scope. */
function rootsFor(scope: SkillScope): Array<{ dir: string; source: string }> {
  const roots = ROOTS.map(root => ({ dir: join(homedir(), ...root.rel), source: root.source }))
  if (scope.kind === 'workspace') {
    roots.push({ dir: join(scope.cwd, '.dsh', 'skills'), source: 'project-dsh' })
    roots.push({ dir: join(scope.cwd, '.agents', 'skills'), source: 'project-agents' })
  }
  return roots
}

/**
 * Scan installed skills for a scope by reading their `SKILL.md` files on disk.
 * @param scope - the user level or one workspace.
 * @returns the skill rows, de-duplicated by name (first root wins), ordered by name.
 */
export async function scanSkills(scope: SkillScope): Promise<SkillView[]> {
  const seen = new Set<string>()
  const views: SkillView[] = []
  for (const { dir, source } of rootsFor(scope)) {
    if (!existsSync(dir)) continue
    let entries: string[]
    try {
      entries = await readdir(dir)
    } catch {
      continue
    }
    for (const entry of entries) {
      const skillFile = join(dir, entry, 'SKILL.md')
      if (!existsSync(skillFile)) continue
      let frontmatter: { name?: string; description?: string }
      try {
        frontmatter = parseFrontmatter(await readFile(skillFile, 'utf8'))
      } catch {
        continue
      }
      const name = frontmatter.name ?? entry
      if (!SKILL_NAME_PATTERN.test(name) || seen.has(name)) continue
      seen.add(name)
      const fromFs = FILESYSTEM_SOURCES.has(source)
      const isProtected = PROTECTED_SKILL_NAMES.has(name)
      views.push({
        name,
        description: frontmatter.description ?? '',
        source,
        provider: 'filesystem',
        path: skillFile,
        userInvocable: true,
        fromPlugin: !fromFs,
        protected: isProtected,
        // Safety is decided here, not in the UI: only a plain filesystem skill that
        // this plugin doesn't ship may be deleted.
        deletable: fromFs && !isProtected,
      })
    }
  }
  return views.sort((a, b) => a.name.localeCompare(b.name))
}

/**
 * Locate one skill directory inside the roots visible to a scope.
 *
 * The client only ever supplies a validated skill *name*, never a path: resolving it
 * against the known roots is what keeps `../escape` style input out of the filesystem.
 *
 * @param scope - the user level or one workspace.
 * @param name - kebab-case skill name.
 * @returns the skill directory and its source label, or undefined when not installed.
 */
export async function resolveSkillDir(
  scope: SkillScope,
  name: string,
): Promise<{ dir: string; source: string } | undefined> {
  if (!SKILL_NAME_PATTERN.test(name)) return undefined
  for (const { dir, source } of rootsFor(scope)) {
    const candidate = join(dir, name)
    if (existsSync(join(candidate, 'SKILL.md'))) return { dir: candidate, source }
  }
  return undefined
}
