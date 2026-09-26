import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, EmptyState, Spacer, Tabs } from '@dsh-plugins/plugin-kit'
import type { McpServerConfig, McpServerView, McpWriteResult } from '../types.ts'
import type { McpInjected, Translate } from './injected.ts'
import { McpCard } from './McpCard.tsx'
import { McpFormDialog } from './McpFormDialog.tsx'
import css from './panel.module.css'

export type McpSettingsSectionProps = { t: Translate } & McpInjected

/** How long to wait for a write's reply before trusting a fresh list instead. */
const WRITE_SETTLE_MS = 20_000

type Settled =
  | { status: 'ok'; value: McpWriteResult }
  | { status: 'error'; error: string }
  | { status: 'timeout' }

/**
 * Await a write without ever hanging the panel.
 *
 * A write that changes the profile patch makes HMR recompute the composition, and the
 * host fiber serving the call can be reloaded before its reply is sent — the patch is
 * already on disk while the promise never settles. Neither outcome may leave 「保存」
 * stuck disabled, so a lost reply degrades into a refetch.
 *
 * @param call - the in-flight write.
 * @param ms - settle budget before giving up on the reply.
 */
async function settleWrite(call: Promise<McpWriteResult>, ms: number): Promise<Settled> {
  let timer: ReturnType<typeof setTimeout> | undefined
  const normalized: Promise<Settled> = call.then(
    (value): Settled => ({ status: 'ok', value }),
    (error: unknown): Settled => ({
      status: 'error',
      error: error instanceof Error ? error.message : String(error),
    }),
  )
  const guard = new Promise<Settled>(resolve => {
    timer = setTimeout(() => { resolve({ status: 'timeout' }) }, ms)
  })
  try {
    return await Promise.race([normalized, guard])
  } finally {
    if (timer !== undefined) clearTimeout(timer)
  }
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

  const tabs = useMemo(() => scopes().map(scope => ({ id: scope.id, label: scope.label })), [scopes])

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
    const settled = await settleWrite(call, WRITE_SETTLE_MS)
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
    await runWrite(setEnabled(server.serverName, enabled))
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
