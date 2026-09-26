/**
 * Client-safe data model for the Skill management panel.
 *
 * Mirrors the subset of `ctx.skills.list()`'s `SkillSummary` the panel renders
 * (see packages/skill/skill/src/index.ts), plus the zip-import result shapes.
 * Plain JSON types only, so this file bundles into the browser half safely.
 */

/** Where a skill came from (mirrors SkillSource). */
export type SkillSource =
  | 'project-dsh' | 'project-agents' | 'runtime'
  | 'user-dsh' | 'user-agents' | 'custom' | 'bundled' | (string & {})

/** One skill row as rendered by the panel. */
export interface SkillView {
  /** Kebab-case identifier used to address the skill. */
  name: string
  description: string
  whenToUse?: string
  /** Discovery source that produced the winning entry. */
  source: SkillSource
  /** Provider that owns the skill body (filesystem / runtime / …). */
  provider: string
  /** Absolute SKILL.md path when the provider supplies one. */
  path?: string
  /** Whether the skill is user-invocable via the `/` composer. */
  userInvocable: boolean
  /** True when the skill ships from a plugin/bundle rather than an editable folder. */
  fromPlugin: boolean
  /**
   * True when the panel may delete the skill: a filesystem skill that is not a
   * protected bundled one. Computed host-side so the UI never decides safety.
   */
  deletable: boolean
  /**
   * True for skills this plugin ships and re-installs (currently `create-skill`).
   * They live in the same user folder as ordinary skills, so they need an explicit
   * marker rather than being inferred from `source`.
   */
  protected: boolean
}

/** Scope selector for list/import: the user level or one workspace. */
export type SkillScope = { kind: 'user' } | { kind: 'workspace'; cwd: string }

/** A scope tab descriptor. */
export interface SkillScopeTab {
  id: string
  label: string
  scope: SkillScope
}

/** Result of importing one skill zip. */
export interface SkillImportResult {
  status: 'imported' | 'exists' | 'invalid' | 'error'
  name?: string
  /** Human-readable reason for non-imported statuses. */
  message?: string
}

/** One skill's `SKILL.md` as read back for the viewer. */
export interface SkillDetail {
  name: string
  /** Absolute path resolved by the host (never supplied by the client). */
  path: string
  /** Raw `SKILL.md` text, frontmatter included. */
  markdown: string
  /** True when `markdown` was cut at the size cap. */
  truncated: boolean
}

/** Outcome of a delete request; carries the fresh list so the panel updates in one round-trip. */
export interface SkillDeleteResult {
  status: 'deleted' | 'protected' | 'not-found' | 'invalid'
  name: string
  /** Reason for the non-deleted statuses. */
  message?: string
  skills: SkillView[]
}

/** Envelope mirroring the harness Remote result convention. */
export type SkillRemoteResult<T> = { ok: true; value: T } | { ok: false; error: { code: string; message: string } }

/** Maximum accepted zip size, in bytes (front-end pre-check + host authority). */
export const MAX_ZIP_BYTES = 25 * 1024 * 1024

/** Maximum total decompressed size, guarding against zip bombs. */
export const MAX_UNCOMPRESSED_BYTES = 100 * 1024 * 1024

/** Maximum number of entries in an imported archive. */
export const MAX_ZIP_ENTRIES = 512

/** Cap on the `SKILL.md` bytes handed to the viewer, so a huge file can't flood the browser. */
export const MAX_SKILL_DOC_BYTES = 256 * 1024

/** Skill name pattern enforced by the registry (skill/src/index.ts:35). */
export const SKILL_NAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

/**
 * The plain-text form of a skill reference. The harness has no structured mention
 * field: ui-skill lands a pick as `/<name> ` and the host expands it at prompt-parse
 * time (packages/client/ui-skill/src/client/index.ts:216-224).
 */
export const CREATE_SKILL_COMMAND = '/create-skill '
