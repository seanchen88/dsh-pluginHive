/**
 * Example panel — browser half (template).
 *
 * The minimal client entry: register dictionaries and contribute a Settings
 * section via plugin-kit's definePanel. No Remote is mounted (this template has
 * no host data); add one like mcp-panel/skill-panel when needed.
 */
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
import type { Context as ClientContext } from '@deepseek-ai/cordis'
import { definePanel, registerLocale } from '@dsh-plugins/plugin-kit'
import { ExampleSection } from './ExampleSection.tsx'
import { en, zh } from './locales.ts'

/** Dictionary namespace owned by this plugin. */
const NS = 'examplePanel'

/** Required services. */
export const inject = ['slots', 'locale']

/**
 * Mount the example panel.
 * @param ctx - the browser Cordis context.
 */
export function apply(ctx: ClientContext): void {
  registerLocale(ctx, NS, { zh, en })
  const t = ctx.locale.bind(NS)
  definePanel(ctx, {
    name: 'settings.section',
    id: 'example',
    order: 90,
    label: () => t('nav'),
    locale: NS,
  }, ExampleSection)
}
