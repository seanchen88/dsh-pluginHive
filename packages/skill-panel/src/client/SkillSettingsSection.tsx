import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button, EmptyState, Spacer, Tabs } from '@dsh-plugins/plugin-kit'
import { MAX_ZIP_BYTES, type SkillDetail, type SkillScope, type SkillView } from '../types.ts'
import type { SkillInjected, Translate } from './injected.ts'
import { SkillCard } from './SkillCard.tsx'
import { SkillDetailModal } from './SkillDetailModal.tsx'
import css from './panel.module.css'

/**
 * `close` is not ours: the settings shell passes it down as the `settings.section`
 * owner prop (`renderSlot('settings.section', { close: onClose }, ...)`), which is the
 * only sanctioned way for a section to dismiss the overlay. Optional because we must
 * keep working on a host that stops offering it.
 */
export type SkillSettingsSectionProps = { t: Translate; close?: () => void } & SkillInjected

function UploadIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M7 9V2m0 0L4.2 4.8M7 2l2.8 2.8M2 10v1.5A.5.5 0 002.5 12h9a.5.5 0 00.5-.5V10" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
function PlusIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
}

/** Encode bytes to base64 without a large spread (avoids call-stack limits). */
function toBase64(bytes: Uint8Array): string {
  let binary = ''
  const chunk = 0x8000
  for (let offset = 0; offset < bytes.length; offset += chunk) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunk))
  }
  return btoa(binary)
}

export function SkillSettingsSection(props: SkillSettingsSectionProps) {
  const { t, list, importZip, readSkill, deleteSkill, createSkill, scopes, close } = props
  const tabs = useMemo(() => scopes().map(tab => ({ id: tab.id, label: tab.label })), [scopes])
  const [activeId, setActiveId] = useState<string>(() => scopes()[0]?.id ?? 'user')
  const [skills, setSkills] = useState<SkillView[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | undefined>(undefined)
  const [notice, setNotice] = useState<string | undefined>(undefined)
  const [busy, setBusy] = useState(false)
  // The viewer is fetch-on-open: the document lives here, not in the modal, so
  // switching from skill A to skill B can never render A's stale content.
  const [viewing, setViewing] = useState<{ open: boolean; name?: string; detail?: SkillDetail; loading: boolean; error?: string }>(
    { open: false, loading: false },
  )
  const fileRef = useRef<HTMLInputElement>(null)

  const currentScope = useCallback((): SkillScope => scopes().find(tab => tab.id === activeId)?.scope ?? { kind: 'user' }, [scopes, activeId])

  const reload = useCallback(async () => {
    setLoading(true)
    try {
      setSkills(await list(currentScope()))
      setError(undefined)
    } catch (loadError: unknown) {
      setError(loadError instanceof Error ? loadError.message : t('load.error'))
    } finally {
      setLoading(false)
    }
  }, [list, currentScope, t])

  useEffect(() => { void reload() }, [reload])

  const onPickFile = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (file === undefined) return
    if (file.size > MAX_ZIP_BYTES) { setNotice(t('import.tooLarge')); return }
    setBusy(true)
    setNotice(t('import.reading'))
    void file.arrayBuffer().then(async (buffer) => {
      const base64 = toBase64(new Uint8Array(buffer))
      let result = await importZip(currentScope(), base64, false)
      if (result.status === 'exists') {
        const overwrite = window.confirm(t('import.exists.confirm'))
        if (overwrite) result = await importZip(currentScope(), base64, true)
      }
      if (result.status === 'imported') { setNotice(t('import.imported')); await reload() }
      else if (result.status === 'exists') setNotice(t('import.exists'))
      else if (result.status === 'invalid') setNotice(`${t('import.invalid')}${result.message ? `: ${result.message}` : ''}`)
      else setNotice(t('import.error'))
    }).catch((importError: unknown) => {
      setNotice(`${t('import.error')}: ${importError instanceof Error ? importError.message : String(importError)}`)
    }).finally(() => { setBusy(false) })
  }, [importZip, currentScope, reload, t])

  const onNew = useCallback(async () => {
    // Primary path opens a fresh chat with `/create-skill ` + the guidance prompt already
    // typed; the injected face degrades to the clipboard when those services are absent.
    const outcome = await createSkill()
    if (outcome === 'opened') {
      // Dismiss the settings overlay ourselves. Leaving it up would stack a modal on top
      // of the session we just navigated to, hiding the draft the user came for; the
      // clipboard outcomes deliberately stay open so the notice remains readable.
      close?.()
      setNotice(t('new.opened'))
    } else if (outcome === 'clipboard') setNotice(`${t('new.copied')} ${t('new.hint')}`)
    else setNotice(t('new.failed'))
  }, [createSkill, close, t])

  const onView = useCallback(async (skill: SkillView) => {
    setViewing({ open: true, name: skill.name, loading: true })
    try {
      setViewing({ open: true, name: skill.name, loading: false, detail: await readSkill(currentScope(), skill.name) })
    } catch (readError: unknown) {
      setViewing({
        open: true,
        name: skill.name,
        loading: false,
        error: readError instanceof Error ? readError.message : t('detail.error'),
      })
    }
  }, [readSkill, currentScope, t])

  const onDelete = useCallback(async (skill: SkillView) => {
    if (!window.confirm(t('delete.confirm').replace('{name}', skill.name))) return
    setBusy(true)
    try {
      const result = await deleteSkill(currentScope(), skill.name)
      if (result.status === 'deleted') {
        setSkills(result.skills)
        setNotice(t('delete.done'))
      } else if (result.status === 'protected') {
        setNotice(t('delete.protected'))
      } else {
        setNotice(result.message ?? t('delete.failed'))
        await reload()
      }
    } catch (deleteError: unknown) {
      // A lost or failed reply still has to leave the list truthful.
      setError(deleteError instanceof Error ? deleteError.message : t('delete.failed'))
      await reload()
    } finally {
      setBusy(false)
    }
  }, [deleteSkill, currentScope, reload, t])

  return (
    <div className={css.section}>
      <div>
        <h1 className={css.heading}>{t('title')}</h1>
        <p className={css.intro}>{t('intro')}</p>
      </div>

      {tabs.length > 1 && <Tabs items={tabs} active={activeId} onSelect={setActiveId} ariaLabel={t('scope.user')} />}

      <div className={css.groupHeader}>
        <span className={css.groupTitle}>{t('group.skills')}</span>
        <Spacer />
        <Button icon={<UploadIcon />} onClick={() => { fileRef.current?.click() }} disabled={busy}>{t('import')}</Button>
        <Button icon={<PlusIcon />} onClick={() => { void onNew() }}>{t('new')}</Button>
        <input ref={fileRef} type="file" accept=".zip,application/zip" className={css.hiddenInput} onChange={onPickFile} />
      </div>

      {error !== undefined && <div className={css.error}>{error}</div>}
      {notice !== undefined && <div className={css.banner}>{notice}</div>}

      {!loading && skills.length === 0 && <EmptyState>{t('empty')}</EmptyState>}
      <div className={css.list}>
        {skills.map(skill => (
          <SkillCard
            key={`${skill.source}:${skill.name}`}
            skill={skill}
            t={t}
            onView={() => { void onView(skill) }}
            onDelete={skill.deletable && !busy ? () => { void onDelete(skill) } : undefined}
          />
        ))}
      </div>

      <SkillDetailModal
        open={viewing.open}
        name={viewing.name}
        detail={viewing.detail}
        loading={viewing.loading}
        error={viewing.error}
        t={t}
        onClose={() => { setViewing({ open: false, loading: false }) }}
      />
    </div>
  )
}
