/**
 * Skill management panel — Host half.
 *
 * Mounts the `skillAdmin` Remote and, on first load, ensures the bundled
 * `create-skill` skill is installed under `~/.agents/skills` so the panel's
 * "New" action has something to reference (the harness ships no create-skill).
 *
 * @module @dsh-plugins/skill-panel
 */
import { createHash } from 'node:crypto'
import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { homedir } from 'node:os'
import { join, resolve } from 'node:path'
import { existsSync, readFileSync } from 'node:fs'
import type { Context } from '@deepseek-ai/cordis'
import { BUNDLED_SKILLS, bundledSkillDir } from '@dsh-plugins/bundled-skills'
import { SkillAdminController } from './controller.ts'

/** Plugin name (matches the profile entry id used by cordis.yml). */
export const name = 'skill-panel'

/** Required services. */
export const inject = ['skills']

/** Registry of what this plugin last copied, so upgrades never clobber user edits. */
interface BundledRegistry {
  [skillName: string]: { sourceHash: string; copiedAt: string }
}

/** Marker file kept beside the installed skills (outside any skill directory). */
const REGISTRY_FILE = '.dsh-bundled.json'

/**
 * Content fingerprint of one skill directory: relative path + bytes for every file,
 * sorted so the hash is stable across filesystems and copy order.
 * @param dir - skill directory to walk.
 * @returns hex digest of the whole tree.
 */
async function hashDirectory(dir: string): Promise<string> {
  const hash = createHash('sha256')
  const walk = async (current: string, prefix: string): Promise<void> => {
    const entries = await readdir(current, { withFileTypes: true })
    for (const entry of [...entries].sort((a, b) => a.name.localeCompare(b.name))) {
      const absolute = join(current, entry.name)
      const relative = prefix === '' ? entry.name : `${prefix}/${entry.name}`
      if (entry.isDirectory()) { await walk(absolute, relative); continue }
      hash.update(`${relative}\u0000`)
      hash.update(await readFile(absolute))
      hash.update('\u0000')
    }
  }
  await walk(resolve(dir), '')
  return hash.digest('hex')
}

function readRegistry(file: string): BundledRegistry {
  try {
    const parsed: unknown = JSON.parse(readFileSync(file, 'utf8'))
    return typeof parsed === 'object' && parsed !== null ? parsed as BundledRegistry : {}
  } catch {
    // No marker yet (fresh install) or unreadable — nothing is known to be ours.
    return {}
  }
}

/**
 * Install or upgrade every bootstrap-flagged bundled skill.
 *
 * Copying only when the target is missing would freeze the shipped content forever,
 * so an upgrade replaces the installed copy **only** when it still matches what this
 * plugin last wrote (recorded in the marker file). A user-edited skill is left alone
 * and the situation is logged. Best-effort: failures never break boot.
 *
 * @param ctx - host context, used for logging.
 */
async function ensureBundledSkills(ctx: Context): Promise<void> {
  const root = join(homedir(), '.agents', 'skills')
  await mkdir(root, { recursive: true })
  const registryFile = join(root, REGISTRY_FILE)
  const registry = readRegistry(registryFile)
  const next: BundledRegistry = { ...registry }
  let changed = false

  for (const skill of BUNDLED_SKILLS) {
    if (!skill.bootstrap) continue
    const source = bundledSkillDir(skill.name)
    const target = join(root, skill.name)
    const sourceHash = await hashDirectory(source)
    const installed = existsSync(join(target, 'SKILL.md'))
    const known = registry[skill.name]

    if (!installed) {
      await cp(source, target, { recursive: true })
      next[skill.name] = { sourceHash, copiedAt: new Date().toISOString() }
      changed = true
      ctx.logger.info(`[skill-panel] bootstrapped bundled skill "${skill.name}" into ${target}`)
      continue
    }
    if (known === undefined) {
      // Not installed by this plugin (or predates the marker): treat as the user's.
      ctx.logger.info(`[skill-panel] skill "${skill.name}" already present and unmanaged; leaving it as-is`)
      continue
    }
    if (known.sourceHash === sourceHash) continue // up to date
    if (await hashDirectory(target) !== known.sourceHash) {
      ctx.logger.warn(`[skill-panel] "${skill.name}" was edited locally; skipping the bundled upgrade`)
      continue
    }
    await rm(target, { recursive: true, force: true })
    await cp(source, target, { recursive: true })
    next[skill.name] = { sourceHash, copiedAt: new Date().toISOString() }
    changed = true
    ctx.logger.info(`[skill-panel] upgraded bundled skill "${skill.name}"`)
  }

  if (changed) await writeFile(registryFile, `${JSON.stringify(next, null, 2)}\n`, 'utf8')
}

/**
 * Mount the panel's host side.
 * @param ctx - the host Cordis context.
 */
export function apply(ctx: Context): void {
  ctx.plugin(SkillAdminController)
  void ensureBundledSkills(ctx).catch((error: unknown) => {
    ctx.logger.warn(`[skill-panel] bundled-skill bootstrap failed: ${error instanceof Error ? error.message : String(error)}`)
  })
}

export { SkillAdminController }
export * from './types.ts'
