/**
 * A tiny, dependency-free Markdown renderer for skill documents.
 *
 * Why hand-rolled: the client half may not pull in a harness UI package, and adding a
 * markdown library would mean shipping another parser into every panel bundle. More
 * importantly this builds **React elements, never `innerHTML`**, so whatever a third-party
 * `SKILL.md` contains (raw HTML, `<script>`, event attributes) cannot execute — the text
 * simply renders as text. Link hrefs are filtered to `http(s)` for the same reason.
 *
 * Supported: ATX headings, paragraphs, fenced code, inline code, bold/italic, links,
 * ordered/unordered lists (one nesting level), pipe tables, blockquotes and rules.
 */
import type { ReactNode } from 'react'
import css from './ui.module.css'

export interface MarkdownProps {
  /** Markdown source, already decoded to text. */
  source: string
}

const INLINE_TOKEN = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(\[[^\]]+\]\([^)\s]+\))/g

/**
 * Only web links navigate; anything else (javascript:, data:) is inert.
 * Exported because panels render third-party URLs outside of markdown too
 * (catalog metadata, skill frontmatter) and the rule must not be re-implemented.
 * @param url - the candidate href.
 * @returns the url when it is http(s), otherwise an empty string.
 */
export function safeHref(url: string): string {
  return /^https?:\/\//i.test(url) ? url : ''
}

/**
 * Render inline markup into React nodes.
 * @param text - a single logical line.
 * @param key - stable prefix for the generated elements' keys.
 * @returns nodes to place inside a block element.
 */
function renderInline(text: string, key: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let cursor = 0
  let index = 0
  INLINE_TOKEN.lastIndex = 0
  let match: RegExpExecArray | null
  while ((match = INLINE_TOKEN.exec(text)) !== null) {
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index))
    const token = match[0] ?? ''
    const id = `${key}-${index++}`
    if (token.startsWith('`')) nodes.push(<code key={id} className={css.mdCode}>{token.slice(1, -1)}</code>)
    else if (token.startsWith('**')) nodes.push(<strong key={id}>{token.slice(2, -2)}</strong>)
    else if (token.startsWith('*')) nodes.push(<em key={id}>{token.slice(1, -1)}</em>)
    else {
      const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(token)
      const href = safeHref(link?.[2] ?? '')
      nodes.push(href === ''
        ? <span key={id}>{link?.[1] ?? token}</span>
        : <a key={id} href={href} target="_blank" rel="noreferrer noopener">{link?.[1] ?? token}</a>)
    }
    cursor = match.index + token.length
  }
  if (cursor < text.length) nodes.push(text.slice(cursor))
  return nodes
}

const LIST_ITEM = /^(\s*)([-*+]|\d+\.)\s+(.*)$/
const HEADING = /^(#{1,4})\s+(.*)$/
const TABLE_CELL_COUNT = (line: string): number => line.split('|').length - 2

/**
 * Turn markdown into React nodes, block by block.
 * @param props - the source document.
 * @returns the rendered document fragment.
 */
export function Markdown({ source }: MarkdownProps): ReactNode {
  const lines = source.replace(/\r\n/g, '\n').split('\n')
  const blocks: ReactNode[] = []
  let position = 0
  let key = 0

  const push = (node: ReactNode): void => { blocks.push(node) }

  while (position < lines.length) {
    const line = lines[position] ?? ''

    if (line.trim() === '') { position += 1; continue }

    // Fenced code: emitted verbatim, never inline-parsed.
    const fence = /^```([\w-]*)\s*$/.exec(line)
    if (fence !== null) {
      const body: string[] = []
      position += 1
      while (position < lines.length && !/^```\s*$/.test(lines[position] ?? '')) {
        body.push(lines[position] ?? '')
        position += 1
      }
      position += 1 // closing fence
      push(<pre key={`b${key++}`} className={css.mdPre}><code>{body.join('\n')}</code></pre>)
      continue
    }

    const heading = HEADING.exec(line)
    if (heading !== null) {
      const level = (heading[1] ?? '#').length
      const text = heading[2] ?? ''
      const id = `b${key++}`
      const children = renderInline(text, id)
      push(level === 1 ? <h1 key={id} className={css.mdH1}>{children}</h1>
        : level === 2 ? <h2 key={id} className={css.mdH2}>{children}</h2>
          : level === 3 ? <h3 key={id} className={css.mdH3}>{children}</h3>
            : <h4 key={id} className={css.mdH4}>{children}</h4>)
      position += 1
      continue
    }

    if (/^\s{0,3}([-*_])\s*\1\s*\1[\s-]*$/.test(line)) {
      push(<hr key={`b${key++}`} className={css.mdHr} />)
      position += 1
      continue
    }

    if (/^>\s?/.test(line)) {
      const body: string[] = []
      while (position < lines.length && /^>\s?/.test(lines[position] ?? '')) {
        body.push((lines[position] ?? '').replace(/^>\s?/, ''))
        position += 1
      }
      push(<blockquote key={`b${key++}`} className={css.mdQuote}>{renderInline(body.join(' '), `b${key}`)}</blockquote>)
      continue
    }

    // Pipe table: header row, `---` separator, then body rows.
    if (line.includes('|') && TABLE_CELL_COUNT(line) > 0
      && /^\s*\|?[\s:|-]+\|?\s*$/.test(lines[position + 1] ?? '')
      && (lines[position + 1] ?? '').includes('-')) {
      const header = (lines[position] ?? '').split('|').slice(1, -1).map(cell => cell.trim())
      position += 2
      const rows: string[][] = []
      while (position < lines.length && (lines[position] ?? '').includes('|')) {
        rows.push((lines[position] ?? '').split('|').slice(1, -1).map(cell => cell.trim()))
        position += 1
      }
      const id = `b${key++}`
      push(
        <table key={id} className={css.mdTable}>
          <thead>
            <tr>{header.map((cell, cellIndex) => <th key={cellIndex}>{renderInline(cell, `${id}h${cellIndex}`)}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{renderInline(cell, `${id}r${rowIndex}c${cellIndex}`)}</td>)}</tr>
            ))}
          </tbody>
        </table>,
      )
      continue
    }

    // Lists, with one level of nesting by indent.
    if (LIST_ITEM.test(line)) {
      const items: Array<{ indent: number; text: string; ordered: boolean }> = []
      while (position < lines.length) {
        const current = lines[position] ?? ''
        const item = LIST_ITEM.exec(current)
        if (item === null) break
        items.push({
          indent: (item[1] ?? '').length,
          text: item[3] ?? '',
          ordered: /^\d+\.$/.test(item[2] ?? ''),
        })
        position += 1
      }
      const base = items[0]?.indent ?? 0
      const top = items.filter(item => item.indent <= base)
      const renderList = (entries: typeof items, id: string): ReactNode => (
        entries[0]?.ordered === true
          ? <ol key={id} className={css.mdList}>{entries.map((entry, entryIndex) => (
            <li key={entryIndex}>{renderInline(entry.text, `${id}${entryIndex}`)}</li>
          ))}</ol>
          : <ul key={id} className={css.mdList}>{entries.map((entry, entryIndex) => (
            <li key={entryIndex}>{renderInline(entry.text, `${id}${entryIndex}`)}</li>
          ))}</ul>
      )
      // Nested items fold into the preceding top-level item, one level deep.
      const groups: Array<{ item: typeof items[0]; children: typeof items }> = []
      for (const item of items) {
        if (item.indent <= base) groups.push({ item, children: [] })
        else groups[groups.length - 1]?.children.push(item)
      }
      push(
        <div key={`b${key++}`} className={css.mdListGroup}>
          {renderList(groups.map(group => group.item), 'top')}
          {groups.filter(group => group.children.length > 0).map((group, groupIndex) =>
            renderList(group.children, `sub${groupIndex}`))}
        </div>,
      )
      continue
    }

    // Paragraph: consecutive plain lines.
    const paragraph: string[] = []
    while (position < lines.length) {
      const current = (lines[position] ?? '').trim()
      if (current === '' || HEADING.test(current) || LIST_ITEM.test(current)
        || /^```/.test(current) || /^>\s?/.test(current) || current.includes('|')) break
      paragraph.push(current)
      position += 1
    }
    if (paragraph.length === 0) { paragraph.push((lines[position] ?? '').trim()); position += 1 }
    const id = `b${key++}`
    // Fold the soft line breaks into one logical line *before* inline parsing (same as the
    // blockquote path). Hand-wrapped CJK markdown routinely puts a `**bold**` run across a
    // line break; parsing each source line separately leaves the `**` markers on screen.
    push(<p key={id} className={css.mdP}>{renderInline(paragraph.join(' '), id)}</p>)
  }

  return <>{blocks}</>
}
