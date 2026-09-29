/**
 * Structural types for the browser Cordis context and the Web slot system.
 *
 * These mirror the shapes exposed by `@deepseek-ai/cordis` and
 * `@deepseek-ai/dsh-client-ui-slots` without importing them as values, so the
 * kit stays free of any runtime dependency on harness client packages (the
 * client-bundle purity rule). Panels that want the exact branded types should
 * import them directly; the members used here are structurally compatible.
 */

/** A localized dictionary: key to copy, for one namespace. */
export type LocaleDictionary = Record<string, string>

/** A lazily-resolved label (matches the slot `label` contribution shape). */
export type SlotLabel = string | (() => string)

/** The observable source shape the renderer turns into a `useX(selector)` prop. */
export interface HostObservableSource<Value> {
  getSnapshot: () => Value
  subscribe: (listener: () => void) => () => void
}

/** Registration `inject` factory return: plain callbacks plus bare sources. */
export interface InjectFaceReturn {
  hooks?: Record<string, HostObservableSource<unknown> | unknown>
  [member: string]: unknown
}

/** Options accepted by `ctx.slots.register` for a contributed panel entry. */
export interface PanelRegistration {
  /** The owner slot key being contributed to, e.g. `settings.section`. */
  readonly name: string
  /**
   * Stable list-slot id; unique within the owner slot. Required for `kind: 'list'`
   * slots (`settings.section`, `sidebar.panellist`).
   */
  readonly id?: string
  /**
   * Address of a `kind: 'keyed'` slot entry, e.g. the `main` panel column. Mutually
   * exclusive with `id`: keyed owners resolve by `key`, list owners by `id`.
   */
  readonly key?: string
  /** Ascending render order among sibling entries. */
  readonly order?: number
  /** Navigation label shown by the owner. */
  readonly label?: SlotLabel
  /** Locale namespace owned by this entry (binds the `t` prop). */
  readonly locale?: string
  /** Per-entry data/callbacks/observable sources factory (any object shape). */
  readonly inject?: () => unknown
  /** Child slots this entry declares and renders via `renderSlot`. */
  readonly children?: Record<string, { kind: string; scope: string }>
}

/** The minimal browser context surface the kit touches. */
export interface PanelContext {
  slots: {
    inject(name: string, install: () => unknown): void
    register(registration: PanelRegistration, component: unknown): unknown
  }
  locale: {
    register(namespace: string, dictionaries: Record<string, LocaleDictionary>): unknown
  }
  effect<T>(body: () => T | (() => void), label?: string): T
}
