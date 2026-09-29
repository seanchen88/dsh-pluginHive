/**
 * MCP market panel — Host half.
 *
 * Deliberately a no-op plugin: the catalog is fetched by the browser half
 * (the MCP Registry answers `access-control-allow-origin: *`), and installs go
 * through the MCP panel's already-proven `remote.mcpAdmin` write path. Adding a
 * Remote here would mean a second persistence implementation plus a typert
 * regeneration pass for no behavioural gain.
 *
 * @module @dsh-plugins/mcp-market-panel
 */
import type { Context } from '@deepseek-ai/cordis'

/** Plugin name (matches the profile entry id used by cordis.yml). */
export const name = 'market-panel'

/** Required services (none: this half contributes nothing host-side). */
export const inject: string[] = []

/**
 * Host entry point.
 * @param _ctx - the host Cordis context.
 */
export function apply(_ctx: Context): void {
  // No-op by design. The market panel is browser-only.
}
