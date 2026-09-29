/**
 * MCP market panel — browser half.
 *
 * Contributes a left-sidebar row (`sidebar.panellist`) and, in the same breath,
 * the main-column page it addresses (`main`, keyed). Both registrations are
 * mandatory: `layout.selectPanel` throws for a nav row whose panel key is not
 * registered, so a row alone would be a button that errors on click.
 *
 * Installs are not implemented here. They go through the MCP services panel's
 * `mcpAdmin` namespace, reached with `ctx.get` (never `inject`) so a deployment
 * without that panel degrades to a disabled button instead of an inactive
 * plugin, and so the atomic-write / lock / reconcile / rollback path exists in
 * exactly one place. No Remote namespace is mounted by this package, hence no
 * typert artifacts.
 */
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type {} from '@deepseek-ai/dsh-client-ui-layout/client'
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
import type {} from '@deepseek-ai/dsh-api-remotes/client'
import type { Context as ClientContext } from '@deepseek-ai/cordis'
import type { MainPanelId } from '@deepseek-ai/dsh-client-ui-layout/client'
import type { McpServerConfig, McpServerView, McpToolView, McpWriteResult } from './mcp-config.ts'
import { definePanel, registerLocale, settleWrite } from '@dsh-plugins/plugin-kit'
import { MarketNavIcon } from './MarketNavIcon.tsx'
import { MarketPage } from './MarketPage.tsx'
import { EMPTY_INSTALLED, type InstalledIndex, type MarketInjected } from './injected.ts'
import { en, zh } from './locales.ts'
import { searchRegistry } from './registry.ts'

/** Dictionary namespace owned by this plugin. */
const NS = 'mcpMarketPanel'

/** Sidebar row id and main-column key — one string, two registrations. */
const PANEL_ID = 'mcp-market' as MainPanelId

/**
 * Rows sit below 「插件」 (order 0) and above 「定时任务」 (order 10) and the
 * workspace region, which renders after the whole nav block. See
 * 「插件」 itself contributes at order 0 and 「定时任务」 at order 10, so 1..9 lands
 * between them; the workspace region renders after the whole nav block.
 */
const NAV_ORDER = 5

/** Envelope the Remote gateway wraps every handler result in. */
type Gateway<T> = { ok: true; value: T } | { ok: false; error: { code: string; message: string } }

/** Narrow structural view of the MCP panel's namespace (only what we call). */
interface McpAdminLike {
  list(): Promise<Gateway<McpServerView[]>>
  upsert(config: McpServerConfig): Promise<Gateway<McpWriteResult>>
  getTools(serverName: string): Promise<Gateway<McpToolView[]>>
}

/** Unwrap the gateway envelope the Remote layer puts on every handler result. */
async function unwrap<Value>(call: Promise<Gateway<Value>>): Promise<Value> {
  const result = await call
  if (!result.ok) throw new Error(`${result.error.code}: ${result.error.message}`)
  return result.value
}

/**
 * Index configured servers for badges and status dots.
 *
 * Tool counts are probed per server: a row being present says only that the config
 * was written, while the live question the user asks is whether the server came up.
 */
async function indexServers(remote: McpAdminLike): Promise<InstalledIndex> {
  const names = new Set<string>()
  const urlToName: Record<string, string> = {}
  const tools: Record<string, number> = {}
  const servers = await unwrap(remote.list())
  for (const server of servers) {
    names.add(server.serverName)
    if (server.config.url !== undefined) urlToName[server.config.url] = server.serverName
    if (!server.enabled) continue
    try { tools[server.serverName] = (await unwrap(remote.getTools(server.serverName))).length }
    catch { tools[server.serverName] = 0 }
  }
  return { names, urlToName, tools }
}

/** Required services. `remote.mcpAdmin` is looked up lazily, never injected. */
export const inject = ['slots', 'locale']

/**
 * Mount the market panel.
 * @param ctx - the browser Cordis context.
 */
export function apply(ctx: ClientContext): void {
  registerLocale(ctx, NS, { zh, en })
  const t = ctx.locale.bind(NS)

  const admin = (): McpAdminLike | undefined => ctx.get('remote.mcpAdmin') as McpAdminLike | undefined

  const injected = (): MarketInjected => ({
    search: options => searchRegistry(options),
    listInstalled: async () => {
      const remote = admin()
      if (remote === undefined) return EMPTY_INSTALLED
      return indexServers(remote)
    },
    install: async config => {
      const remote = admin()
      if (remote === undefined) return { status: 'error', error: 'mcp-panel is not installed' }
      // The write may recompute the composition and orphan its own reply, so it is
      // settled rather than awaited — same rule the MCP panel follows.
      try {
        return await settleWrite(unwrap(remote.upsert(config)))
      } catch (cause: unknown) {
        return { status: 'error', error: cause instanceof Error ? cause.message : String(cause) }
      }
    },
    canInstall: () => admin() !== undefined,
  })

  definePanel(ctx, {
    name: 'main',
    key: PANEL_ID,
    locale: NS,
    inject: injected,
  }, MarketPage)

  definePanel(ctx, {
    name: 'sidebar.panellist',
    id: PANEL_ID,
    order: NAV_ORDER,
    locale: NS,
    label: () => t('nav'),
  }, MarketNavIcon)
}
