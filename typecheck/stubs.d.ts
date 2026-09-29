/**
 * Minimal, faithful type stubs for the `@deepseek-ai/*` packages that are NOT
 * published to npm (they are workspace-internal to the harness). These exist
 * only so `tsc` can type-check this plugin repo standalone; the real packages
 * provide the authoritative types at integration/build time. Members are typed
 * to match the shapes verified against the harness source.
 */

declare module '@deepseek-ai/cordis' {
  /** Host/browser plugin context. Members typed `any` (the real Context is richer). */
  export interface Context {
    slots: any
    locale: any
    remote: any
    effect: any
    logger: any
    plugin: any
    get: any
    [key: string]: any
  }
  export abstract class Service { constructor(ctx: Context, key: string) }
}

declare module '@deepseek-ai/dsh-typert-protocol' {
  import type { Context } from '@deepseek-ai/cordis'

  export class RemoteError extends Error {
    readonly code: string
    constructor(code: string, message: string, details?: unknown, options?: { cause?: unknown })
  }

  /** Standard-decorator method decorator factory: `@Remote` or `@Remote('name')`. */
  export function Remote(option?: string | Record<string, unknown>): <T extends object, A extends unknown[], R>(
    target: (this: T, ...args: A) => R,
    context: ClassMethodDecoratorContext<T, (this: T, ...args: A) => R>,
  ) => void

  export interface TypertRemoteContribution {
    readonly package: string
    readonly descriptors: readonly unknown[]
  }

  /** Namespace map augmented by each generated `./remote` (and the hand-authored faces). */
  export interface TypertRemoteNamespaceMap { [key: string]: any }

  export abstract class TypertRemoteService {
    protected readonly ctx: Context
    constructor(ctx: Context, serviceKey: string, options?: { namespace?: string })
  }
}

declare module '@deepseek-ai/dsh-skill' {
  export interface SkillInvocationPolicy { readonly modelInvocable: boolean; readonly userInvocable: boolean }
  export interface SkillSummary {
    readonly path?: string
    readonly name: string
    readonly description: string
    readonly whenToUse?: string
    readonly invocation: SkillInvocationPolicy
    readonly source: SkillSource
    readonly provider: string
    readonly resourceBase?: unknown
  }
  export type SkillSource =
    | 'project-dsh' | 'project-agents' | 'runtime'
    | 'user-dsh' | 'user-agents' | 'custom' | 'bundled' | (string & {})
  export interface SkillRegistry {
    list(options?: { cwd?: string; scope?: unknown; signal?: AbortSignal }): Promise<SkillSummary[]>
  }
}

declare module '@deepseek-ai/dsh-app-boot' {
  export function readProfilePatches(binName: string, profile: unknown, loaded?: unknown): unknown[]
  export function reconcileProfilePatches(
    ctx: unknown, patches: unknown[], binName: string, requiredIds?: readonly string[],
  ): Promise<string[]>
}

declare module '@deepseek-ai/dsh-atomic-write' {
  export function writeFileAtomic(path: string, data: string | Uint8Array, options?: { mode?: number }): Promise<void>
  export function withFileLock<T>(path: string, fn: () => Promise<T>): Promise<T>
}

// Type-only side-effect imports (`import type {} from '.../client'`) resolve the
// package's Context/slot declaration merges in the real build; here they just
// need to exist as modules.
declare module '@deepseek-ai/dsh-client-locale/client' {}
declare module '@deepseek-ai/dsh-client-ui-settings/client' {}
declare module '@deepseek-ai/dsh-client-ui-renderer/client' {}
declare module '@deepseek-ai/dsh-api-remotes/client' {}
declare module '@deepseek-ai/dsh-client-ui-sidebar/client' {}
// The market panel addresses the keyed `main` slot, so it needs the real branded
// id type to exist; the stub reproduces `ui-layout`'s `Branded<'MainPanelId'>`
// shape closely enough for the offline check (the live build resolves the
// package's own `client` types instead).
declare module '@deepseek-ai/dsh-client-ui-layout/client' {
  export type MainPanelId = string & { readonly __brand: 'MainPanelId' }
  export interface PanelInfo { readonly activePanelId: MainPanelId | null }
}
// Context-augmentation faces the host controllers pull in type-only (the real
// packages merge their service onto Context; here the stub Context already
// carries them via its index signature, so an empty module is enough to resolve).
declare module '@deepseek-ai/cordis-plugin-loader' {}
declare module '@deepseek-ai/dsh-tools' {}
declare module '@deepseek-ai/dsh-hmr' {}
declare module '@deepseek-ai/dsh-client-ui-slots' {
  export interface LocaleNamespaceMap { [key: string]: unknown }
  export type PropsRuntime<K extends string> = { renderSlot: (key: string, props?: unknown, opts?: unknown) => unknown } & Record<string, any>
  export type PropsLocale<N extends string> = { t: (key: string) => string }
  export type PropsRenderSlots<K extends string> = { renderSlot: (key: string, props?: unknown, opts?: unknown) => unknown }
  export type InjectFace<I> = I
  export type HostObservable<V> = { getSnapshot: () => V; subscribe: (l: () => void) => () => void }
}
