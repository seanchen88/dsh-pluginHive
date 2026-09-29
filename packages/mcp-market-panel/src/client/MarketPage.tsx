import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button, EmptyState, Modal, Select, Spacer, Tabs, TextInput } from '@dsh-plugins/plugin-kit'
import { EMPTY_INSTALLED, type InstalledIndex, type MarketInjected, type Translate } from './injected.ts'
import type { InstallOutcome } from './InstallDialog.tsx'
import type { MarketServer } from './registry.ts'
import { localCategories, searchLocal } from './local-catalog.ts'
import { serverNameFromRegistry } from './slug.ts'
import { InstallDialog } from './InstallDialog.tsx'
import { ServerCard } from './ServerCard.tsx'
import css from './panel.module.css'

export type MarketPageProps = { t: Translate } & MarketInjected

/** Page size asked of the registry; it caps at 100. */
const PAGE_SIZE = 24

/** Typing pause before a registry search goes out. */
const SEARCH_DEBOUNCE_MS = 350

/** How many skeleton cards the loading state draws. */
const SKELETON_ROWS = 6

/** Grace given to a freshly installed server to come up before its dot is judged. */
const PROBE_DELAY_MS = 4000

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => { setTimeout(resolve, ms) })
}

const NO_INSTALLED: InstalledIndex = { names: new Set(), urlToName: {}, tools: {} }

/** Which catalog is on screen. Local is bundled, registry is live. */
type Source = 'local' | 'registry'

interface DialogState { open: boolean; server?: MarketServer; startAt: 'details' | 'install' }

/**
 * The market page: two catalog sources over one renderer.
 *
 * Registry search is server-side and cursor-paged (the API gives no total), so the
 * list grows by appending and a superseded query is aborted so a slow old answer
 * cannot overwrite a newer one. The local catalog is already in the bundle, so it
 * filters synchronously.
 */
export function MarketPage(props: MarketPageProps) {
  const { t, search, listInstalled, install } = props
  // Read per render, not once at registration: the MCP panel's namespace appears
  // only after that plugin mounts, and a stale `false` would disable installs
  // forever on a deployment where both panels exist.
  const canInstall = props.canInstall()
  const [source, setSource] = useState<Source>('local')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [servers, setServers] = useState<readonly MarketServer[]>([])
  const [cursor, setCursor] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const [installableOnly, setInstallableOnly] = useState(true)
  const [installed, setInstalled] = useState<InstalledIndex>(NO_INSTALLED)
  const [dialog, setDialog] = useState<DialogState>({ open: false, startAt: 'details' })
  const [result, setResult] = useState<InstallOutcome | undefined>(undefined)
  const abort = useRef<AbortController | undefined>(undefined)

  const refreshInstalled = useCallback(async () => {
    try { setInstalled(await listInstalled()) } catch { /* badges stay empty; the panel still works */ }
  }, [listInstalled])

  /**
   * Close the form, then report what actually happened.
   *
   * "Written" and "running" are different facts: the write settles long before a
   * stdio server has downloaded and handshaken, so the popup waits one grace period
   * and re-reads the tool counts to say whether the server really came up.
   */
  const finishInstall = useCallback(async (outcome: InstallOutcome) => {
    setDialog({ open: false, startAt: 'details' })
    setResult(outcome)
    try {
      if (outcome.status === 'error') { setInstalled(await listInstalled()); return }
      await sleep(PROBE_DELAY_MS)
      const index = await listInstalled()
      setInstalled(index)
      setResult({ ...outcome, tools: index.tools[outcome.serverName] ?? 0 })
    } catch {
      setInstalled(EMPTY_INSTALLED)
    }
  }, [listInstalled])

  const runSearch = useCallback(async (term: string) => {
    abort.current?.abort()
    const controller = new AbortController()
    abort.current = controller
    setLoading(true)
    setError(undefined)
    try {
      const page = await search({ query: term, limit: PAGE_SIZE, signal: controller.signal })
      if (controller.signal.aborted) return
      setServers(page.servers)
      setCursor(page.nextCursor)
    } catch (cause: unknown) {
      if (controller.signal.aborted) return
      const reason = cause instanceof Error ? cause.message : String(cause)
      setError(/fetch|network|Failed/i.test(reason) ? t('loadError.offline') : t('loadError').replace('{reason}', reason))
      setServers([])
      setCursor(undefined)
    } finally {
      if (!controller.signal.aborted) setLoading(false)
    }
  }, [search, t])

  // Registry: debounced server search. Local: synchronous filter, no loading state.
  useEffect(() => {
    if (source !== 'registry') {
      abort.current?.abort()
      setLoading(false)
      setServers(searchLocal({ query, category }))
      setCursor(undefined)
      setError(undefined)
      return
    }
    const timer = setTimeout(() => { void runSearch(query) }, SEARCH_DEBOUNCE_MS)
    return () => { clearTimeout(timer) }
  }, [source, query, category, runSearch])

  useEffect(() => { void refreshInstalled() }, [refreshInstalled])
  useEffect(() => () => { abort.current?.abort() }, [])

  const loadMore = useCallback(async () => {
    if (cursor === undefined || loadingMore) return
    setLoadingMore(true)
    try {
      const page = await search({ query, cursor, limit: PAGE_SIZE })
      setServers(previous => {
        const seen = new Set(previous.map(server => server.name))
        return [...previous, ...page.servers.filter(server => !seen.has(server.name))]
      })
      setCursor(page.nextCursor)
    } catch (cause: unknown) {
      setError(cause instanceof Error ? cause.message : String(cause))
    } finally {
      setLoadingMore(false)
    }
  }, [cursor, loadingMore, query, search])

  const visible = useMemo(
    () => servers.filter(server => source === 'local' || !installableOnly || server.installable),
    [servers, installableOnly, source],
  )

  /** The namespace this catalog row would install under, plus any hosted URL it maps to. */
  const resolve = useCallback((server: MarketServer): { name: string; url?: string } => {
    const hosted = server.candidates.find(candidate => candidate.url !== undefined)
    return hosted?.url === undefined
      ? { name: serverNameFromRegistry(server.name) }
      : { name: installed.urlToName[hosted.url] ?? serverNameFromRegistry(server.name), url: hosted.url }
  }, [installed])

  const isInstalled = useCallback((server: MarketServer): boolean => {
    const { name, url } = resolve(server)
    return installed.names.has(name) || (url !== undefined && url in installed.urlToName)
  }, [installed, resolve])

  /**
   * Live tool count for the row this catalog entry maps to. `undefined` means the
   * row is switched off or still being probed, which the card must not paint red.
   */
  const toolsFor = useCallback((server: MarketServer): number | undefined => {
    if (!isInstalled(server)) return undefined
    return installed.tools[resolve(server).name]
  }, [installed, isInstalled, resolve])

  const openDialog = (server: MarketServer, startAt: 'details' | 'install'): void => {
    // Re-read the configured set first: the index only refreshes on mount and
    // after our own writes, so a server removed elsewhere would still reserve its
    // name and seed the dialog with a needless `-2`.
    void refreshInstalled()
    setDialog({ open: true, server, startAt })
  }

  const categories = source === 'local' ? localCategories() : []

  return (
    <div className={css.page}>
      <div className={css.inner}>
        <div className={css.headRow}>
          <h1 className={css.heading}>{t('title')}</h1>
          <Spacer />
          <span className={css.status}>{t('count').replace('{n}', String(visible.length))}</span>
        </div>
        <p className={css.intro}>{t('subtitle')}</p>

        <Tabs
          items={[{ id: 'local', label: t('source.local') }, { id: 'registry', label: t('source.registry') }]}
          active={source}
          ariaLabel={t('title')}
          onSelect={id => { setSource(id as Source); setQuery(''); setCategory('') }}
        />

        <div className={css.toolbar}>
          <TextInput className={css.search} value={query}
            placeholder={source === 'local' ? t('search.placeholder.local') : t('search.placeholder')}
            onChange={(event) => { setQuery(event.target.value) }} />
          {query !== '' && <Button variant="ghost" onClick={() => { setQuery('') }}>{t('search.clear')}</Button>}
          {source === 'local' && (
            <Select className={css.category} value={category}
              onChange={(event) => { setCategory(event.target.value) }}>
              <option value="">{t('category.all')}</option>
              {categories.map(one => (
                <option key={one.name} value={one.name}>{one.name} ({one.count})</option>
              ))}
            </Select>
          )}
          {source === 'registry' && (
            <label className={css.filters}>
              <input type="checkbox" checked={installableOnly} onChange={(event) => { setInstallableOnly(event.target.checked) }} />
              {t('filter.installable')}
            </label>
          )}
        </div>

        {!canInstall && <div className={`${css.banner} ${css.bannerWarn}`}>{t('install.needPanel')}</div>}

        {loading ? <SkeletonGrid /> : null}
        {!loading && error !== undefined && (
          <div className={`${css.banner} ${css.bannerError}`}>
            {error} <Button onClick={() => { void runSearch(query) }}>{t('retry')}</Button>
          </div>
        )}
        {!loading && error === undefined && visible.length === 0 && <EmptyState>{t('empty')}</EmptyState>}
        {!loading && visible.length > 0 && (
          <div className={css.grid}>
            {visible.map(server => (
              <ServerCard key={`${source}-${server.name}`} server={server} installed={isInstalled(server)}
                toolCount={toolsFor(server)} t={t}
                onInstall={one => { openDialog(one, 'install') }}
                onDetails={one => { openDialog(one, 'details') }} />
            ))}
          </div>
        )}
        {!loading && cursor !== undefined && (
          <div className={css.statusRow}>
            <Button disabled={loadingMore} onClick={() => { void loadMore() }}>
              {loadingMore ? t('loadingMore') : t('loadMore')}
            </Button>
          </div>
        )}
        {!loading && source === 'registry' && cursor === undefined && servers.length > 0 && (
          <div className={css.status}>{t('end')}</div>
        )}

        <InstallDialog
          open={dialog.open}
          server={dialog.server}
          startAt={dialog.startAt}
          installed={installed}
          canInstall={canInstall}
          install={install}
          t={t}
          onClose={() => { setDialog({ open: false, startAt: 'details' }) }}
          onDone={outcome => { void finishInstall(outcome) }}
        />

        <Modal
          open={result !== undefined}
          onClose={() => { setResult(undefined) }}
          closeLabel={t('result.dismiss')}
          title={result === undefined ? '' : result.status === 'ok' ? t('result.success') : t('result.failed')}
          footer={<Button variant="primary" onClick={() => { setResult(undefined) }}>{t('result.dismiss')}</Button>}
        >
          {result === undefined ? null : (
            <div className={css.resultBody}>
              <div className={css.resultLine}>
                <span className={css.resultKey}>{t('result.name')}</span>
                <span className={css.resultValue}>{result.serverName}</span>
              </div>
              <div className={css.resultLine}>
                <span className={css.resultKey}>{t('result.state')}</span>
                <span className={result.status === 'error' ? css.resultBad : css.resultOk}>
                  {result.status === 'ok' ? t('result.applied') : result.status === 'timeout' ? t('result.timeout') : t('result.rejected')}
                </span>
              </div>
              {result.tools !== undefined && (
                <div className={css.resultLine}>
                  <span className={css.resultKey}>{t('result.tools')}</span>
                  <span className={result.tools > 0 ? css.resultOk : css.resultBad}>
                    {result.tools > 0
                      ? t('result.toolsOk').replace('{n}', String(result.tools))
                      : t('result.toolsNone')}
                  </span>
                </div>
              )}
              {result.detail !== '' && (
                <div className={css.resultLine}>
                  <span className={css.resultKey}>{t('result.detail')}</span>
                  <span className={css.resultValue}>{result.detail}</span>
                </div>
              )}
            </div>
          )}
        </Modal>
      </div>
    </div>
  )
}

/**
 * Loading state drawn as the shape of what is coming, in theme tokens.
 * A bare spinner next to a sentence reads as a broken page; this reads as loading.
 */
function SkeletonGrid() {
  return (
    <div className={css.grid} aria-hidden="true">
      {Array.from({ length: SKELETON_ROWS }, (_, index) => (
        <div key={index} className={css.skeletonCard}>
          <div className={`${css.skeleton} ${css.skTitle}`} />
          <div className={`${css.skeleton} ${css.skLine}`} />
          <div className={`${css.skeleton} ${css.skLineShort}`} />
          <div className={`${css.skeleton} ${css.skMeta}`} />
          <div className={css.skActions}>
            <div className={`${css.skeleton} ${css.skButton}`} />
            <div className={`${css.skeleton} ${css.skButton}`} />
          </div>
        </div>
      ))}
    </div>
  )
}
