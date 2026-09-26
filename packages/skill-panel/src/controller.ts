/**
 * Host Remote for the Skill management panel.
 *
 * Lists skills across scopes by reading the registry directly (the shipped
 * `skills/list` Remote is session-scoped and cannot enumerate an arbitrary
 * workspace), and imports `.zip` uploads through zip-import.ts. Writes land in
 * `.agents/skills` roots that `skill-filesystem` watches, so the catalog
 * refreshes on its own; the panel refetches after an import for immediate
 * feedback (the `skills/change` event is not on the forwarded-events allowlist).
 */
import type { Context } from '@deepseek-ai/cordis'
import { rm, stat, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { Remote, RemoteError, TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol'
import type { SkillDeleteResult, SkillDetail, SkillImportResult, SkillScope, SkillView } from './types.ts'
import { MAX_SKILL_DOC_BYTES, SKILL_NAME_PATTERN } from './types.ts'
import { importSkillZip } from './zip-import.ts'
import { PROTECTED_SKILL_NAMES, resolveSkillDir, scanSkills } from './skill-scan.ts'

export class SkillAdminController extends TypertRemoteService {
  static inject: string[] = []

  constructor(ctx: Context) {
    super(ctx, 'skillAdmin')
  }

  /**
   * List every skill visible in a scope, ordered by name.
   * @param scope - the user level or one workspace.
   * @returns the projected skill rows.
   */
  @Remote('list')
  async list(scope: SkillScope): Promise<SkillView[]> {
    return scanSkills(scope)
  }

  /**
   * Import a skill from a base64-encoded zip into a scope. The archive crosses
   * the Remote as a base64 string (JSON-safe) rather than raw bytes.
   * @param scope - the destination scope.
   * @param base64 - the uploaded `.zip` contents, base64-encoded.
   * @param overwrite - replace an existing skill of the same name.
   * @returns the import outcome.
   */
  @Remote('importZip')
  async importZip(scope: SkillScope, base64: string, overwrite: boolean): Promise<SkillImportResult> {
    if (typeof base64 !== 'string' || base64 === '') {
      throw new RemoteError('gateway/bad-request', 'importZip expects a base64 string', {})
    }
    const bytes = new Uint8Array(Buffer.from(base64, 'base64'))
    return importSkillZip(bytes, scope, overwrite)
  }

  /**
   * Read one skill's `SKILL.md` for the viewer. The client names the skill; the host
   * resolves it inside the known roots, so no path can be smuggled in.
   * @param scope - the user level or one workspace.
   * @param name - kebab-case skill name.
   * @returns the raw document plus the resolved path and a truncation flag.
   */
  @Remote('readSkill')
  async readSkill(scope: SkillScope, name: string): Promise<SkillDetail> {
    const located = await resolveSkillDir(scope, name)
    if (located === undefined) {
      throw new RemoteError('gateway/not-found', `skill "${name}" is not installed in this scope`, {})
    }
    const file = join(located.dir, 'SKILL.md')
    const size = (await stat(file)).size
    const buffer = await readFile(file)
    const clipped = size > MAX_SKILL_DOC_BYTES
    return {
      name,
      path: file,
      markdown: (clipped ? buffer.subarray(0, MAX_SKILL_DOC_BYTES) : buffer).toString('utf8'),
      truncated: clipped,
    }
  }

  /**
   * Delete an installed skill directory. Bundled skills this plugin re-installs
   * (e.g. `create-skill`) are refused regardless of where they live on disk.
   * @param scope - the user level or one workspace.
   * @param name - kebab-case skill name.
   * @returns the outcome plus the fresh row list.
   */
  @Remote('deleteSkill')
  async deleteSkill(scope: SkillScope, name: string): Promise<SkillDeleteResult> {
    if (!SKILL_NAME_PATTERN.test(name ?? '')) {
      return { status: 'invalid', name: String(name), message: 'invalid skill name', skills: await this.list(scope) }
    }
    if (PROTECTED_SKILL_NAMES.has(name)) {
      return { status: 'protected', name, message: 'bundled with the plugin; cannot be deleted', skills: await this.list(scope) }
    }
    const located = await resolveSkillDir(scope, name)
    if (located === undefined) {
      return { status: 'not-found', name, message: 'skill is not installed in this scope', skills: await this.list(scope) }
    }
    await rm(located.dir, { recursive: true, force: true })
    return { status: 'deleted', name, skills: await this.list(scope) }
  }
}

export default SkillAdminController
