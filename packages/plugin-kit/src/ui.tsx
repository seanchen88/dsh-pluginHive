/**
 * Copied management-page controls. These are self-contained React components
 * with no runtime dependency on any harness client package — they read only
 * `--dsw-alias-*` theme tokens (see ui.module.css). Behavior users rely on is
 * preserved: `role="switch"` + `aria-checked`, Modal focus + Escape handling,
 * Tooltip on hover/focus.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode, ButtonHTMLAttributes, SelectHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import clsx from 'clsx'
import css from './ui.module.css'

export function Row({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx(css.row, className)}>{children}</div>
}

export function Spacer() {
  return <span className={css.spacer} />
}

export type ButtonVariant = 'default' | 'primary' | 'ghost' | 'danger'

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'ref'> {
  variant?: ButtonVariant
  icon?: ReactNode
}

export function Button({ variant = 'default', icon, children, className, type = 'button', ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        css.button,
        variant === 'primary' && css.buttonPrimary,
        variant === 'ghost' && css.buttonGhost,
        variant === 'danger' && css.buttonDanger,
        className,
      )}
      {...rest}
    >
      {icon}
      {children}
    </button>
  )
}

export function Spinner() {
  return <span className={css.spinner} aria-hidden="true" />
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className={css.tag}>{children}</span>
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <div className={css.empty}>{children}</div>
}

export function Field({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <div className={css.field}>
      <span className={css.label}>{label}</span>
      <div className={css.value}>{children}</div>
    </div>
  )
}

export interface SwitchProps {
  checked: boolean
  onChange: (next: boolean) => void
  disabled?: boolean
  'aria-label'?: string
}

export function Switch({ checked, onChange, disabled, ...aria }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      data-checked={checked ? 'true' : 'false'}
      className={css.switch}
      disabled={disabled}
      onClick={() => { onChange(!checked) }}
      {...aria}
    >
      <span className={css.switchKnob} />
    </button>
  )
}

export interface CollapsibleCardProps {
  title: ReactNode
  leading?: ReactNode
  trailing?: ReactNode
  defaultOpen?: boolean
  onOpen?: () => void
  children: ReactNode
}

export function CollapsibleCard({ title, leading, trailing, defaultOpen = false, onOpen, children }: CollapsibleCardProps) {
  const [open, setOpen] = useState(defaultOpen)
  const toggle = useCallback(() => {
    setOpen((previous) => {
      const next = !previous
      if (next) onOpen?.()
      return next
    })
  }, [onOpen])
  return (
    <div className={css.card}>
      <div className={css.cardHeader} role="button" tabIndex={0} aria-expanded={open} onClick={toggle}
        onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggle() } }}>
        <svg className={clsx(css.chevron, open && css.chevronOpen)} viewBox="0 0 16 16" aria-hidden="true">
          <path d="M6 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {leading}
        <span className={css.cardTitle}>{title}</span>
        <Spacer />
        {trailing}
      </div>
      {open && <div className={css.cardBody}>{children}</div>}
    </div>
  )
}

export interface TabItem { id: string; label: string }

export function Tabs({ items, active, onSelect, ariaLabel }: { items: TabItem[]; active: string; onSelect: (id: string) => void; ariaLabel?: string }) {
  return (
    <div className={css.tabs} role="tablist" aria-label={ariaLabel}>
      {items.map(item => (
        <button
          key={item.id}
          type="button"
          role="tab"
          className={css.tab}
          aria-selected={item.id === active}
          data-active={item.id === active ? 'true' : undefined}
          onClick={() => { onSelect(item.id) }}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

export interface ModalProps {
  title: ReactNode
  open: boolean
  onClose: () => void
  footer?: ReactNode
  children: ReactNode
  /**
   * Accessible name for the header close button. The kit ships no dictionary, so
   * callers pass their own localized word — a screen reader in a Chinese UI must
   * not be left announcing the hardcoded fallback.
   */
  closeLabel?: string
}

/**
 * Overlay dialog. The header (title + close) and the footer stay pinned while only
 * `children` scrolls, so a long document can never push the close control out of reach.
 */
export function Modal({ title, open, onClose, footer, children, closeLabel = 'Close' }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent): void => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    panelRef.current?.focus()
    return () => { document.removeEventListener('keydown', onKey) }
  }, [open, onClose])
  if (!open) return null
  return (
    <div className={css.overlay} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <div className={css.modal} role="dialog" aria-modal="true" tabIndex={-1} ref={panelRef}>
        <div className={css.modalHeader}>
          <span className={css.modalTitle}>{title}</span>
          <button type="button" className={css.modalClose} onClick={onClose} aria-label={closeLabel}>✕</button>
        </div>
        <div className={css.modalBody}>{children}</div>
        {footer !== undefined && <div className={css.modalFooter}>{footer}</div>}
      </div>
    </div>
  )
}

export function Tooltip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <span className={css.tooltip} tabIndex={0}>
      {children}
      <span className={css.tooltipText} role="tooltip">{label}</span>
    </span>
  )
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  const { className, ...rest } = props
  return <input className={clsx(css.input, className)} {...rest} />
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className, ...rest } = props
  return <textarea className={clsx(css.input, css.textarea, className)} {...rest} />
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  const { className, ...rest } = props
  return <select className={clsx(css.select, className)} {...rest} />
}
