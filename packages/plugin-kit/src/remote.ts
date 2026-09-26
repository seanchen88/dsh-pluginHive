import { createSingleFlight } from './observable.ts'

/**
 * A thin wrapper over a mounted Remote namespace that adds key-addressed,
 * single-flight caching for read calls, so repeated panel opens and tab
 * switches do not multiply host round-trips. Mirrors the fetch-cache discipline
 * the shipped `ui-skill` catalog uses.
 *
 * The Remote namespace itself is mounted once in the plugin's `apply`
 * (`ctx.remote.$mount(contribution)`); this helper only fronts its reads.
 */
export interface RemoteProxy<Key, Value> {
  /** Cached read for a key; concurrent callers share one fetch. */
  read(key: Key, fetch: (signal: AbortSignal) => Promise<Value>): Promise<Value>
  /** The last settled value for a key, if any (no fetch). */
  peek(key: Key): Value | undefined
  /** Drop one key (e.g. after a write that changed it). */
  invalidate(key: Key): void
  /** Drop every key (e.g. on connection reset). */
  invalidateAll(): void
}

/**
 * Create a single-flight read cache for one Remote read.
 * @returns a `RemoteProxy` fronting the caller-supplied fetch.
 */
export function createRemoteProxy<Key, Value>(): RemoteProxy<Key, Value> {
  const flight = createSingleFlight<Key, Value>()
  return {
    read: (key, fetch) => flight.read(key, fetch),
    peek: key => flight.peek(key),
    invalidate: key => { flight.invalidate(key) },
    invalidateAll: () => { flight.clear() },
  }
}
