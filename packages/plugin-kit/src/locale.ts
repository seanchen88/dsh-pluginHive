import type { LocaleDictionary, PanelContext } from './types.ts'

/**
 * Register a plugin's localized dictionaries for one namespace, tied to the
 * owning effect lifetime (the registration is withdrawn when the plugin fiber
 * disposes).
 * @param ctx - the browser Cordis context (has `locale` and `effect`).
 * @param namespace - the dictionary namespace owned by this plugin.
 * @param dictionaries - per-language maps, e.g. `{ zh, en }`.
 */
export function registerLocale(
  ctx: Pick<PanelContext, 'locale' | 'effect'>,
  namespace: string,
  dictionaries: Record<string, LocaleDictionary>,
): void {
  ctx.effect(() => ctx.locale.register(namespace, dictionaries), `${namespace}: dictionaries`)
}
