import type { McpServerConfig, McpWriteResult } from './mcp-config.ts'
import type { Settled } from '@dsh-plugins/plugin-kit'
import type { MarketPage } from './registry.ts'

/** Translate function the locale service binds for the panel namespace. */
export type Translate = (key: string) => string

/**
 * What is already configured, indexed for badges and name-collision checks.
 * Names catch a reinstall under the same name; URLs catch the same hosted
 * server installed under a different name.
 *
 * `tools` carries each server's live tool count because that is the only
 * connection evidence a plugin can get: `enabled` merely means the row is not
 * switched off, so a server whose command fails to start stays "enabled" forever.
 */
export interface InstalledIndex {
  readonly names: ReadonlySet<string>
  /** Endpoint → configured name, so a hosted catalog row is recognized even when
   *  the user installed it under a different namespace. */
  readonly urlToName: Readonly<Record<string, string>>
  /** serverName → live tool count. Absent for disabled or not-yet-probed rows. */
  readonly tools: Readonly<Record<string, number>>
}

/** Nothing configured (or the MCP panel is absent). */
export const EMPTY_INSTALLED: InstalledIndex = { names: new Set(), urlToName: {}, tools: {} }

/**
 * Verdict shown as a status dot. `failed` means "enabled but registered no tools":
 * the harness exposes no per-server error text to plugins, so the panel can say a
 * server is not up without claiming to know why.
 */
export type ConnectionState = 'absent' | 'disabled' | 'probing' | 'connected' | 'failed'

/**
 * The business face handed to the page component.
 *
 * Catalog reads go straight to the registry from the browser; everything that
 * mutates DSH state goes through the MCP panel's `mcpAdmin` namespace, because
 * that is where the atomic write, file lock, reconcile, and rollback live.
 * `canInstall` reports whether that namespace exists so the UI degrades instead
 * of failing on a deployment without the MCP panel.
 */
export interface MarketInjected {
  /** One catalog page; `signal` cancels a superseded search. */
  search: (options: { query?: string; cursor?: string; limit?: number; signal?: AbortSignal }) => Promise<MarketPage>
  /** Snapshot of configured servers plus their live tool counts. */
  listInstalled: () => Promise<InstalledIndex>
  /** Write one server through the MCP panel's remote, already settled. */
  install: (config: McpServerConfig) => Promise<Settled<McpWriteResult>>
  /** Whether installs are possible at all in this deployment. */
  canInstall: () => boolean
}
