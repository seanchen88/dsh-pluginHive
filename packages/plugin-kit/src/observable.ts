import type { HostObservableSource } from './types.ts'

/**
 * A single-flight, key-addressed async cache, mirroring the pattern the shipped
 * `ui-skill` catalog uses: concurrent reads of one key share a promise, a
 * settled value backs synchronous reads, and a failed read does not poison the
 * key (the next caller retries). Invalidating a key aborts its in-flight fetch.
 */
export interface SingleFlight<Key, Value> {
  /** Return the cached value, or start/share a fetch. Rejects if `fetch` rejects. */
  read(key: Key, fetch: (signal: AbortSignal) => Promise<Value>): Promise<Value>
  /** The settled value for a key, if any (no fetch). */
  peek(key: Key): Value | undefined
  /** Drop one key's cache and abort its in-flight fetch. */
  invalidate(key: Key): void
  /** Drop every key. */
  clear(): void
}

interface CacheEntry<Value> {
  promise: Promise<Value>
  settled?: Value
  abort: AbortController
}

/**
 * Create a single-flight cache.
 * @returns an object with `read` / `peek` / `invalidate` / `clear`.
 */
export function createSingleFlight<Key, Value>(): SingleFlight<Key, Value> {
  const cache = new Map<Key, CacheEntry<Value>>()

  const read = (key: Key, fetch: (signal: AbortSignal) => Promise<Value>): Promise<Value> => {
    const existing = cache.get(key)
    if (existing !== undefined) return existing.promise
    const abort = new AbortController()
    const promise = fetch(abort.signal)
    const entry: CacheEntry<Value> = { promise, abort }
    cache.set(key, entry)
    promise.then(
      (value) => { entry.settled = value },
      () => { if (cache.get(key) === entry) cache.delete(key) },
    )
    return promise
  }

  return {
    read,
    peek: key => cache.get(key)?.settled,
    invalidate: (key) => {
      const entry = cache.get(key)
      if (entry === undefined) return
      cache.delete(key)
      entry.abort.abort()
    },
    clear: () => {
      for (const entry of cache.values()) entry.abort.abort()
      cache.clear()
    },
  }
}

/**
 * A minimal observable value store: `getSnapshot`/`subscribe` are consumed by
 * the slot renderer (turning them into a `useX(selector)` component prop), and
 * `set` notifies listeners. Identity-stable snapshots avoid needless re-renders.
 */
export interface ObservableStore<Value> extends HostObservableSource<Value> {
  set(next: Value): void
}

/**
 * Create an observable store seeded with `initial`.
 * @param initial - the first snapshot.
 * @returns a store exposing `getSnapshot` / `subscribe` / `set`.
 */
export function createStore<Value>(initial: Value): ObservableStore<Value> {
  let value = initial
  const listeners = new Set<() => void>()
  return {
    getSnapshot: () => value,
    subscribe: (listener) => {
      listeners.add(listener)
      return () => { listeners.delete(listener) }
    },
    set: (next) => {
      if (next === value) return
      value = next
      for (const listener of [...listeners]) listener()
    },
  }
}
