/**
 * MCP management panel — Host half.
 *
 * A Cordis plugin entry that also owns the `mcpAdmin` Remote: the
 * `@Remote`-decorated `McpAdminController` is defined in this entry file so the
 * typert generator collects its invocations (matching the shipped
 * packages/host/plugin-inventory convention). The generator emits `./typert`
 * (host registration) and `./remote` (client contribution) from it; the browser
 * half mounts that contribution and calls `ctx.remote.mcpAdmin.*`.
 *
 * @module @dsh-plugins/mcp-panel
 */
import type { Context } from '@deepseek-ai/cordis'
// Type-only: pull the `Context` declaration merges for services reached via
// `this.ctx` (matches packages/boot/config-editor's imports of these faces).
import type {} from '@deepseek-ai/cordis-plugin-loader'
import type {} from '@deepseek-ai/dsh-tools'
import { Remote, RemoteError, TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol'
import {
  MCP_CLIENT_MODULE, SERVER_NAME_PATTERN,
  type McpRemoteResult, type McpServerConfig, type McpServerView, type McpToolView, type McpWriteResult,
} from './types.ts'
import { entryId, listManagedServers, removeServer, setServerEnabled, upsertServer } from './patch-writer.ts'

/** A Loader entry projected onto the panel's row model. */
interface RawEntry {
  id: string
  serverName: string
  config: McpServerConfig
  disabled: boolean
}

/** Plugin name (matches the profile entry id used by cordis.yml). */
export const name = 'mcp-panel'

/** Required services. */
export const inject = ['loader', 'tools', 'profileContext']

export class McpAdminController extends TypertRemoteService {
  static inject = ['loader', 'tools', 'profileContext']

  constructor(ctx: Context) {
    super(ctx, 'mcpAdmin')
  }

  private mcpEntries(): RawEntry[] {
    const rows: RawEntry[] = []
    for (const entry of this.ctx.loader.entries()) {
      if (entry.options.name !== MCP_CLIENT_MODULE) continue
      const config = entry.options.config as McpServerConfig | undefined
      if (config === undefined || typeof config !== 'object' || typeof config.serverName !== 'string') continue
      rows.push({ id: entry.options.id, serverName: config.serverName, config, disabled: entry.disabled === true })
    }
    return rows
  }

  /**
   * List every configured MCP server with its editability, without connecting.
   * @returns the rows, ordered by server name.
   */
  @Remote('list')
  async list(): Promise<McpServerView[]> {
    const managed = await listManagedServers(this.ctx)
    return this.mcpEntries().map((row): McpServerView => {
      const isManaged = managed.has(row.id)
      return {
        id: row.id,
        serverName: row.serverName,
        transport: row.config.transport,
        config: row.config,
        enabled: !row.disabled,
        source: isManaged ? 'profile' : 'bundle',
        editable: isManaged,
      }
    }).sort((a, b) => a.serverName.localeCompare(b.serverName))
  }

  /**
   * Enumerate the tools a server contributes, read from the live registry.
   * Returns empty while the server is not connected (the panel shows a hint).
   * @param serverName - the MCP namespace.
   * @returns the raw tool names (prefix stripped) and their descriptions.
   */
  @Remote('getTools')
  async getTools(serverName: string): Promise<McpToolView[]> {
    const prefix = `mcp__${serverName}__`
    const schemas = this.ctx.tools.schemas() as Array<{ name: string; description?: string }>
    return schemas
      .filter(schema => schema.name.startsWith(prefix))
      .map(schema => ({ name: schema.name.slice(prefix.length), description: schema.description ?? '' }))
  }

  /**
   * Add or update one server, then reconcile. Validates the namespace and
   * rejects a collision with a different entry before writing.
   * @param config - the resolved MCP client config.
   * @returns the application outcome plus the fresh row list.
   */
  @Remote('upsert')
  async upsert(config: McpServerConfig): Promise<McpWriteResult> {
    validateConfig(config)
    const clash = this.mcpEntries().find(row => row.serverName === config.serverName && row.id !== entryId(config.serverName))
    if (clash !== undefined) {
      throw new RemoteError('gateway/bad-request', `server name "${config.serverName}" collides with entry "${clash.id}"`, {})
    }
    const application = await upsertServer(this.ctx, config.serverName, config)
    return { application, servers: await this.list() }
  }

  /**
   * Remove one server entry (or disable it when owned by a base layer).
   * @param serverName - the namespace to remove.
   * @returns the application outcome plus the fresh row list.
   */
  @Remote('deleteServer')
  async deleteServer(serverName: string): Promise<McpWriteResult> {
    const application = await removeServer(this.ctx, serverName)
    return { application, servers: await this.list() }
  }

  /**
   * Toggle a server's enablement without editing its config.
   * @param serverName - the namespace to toggle.
   * @param enabled - desired state.
   * @returns the application outcome plus the fresh row list.
   */
  @Remote('setEnabled')
  async setEnabled(serverName: string, enabled: boolean): Promise<McpWriteResult> {
    const application = await setServerEnabled(this.ctx, serverName, enabled)
    return { application, servers: await this.list() }
  }
}

function validateConfig(config: McpServerConfig): void {
  if (!SERVER_NAME_PATTERN.test(config.serverName)) {
    throw new RemoteError('gateway/bad-request', `server name "${config.serverName}" must match [A-Za-z0-9_-]{1,32}`, {})
  }
  if (config.transport === 'stdio' && typeof config.command !== 'string') {
    throw new RemoteError('gateway/bad-request', 'stdio transport requires a command', {})
  }
  if (config.transport === 'streamable-http' && typeof config.url !== 'string') {
    throw new RemoteError('gateway/bad-request', 'streamable-http transport requires a url', {})
  }
}

/**
 * Mount the panel's host-side Remote.
 * @param ctx - the host Cordis context.
 */
export function apply(ctx: Context): void {
  ctx.plugin(McpAdminController)
}

export * from './types.ts'
