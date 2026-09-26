import { Markdown, Modal } from '@dsh-plugins/plugin-kit'
import type { SkillDetail } from '../types.ts'
import type { Translate } from './injected.ts'
import css from './panel.module.css'

export interface SkillDetailModalProps {
  open: boolean
  /** Skill being viewed; `undefined` while closing. */
  name: string | undefined
  detail: SkillDetail | undefined
  loading: boolean
  error: string | undefined
  t: Translate
  onClose: () => void
}

/**
 * Split a leading `---` YAML block off the document.
 *
 * Parsed by hand (no YAML dependency in the browser half) and only for display:
 * nested structures are shown as their raw text, which is honest and lossless.
 *
 * @param markdown - the raw `SKILL.md` text.
 * @returns the frontmatter entries and the remaining body.
 */
function splitFrontmatter(markdown: string): { fields: Array<[string, string]>; body: string } {
  const normalized = markdown.replace(/\r\n/g, '\n')
  if (!normalized.startsWith('---\n')) return { fields: [], body: normalized }
  const end = normalized.indexOf('\n---', 4)
  if (end < 0) return { fields: [], body: normalized }
  const fields: Array<[string, string]> = []
  for (const line of normalized.slice(4, end).split('\n')) {
    const match = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line)
    if (match === null) continue
    fields.push([match[1] ?? '', (match[2] ?? '').trim().replace(/^["']|["']$/g, '')])
  }
  return { fields, body: normalized.slice(end + 4) }
}

/**
 * Read-only viewer for one skill's `SKILL.md`, rendered as Markdown.
 *
 * Presentational by design: the parent owns fetching, so reopening for another skill
 * can never show a stale document (see the re-seed invariant in AGENTS.md).
 *
 * The path rides in the header next to the title, and the header carries the close
 * control — a long document must never push either out of the viewport.
 */
export function SkillDetailModal({ open, name, detail, loading, error, t, onClose }: SkillDetailModalProps) {
  const { fields, body } = splitFrontmatter(detail?.markdown ?? '')
  return (
    <Modal
      title={(
        <>
          {name !== undefined ? `${t('detail.title')} · ${name}` : t('detail.title')}
          {detail !== undefined && (
            <div className={css.detailPath} title={detail.path}>{detail.path}</div>
          )}
        </>
      )}
      open={open}
      onClose={onClose}
      closeLabel={t('modal.close')}
    >
      {loading && <div className={css.detailLoading}>{t('detail.loading')}</div>}
      {error !== undefined && <div className={css.detailError}>{error}</div>}
      {!loading && detail !== undefined && (
        <>
          {fields.length > 0 && (
            <dl className={css.frontmatter}>
              {fields.map(([key, value]) => (
                <div key={key} className={css.frontmatterRow}>
                  <dt className={css.frontmatterKey}>{key}</dt>
                  <dd className={css.frontmatterValue}>{value}</dd>
                </div>
              ))}
            </dl>
          )}
          {detail.truncated && <div className={css.detailError}>{t('detail.truncated')}</div>}
          <Markdown source={body} />
        </>
      )}
    </Modal>
  )
}
