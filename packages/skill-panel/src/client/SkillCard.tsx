import { Button, Spacer, Tag } from '@dsh-plugins/plugin-kit'
import type { SkillView } from '../types.ts'
import type { Translate } from './injected.ts'
import css from './panel.module.css'

export interface SkillCardProps {
  skill: SkillView
  t: Translate
  onView: () => void
  /** Omitted for skills the panel may not delete (bundled/protected, non-filesystem). */
  onDelete?: (() => void) | undefined
}

export function SkillCard({ skill, t, onView, onDelete }: SkillCardProps) {
  return (
    <div className={css.card}>
      <div className={css.cardTop}>
        <span className={css.name}>{skill.name}</span>
        <Spacer />
        {skill.fromPlugin && <Tag>{t('fromPlugin')}</Tag>}
        <Button variant="ghost" onClick={onView}>{t('view')}</Button>
        {onDelete !== undefined
          ? <Button variant="ghost" onClick={onDelete}>{t('delete')}</Button>
          : skill.protected && <span className={css.protectedHint}>{t('delete.protected')}</span>}
      </div>
      <div className={css.desc}>{skill.description}</div>
    </div>
  )
}
