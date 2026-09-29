/**
 * The MCP config shapes this panel reads and writes.
 *
 * These **mirror** `packages/mcp-panel/src/types.ts` (which in turn mirrors the
 * harness `@deepseek-ai/dsh-mcp-client` `StdioConfig` / `StreamableHttpConfig`)
 * rather than importing it. The reason is packaging, not taste: `mcp-panel`'s
 * `./types` subpath resolves to `lib/types/*.d.ts`, and `lib/` is gitignored —
 * so a fresh clone of this repository could not compile the market panel at all.
 * A panel must not depend on a sibling panel's build output.
 *
 * The duplication is therefore guarded: `test-market-mapping.mjs` reads the sibling
 * `../mcp-panel/src/types.ts` and asserts the field sets and the name pattern still
 * agree, so drift fails a test instead of producing a silently bad config.
 */

/** Transport discriminator, matching the MCP client config. */
export type McpTransport = 'stdio' | 'streamable-http'

/** Automatic reconnect policy (subset surfaced by the panels). */
export interface McpReconnectConfig {
  enabled?: boolean
  initialDelayMs?: number
  maxDelayMs?: number
  maxAttempts?: number
}

/** One MCP server as stored in the profile patch config. */
export interface McpServerConfig {
  transport: McpTransport
  /** Stable namespace, `[A-Za-z0-9_-]{1,32}`, unique across live servers. */
  serverName: string
  /** stdio: executable. */
  command?: string
  /** stdio: arguments passed directly (no shell). */
  args?: string[]
  /** stdio: extra env merged over the scrubbed ambient env. */
  env?: Record<string, string>
  /** stdio: child working directory. The host defaults an omitted value to `''`,
   *  which makes `spawn` fail, so the host half fills in a real directory. */
  cwd?: string
  /** streamable-http: MCP endpoint URL. */
  url?: string
  /** streamable-http: extra headers on MCP requests. */
  headers?: Record<string, string>
  /** Per tool call / resource request timeout, milliseconds. */
  toolCallTimeoutMs?: number
  /** Fail plugin activation when the initial connection fails. */
  failOnStartupError?: boolean
  /** Reconnect policy; omission uses client defaults. */
  reconnect?: McpReconnectConfig
}

/** A tool surfaced from a connected server. */
export interface McpToolView {
  name: string
  description: string
}

/** One server row as returned by the host. */
export interface McpServerView {
  /** Loader entry id, e.g. `mcp-context7`. */
  id: string
  serverName: string
  transport: McpTransport
  config: McpServerConfig
  enabled: boolean
  source: 'profile' | 'bundle' | 'override'
  editable: boolean
}

/** Whether a write applied live or needs a restart, plus the resulting rows. */
export interface McpWriteResult {
  application: 'applied' | 'restart-required'
  servers: McpServerView[]
}

/** Server-name pattern enforced by the MCP client. */
export const SERVER_NAME_PATTERN = /^[A-Za-z0-9_-]{1,32}$/
