/**
 * Registry name → DSH `serverName`.
 *
 * DSH enforces `^[A-Za-z0-9_-]{1,32}$` on the MCP namespace (see `SERVER_NAME_PATTERN`
 * in `./mcp-config.ts`, which mirrors the host and the MCP panel), while the
 * registry names servers in reverse-DNS form (`io.github.foo/bar-mcp`). Both halves
 * of that mismatch — the `/` and `.`, and the 32-character budget — have to be
 * resolved before the host is asked to write anything.
 */
import { SERVER_NAME_PATTERN } from './mcp-config.ts'

/** Upper bound the host enforces, read off the shared pattern. */
const MAX_LENGTH = 32

/** Fallback when a catalog name sanitizes to nothing (e.g. all punctuation). */
const FALLBACK_NAME = 'mcp-server'

/**
 * Last segments that say nothing about which server this is. The registry has
 * hundreds of `<vendor>/mcp` rows, and naming a DSH namespace `mcp` would make
 * the MCP panel unreadable — so those fall through to the full name instead.
 */
const GENERIC_TAIL = new Set(['mcp', 'mcp-server', 'mcps', 'server', 'servers'])

/** Sanitize into the host's alphabet, then trim to the budget. */
function sanitize(value: string): string {
  const out = value
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^[-_]+/, '')
    .replace(/[-_]+$/, '')
    .slice(0, MAX_LENGTH)
    .replace(/[-_]+$/, '')
  return out === '' ? FALLBACK_NAME : out
}

/**
 * Derive a default, valid, human-recognizable serverName from a catalog name.
 * @param registryName - the reverse-DNS `server.name` value.
 * @returns a name that always satisfies `SERVER_NAME_PATTERN`.
 */
export function serverNameFromRegistry(registryName: string): string {
  // Keep the last meaningful segment; that is the part users recognize.
  const segments = registryName.split(/[/:@]/).filter(segment => segment !== '')
  const last = segments[segments.length - 1] ?? registryName
  if (GENERIC_TAIL.has(last.toLowerCase())) return sanitize(registryName)
  return sanitize(last)
}

/**
 * Keep the default name honest against what is already configured.
 *
 * The suffix budget is taken from the *base*, so `base-12` still fits in 32
 * characters instead of being truncated into a collision.
 *
 * @param base - the derived default name.
 * @param taken - names already in use in this profile.
 * @returns a name absent from `taken`, or the base when it is already free.
 */
export function resolveUniqueName(base: string, taken: ReadonlySet<string>): string {
  const normalized = base.slice(0, MAX_LENGTH)
  if (!taken.has(normalized)) return normalized
  for (let attempt = 2; attempt < 1000; attempt += 1) {
    const suffix = `-${attempt}`
    const candidate = `${normalized.slice(0, MAX_LENGTH - suffix.length).replace(/[-_]+$/, '')}${suffix}`
    if (!taken.has(candidate)) return candidate
  }
  return normalized
}

/**
 * Validate a name typed by the user before it reaches the host.
 * @param value - candidate serverName.
 * @returns true when the host would accept it.
 */
export function isValidServerName(value: string): boolean {
  return SERVER_NAME_PATTERN.test(value)
}
