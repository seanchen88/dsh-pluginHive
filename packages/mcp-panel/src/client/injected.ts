import type { McpScope, McpServerConfig, McpServerView, McpToolView, McpWriteResult } from '../types.ts'

/**
 * The business face the registration's `inject` factory hands to the section
 * component. Each member is a thin wrapper over `ctx.remote.mcpAdmin` (bound in
 * the plugin `apply` closure), so the component never touches `ctx` directly.
 */
export interface McpInjected {
  /** Load every configured server (config only; no connection). */
  list: () => Promise<McpServerView[]>
  /** Lazily load one server's tools; empty until it is connected. */
  getTools: (serverName: string) => Promise<McpToolView[]>
  /** Add or update a server, then reconcile. */
  upsert: (config: McpServerConfig) => Promise<McpWriteResult>
  /** Remove a server (or disable a base-layer row). */
  remove: (serverName: string) => Promise<McpWriteResult>
  /** Toggle a server's enablement. */
  setEnabled: (serverName: string, enabled: boolean) => Promise<McpWriteResult>
  /** Scope tabs: the user level plus each open workspace. */
  scopes: () => McpScope[]
}

/** Translate function the locale service binds for the section namespace. */
export type Translate = (key: string) => string
