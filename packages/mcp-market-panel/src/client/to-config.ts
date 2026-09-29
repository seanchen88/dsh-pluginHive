/**
 * Catalog candidate → the exact `McpServerConfig` the host will write.
 *
 * Pure and React-free so the mapping is assertable without a browser
 * (`test-market-mapping.mjs`). Every branch here is a claim about a command line
 * that will really be spawned, which is why the install dialog renders this
 * output verbatim before the user confirms.
 */
import type { McpServerConfig } from './mcp-config.ts'
import type { CatalogVariable, InstallCandidate } from './registry.ts'

/** User input for one install. Keys are `${target}:${name}`. */
export interface InstallForm {
  readonly serverName: string
  readonly values: Readonly<Record<string, string>>
}

/** Why a candidate cannot be installed as-is. */
export type BuildOutcome =
  | { readonly status: 'ready'; readonly config: McpServerConfig }
  /** Required variables that are still empty and carry no catalog default. */
  | { readonly status: 'missing'; readonly variables: readonly CatalogVariable[] }
  /** DSH cannot run this transport / registry type at all. */
  | { readonly status: 'unsupported'; readonly reason: string }

/** Address one variable's field in the form state. */
export function variableKey(variable: CatalogVariable): string {
  return `${variable.target}:${variable.name}`
}

/**
 * Resolve the value a variable contributes, or undefined when it contributes none.
 * A typed value wins over the catalog default; blank strings count as "not given"
 * so an emptied optional field does not write `KEY=`.
 */
function resolveValue(variable: CatalogVariable, form: InstallForm): string | undefined {
  const typed = form.values[variableKey(variable)]
  if (typed !== undefined && typed !== '') return typed
  return variable.defaultValue
}

/** `npx -y pkg@ver` / `uvx pkg==ver` / `docker run -i --rm image:ver`. */
function stdioCommand(candidate: InstallCandidate, envNames: readonly string[]): { command: string; args: string[] } {
  const identifier = candidate.identifier ?? ''
  const version = candidate.version ?? ''
  const pinned = version !== '' && version !== '0.0.0'
  switch (candidate.registryType) {
    case 'pypi':
      return { command: 'uvx', args: [pinned ? `${identifier}==${version}` : identifier] }
    case 'oci': {
      const args = ['run', '-i', '--rm']
      // `-e NAME` forwards the name from the process environment, which is where
      // the stdio client injects `env`, so the secret never lands in argv.
      for (const name of envNames) { args.push('-e', name) }
      args.push(pinned ? `${identifier}:${version}` : identifier)
      return { command: 'docker', args }
    }
    default:
      return { command: 'npx', args: ['-y', pinned ? `${identifier}@${version}` : identifier] }
  }
}

/**
 * Fill every `${NAME}` hole in one catalog-supplied argument.
 *
 * Substitution reads from **all** resolved variables by name, not just the ones
 * declared as holes: the community catalog frequently writes the same value twice
 * (`env.HUBSPOT_ACCESS_TOKEN="${HUBSPOT_ACCESS_TOKEN}"` plus a docker `-e` argument
 * carrying the same placeholder), and asking the user for it twice would be absurd.
 *
 * @param args - the argument template list.
 * @param byName - resolved value per variable name.
 * @returns the concrete arguments.
 */
function fillTemplates(args: readonly string[], byName: ReadonlyMap<string, string>): string[] {
  return args.map(arg => arg.replace(/\$\{([^{}]+)\}/g, (whole, name: string) => {
    const value = byName.get(name.trim())
    return value === undefined ? whole : value
  }))
}

/**
 * Turn one candidate plus the user's answers into a host config.
 *
 * @param candidate - the chosen install method.
 * @param form - serverName and per-variable values.
 * @returns the config, or the reason installation must not proceed.
 */
export function buildConfig(candidate: InstallCandidate, form: InstallForm): BuildOutcome {
  if (!candidate.supported) return { status: 'unsupported', reason: candidate.unsupportedReason ?? 'unsupported' }

  const env: Record<string, string> = {}
  const headers: Record<string, string> = {}
  const argFlags: string[] = []
  const byName = new Map<string, string>()
  const missing: CatalogVariable[] = []

  for (const variable of candidate.variables) {
    const value = resolveValue(variable, form)
    if (value === undefined) {
      // A `${HOLE}` with nothing to put in it would ship a literal placeholder into
      // the command line, so template holes are blocking even when the catalog did
      // not mark them required.
      if (variable.required || variable.target === 'template') missing.push(variable)
      continue
    }
    byName.set(variable.name, value)
    if (variable.target === 'env') env[variable.name] = value
    else if (variable.target === 'headers') headers[variable.name] = value
    else if (variable.target === 'arg') argFlags.push(`--${variable.name}`, value)
  }
  if (missing.length > 0) return { status: 'missing', variables: missing }

  const config: { -readonly [K in keyof McpServerConfig]: McpServerConfig[K] } = {
    transport: candidate.kind === 'remote' ? 'streamable-http' : 'stdio',
    serverName: form.serverName,
  }
  if (candidate.kind === 'remote') {
    config.url = candidate.url ?? ''
    if (Object.keys(headers).length > 0) config.headers = headers
  } else if (candidate.stdio !== undefined) {
    config.command = candidate.stdio.command
    config.args = [...fillTemplates(candidate.stdio.args, byName), ...argFlags]
    if (Object.keys(env).length > 0) config.env = env
  } else {
    const { command, args } = stdioCommand(candidate, Object.keys(env))
    config.command = command
    config.args = [...args, ...argFlags]
    if (Object.keys(env).length > 0) config.env = env
  }
  return { status: 'ready', config: config as McpServerConfig }
}

/**
 * Render a config as the JSON a user would paste into any MCP client.
 * Mirrors the `mcpServers` snippet mcphub's discovery endpoint hands out.
 * @param config - the resolved config.
 * @returns pretty-printed single-server snippet.
 */
export function toSnippet(config: McpServerConfig): string {
  const body: Record<string, unknown> = { transport: config.transport, serverName: config.serverName }
  for (const [key, value] of Object.entries(config)) {
    if (key === 'transport' || key === 'serverName') continue
    if (value === undefined) continue
    body[key] = value
  }
  return JSON.stringify({ mcpServers: { [config.serverName]: body } }, null, 2)
}
