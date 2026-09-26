import { useEffect, useState } from 'react'
import { Button, Field, Modal, Select, TextArea, TextInput } from '@dsh-plugins/plugin-kit'
import type { McpServerConfig, McpTransport } from '../types.ts'
import { SERVER_NAME_PATTERN, TIMEOUT_CHOICES } from '../types.ts'
import type { Translate } from './injected.ts'
import css from './panel.module.css'

export interface McpFormDialogProps {
  open: boolean
  initial?: McpServerConfig | undefined
  t: Translate
  onClose: () => void
  onSubmit: (config: McpServerConfig) => Promise<void>
}

interface Draft {
  serverName: string
  transport: McpTransport
  url: string
  command: string
  args: string
  cwd: string
  env: string
  headers: string
  timeoutMs: number
}

/** Serialize a `KEY=value` map into the textarea's line format. */
function toLines(value: Record<string, string> | undefined): string {
  return value === undefined ? '' : Object.entries(value).map(([key, item]) => `${key}=${item}`).join('\n')
}

function toDraft(config?: McpServerConfig): Draft {
  return {
    serverName: config?.serverName ?? '',
    transport: config?.transport ?? 'streamable-http',
    url: config?.url ?? '',
    command: config?.command ?? '',
    args: (config?.args ?? []).join(' '),
    cwd: config?.cwd ?? '',
    env: toLines(config?.env),
    headers: toLines(config?.headers),
    timeoutMs: config?.toolCallTimeoutMs ?? 60_000,
  }
}

/** Keys the form owns; anything else on the stored config is carried through untouched. */
const FORM_OWNED: readonly string[] = [
  'transport', 'serverName', 'url', 'command', 'args', 'cwd', 'env', 'headers', 'toolCallTimeoutMs',
]

/**
 * Parse `KEY=value` lines, splitting on the FIRST `=` so values may contain `=`.
 * @returns the map, or `undefined` when the field is empty (so we never write `env: {}`).
 */
function parsePairs(text: string): Record<string, string> | undefined {
  const pairs: Record<string, string> = {}
  for (const line of text.split('\n')) {
    const index = line.indexOf('=')
    if (index <= 0) continue
    const key = line.slice(0, index).trim()
    if (key === '') continue
    pairs[key] = line.slice(index + 1).trim()
  }
  return Object.keys(pairs).length === 0 ? undefined : pairs
}

export function McpFormDialog({ open, initial, t, onClose, onSubmit }: McpFormDialogProps) {
  const [draft, setDraft] = useState<Draft>(() => toDraft(initial))
  const [error, setError] = useState<string | undefined>(undefined)
  const [busy, setBusy] = useState(false)

  // This dialog stays mounted while `open` toggles, so the useState initializer above
  // only ever sees the first (add-mode, undefined) `initial`. Re-seed on every open and
  // whenever the edited row changes, otherwise Edit opens an empty form.
  useEffect(() => {
    if (!open) return
    setDraft(toDraft(initial))
    setError(undefined)
  }, [open, initial])

  const patch = (next: Partial<Draft>): void => { setDraft(previous => ({ ...previous, ...next })) }

  const submit = async (): Promise<void> => {
    setError(undefined)
    if (!SERVER_NAME_PATTERN.test(draft.serverName)) {
      setError(t('serverName') + ': [A-Za-z0-9_-]{1,32}')
      return
    }
    if (draft.transport === 'streamable-http' && draft.url.trim() === '') {
      setError(t('url') + ' ✕')
      return
    }
    if (draft.transport === 'stdio' && draft.command.trim() === '') {
      setError(t('command') + ' ✕')
      return
    }
    const env = parsePairs(draft.env)
    const headers = parsePairs(draft.headers)
    // Carry every field the form does not surface (reconnect, maxInstructionBytes,
    // failOnStartupError…) so editing one row never silently drops hand-written config.
    const carried: Record<string, unknown> = {}
    if (initial !== undefined) {
      for (const [key, value] of Object.entries(initial)) {
        if (!FORM_OWNED.includes(key)) carried[key] = value
      }
    }
    const edited: McpServerConfig = draft.transport === 'streamable-http'
      ? {
        transport: 'streamable-http',
        serverName: draft.serverName,
        url: draft.url.trim(),
        ...(headers === undefined ? {} : { headers }),
        toolCallTimeoutMs: draft.timeoutMs,
      }
      : {
        transport: 'stdio',
        serverName: draft.serverName,
        command: draft.command.trim(),
        args: draft.args.trim() === '' ? [] : draft.args.trim().split(/\s+/),
        ...(draft.cwd.trim() === '' ? {} : { cwd: draft.cwd.trim() }),
        ...(env === undefined ? {} : { env }),
        toolCallTimeoutMs: draft.timeoutMs,
      }
    const config = { failOnStartupError: false, ...carried, ...edited } as McpServerConfig
    setBusy(true)
    try {
      await onSubmit(config)
    } catch (submitError: unknown) {
      setError(submitError instanceof Error ? submitError.message : String(submitError))
    } finally {
      setBusy(false)
    }
  }

  return (
    <Modal
      title={initial ? t('form.title.edit') : t('form.title.add')}
      open={open}
      onClose={onClose}
      closeLabel={t('modal.close')}
      footer={
        <>
          <Button onClick={onClose} disabled={busy}>{t('cancel')}</Button>
          <Button variant="primary" onClick={() => { void submit() }} disabled={busy}>{t('save')}</Button>
        </>
      }
    >
      <Field label={t('serverName')}>
        <TextInput value={draft.serverName} disabled={initial !== undefined} onChange={event => { patch({ serverName: event.target.value }) }} placeholder="context7" />
      </Field>

      <div className={css.formGrid}>
        <label className={css.formLabel} htmlFor="mcp-transport">{t('transport')}</label>
        <Select id="mcp-transport" value={draft.transport} onChange={event => { patch({ transport: (event.target as HTMLSelectElement).value as McpTransport }) }}>
          <option value="streamable-http">{t('transport.http')}</option>
          <option value="stdio">{t('transport.stdio')}</option>
        </Select>
      </div>

      {draft.transport === 'streamable-http' ? (
        <>
          <Field label={t('url')}>
            <TextInput value={draft.url} onChange={event => { patch({ url: event.target.value }) }} placeholder="https://mcp.example.com/mcp" />
          </Field>
          <Field label={`${t('form.headers')} (${t('form.pairsHint')})`}>
            <TextArea
              value={draft.headers}
              rows={4}
              onChange={event => { patch({ headers: event.target.value }) }}
              placeholder={'Authorization=Bearer sk-xxxx\nX-API-Key=xxxx'}
            />
          </Field>
        </>
      ) : (
        <>
          <Field label={t('command')}>
            <TextInput value={draft.command} onChange={event => { patch({ command: event.target.value }) }} placeholder="npx" />
          </Field>
          <Field label={t('args')}>
            <TextInput value={draft.args} onChange={event => { patch({ args: event.target.value }) }} placeholder="-y @scope/server" />
          </Field>
          <Field label={t('form.cwd')}>
            <TextInput value={draft.cwd} onChange={event => { patch({ cwd: event.target.value }) }} />
          </Field>
          <Field label={`${t('env')} (${t('form.pairsHint')})`}>
            <TextArea
              value={draft.env}
              rows={4}
              onChange={event => { patch({ env: event.target.value }) }}
              placeholder={'DEEPSEEK_API_KEY=sk-xxxx'}
            />
          </Field>
        </>
      )}

      <div className={css.formGrid}>
        <label className={css.formLabel} htmlFor="mcp-timeout">{t('timeout')}</label>
        <Select id="mcp-timeout" value={String(draft.timeoutMs)} onChange={event => { patch({ timeoutMs: Number((event.target as HTMLSelectElement).value) }) }}>
          {TIMEOUT_CHOICES.map(choice => <option key={choice.ms} value={String(choice.ms)}>{choice.label}</option>)}
        </Select>
      </div>

      {error !== undefined && <div className={css.error}>{error}</div>}
    </Modal>
  )
}
