/**
 * Example panel — Host half (template).
 *
 * The minimal host entry: a name/inject/apply plugin with no Remote. Copy this
 * package to start a new panel; add a `TypertRemoteService` controller only if
 * the panel needs host data (see mcp-panel / skill-panel).
 *
 * @module @dsh-plugins/example-panel
 */
import type { Context } from '@deepseek-ai/cordis'

/** Plugin name (matches the profile entry id used by cordis.yml). */
export const name = 'example-panel'

/** Required services (none beyond the base composition for this template). */
export const inject: string[] = []

/**
 * Host entry point. This template contributes nothing host-side.
 * @param _ctx - the host Cordis context.
 */
export function apply(_ctx: Context): void {
  // No-op: the example panel is browser-only. Real panels mount a controller here.
}
