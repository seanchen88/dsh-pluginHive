/**
 * The MCP Registry catalog client — the only file in this package that touches
 * the network.
 *
 * Field names follow the published schema
 * (`https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json`,
 * definitions `ServerDetail` / `Package` / `RemoteTransport` / `KeyValueInput` /
 * `NamedArgument`), which uses camelCase `isRequired` / `isSecret`. Everything is
 * parsed defensively out of `unknown`: a catalog is third-party data whose shape
 * the registry may extend, and an unknown field must never blank the panel.
 */

/** Registry list endpoint. */
const REGISTRY_URL = 'https://registry.modelcontextprotocol.io/v0/servers'

/** Largest page the registry accepts today. */
const MAX_LIMIT = 100

/** How a candidate reaches the user's machine. */
export type CandidateKind = 'stdio' | 'remote'

/** Which generated field one catalog variable fills. */
export type VariableTarget =
  | 'env'
  | 'headers'
  /** A named CLI flag appended to the command (`--name value`). */
  | 'arg'
  /** A `${NAME}` hole inside an explicit command line, substituted in place. */
  | 'template'

/** One value the user may have to supply before a server can run. */
export interface CatalogVariable {
  /** Environment variable name, header name, or CLI argument name. */
  readonly name: string
  /** Human-readable purpose, straight from the catalog. */
  readonly description?: string
  /** Blocking: installation is refused while this is empty and has no default. */
  readonly required: boolean
  /** Render masked and never prefilled from the catalog. */
  readonly secret: boolean
  /** Catalog-supplied default; used when the user leaves the field empty. */
  readonly defaultValue?: string
  /** Allowed values, when the catalog constrains them. */
  readonly choices?: readonly string[]
  /** Input placeholder, usually an example value. */
  readonly placeholder?: string
  /** Where the resolved value is written. */
  readonly target: VariableTarget
}

/** One concrete way to run a catalog server, derived from a `packages[]` or `remotes[]` row. */
export interface InstallCandidate {
  readonly kind: CandidateKind
  /** Short provenance label, e.g. `npm · foo-mcp` or `streamable-http`. */
  readonly label: string
  /** Registry type for stdio candidates (`npm` / `pypi` / `oci` / …). */
  readonly registryType?: string
  /** Package identifier for stdio candidates. */
  readonly identifier?: string
  /** Published version of the package or the server. */
  readonly version?: string
  /** MCP endpoint for remote candidates. */
  readonly url?: string
  /** Declared transport, verbatim (`stdio` / `streamable-http` / `sse`). */
  readonly transportType: string
  /**
   * Command line stated verbatim by the catalog, used instead of deriving one from
   * `registryType` + `identifier`. The local (MCPM) catalog ships full command
   * lines, and re-deriving them would silently rewrite what upstream tested.
   */
  readonly stdio?: { readonly command: string; readonly args: readonly string[] }
  readonly variables: readonly CatalogVariable[]
  /** Whether DSH can run this candidate at all (only stdio and streamable-http). */
  readonly supported: boolean
  /** Why `supported` is false, for the UI to surface instead of a dead button. */
  readonly unsupportedReason?: string
}

/** One catalog row after normalization. */
export interface MarketServer {
  /** Reverse-DNS registry name. NOT usable as a DSH serverName — see `slug.ts`. */
  readonly name: string
  readonly title: string
  readonly description: string
  readonly version: string
  readonly repositoryUrl?: string
  readonly websiteUrl?: string
  /** Registry marked this record superseded rather than active. */
  readonly deprecated: boolean
  /**
   * Curated/first-party. Only the local (MCPM) catalog carries this; registry
   * records are all published to the same registry, so none is "official" over
   * another.
   */
  readonly official: boolean
  /** At least one candidate DSH could run. */
  readonly installable: boolean
  readonly candidates: readonly InstallCandidate[]
}

/** One page of results; the registry gives a cursor, never a total. */
export interface MarketPage {
  readonly servers: readonly MarketServer[]
  readonly nextCursor?: string
}

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {}
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() !== '' ? value : undefined
}

function asList(value: unknown): readonly unknown[] {
  return Array.isArray(value) ? value : []
}

function asFlag(value: unknown): boolean {
  return value === true
}

/**
 * Read one catalog `Input` into a variable the form can render.
 * @param raw - the `Input` / `KeyValueInput` / `NamedArgument` node.
 * @param target - where the resolved value lands in the generated config.
 * @param fallbackName - name source when the node carries none.
 * @returns a form variable, or undefined when no usable name exists.
 */
function toVariable(raw: unknown, target: VariableTarget, fallbackName: string): CatalogVariable | undefined {
  const node = asRecord(raw)
  const name = asString(node.name) ?? fallbackName
  if (name === '') return undefined
  const description = asString(node.description)
  const defaultValue = asString(node.default)
  const placeholder = asString(node.placeholder) ?? asString(node.valueHint)
  const choices = asList(node.choices).map(choice => asString(choice)).filter((one): one is string => one !== undefined)
  const variable: { -readonly [K in keyof CatalogVariable]: CatalogVariable[K] } = {
    name,
    required: asFlag(node.isRequired),
    secret: asFlag(node.isSecret),
    target,
  }
  if (description !== undefined) variable.description = description
  if (defaultValue !== undefined) variable.defaultValue = defaultValue
  if (placeholder !== undefined) variable.placeholder = placeholder
  if (choices.length > 0) variable.choices = choices
  return variable
}

/** DSH's MCP client accepts exactly these two transports. */
const SUPPORTED_TRANSPORTS: ReadonlySet<string> = new Set(['stdio', 'streamable-http'])

/**
 * Map one `packages[]` row onto a stdio candidate.
 * @param raw - the package node.
 * @param serverVersion - fallback when the package pins no version of its own.
 */
function fromPackage(raw: unknown, serverVersion: string): InstallCandidate {
  const node = asRecord(raw)
  const registryType = asString(node.registryType) ?? 'other'
  const identifier = asString(node.identifier) ?? ''
  const version = asString(node.version) ?? serverVersion
  const transportType = asString(asRecord(node.transport).type) ?? 'stdio'
  const variables = [
    ...asList(node.environmentVariables).map(v => toVariable(v, 'env', '')).filter((v): v is CatalogVariable => v !== undefined),
    // Only named arguments are emitted: positional ones need an order the catalog
    // does not reliably give us, and guessing it produces a broken command line.
    ...asList(node.runtimeArguments)
      .filter(argument => asString(asRecord(argument).type) === 'named' || asRecord(argument).name !== undefined)
      .map(v => toVariable(v, 'arg', ''))
      .filter((v): v is CatalogVariable => v !== undefined),
  ]
  const runnable = registryType === 'npm' || registryType === 'pypi' || registryType === 'oci'
  const knownTransport = transportType === 'stdio'
  const candidate: { -readonly [K in keyof InstallCandidate]: InstallCandidate[K] } = {
    kind: 'stdio',
    label: `${registryType} · ${identifier}`,
    registryType,
    identifier,
    version,
    transportType,
    variables,
    supported: runnable && knownTransport && identifier !== '',
  }
  if (!knownTransport) candidate.unsupportedReason = `transport.${transportType}`
  else if (!runnable) candidate.unsupportedReason = `registryType.${registryType}`
  return candidate
}

/**
 * Map one `remotes[]` row onto a hosted candidate.
 * @param raw - the remote node.
 * @param serverVersion - the server's own version, for the provenance label.
 */
function fromRemote(raw: unknown, serverVersion: string): InstallCandidate {
  const node = asRecord(raw)
  const transportType = asString(node.type) ?? 'streamable-http'
  const url = asString(node.url) ?? ''
  const variables = [
    ...asList(node.headers).map(v => toVariable(v, 'headers', '')).filter((v): v is CatalogVariable => v !== undefined),
    ...Object.entries(asRecord(node.variables))
      .map(([name, value]) => {
        const variable = toVariable(value, 'headers', name)
        return variable === undefined ? undefined : { ...variable, name }
      })
      .filter((v): v is CatalogVariable => v !== undefined),
  ]
  const candidate: { -readonly [K in keyof InstallCandidate]: InstallCandidate[K] } = {
    kind: 'remote',
    label: `${transportType} · v${serverVersion}`,
    url,
    transportType,
    variables,
    supported: transportType === 'streamable-http' && url !== '',
  }
  if (transportType !== 'streamable-http') candidate.unsupportedReason = `transport.${transportType}`
  else if (url === '') candidate.unsupportedReason = 'transport.missing-url'
  return candidate
}

/** Normalize one `{ server, _meta }` envelope into a catalog row. */
export function toMarketServer(envelope: unknown): MarketServer | undefined {
  const wrapper = asRecord(envelope)
  const source = asRecord(wrapper.server)
  const name = asString(source.name)
  if (name === undefined) return undefined
  const version = asString(source.version) ?? '0.0.0'
  const description = asString(source.description) ?? ''
  const title = asString(source.title) ?? name
  const candidates = [
    ...asList(source.remotes).map(remote => fromRemote(remote, version)),
    ...asList(source.packages).map(pkg => fromPackage(pkg, version)),
  ]
  const repositoryUrl = asString(asRecord(source.repository).url)
  const websiteUrl = asString(source.websiteUrl)
  const officialMeta = asRecord(asRecord(wrapper._meta)['io.modelcontextprotocol.registry/official'])
  const server: { -readonly [K in keyof MarketServer]: MarketServer[K] } = {
    name,
    title,
    description,
    version,
    deprecated: asString(officialMeta.status) === 'deprecated',
    official: false,
    installable: candidates.some(candidate => candidate.supported),
    candidates,
  }
  if (repositoryUrl !== undefined) server.repositoryUrl = repositoryUrl
  if (websiteUrl !== undefined) server.websiteUrl = websiteUrl
  return server
}

/** Whether `SUPPORTED_TRANSPORTS` covers a declared transport. */
export function isSupportedTransport(transportType: string): boolean {
  return SUPPORTED_TRANSPORTS.has(transportType)
}

/**
 * Fetch one page of the catalog.
 *
 * Query and cursor are added through `URLSearchParams`, so nothing a user types
 * can break out of the query string.
 *
 * @param options.query - free-text search, as the registry defines it.
 * @param options.cursor - `nextCursor` from the previous page.
 * @param options.limit - page size, capped at {@link MAX_LIMIT}.
 * @param options.signal - aborts an in-flight request when the query changes.
 */
export async function searchRegistry(options: {
  query?: string
  cursor?: string
  limit?: number
  signal?: AbortSignal
}): Promise<MarketPage> {
  const params = new URLSearchParams()
  params.set('limit', String(Math.min(options.limit ?? 24, MAX_LIMIT)))
  if (options.query !== undefined && options.query.trim() !== '') params.set('search', options.query.trim())
  if (options.cursor !== undefined && options.cursor !== '') params.set('cursor', options.cursor)
  const response = await fetch(`${REGISTRY_URL}?${params.toString()}`, options.signal === undefined
    ? { headers: { accept: 'application/json' } }
    : { headers: { accept: 'application/json' }, signal: options.signal })
  if (!response.ok) throw new Error(`registry ${response.status} ${response.statusText}`)
  const body = asRecord(await response.json())
  // The registry is newest-first, so the latest row for a name wins; the same
  // server can otherwise appear twice in one page at two versions.
  const byName = new Map<string, MarketServer>()
  for (const envelope of asList(body.servers)) {
    const server = toMarketServer(envelope)
    if (server === undefined) continue
    const seen = byName.get(server.name)
    if (seen !== undefined && !server.deprecated && seen.deprecated) continue
    byName.set(server.name, server)
  }
  const page: { -readonly [K in keyof MarketPage]: MarketPage[K] } = { servers: [...byName.values()] }
  const cursor = asString(asRecord(body.metadata).nextCursor)
  if (cursor !== undefined) page.nextCursor = cursor
  return page
}
