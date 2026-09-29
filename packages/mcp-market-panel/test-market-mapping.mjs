/**
 * Mapping assertions for the market panel's pure modules.
 *
 * Runs against the tsc output of `pnpm test:market` (`.tmp-build/`), the same
 * arrangement `test-zip-import.mjs` uses: compile the sources, then exercise the
 * real emitted functions. No test framework, no browser, no host — every case
 * below is a claim about a command line or a config that would really be written.
 */
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'

const { buildConfig, toSnippet } = await import('./.tmp-build/client/to-config.js')
const { serverNameFromRegistry, resolveUniqueName, isValidServerName } = await import('./.tmp-build/client/slug.js')
const { toMarketServer, isSupportedTransport } = await import('./.tmp-build/client/registry.js')

let passed = 0
let failed = 0
function check(label, run) {
  try { run(); console.log('  ok  ', label); passed += 1 }
  catch (error) { console.log('  FAIL', label, '\n       ', error.message); failed += 1 }
}

/** Minimal envelope builder so a case states only the fields it is about. */
const envelope = server => ({ server: { name: 'com.test/x', description: 'd', version: '1.2.3', ...server } })

const npmCandidate = pkg => toMarketServer(envelope({ packages: [{ registryType: 'npm', identifier: 'firecrawl-mcp', version: '1.2.3', transport: { type: 'stdio' }, ...pkg }] })).candidates[0]

// ---------------------------------------------------------------- slug

check('reverse-DNS name keeps the recognizable last segment', () => {
  assert.equal(serverNameFromRegistry('com.mcparmory/firecrawl'), 'firecrawl')
})
check('registry name sanitizes punctuation to hyphens', () => {
  assert.equal(serverNameFromRegistry('io.github.some-user/mcp.server'), 'mcp-server')
})
check('long registry name truncates inside the 32-char budget', () => {
  const name = serverNameFromRegistry('com.example/mcp-github-organization-signal-scanner')
  assert.ok(isValidServerName(name), `${name} must satisfy the host pattern`)
  assert.ok(name.length <= 32)
})
check('a generic `/mcp` tail keeps the vendor instead of naming everything mcp', () => {
  const name = serverNameFromRegistry('ac.inference.sh/mcp')
  assert.notEqual(name, 'mcp')
  assert.ok(name.includes('mcp'), name)
  assert.ok(isValidServerName(name), name)
  assert.ok(name.length <= 32, `${name} must fit`)
})
check('a name that sanitizes to nothing falls back instead of going empty', () => {
  assert.equal(serverNameFromRegistry('--'), 'mcp-server')
  assert.equal(serverNameFromRegistry('com...///'), 'com')
  assert.ok(isValidServerName(serverNameFromRegistry('!!!')), '###')
})
check('collision gets a numeric suffix and stays valid', () => {
  const taken = new Set(['firecrawl', 'firecrawl-2'])
  assert.equal(resolveUniqueName('firecrawl', taken), 'firecrawl-3')
})
check('suffix does not push the name past 32 characters', () => {
  const base = serverNameFromRegistry('com.example/mcp-github-organization-signal-scanner')
  const out = resolveUniqueName(base, new Set([base]))
  assert.ok(out.length <= 32, `${out} (${out.length}) must fit`)
  assert.ok(isValidServerName(out), out)
})
check('host pattern rejects what the market must not send', () => {
  assert.equal(isValidServerName('com.foo/bar'), false)
  assert.equal(isValidServerName('a'.repeat(33)), false)
})

// ---------------------------------------------------------------- transport gate

check('DSH runs exactly stdio and streamable-http', () => {
  assert.equal(isSupportedTransport('stdio'), true)
  assert.equal(isSupportedTransport('streamable-http'), true)
  assert.equal(isSupportedTransport('sse'), false)
})
check('an sse-only server is marked unsupported, not silently re-typed', () => {
  const server = toMarketServer(envelope({ remotes: [{ type: 'sse', url: 'https://example.com/sse' }] }))
  assert.equal(server.installable, false)
  assert.equal(server.candidates[0].supported, false)
  assert.equal(server.candidates[0].unsupportedReason, 'transport.sse')
})
check('an unknown registry type is unsupported', () => {
  const candidate = npmCandidate({ registryType: 'nuget', identifier: 'Foo.Bar' })
  assert.equal(candidate.supported, false)
  assert.equal(candidate.unsupportedReason, 'registryType.nuget')
})

// ---------------------------------------------------------------- registry parsing

check('camelCase isRequired/isSecret are read from the live schema', () => {
  const candidate = npmCandidate({
    environmentVariables: [{ name: 'APIFY_TOKEN', description: 'token', isRequired: true, isSecret: true }],
  })
  assert.deepEqual(candidate.variables, [{
    name: 'APIFY_TOKEN', description: 'token', required: true, secret: true, target: 'env',
  }])
})
check('a nameless envelope is skipped instead of throwing', () => {
  assert.equal(toMarketServer({ server: { description: 'no name' } }), undefined)
  assert.equal(toMarketServer({ nope: true }), undefined)
})
check('a malformed packages entry degrades to an unsupported candidate', () => {
  const server = toMarketServer(envelope({ packages: 'not-an-array' }))
  assert.deepEqual(server.candidates, [])
  assert.equal(server.installable, false)
})
check('deprecated status is surfaced from the registry _meta', () => {
  const server = {
    server: { name: 'com.test/x', description: 'd', version: '1.0.0' },
    _meta: { 'io.modelcontextprotocol.registry/official': { status: 'deprecated' } },
  }
  assert.equal(toMarketServer(server).deprecated, true)
})

// ---------------------------------------------------------------- to-config

check('npm maps to npx -y with a pinned version', () => {
  const out = buildConfig(npmCandidate(), { serverName: 'firecrawl', values: {} })
  assert.equal(out.status, 'ready')
  assert.deepEqual(out.config, { transport: 'stdio', serverName: 'firecrawl', command: 'npx', args: ['-y', 'firecrawl-mcp@1.2.3'] })
})
check('pypi maps to uvx with a pinned version', () => {
  const candidate = toMarketServer(envelope({ packages: [{ registryType: 'pypi', identifier: 'mcp-foo', version: '0.4.1', transport: { type: 'stdio' } }] })).candidates[0]
  const out = buildConfig(candidate, { serverName: 'foo', values: {} })
  assert.deepEqual(out.config.args, ['mcp-foo==0.4.1'])
  assert.equal(out.config.command, 'uvx')
})
check('oci maps to docker run and forwards env by name, never by value', () => {
  const candidate = toMarketServer(envelope({
    packages: [{
      registryType: 'oci', identifier: 'ghcr.io/foo/mcp', version: '2.0.0', transport: { type: 'stdio' },
      environmentVariables: [{ name: 'TOKEN', isRequired: true }],
    }],
  })).candidates[0]
  const out = buildConfig(candidate, { serverName: 'foo', values: { 'env:TOKEN': 'secret-value' } })
  assert.deepEqual(out.config.args, ['run', '-i', '--rm', '-e', 'TOKEN', 'ghcr.io/foo/mcp:2.0.0'])
  assert.deepEqual(out.config.env, { TOKEN: 'secret-value' })
})
check('a required secret with no default blocks the install', () => {
  const candidate = toMarketServer(envelope({
    packages: [{
      registryType: 'npm', identifier: 'x', version: '1.0.0', transport: { type: 'stdio' },
      environmentVariables: [{ name: 'KEY', isRequired: true, isSecret: true }],
    }],
  })).candidates[0]
  const out = buildConfig(candidate, { serverName: 'x', values: {} })
  assert.equal(out.status, 'missing')
  assert.deepEqual(out.variables.map(one => one.name), ['KEY'])
})
check('a catalog default satisfies a required variable', () => {
  const candidate = toMarketServer(envelope({
    packages: [{
      registryType: 'npm', identifier: 'x', version: '1.0.0', transport: { type: 'stdio' },
      environmentVariables: [{ name: 'MODE', isRequired: true, default: 'fast' }],
    }],
  })).candidates[0]
  const out = buildConfig(candidate, { serverName: 'x', values: {} })
  assert.equal(out.status, 'ready')
  assert.deepEqual(out.config.env, { MODE: 'fast' })
})
check('an emptied optional field writes no key at all', () => {
  const candidate = toMarketServer(envelope({
    packages: [{
      registryType: 'npm', identifier: 'x', version: '1.0.0', transport: { type: 'stdio' },
      environmentVariables: [{ name: 'EXTRA' }],
    }],
  })).candidates[0]
  const out = buildConfig(candidate, { serverName: 'x', values: { 'env:EXTRA': '' } })
  assert.equal(out.config.env, undefined)
})
check('named runtime arguments become --name value flags', () => {
  const candidate = toMarketServer(envelope({
    packages: [{
      registryType: 'npm', identifier: 'x', version: '1.0.0', transport: { type: 'stdio' },
      runtimeArguments: [{ type: 'named', name: 'timeout', default: '30' }],
    }],
  })).candidates[0]
  const out = buildConfig(candidate, { serverName: 'x', values: {} })
  assert.deepEqual(out.config.args, ['-y', 'x@1.0.0', '--timeout', '30'])
})
check('a hosted server writes url plus only the headers it was given', () => {
  const candidate = toMarketServer(envelope({
    remotes: [{ type: 'streamable-http', url: 'https://mcp.example/http', headers: [{ name: 'X-API-Key', isRequired: true }] }],
  })).candidates[0]
  const out = buildConfig(candidate, { serverName: ' hosted '.trim(), values: { 'headers:X-API-Key': 'k1' } })
  assert.equal(out.status, 'ready')
  assert.deepEqual(out.config, { transport: 'streamable-http', serverName: 'hosted', url: 'https://mcp.example/http', headers: { 'X-API-Key': 'k1' } })
})
check('an unsupported candidate never yields a config', () => {
  const candidate = toMarketServer(envelope({ remotes: [{ type: 'sse', url: 'https://x/sse' }] })).candidates[0]
  assert.equal(buildConfig(candidate, { serverName: 'x', values: {} }).status, 'unsupported')
})

// ---------------------------------------------------------------- snippet

check('the snippet hides nothing but adds nothing either', () => {
  const out = buildConfig(npmCandidate(), { serverName: 'firecrawl', values: {} })
  const parsed = JSON.parse(toSnippet(out.config))
  assert.deepEqual(Object.keys(parsed.mcpServers), ['firecrawl'])
  assert.equal(parsed.mcpServers.firecrawl.command, 'npx')
})

// ---------------------------------------------------------------- local catalog (MCPM)

const { LOCAL_SERVERS, searchLocal, localCategories } = await import('./.tmp-build/client/local-catalog.js')

check('local catalog is loaded and every entry has a runnable method', () => {
  assert.ok(LOCAL_SERVERS.length > 200, `expected the full catalog, got ${LOCAL_SERVERS.length}`)
  assert.ok(LOCAL_SERVERS.every(server => server.candidates.length > 0))
  assert.ok(LOCAL_SERVERS.every(server => server.installable))
})
check('firecrawl: the ${VAR} hole becomes a required secret field', () => {
  const server = LOCAL_SERVERS.find(one => one.name === 'firecrawl')
  const variable = server.candidates[0].variables.find(one => one.name === 'FIRECRAWL_API_KEY')
  assert.ok(variable, 'FIRECRAWL_API_KEY should be a form variable')
  assert.equal(variable.required, true)
  assert.equal(variable.secret, true)
  const blocked = buildConfig(server.candidates[0], { serverName: 'firecrawl', values: {} })
  assert.equal(blocked.status, 'missing')
})
check('firecrawl: filling the hole writes the literal value, not the placeholder', () => {
  const server = LOCAL_SERVERS.find(one => one.name === 'firecrawl')
  const out = buildConfig(server.candidates[0], {
    serverName: 'firecrawl', values: { 'env:FIRECRAWL_API_KEY': 'fc-real-key' },
  })
  assert.equal(out.status, 'ready')
  assert.deepEqual(out.config.command === 'npx' && out.config.args[0], '-y')
  assert.deepEqual(out.config.env, { FIRECRAWL_API_KEY: 'fc-real-key' })
  assert.ok(!JSON.stringify(out.config).includes('${'), 'no placeholder may survive')
})
check('every local entry, fully filled, produces a config with zero ${ holes', () => {
  // Property check over the whole bundled catalog: a single leaked `${VAR}` would
  // ship a broken server, and DSH has no env expansion to recover from it.
  const leaks = []
  for (const server of LOCAL_SERVERS) {
    const candidate = server.candidates.find(one => one.supported)
    const values = {}
    for (const variable of candidate.variables) values[`${variable.target}:${variable.name}`] = 'filled'
    const out = buildConfig(candidate, { serverName: 'probe', values })
    if (out.status !== 'ready') { leaks.push(`${server.name}: ${out.status}`); continue }
    if (JSON.stringify(out.config).includes('${')) leaks.push(`${server.name}: placeholder survived`)
  }
  assert.deepEqual(leaks, [], `leaking entries: ${leaks.slice(0, 5).join(', ')}`)
})
check('an unfilled template hole in args blocks the install', () => {
  const server = LOCAL_SERVERS.find(one =>
    one.candidates.some(candidate => candidate.variables.some(variable => variable.target === 'template')))
  if (server === undefined) return // catalog currently has no arg holes; the property check above still guards it
  const candidate = server.candidates.find(one => one.variables.some(variable => variable.target === 'template'))
  assert.equal(buildConfig(candidate, { serverName: 'probe', values: {} }).status, 'missing')
})
check('searchLocal filters by words across name, description and tags', () => {
  const hits = searchLocal({ query: 'firecrawl' })
  assert.ok(hits.length > 0)
  assert.ok(hits.every(one => one.name.includes('firecrawl')
    || one.description.toLowerCase().includes('firecrawl')
    || (one.title || '').toLowerCase().includes('firecrawl')))
})
check('searchLocal narrows by category', () => {
  const categories = localCategories()
  assert.ok(categories.length > 0)
  const chosen = categories[0]
  const hits = searchLocal({ category: chosen.name })
  assert.ok(hits.length > 0 && hits.length <= LOCAL_SERVERS.length)
  assert.equal(chosen.count, hits.length, 'the count shown in the filter must match the filter result')
})
check('local names still satisfy the host serverName pattern', () => {
  for (const server of LOCAL_SERVERS.slice(0, 60)) {
    assert.ok(isValidServerName(serverNameFromRegistry(server.name)), server.name)
  }
})

// ------------------------------------------------- mirror drift guard
// The market keeps its own copy of the MCP config shapes, because a sibling panel's
// types resolve through gitignored lib/ and would break a fresh clone. These checks
// assert the copy has not drifted from the panel that actually writes the config.

const readSource = relative => readFileSync(new URL(relative, import.meta.url), 'utf8')

/** Pull the declared member names out of one `export interface <Name> { ... }`. */
function interfaceMembers(source, name) {
  const head = `export interface ${name} {`
  const start = source.indexOf(head)
  if (start < 0) return null
  const body = source.slice(start + head.length, source.indexOf('\n}', start))
  return [...body.matchAll(/^ {2}(\w+)\??:/gm)].map(m => m[1]).sort()
}

const marketSource = readSource('./src/client/mcp-config.ts')
const panelSource = readSource('../mcp-panel/src/types.ts')

check("the market's McpServerConfig has not drifted from the MCP panel's", () => {
  const mine = interfaceMembers(marketSource, 'McpServerConfig')
  const theirs = interfaceMembers(panelSource, 'McpServerConfig')
  assert.ok(mine !== null && theirs !== null, 'both files must declare McpServerConfig')
  assert.deepEqual(mine, theirs)
})
check('McpServerView / McpToolView / McpWriteResult have not drifted', () => {
  for (const name of ['McpServerView', 'McpToolView', 'McpWriteResult']) {
    assert.deepEqual(
      interfaceMembers(marketSource, name),
      interfaceMembers(panelSource, name),
      `${name} drifted`,
    )
  }
})
check('the server-name pattern literal matches the MCP panel', () => {
  const grab = src => (src.match(/export const SERVER_NAME_PATTERN = (\/[^\n]+\/)/) ?? [null, null])[1]
  assert.ok(grab(marketSource), 'market must declare the pattern')
  assert.equal(grab(marketSource), grab(panelSource))
})
check('no market source imports a sibling panel package', () => {
  const dir = new URL('./src/client/', import.meta.url)
  const offenders = readdirSync(dir)
    .filter(name => name.endsWith('.ts') || name.endsWith('.tsx'))
    .filter(name => /from '@dsh-plugins\/(?!plugin-kit)/.test(readFileSync(new URL(name, dir), 'utf8')))
  assert.deepEqual(offenders, [])
})

console.log(`\nmarket mapping: ${passed} passed, ${failed} failed`)
process.exitCode = failed === 0 ? 0 : 1
