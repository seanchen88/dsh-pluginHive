/**
 * Skill management panel — browser half.
 *
 * Mounts the `skillAdmin` Remote contribution, registers dictionaries, and
 * contributes a top-level Settings section. The section reaches the host only
 * through the injected face (wrapping `ctx.remote.skillAdmin`).
 */
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
import type {} from '@deepseek-ai/dsh-api-remotes/client'
import type { Context as ClientContext } from '@deepseek-ai/cordis'
import skillAdminRemote from '@dsh-plugins/skill-panel/remote'
import { definePanel, registerLocale } from '@dsh-plugins/plugin-kit'
import type { SkillScope } from '../types.ts'
import { CREATE_SKILL_COMMAND } from '../types.ts'
import { SkillSettingsSection } from './SkillSettingsSection.tsx'
import type { SkillInjected } from './injected.ts'
import { en, zh } from './locales.ts'
import { copyToClipboard, openSessionWithDraft } from './session-launcher.ts'
// The `skillAdmin` namespace type comes from the generated `@dsh-plugins/skill-panel/remote`
// declaration merge (typert owns it); no hand-authored remote-types is needed.

/** Dictionary namespace owned by this plugin. */
const NS = 'skillPanel'

/** Required services. The `skillAdmin` namespace is self-mounted below and read via `ctx.get` (not injected, to avoid a mount/inject deadlock). */
export const inject = ['slots', 'locale', 'remote']

/**
 * Mount the Skill panel.
 * @param ctx - the browser Cordis context.
 */
export function apply(ctx: ClientContext): void {
  registerLocale(ctx, NS, { zh, en })

  // Self-mount the skillAdmin namespace (not in the central Remote assembly);
  // calls gate on `mounted` so the first list never races the mount.
  const mounted = ctx.remote.$mount(skillAdminRemote)
  ctx.effect(() => {
    void mounted.catch(() => { /* surfaced on first call */ })
    return async () => { (await mounted)() }
  }, 'skill-panel: mount skillAdmin remote')

  const admin = async () => { await mounted; return ctx.get('remote.skillAdmin') as typeof ctx.remote.skillAdmin }
  const unwrap = async <T>(call: Promise<{ ok: true; value: T } | { ok: false; error: { code: string; message: string } }>): Promise<T> => {
    const result = await call
    if (!result.ok) throw new Error(`${result.error.code}: ${result.error.message}`)
    return result.value
  }

  const t = ctx.locale.bind(NS)
  // v1 lists the user-level scope; workspace tabs are a later enhancement.
  const scopes = (): Array<{ id: string; label: string; scope: SkillScope }> =>
    [{ id: 'user', label: t('scope.user'), scope: { kind: 'user' } }]

  const injected = (): SkillInjected => ({
    list: async scope => unwrap((await admin()).list(scope)),
    importZip: async (scope, base64, overwrite) => unwrap((await admin()).importZip(scope, base64, overwrite)),
    readSkill: async (scope, name) => unwrap((await admin()).readSkill(scope, name)),
    deleteSkill: async (scope, name) => unwrap((await admin()).deleteSkill(scope, name)),
    // Prefer opening a chat with the prompt already typed; degrade to the clipboard
    // when the session services are unavailable on this deployment.
    createSkill: async () => {
      const draft = `${CREATE_SKILL_COMMAND}${t('new.prefill')}`
      if (await openSessionWithDraft(ctx, draft)) return 'opened'
      return (await copyToClipboard(draft)) ? 'clipboard' : 'failed'
    },
    scopes,
  })

  definePanel(ctx, {
    name: 'settings.section',
    id: 'skills',
    order: 25,
    label: () => t('nav'),
    locale: NS,
    inject: injected,
  }, SkillSettingsSection)
}
