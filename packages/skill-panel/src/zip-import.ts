/**
 * Host-side importer for skill `.zip` uploads.
 *
 * A skill is a directory holding a `SKILL.md` (YAML frontmatter `name` +
 * `description`) plus optional sibling resources. The import path is:
 *   decompress → locate SKILL.md → parse + validate the name → write the whole
 *   skill directory under the target scope's `.agents/skills` root.
 *
 * The `skill-filesystem` provider watches those roots, so a successful write is
 * picked up automatically (no manual cache invalidation).
 *
 * Security: hard caps on compressed/decompressed size and entry count, per-entry
 * path normalization rejecting `..`/absolute/symlink targets (zip-slip), and a
 * frontmatter name that must match the registry's kebab-case pattern.
 */
import { homedir } from 'node:os'
import { join, resolve, sep } from 'node:path'
import { mkdir, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { strFromU8, unzipSync } from 'fflate'
import {
  MAX_UNCOMPRESSED_BYTES, MAX_ZIP_BYTES, MAX_ZIP_ENTRIES, SKILL_NAME_PATTERN,
  type SkillImportResult, type SkillScope,
} from './types.ts'

/** One decompressed archive entry, path already normalized to forward slashes. */
type Entries = Record<string, Uint8Array>

/** The `.agents/skills` root for a scope. */
function skillsRoot(scope: SkillScope): string {
  return scope.kind === 'user'
    ? join(homedir(), '.agents', 'skills')
    : join(scope.cwd, '.agents', 'skills')
}

/** Extract `name` / `description` from a SKILL.md's leading YAML frontmatter. */
function parseFrontmatter(markdown: string): { name?: string; description?: string } {
  const normalized = markdown.replace(/\r\n/g, '\n')
  if (!normalized.startsWith('---\n')) return {}
  const end = normalized.indexOf('\n---', 4)
  if (end < 0) return {}
  const block = normalized.slice(4, end)
  const result: { name?: string; description?: string } = {}
  for (const line of block.split('\n')) {
    const match = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line)
    if (match === null) continue
    const key = match[1]
    const value = (match[2] ?? '').trim().replace(/^["']|["']$/g, '')
    if (key === 'name') result.name = value
    else if (key === 'description') result.description = value
  }
  return result
}

/** Whether an already-resolved `absolute` path sits inside `parent`. */
function isInside(parent: string, absolute: string): boolean {
  const resolvedParent = resolve(parent)
  return absolute === resolvedParent || absolute.startsWith(resolvedParent + sep)
}

/**
 * Import one skill from a zip buffer.
 * @param bytes - the raw `.zip` bytes uploaded by the browser.
 * @param scope - the destination scope (user level or a workspace).
 * @param overwrite - replace an existing skill of the same name when true.
 * @returns a discriminated result the panel renders.
 */
export async function importSkillZip(bytes: Uint8Array, scope: SkillScope, overwrite: boolean): Promise<SkillImportResult> {
  if (bytes.byteLength > MAX_ZIP_BYTES) {
    return { status: 'invalid', message: `archive exceeds ${Math.round(MAX_ZIP_BYTES / (1024 * 1024))}MB limit` }
  }

  let entries: Entries
  try {
    entries = unzipSync(bytes, {
      // fflate's filter receives `{ name, ... }`; directory entries end in '/'.
      filter: file => !file.name.endsWith('/'),
    }) as Entries
  } catch (error) {
    return { status: 'invalid', message: `failed to read archive: ${error instanceof Error ? error.message : String(error)}` }
  }

  const paths = Object.keys(entries)
  if (paths.length === 0 || paths.length > MAX_ZIP_ENTRIES) {
    return { status: 'invalid', message: `archive must hold 1..${MAX_ZIP_ENTRIES} files` }
  }
  const totalSize = paths.reduce((sum, path) => sum + (entries[path]?.byteLength ?? 0), 0)
  if (totalSize > MAX_UNCOMPRESSED_BYTES) {
    return { status: 'invalid', message: 'uncompressed size exceeds limit' }
  }

  // Locate SKILL.md at the root or one directory deep; its directory is the prefix.
  const skillPath = paths.find(path => path === 'SKILL.md')
    ?? paths.find(path => path.split('/').filter(Boolean).length === 2 && path.endsWith('/SKILL.md'))
  if (skillPath === undefined) {
    return { status: 'invalid', message: 'no SKILL.md at the archive root or one directory deep' }
  }
  const prefix = skillPath.slice(0, skillPath.length - 'SKILL.md'.length) // '' or 'dir/'

  const skillMd = entries[skillPath]
  if (skillMd === undefined) return { status: 'invalid', message: 'SKILL.md unreadable' }
  const frontmatter = parseFrontmatter(strFromU8(skillMd))
  const name = frontmatter.name
  if (name === undefined || !SKILL_NAME_PATTERN.test(name)) {
    return { status: 'invalid', message: `frontmatter name "${name ?? '(missing)'}" must match kebab-case` }
  }
  if (frontmatter.description === undefined || frontmatter.description === '') {
    return { status: 'invalid', message: 'SKILL.md frontmatter must set a description' }
  }

  const root = skillsRoot(scope)
  const dest = join(root, name)
  if (existsSync(dest) && !overwrite) {
    return { status: 'exists', name, message: `a skill named "${name}" already exists` }
  }

  await mkdir(dest, { recursive: true })
  for (const path of paths) {
    if (prefix !== '' && !path.startsWith(prefix)) continue // skip files outside the skill dir
    const relative = path.slice(prefix.length)
    if (relative === '') continue
    // zip-slip guard: reject absolute paths and any traversal out of `dest`.
    const absolute = resolve(dest, relative)
    if (!isInside(dest, absolute)) {
      return { status: 'invalid', message: `archive contains an unsafe path: ${path}` }
    }
    const content = entries[path]
    if (content === undefined) continue
    await mkdir(resolve(absolute, '..'), { recursive: true })
    await writeFile(absolute, content)
  }

  return { status: 'imported', name }
}
