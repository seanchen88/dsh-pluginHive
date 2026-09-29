import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, EmptyState, settleWrite, Spacer, Tabs } from '@dsh-plugins/plugin-kit'
import type { McpServerConfig, McpServerView, McpWriteResult } from '../types.ts'
import type { McpInjected, Translate } from './injected.ts'
import { McpCard } from './McpCard.tsx'
import { McpFormDialog } from './McpFormDialog.tsx'
import css from './panel.module.css'

export type McpSettingsSectionProps = { t: Translate } & McpInjected

/** Grace period before a zero-tool server is called failed rather than still starting. */
const CONNECT_GRACE_MS = 4000

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => { setTimeout(resolve, ms) })
}

function PlusIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
}

export function McpSettingsSection(props: McpSettingsSectionProps) {
  const { t, list, getTools, upsert, remove, setEnabled, scopes } = props
  const [servers, setServers] = useState<McpServerView[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | undefined>(undefined)
  const [banner, setBanner] = useState<string | undefined>(undefined)
  const [scopeId, setScopeId] = useState<string>('user')
  const [editing, setEditing] = useState<{ open: boolean; initial?: McpServerConfig }>({ open: false })
  /** Live tool count per server name; absent while still being probed. */
  const [toolCounts, setToolCounts] = useState<Record<string, number>>({})
  /** Server whose enable/disable write has not settled; its card shows progress. */
  const [pendingToggle, setPendingToggle] = useState<string | undefined>(undefined)

  const tabs = useMemo(() => scopes().map(scope => ({ id: scope.id, label: scope.label })), [scopes])

  const probeTools = useCallback(async (targets: readonly McpServerView[]): Promise<Record<string, number>> => {
    const out: Record<string, number> = {}
    await Promise.all(targets.map(async server => {
      try { out[server.serverName] = (await getTools(server.serverName)).length }
      catch { out[server.serverName] = 0 }
    }))
    return out
  }, [getTools])

  /**
   * Derive connection health from the tools the server actually registered.
   *
   * `enabled` only means the row is not switched off — a server whose command fails to
   * start stays enabled forever, which is why the status dot used to read green for
   * broken servers. A server still handshaking is indistinguishable from a dead one for
   * a few seconds, so zero-tool rows get exactly one re-probe before being called failed.
   */
  useEffect(() => {
    const enabled = servers.filter(server => server.enabled)
    if (enabled.length === 0) { setToolCounts({}); return }
    let cancelled = false
    void (async () => {
      const watched = new Set(enabled.map(server => server.serverName))
      // Clear first: a re-enabled server must not inherit the count from its previous
      // generation, which would show a stale 「已连接」 until the new probe lands.
      setToolCounts(previous => Object.fromEntries(
        Object.entries(previous).filter(([name]) => !watched.has(name)),
      ))
      const first = await probeTools(enabled)
      if (cancelled) return
      // Only a non-zero answer is final. Zero is still ambiguous (starting vs broken),
      // so those rows stay 「检测中」 until the grace re-probe settles them.
      setToolCounts(previous => ({
        ...previous,
        ...Object.fromEntries(Object.entries(first).filter(([, count]) => count > 0)),
      }))
      const quiet = enabled.filter(server => (first[server.serverName] ?? 0) === 0)
      if (quiet.length === 0) return
      await sleep(CONNECT_GRACE_MS)
      const again = await probeTools(quiet)
      if (!cancelled) setToolCounts(previous => ({ ...previous, ...again }))
    })()
    return () => { cancelled = true }
  }, [servers, probeTools])

  const reload = useCallback(async () => {
    try {
      const value = await list()
      setServers(value)
      setError(undefined)
    } catch (loadError: unknown) {
      setError(loadError instanceof Error ? loadError.message : t('load.error'))
    } finally {
      setLoading(false)
    }
  }, [list, t])

  useEffect(() => { void reload() }, [reload])

  const applyWrite = useCallback((result: { application: string; servers: McpServerView[] }) => {
    setServers(result.servers)
    setBanner(result.application === 'restart-required' ? t('restartRequired') : undefined)
  }, [t])

  /**
   * Run one write: surface a real rejection, but never block on a reply that a
   * reconcile may have orphaned — fall back to the authoritative list instead.
   */
  const runWrite = useCallback(async (call: Promise<McpWriteResult>) => {
    const settled = await settleWrite(call)
    if (settled.status === 'ok') { applyWrite(settled.value); return undefined }
    if (settled.status === 'error') { setError(settled.error); return undefined }
    await reload()
    return undefined
  }, [applyWrite, reload])

  const onSubmit = useCallback(async (config: McpServerConfig) => {
    // Close the dialog regardless: the patch is written even when the reply is lost.
    setEditing({ open: false })
    await runWrite(upsert(config))
  }, [upsert, runWrite])

  const onToggle = useCallback(async (server: McpServerView, enabled: boolean) => {
    // Enabling goes through a profile reconcile that can take seconds and may reload
    // the fiber answering the call, so the switch would otherwise sit there looking
    // unresponsive right after the click.
    setPendingToggle(server.serverName)
    try {
      await runWrite(setEnabled(server.serverName, enabled))
    } finally {
      setPendingToggle(undefined)
    }
  }, [setEnabled, runWrite])

  const onTimeout = useCallback(async (server: McpServerView, ms: number) => {
    await runWrite(upsert({ ...server.config, toolCallTimeoutMs: ms }))
  }, [upsert, runWrite])

  const onDelete = useCallback(async (server: McpServerView) => {
    // Name the target: a generic confirm on a destructive row action invites deleting
    // the wrong card when several look alike.
    if (!window.confirm(t('delete.confirm').replace('{name}', server.serverName))) return
    await runWrite(remove(server.serverName))
  }, [remove, runWrite, t])

  // The panel edits the profile-global (user-level) set; workspace tabs are a
  // view grouping (see design risk R9). Non-user tabs show the same rows.
  const visible = servers

  return (
    <div className={css.section}>
      <div className={css.header}>
        <div className={css.headerText}>
          <h1 className={css.heading}>{t('title')}</h1>
          <p className={css.intro}>{t('intro')} <a className={css.link} href="https://deepseek-harness.github.io/deepseek-harness/" target="_blank" rel="noreferrer">{t('docs')}</a></p>
        </div>
        <Button variant="primary" icon={<PlusIcon />} onClick={() => { setEditing({ open: true }) }}>{t('add')}</Button>
      </div>

      {tabs.length > 1 && <Tabs items={tabs} active={scopeId} onSelect={setScopeId} ariaLabel={t('scope.user')} />}
      {banner !== undefined && <div className={css.banner}>{banner}</div>}
      {error !== undefined && <div className={css.error}>{error}</div>}

      {!loading && visible.length === 0 && <EmptyState>{t('empty')}</EmptyState>}
      <div className={css.list}>
        {visible.map(server => (
          <McpCard
            key={server.id}
            server={server}
            t={t}
            getTools={getTools}
            toolCount={toolCounts[server.serverName]}
            busy={pendingToggle === server.serverName}
            onToggle={(enabled) => { void onToggle(server, enabled) }}
            onEdit={() => { setEditing({ open: true, initial: server.config }) }}
            onDelete={() => { void onDelete(server) }}
            onTimeout={(ms) => { void onTimeout(server, ms) }}
          />
        ))}
      </div>
      <Spacer />

      <McpFormDialog
        open={editing.open}
        initial={editing.initial}
        t={t}
        onClose={() => { setEditing({ open: false }) }}
        onSubmit={onSubmit}
      />
    </div>
  )
}
