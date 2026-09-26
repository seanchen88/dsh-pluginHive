import type { Translate } from './injected.ts'
import css from './panel.module.css'

export type ExampleSectionProps = { t: Translate }

/** The template section: a heading and intro, styled with theme tokens only. */
export function ExampleSection({ t }: ExampleSectionProps) {
  return (
    <div className={css.section}>
      <h1 className={css.heading}>{t('title')}</h1>
      <p className={css.intro}>{t('intro')}</p>
    </div>
  )
}
