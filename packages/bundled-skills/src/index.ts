/**
 * `@dsh-plugins/bundled-skills` — skills shipped with the plugin set.
 *
 * The Markdown lives on disk under `skills/` (the single source of truth); this
 * module only locates that directory at runtime so the Skill panel can copy a
 * skill into `~/.agents/skills` during bootstrap without duplicating the text.
 */
import { existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

/** A skill this package ships. */
export interface BundledSkill {
  /** Kebab-case skill name; also its directory name under `skills/`. */
  readonly name: string
  /** Whether the Skill panel should ensure it is installed on first load. */
  readonly bootstrap: boolean
}

/** The skills bundled with the plugin set. */
export const BUNDLED_SKILLS: readonly BundledSkill[] = [
  { name: 'create-skill', bootstrap: true },
]

/**
 * Resolve the on-disk `skills/` directory from either the source tree
 * (`src/index.ts`) or the built library (`lib/index.js`).
 * @returns an absolute path to the skills root.
 * @throws {Error} when no candidate directory exists.
 */
export function resolveSkillsRoot(): string {
  const here = dirname(fileURLToPath(import.meta.url))
  // src/* -> package/skills ; lib/* -> package/skills ; via ./src/* -> package/skills.
  const candidates = [
    resolve(here, '..', 'skills'),
    resolve(here, '..', '..', 'skills'),
    resolve(here, 'skills'),
  ]
  const found = candidates.find(candidate => existsSync(join(candidate, 'create-skill', 'SKILL.md')))
  if (found === undefined) {
    throw new Error(`bundled-skills: skills root not found near ${here}`)
  }
  return found
}

/** Absolute path to one bundled skill's directory. */
export function bundledSkillDir(name: string): string {
  return join(resolveSkillsRoot(), name)
}
