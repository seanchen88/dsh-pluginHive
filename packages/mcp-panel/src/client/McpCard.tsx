import { useEffect, useState } from 'react'
import { CollapsibleCard, Field, Row, Select, Spacer, Switch, Tag, Button } from '@dsh-plugins/plugin-kit'
import type { McpServerView, McpToolView } from '../types.ts'
import { TIMEOUT_CHOICES } from '../types.ts'
import type { Translate } from './injected.ts'
import css from './panel.module.css'

export interface McpCardProps {
  server: McpServerView
  t: Translate
  getTools: (serverName: string) => Promise<McpToolView[]>
  onToggle: (enabled: boolean) => void
  onEdit: () => void
  onDelete: () => void
  onTimeout: (ms: number) => void
}

function LinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" style={{ color: 'var(--dsw-alias-success, #2f9e57)' }}>
      <path d="M6.5 9.5l3-3M7 4.5l1.2-1.2a2.5 2.5 0 013.5 3.5L10.5 8M5.5 11.5l-1.2 1.2a2.5 2.5 0 01-3.5-3.5L4 8" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

export function McpCard({ server, t, getTools, onToggle, onEdit, onDelete, onTimeout }: McpCardProps) {
  const [tools, setTools] = useState<McpToolView[] | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  const load = (): void => {
    if (tools !== undefined || loading) return
    setLoading(true)
    void getTools(server.serverName).then(
      (value) => { setTools(value); setLoading(false) },
      () => { setTools([]); setLoading(false) },
    )
  }

  useEffect(() => { setTools(undefined) }, [server.id, server.serverName])

  const endpoint = server.transport === 'streamable-http' ? server.config.url : server.config.command
  const timeoutMs = server.config.toolCallTimeoutMs ?? 60_000
  // Only the key names are surfaced; values stay masked so the panel can be shown on
  // screen without leaking credentials (they live in plain text in the profile patch).
  const secrets = server.transport === 'streamable-http'
    ? { label: t('form.headers'), pairs: server.config.headers }
    : { label: t('env'), pairs: server.config.env }

  return (
    <CollapsibleCard
      title={server.serverName}
      leading={<><span className={css.statusDot} data-state={server.enabled ? 'connected' : 'disabled'} /><LinkIcon /></>}
      onOpen={load}
      trailing={
        <Row>
          {!server.editable && <Tag>{t('fromPlugin')}</Tag>}
          {server.editable && (
            <>
              <Button variant="ghost" onClick={(event) => { event.stopPropagation(); onEdit() }}>{t('edit')}</Button>
              <Button variant="ghost" onClick={(event) => { event.stopPropagation(); onDelete() }}>{t('delete')}</Button>
            </>
          )}
          <span onClick={(event) => { event.stopPropagation() }}>
            <Switch checked={server.enabled} onChange={onToggle} aria-label={t('enabled')} />
          </span>
        </Row>
      }
    >
      <Field label={server.transport === 'streamable-http' ? t('url') : t('command')}>{endpoint ?? '—'}</Field>

      {server.config.args !== undefined && server.config.args.length > 0 && (
        <Field label={t('args')}>{server.config.args.join(' ')}</Field>
      )}

      {secrets.pairs !== undefined && Object.keys(secrets.pairs).length > 0 && (
        <Field label={secrets.label}>
          <div>
            {Object.keys(secrets.pairs).map(key => (
              <div key={key} className={css.toolRow}>
                <span className={css.toolName}>{key}</span>
                <span className={css.toolDesc}>{'••••'}</span>
              </div>
            ))}
            <div className={css.toolDesc}>{t('secrets.stored')}</div>
          </div>
        </Field>
      )}

      <div>
        <div className={css.toolsHeading}>{`${t('tools')}${tools ? ` (${tools.length})` : ''}`}</div>
        {loading && <span style={{ fontSize: 13, color: 'var(--dsw-alias-text-muted, #888)' }}>…</span>}
        {tools !== undefined && tools.length === 0 && (
          <div className={css.toolDesc}>{t('tools.none')}</div>
        )}
        {tools?.map(tool => (
          <div key={tool.name} className={css.toolRow}>
            <span className={css.toolName}>{tool.name}</span>
            <span className={css.toolDesc}>{tool.description}</span>
          </div>
        ))}
      </div>

      <div className={css.formGrid}>
        <label className={css.formLabel} htmlFor={`timeout-${server.id}`}>{t('timeout')}</label>
        <Select
          id={`timeout-${server.id}`}
          value={String(timeoutMs)}
          disabled={!server.editable}
          style={{ width: 200 }}
          onChange={(event) => { onTimeout(Number((event.target as HTMLSelectElement).value)) }}
        >
          {TIMEOUT_CHOICES.map(choice => (
            <option key={choice.ms} value={String(choice.ms)}>{choice.label}</option>
          ))}
          {!TIMEOUT_CHOICES.some(c => c.ms === timeoutMs) && <option value={String(timeoutMs)}>{`${Math.round(timeoutMs / 1000)}s`}</option>}
        </Select>
      </div>
      <Spacer />
    </CollapsibleCard>
  )
}
