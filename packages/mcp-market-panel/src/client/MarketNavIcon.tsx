import css from './panel.module.css'

export interface MarketNavIconProps {
  /** Square edge the shell asks for (16 wide / 18 rail). */
  size: number
  /** Whether this panel owns the main column. */
  active: boolean
}

/**
 * Sidebar glyph. The shell owns the button, the label, and the selected state,
 * so this renders only the mark at the geometry the shell asks for.
 */
export function MarketNavIcon({ size, active }: MarketNavIconProps) {
  return (
    <svg className={css.navIcon} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"
      fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.5 12 4l9 4.5-9 4.5-9-4.5Z" />
      <path d="M7 11v5.5l5 2.5 5-2.5V11" />
    </svg>
  )
}
