/**
 * MCP management panel — browser half.
 *
 * Mounts the `mcpAdmin` Remote contribution, registers the panel's dictionaries,
 * and contributes a top-level Settings section. The section talks to the host
 * only through the injected face (which wraps `ctx.remote.mcpAdmin`), never
 * through `ctx` directly.
 *
 * Cross-plugin collaboration is via slots/services only; no harness client
 * package is imported as a value (client-bundle purity gate).
 */
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
import type {} from '@deepseek-ai/dsh-api-remotes/client'
import type { Context as ClientContext } from '@deepseek-ai/cordis'
import mcpAdminRemote from '@dsh-plugins/mcp-panel/remote'
import { definePanel, registerLocale } from '@dsh-plugins/plugin-kit'
import type { McpScope } from '../types.ts'
import { McpSettingsSection } from './McpSettingsSection.tsx'
import type { McpInjected } from './injected.ts'
import { en, zh } from './locales.ts'
// The `mcpAdmin` namespace type comes from the generated `@dsh-plugins/mcp-panel/remote`
// declaration merge (typert owns it); no hand-authored remote-types is needed.

/** Dictionary namespace owned by this plugin. */
const NS = 'mcpPanel'

/** Required services. The `mcpAdmin` namespace is self-mounted below and read via `ctx.get` (not injected, to avoid a mount/inject deadlock). */
export const inject = ['slots', 'locale', 'remote']

/**
 * Mount the MCP panel.
 * @param ctx - the browser Cordis context.
 */
export function apply(ctx: ClientContext): void {
  registerLocale(ctx, NS, { zh, en })

  // The mcpAdmin namespace is not in the harness's central Remote assembly, so
  // this fiber mounts it itself. Calls gate on `mounted` so the first fetch
  // (the section's mount-time list) never races the mount.
  const mounted = ctx.remote.$mount(mcpAdminRemote)
  ctx.effect(() => {
    void mounted.catch(() => { /* surfaced on first call */ })
    return async () => { (await mounted)() }
  }, 'mcp-panel: mount mcpAdmin remote')

  const admin = async () => { await mounted; return ctx.get('remote.mcpAdmin') as typeof ctx.remote.mcpAdmin }
  const unwrap = async <T>(call: Promise<{ ok: true; value: T } | { ok: false; error: { code: string; message: string } }>): Promise<T> => {
    const result = await call
    if (!result.ok) throw new Error(`${result.error.code}: ${result.error.message}`)
    return result.value
  }

  // v1 edits the profile-global (user-level) set; per-workspace grouping is a
  // later enhancement (design risk R9), so only the user tab is offered.
  const scopes = (): McpScope[] => [{ id: 'user', label: ctx.locale.bind(NS)('scope.user'), user: true }]

  const injected = (): McpInjected => ({
    list: async () => unwrap((await admin()).list()),
    getTools: async serverName => unwrap((await admin()).getTools(serverName)),
    upsert: async config => unwrap((await admin()).upsert(config)),
    remove: async serverName => unwrap((await admin()).deleteServer(serverName)),
    setEnabled: async (serverName, enabled) => unwrap((await admin()).setEnabled(serverName, enabled)),
    scopes,
  })

  const t = ctx.locale.bind(NS)
  definePanel(ctx, {
    name: 'settings.section',
    id: 'mcp',
    order: 20,
    label: () => t('nav'),
    locale: NS,
    inject: injected,
  }, McpSettingsSection)
}
