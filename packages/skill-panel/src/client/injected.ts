import type { SkillDeleteResult, SkillDetail, SkillImportResult, SkillScope, SkillView } from '../types.ts'
import type { CreateSkillOutcome } from './session-launcher.ts'

/**
 * The business face the registration's `inject` factory hands to the section.
 * Members wrap `ctx.remote.skillAdmin`, the session launcher and the scope tabs,
 * bound in `apply`.
 */
export interface SkillInjected {
  /** List skills for a scope. */
  list: (scope: SkillScope) => Promise<SkillView[]>
  /** Import a skill zip (base64-encoded) into a scope. */
  importZip: (scope: SkillScope, base64: string, overwrite: boolean) => Promise<SkillImportResult>
  /** Read one skill's `SKILL.md` (the host resolves the name inside its known roots). */
  readSkill: (scope: SkillScope, name: string) => Promise<SkillDetail>
  /** Delete one skill; the host refuses protected/bundled ones. */
  deleteSkill: (scope: SkillScope, name: string) => Promise<SkillDeleteResult>
  /**
   * Start authoring a skill: open a fresh chat seeded with `/create-skill ` plus the
   * guidance prompt, falling back to the clipboard when the session services are absent.
   */
  createSkill: () => Promise<CreateSkillOutcome>
  /** Scope tabs: user level plus each open workspace. */
  scopes: () => Array<{ id: string; label: string; scope: SkillScope }>
}

/** Translate function bound to the panel's locale namespace. */
export type Translate = (key: string) => string
