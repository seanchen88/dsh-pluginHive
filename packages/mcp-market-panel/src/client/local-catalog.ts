/**
 * The bundled local catalog (MCPM, as vendored by MCP Hub) adapted into the same
 * `MarketServer` shape the official registry produces, so cards, the detail view,
 * the install form and `buildConfig` stay single-purpose.
 *
 * Two translations matter:
 *  - A `${VAR}` hole is the community catalog's way of saying "the user must supply
 *    this". It becomes a form variable, never a literal written into the profile —
 *    DSH does not expand env placeholders.
 *  - A literal env value becomes an optional variable pre-filled with that value,
 *    so the user can override it instead of it being frozen into the config.
 */
import { LOCAL_CATALOG_RAW } from './local-catalog-data.ts'
import { plainText } from './registry.ts'
import type { CatalogVariable, InstallCandidate, MarketServer } from './registry.ts'
import { serverNameFromRegistry } from './slug.ts'

/** One install method as generated: a complete command line plus env holes. */
interface RawMethod {
  readonly type: string
  readonly command: string
  readonly args: readonly string[]
  readonly env: Readonly<Record<string, string | null>>
}

/** Per-variable documentation shipped alongside the entry. */
interface RawVariableDoc {
  readonly description?: string
  readonly required?: boolean
  readonly example?: string
}

interface RawEntry {
  readonly displayName: string
  readonly description: string
  readonly categories: readonly string[]
  readonly tags: readonly string[]
  readonly repository: string
  readonly homepage: string
  readonly official: boolean
  readonly methods: readonly RawMethod[]
  readonly variables: Readonly<Record<string, RawVariableDoc>>
}

interface RawCatalog {
  readonly servers: Readonly<Record<string, RawEntry>>
}

const catalog = LOCAL_CATALOG_RAW as RawCatalog

/** Names that read like secrets; rendered masked and never prefilled. */
const SECRETISH = /KEY|TOKEN|SECRET|PASSWORD|PASSWD|CREDENTIAL|AUTH|APIK/i

/**
 * `${...}` holes as the community catalog actually writes them. Deliberately
 * permissive: the shipped data contains `api-key`, `your-secret-api-key`, and
 * `input:organization_id`, and any hole we fail to recognize would be written
 * into the profile verbatim — DSH has no env expansion to recover from that.
 */
const HOLE = /\$\{([^{}]+)\}/g

function variableNameLooksSecret(name: string): boolean {
  return SECRETISH.test(name)
}

/**
 * Build one form variable, letting the entry's own argument docs win over the
 * name-based heuristics.
 */
function toVariable(
  name: string,
  target: CatalogVariable['target'],
  doc: RawVariableDoc | undefined,
  literal: string | undefined,
): CatalogVariable {
  const variable: { -readonly [K in keyof CatalogVariable]: CatalogVariable[K] } = {
    name,
    target,
    // A hole with nothing to fill it with would ship `${NAME}` into the config.
    required: target === 'template' ? true : doc?.required === true,
    secret: variableNameLooksSecret(name),
  }
  const description = doc?.description
  if (description !== undefined && description !== '') variable.description = plainText(description)
  const placeholder = doc?.example
  if (placeholder !== undefined && placeholder !== '') variable.placeholder = placeholder
  if (literal !== undefined && literal !== '') variable.defaultValue = literal
  return variable
}

/** Derive one install candidate from a generated method. */
function toCandidate(method: RawMethod, docs: RawCatalog['servers'][string]['variables']): InstallCandidate {
  const holes = new Set<string>()
  for (const arg of method.args) {
    for (const match of arg.matchAll(HOLE)) {
      const name = String(match[1] ?? '').trim()
      if (name !== '') holes.add(name)
    }
  }
  const variables: CatalogVariable[] = []
  for (const [name, value] of Object.entries(method.env)) {
    variables.push(toVariable(name, 'env', docs[name], value ?? undefined))
  }
  for (const hole of holes) {
    if (method.env[hole] === undefined) variables.push(toVariable(hole, 'template', docs[hole], undefined))
  }
  // Documented arguments with no slot in this method are still shown: upstream
  // writes them once per server while several methods exist.
  for (const [name, doc] of Object.entries(docs)) {
    if (method.env[name] === undefined && !holes.has(name)) {
      variables.push(toVariable(name, 'env', doc, undefined))
    }
  }
  const candidate: { -readonly [K in keyof InstallCandidate]: InstallCandidate[K] } = {
    kind: 'stdio',
    label: `${method.type} · ${method.command}${method.args.length > 0 ? ` ${method.args[0] ?? ''}` : ''}`.trim(),
    transportType: 'stdio',
    stdio: { command: method.command, args: method.args },
    variables,
    supported: method.command !== '',
  }
  if (method.command === '') candidate.unsupportedReason = 'method.missing-command'
  return candidate
}

/** The whole local catalog, normalized once at module load. */
export const LOCAL_SERVERS: readonly MarketServer[] = Object.entries(catalog.servers).map(([key, entry]) => {
  const candidates = entry.methods.map(method => toCandidate(method, entry.variables))
  const server: { -readonly [K in keyof MarketServer]: MarketServer[K] } = {
    name: key,
    title: entry.displayName || serverNameFromRegistry(key),
    description: plainText(entry.description),
    version: '',
    repositoryUrl: entry.repository,
    websiteUrl: entry.homepage,
    deprecated: false,
    official: entry.official,
    installable: candidates.some(candidate => candidate.supported),
    candidates,
  }
  return server
})

/** Distinct categories with their entry counts, ascending by name. */
export function localCategories(): ReadonlyArray<{ name: string; count: number }> {
  const counts = new Map<string, number>()
  for (const entry of Object.values(catalog.servers)) {
    for (const category of entry.categories) counts.set(category, (counts.get(category) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((left, right) => right.count - left.count || left.name.localeCompare(right.name))
}

/**
 * Filter the local catalog in memory. Search is local because the data is already
 * here — matching mcphub's own local tab, which searches server-side only because
 * it sits behind a server.
 */
export function searchLocal(options: { query?: string; category?: string }): MarketServer[] {
  const needle = (options.query ?? '').trim().toLowerCase()
  const category = options.category ?? ''
  return LOCAL_SERVERS.filter(server => {
    if (category !== '' && !(catalog.servers[server.name]?.categories.includes(category) ?? false)) return false
    if (needle === '') return true
    const entry = catalog.servers[server.name]
    const haystack = [server.name, server.title, server.description, ...(entry?.tags ?? [])]
      .join(' ').toLowerCase()
    return needle.split(/\s+/).every(word => haystack.includes(word))
  })
}
