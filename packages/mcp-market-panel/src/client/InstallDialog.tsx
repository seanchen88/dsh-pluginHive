import { useEffect, useMemo, useRef, useState } from 'react'
import { Button, Field, Modal, Select, Spacer, Spinner, TextInput, safeHref } from '@dsh-plugins/plugin-kit'
import type { Settled } from '@dsh-plugins/plugin-kit'
import type { McpServerConfig, McpWriteResult } from './mcp-config.ts'
import type { InstalledIndex, Translate } from './injected.ts'
import type { CatalogVariable, InstallCandidate, MarketServer } from './registry.ts'
import { buildConfig, toSnippet, variableKey } from './to-config.ts'
import { isValidServerName, resolveUniqueName, serverNameFromRegistry } from './slug.ts'
import css from './panel.module.css'

export interface InstallDialogProps {
  open: boolean
  /** The dialog stays mounted; `undefined` is the inert state between openings. */
  server: MarketServer | undefined
  /** Open on the metadata view (card 「详情」) or straight on the form. */
  startAt: 'details' | 'install'
  installed: InstalledIndex
  canInstall: boolean
  /** Write through the MCP panel's remote; already settled, so it never hangs. */
  install: (config: McpServerConfig) => Promise<Settled<McpWriteResult>>
  t: Translate
  onClose: () => void
  /** Report the settled verdict; the page closes this form and shows the result. */
  onDone: (outcome: InstallOutcome) => void
}

/** What an install attempt ended with, in the shape the result popup needs. */
export interface InstallOutcome {
  readonly status: 'ok' | 'error' | 'timeout'
  readonly serverName: string
  /** Applied/restart note on success, readable failure reason otherwise. */
  readonly detail: string
  /** Live tool count once the page has re-probed; undefined until then. */
  readonly tools?: number
}

type Values = Readonly<Record<string, string>>

const EMPTY_VALUES: Values = {}

/** Group variables by where their value lands, so sections read naturally. */
function groupOf(variable: CatalogVariable): string {
  return variable.target === 'env' ? 'install.env'
    : variable.target === 'headers' ? 'install.headers'
    : 'install.args'
}

/**
 * Catalog detail + install form for one server.
 *
 * Two invariants shape this component:
 *  - The owner renders it persistently and toggles `open`, so external seed data
 *    must be re-applied in an effect. A lazy `useState(() => seed(server))` runs
 *    once and would freeze the first server's values into every later dialog.
 *  - Installing runs third-party code on the user's machine. The exact command
 *    and the exact config are shown, and a required field with no default blocks
 *    the confirm button rather than writing a server that cannot connect.
 */
export function InstallDialog(props: InstallDialogProps) {
  const { open, server, startAt, installed, canInstall, install, t, onClose, onDone } = props
  const [step, setStep] = useState<'details' | 'install'>('details')
  const [candidateIndex, setCandidateIndex] = useState(0)
  const [serverName, setServerName] = useState('')
  const [values, setValues] = useState<Values>(EMPTY_VALUES)
  const [busy, setBusy] = useState(false)
  const installedRef = useRef(installed)
  useEffect(() => { installedRef.current = installed }, [installed])

  useEffect(() => {
    if (!open || server === undefined) return
    const firstSupported = server.candidates.findIndex(candidate => candidate.supported)
    setStep(startAt)
    setCandidateIndex(firstSupported < 0 ? 0 : firstSupported)
    setServerName(resolveUniqueName(serverNameFromRegistry(server.name), installedRef.current.names))
    setValues(EMPTY_VALUES)
    // `installed` is deliberately NOT a trigger: a successful install updates that
    // index, and re-seeding then would reset the step and erase the result message,
    // so the dialog would silently jump back to page one (observed live).
  }, [open, server, startAt])

  const candidate = server?.candidates[candidateIndex]
  const form = useMemo(() => ({ serverName, values }), [serverName, values])
  const outcome = candidate === undefined ? undefined : buildConfig(candidate, form)
  const nameValid = isValidServerName(serverName)
  const overwrites = serverName !== '' && installed.names.has(serverName)
  const blocked = !canInstall || candidate === undefined || candidate.supported === false
    || !nameValid || outcome === undefined || outcome.status !== 'ready' || busy

  const submit = async (): Promise<void> => {
    if (outcome === undefined || outcome.status !== 'ready' || server === undefined) return
    setBusy(true)
    try {
      const result = await install(outcome.config)
      // Whatever the verdict, hand it to the page and let the form close: the write
      // can take a long time (npx download, reconnect backoff), and a form left open
      // on a lost reply reads as a hung dialog. The page owns the result popup.
      if (result.status === 'error') onDone({ status: 'error', serverName, detail: result.error })
      else if (result.status === 'timeout') onDone({ status: 'timeout', serverName, detail: t('install.timeout') })
      else onDone({
        status: 'ok',
        serverName,
        detail: result.value.application === 'restart-required' ? t('install.restart') : t('install.applied'),
      })
    } catch (cause: unknown) {
      onDone({ status: 'error', serverName, detail: cause instanceof Error ? cause.message : String(cause) })
    } finally {
      setBusy(false)
    }
  }

  const footer = step === 'details'
    ? (
        <>
          <Button onClick={onClose}>{t('install.cancel')}</Button>
          <Spacer />
          <Button variant="primary" disabled={candidate === undefined || !candidate.supported || !canInstall}
            onClick={() => { setStep('install') }}>
            {t('card.install')}
          </Button>
        </>
      )
    : (
        <>
          <Button onClick={() => { setStep('details') }}>{t('card.details')}</Button>
          <Spacer />
          <Button variant="primary" disabled={blocked} onClick={() => { void submit() }}>{t('install.confirm')}</Button>
        </>
      )

  return (
    <Modal open={open} onClose={onClose} closeLabel={t('install.cancel')} title={
      server === undefined ? t('install.title').replace('{name}', '') : t('install.title').replace('{name}', server.title)
    } footer={footer}>
      {server === undefined ? null : step === 'details'
        ? <Details server={server} candidate={candidate} canInstall={canInstall} t={t} onSelect={setCandidateIndex} />
        : <Form server={server} candidate={candidate} serverName={serverName} onName={setServerName}
            values={values} onValues={setValues} outcome={outcome} nameValid={nameValid} overwrites={overwrites}
            canInstall={canInstall} busy={busy} t={t} />}
    </Modal>
  )
}

/** Read-only catalog metadata plus the choice of install method. */
function Details(props: {
  server: MarketServer
  candidate: InstallCandidate | undefined
  canInstall: boolean
  t: Translate
  onSelect: (index: number) => void
}) {
  const { server, candidate, canInstall, t, onSelect } = props
  const repository = server.repositoryUrl === undefined ? '' : safeHref(server.repositoryUrl)
  const website = server.websiteUrl === undefined ? '' : safeHref(server.websiteUrl)
  return (
    <div className={css.detailBlock}>
      <p className={css.cardDesc}>{server.description}</p>
      <div className={css.detailRow}>
        <span className={css.detailKey}>{t('detail.registry')}</span>
        <span className={css.detailValue}>{server.name}</span>
      </div>
      <div className={css.detailRow}>
        <span className={css.detailKey}>{t('detail.version')}</span>
        <span className={css.detailValue}>v{server.version}</span>
      </div>
      {repository !== '' && (
        <div className={css.detailRow}>
          <span className={css.detailKey}>{t('detail.repository')}</span>
          <a className={css.link} href={repository} target="_blank" rel="noreferrer">{server.repositoryUrl}</a>
        </div>
      )}
      {website !== '' && (
        <div className={css.detailRow}>
          <span className={css.detailKey}>{t('detail.website')}</span>
          <a className={css.link} href={website} target="_blank" rel="noreferrer">{server.websiteUrl}</a>
        </div>
      )}
      <div className={css.sectionTitle}>{t('detail.candidates')}</div>
      <Select value={String(props.server.candidates.findIndex(one => one === candidate))}
        onChange={(event) => { onSelect(Number(event.target.value)) }}>
        {server.candidates.map((one, index) => (
          <option key={`${one.kind}-${one.label}`} value={String(index)}>
            {one.label}{one.supported ? '' : ` — ${t('card.unsupported')}`}
          </option>
        ))}
      </Select>
      {candidate !== undefined && !candidate.supported && (
        <div className={`${css.banner} ${css.bannerWarn}`}>{t('card.unsupported')}（{candidate.unsupportedReason ?? ''}）</div>
      )}
      {!canInstall && <div className={`${css.banner} ${css.bannerWarn}`}>{t('install.needPanel')}</div>}
    </div>
  )
}

/** The install form: namespace, per-variable inputs, and the verbatim preview. */
function Form(props: {
  server: MarketServer
  candidate: InstallCandidate | undefined
  serverName: string
  onName: (next: string) => void
  values: Values
  onValues: (next: Values) => void
  outcome: ReturnType<typeof buildConfig> | undefined
  nameValid: boolean
  overwrites: boolean
  canInstall: boolean
  /** A write is in flight; the form stays visible but the progress line takes over. */
  busy: boolean
  t: Translate
}) {
  const { candidate, serverName, onName, values, onValues, outcome, nameValid, overwrites, canInstall, busy, t } = props
  if (candidate === undefined) return <div className={css.banner}>{t('card.noCandidate')}</div>
  const variables = candidate.variables
  const sections = [...new Set(variables.map(groupOf))]
  const missing = outcome !== undefined && outcome.status === 'missing' ? outcome.variables.map(one => one.name).join('、') : ''

  const setValue = (variable: CatalogVariable, next: string): void => {
    onValues({ ...values, [variableKey(variable)]: next })
  }

  return (
    <div className={css.detailBlock}>
      {!canInstall && <div className={`${css.banner} ${css.bannerWarn}`}>{t('install.needPanel')}</div>}
      <Field label={t('install.method')}>
        <div className={css.detailValue}>{candidate.label}</div>
      </Field>
      <Field label={t('install.name')}>
        <TextInput className={css.field} value={serverName} onChange={(event) => { onName(event.target.value) }} />
      </Field>
      <div className={css.variableHint}>
        {!nameValid && <span className={css.tagDeprecated}>{t('install.name.invalid')} {t('install.name.hint')}</span>}
        {nameValid && overwrites && <span className={css.tagUnsupported}>{t('install.name.conflict')}</span>}
      </div>

      {sections.map(section => (
        <div key={section}>
          <div className={css.sectionTitle}>{t(section)}</div>
          {variables.filter(variable => groupOf(variable) === section).map(variable => (
            <div key={`${variable.target}-${variable.name}`} className={css.variable}>
              <span className={css.variableLabel}>
                {variable.name}
                <span className={css.variableHint}>
                  {variable.required ? t('install.required') : t('install.optional')}
                  {variable.secret ? ' · secret' : ''}
                </span>
              </span>
              {variable.description !== undefined && <span className={css.variableHint}>{variable.description}</span>}
              {variable.choices !== undefined ? (
                <Select className={css.field}
                  value={values[variableKey(variable)] ?? variable.defaultValue ?? variable.choices[0] ?? ''}
                  onChange={(event) => { setValue(variable, event.target.value) }}>
                  {variable.choices.map(choice => <option key={choice} value={choice}>{choice}</option>)}
                </Select>
              ) : (
                <TextInput className={css.field} type={variable.secret ? 'password' : 'text'}
                  placeholder={variable.placeholder ?? variable.defaultValue ?? ''}
                  value={values[variableKey(variable)] ?? ''}
                  onChange={(event) => { setValue(variable, event.target.value) }} />
              )}
            </div>
          ))}
        </div>
      ))}
      {variables.length > 0 && <div className={css.variableHint}>{t('install.secretNote')}</div>}
      {missing !== '' && <div className={`${css.banner} ${css.bannerWarn}`}>{t('install.missing').replace('{list}', missing)}</div>}

      <div className={css.sectionTitle}>{t('install.preview')}</div>
      <div className={css.variableHint}>{t('install.execNote')}</div>
      <pre className={css.preview}>
        {outcome !== undefined && outcome.status === 'ready' ? toSnippet(outcome.config) : serverName === '' ? '{}' : '(incomplete)'}
      </pre>
      {busy && (
        <div className={css.busyRow}>
          <Spinner />
          <span>{t('install.busy')}</span>
        </div>
      )}
    </div>
  )
}
