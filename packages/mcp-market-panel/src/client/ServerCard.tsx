import type { Translate } from './injected.ts'
import type { MarketServer } from './registry.ts'
import { Button, Tag } from '@dsh-plugins/plugin-kit'
import css from './panel.module.css'

export interface ServerCardProps {
  server: MarketServer
  /** Live tool count when installed, or undefined when not installed / unknown. */
  toolCount: number | undefined
  /** True when the row exists but is switched off — never report that as failed. */
  installed: boolean
  t: Translate
  onInstall: (server: MarketServer) => void
  onDetails: (server: MarketServer) => void
}

/**
 * One catalog row.
 *
 * Title and description are third-party strings: they are placed as React text
 * nodes, never as HTML, so a catalog entry cannot inject markup into the host page.
 *
 * The dot reports whether the installed server actually came up. 「已安装」 alone was
 * misleading — a row can be written and enabled while its command never starts,
 * which is exactly the state the user needs to see.
 */
export function ServerCard({ server, toolCount, installed, t, onInstall, onDetails }: ServerCardProps) {
  const unsupported = !server.installable
  const state = !installed ? 'absent' : toolCount === undefined ? 'disabled'
    : toolCount > 0 ? 'connected' : 'failed'
  const statusText = state === 'connected' ? t('status.connected').replace('{n}', String(toolCount ?? 0))
    : state === 'failed' ? t('status.failed')
      : state === 'disabled' ? t('status.disabled')
        : ''
  return (
    <div className={css.card}>
      <div className={css.cardTitle}>{server.title}</div>
      <div className={css.cardDesc}>{server.description}</div>
      <div className={css.cardMeta}>
        <span>{server.name}</span>
        {server.version !== '' && (
          <>
            <span>·</span>
            <span>v{server.version}</span>
          </>
        )}
        {server.official && <Tag><span className={css.tagOfficial}>{t('card.official')}</span></Tag>}
        {installed && <span className={css.statusDot} data-state={state} />}
        {installed && <span className={css.statusText} data-state={state}>{statusText}</span>}
        {server.deprecated && <Tag><span className={css.tagDeprecated}>{t('card.deprecated')}</span></Tag>}
        {unsupported && !server.deprecated && <Tag><span className={css.tagUnsupported}>{t('card.unsupported')}</span></Tag>}
      </div>
      <div className={css.cardActions}>
        <Button variant="primary" disabled={unsupported} onClick={() => { onInstall(server) }}>
          {installed ? t('card.reinstall') : t('card.install')}
        </Button>
        <Button onClick={() => { onDetails(server) }}>{t('card.details')}</Button>
      </div>
    </div>
  )
}
