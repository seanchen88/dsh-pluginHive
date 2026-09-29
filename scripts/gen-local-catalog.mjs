#!/usr/bin/env node
/**
 * Generate the market panel's bundled local catalog from an MCP Hub checkout.
 *
 * Why a generated, committed artifact: the plugin must work with no network and no
 * sibling checkout, so the catalog ships inside the package (the same arrangement as
 * the vendored typert artifacts — a build input, not a build output). Re-running this
 * is only necessary when the upstream catalog changes.
 *
 *   MCPHUB=/path/to/mcphub_custom pnpm gen:catalog
 *
 * The source is 2.4 MB of which >1 MB is per-server `tools` JSON schemas — data the
 * market UI never renders. Everything kept here is a field the card, the detail view,
 * or the install form actually consumes.
 *
 * Licensing: `servers.json` is the community MCPM catalog as vendored by MCP Hub,
 * which is Apache-2.0. Attribution is written into the artifact and NOTICE.md; drop
 * neither when regenerating.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outPath = join(repoRoot, 'packages/mcp-market-panel/src/client/local-catalog-data.ts')

function findSource() {
  const candidates = process.env.MCPHUB_CATALOG !== undefined
    ? [process.env.MCPHUB_CATALOG]
    : [
      join(repoRoot, '..', 'mcphub_custom/mcphub_custom/servers.json'),
      join(repoRoot, '..', '..', 'mcphub_custom/mcphub_custom/servers.json'),
    ]
  for (const candidate of candidates) {
    const abs = resolve(repoRoot, candidate)
    if (existsSync(abs)) return abs
  }
  throw new Error(
    'MCP Hub catalog not found. Point MCPHUB_CATALOG at servers.json, e.g.\n'
    + '  MCPHUB_CATALOG=/path/to/mcphub_custom/servers.json pnpm gen:catalog\n',
  )
}

const sourcePath = findSource()
const raw = JSON.parse(readFileSync(sourcePath, 'utf8'))

/** Longest kept prose, so one bloated description cannot double the bundle. */
const MAX_DESCRIPTION = 240
const MAX_VARIABLE_DOC = 140
const MAX_TAG = 6

const str = value => (typeof value === 'string' && value.trim() !== '' ? value.trim() : '')
const clip = (value, max) => {
  const text = str(value)
  return text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`
}

/**
 * A `${...}` placeholder is the community catalog's way of saying "the user must
 * supply this". Anything else is a literal default the user may override.
 * The body is matched permissively (`[^{}]+`) because the shipped data contains
 * `api-key` and `input:organization_id` alongside plain identifiers.
 */
function isPlaceholder(value) {
  return typeof value === 'string' && /^\$\{[^{}]+\}$/.test(value.trim())
}

/**
 * Community catalogs ship documentation examples that happen to match real key
 * formats — Stripe's published test key, AWS's example access key id, GitHub's
 * `ghp_…`. None of them are credentials, but they trip secret scanners (and did
 * block a push to GitHub), so the recognizable prefix is kept and the body is
 * dropped. The prefix alone still tells the user what shape the field expects.
 */
const EXAMPLE_KEY_PATTERNS = [
  /^(sk_(?:test|live)_)[A-Za-z0-9]{16,}$/,
  /^(pk_(?:test|live)_)[A-Za-z0-9]{16,}$/,
  /^(AKIA)[0-9A-Z]{12,}$/,
  /^(AIzaSy?)[0-9A-Za-z_-]{18,}$/,
  /^(gh[pousr]_)[A-Za-z0-9]{20,}$/,
  /^(xox[baprs]-)[A-Za-z0-9-]{10,}$/,
  /^(eyJ)[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{5,}\.[A-Za-z0-9_-]{5,}$/,
]

/**
 * Neutralize a documentation example that looks like live key material.
 * @param value - the upstream `example` string.
 * @returns the value unchanged, or `<prefix>…example…`.
 */
function maskExample(value) {
  for (const pattern of EXAMPLE_KEY_PATTERNS) {
    const match = pattern.exec(value)
    if (match !== null) return `${match[1]}…example…`
  }
  return value
}

function buildEntry(key, entry) {
  const installations = entry.installations && typeof entry.installations === 'object'
    ? entry.installations
    : {}
  const docs = entry.arguments && typeof entry.arguments === 'object' ? entry.arguments : {}
  const methods = []
  for (const [type, config] of Object.entries(installations)) {
    if (!config || typeof config !== 'object') continue
    const command = str(config.command)
    if (command === '') continue
    const env = {}
    for (const [name, value] of Object.entries(config.env ?? {})) {
      env[name] = isPlaceholder(value) ? null : str(value)
    }
    methods.push({
      type,
      command,
      args: (Array.isArray(config.args) ? config.args : []).map(arg => String(arg)),
      env,
    })
  }
  const variables = {}
  for (const [name, doc] of Object.entries(docs)) {
    if (!doc || typeof doc !== 'object') continue
    variables[name] = {
      description: clip(doc.description, MAX_VARIABLE_DOC),
      required: doc.required === true,
      example: clip(maskExample(str(doc.example)), 80),
    }
  }
  return {
    displayName: str(entry.display_name) || key,
    description: clip(entry.description, MAX_DESCRIPTION),
    categories: (Array.isArray(entry.categories) ? entry.categories : []).map(str).filter(Boolean),
    tags: (Array.isArray(entry.tags) ? entry.tags : []).slice(0, MAX_TAG).map(str).filter(Boolean),
    repository: str(entry.repository?.url) || str(entry.repository),
    homepage: str(entry.homepage),
    official: entry.is_official === true,
    methods,
    variables,
  }
}

const servers = {}
for (const [key, entry] of Object.entries(raw)) {
  if (!entry || typeof entry !== 'object') continue
  const built = buildEntry(key, entry)
  if (built.methods.length === 0) continue
  servers[key] = built
}

const document = {
  provenance: {
    source: 'MCP Hub community catalog (servers.json), itself the MCPM catalog',
    upstreamLicense: 'Apache-2.0 (MCP Hub); community data terms follow mcpm.sh',
    generatedBy: 'scripts/gen-local-catalog.mjs',
    // Deliberately just the file name: an absolute path here would commit whoever
    // regenerated the catalog's home directory into a published package.
    generatedFrom: basename(sourcePath),
    entryCount: Object.keys(servers).length,
  },
  servers,
}

// Emitted as a `.ts` module annotated `unknown`: a 313 KB object literal would
// otherwise be widened into a giant inferred type on every `pnpm typecheck`, and
// the market adapter narrows it once anyway.
const body = JSON.stringify(document, null, 1)
const file = `/*
 * GENERATED — do not edit by hand. Regenerate with:
 *
 *   MCPHUB_CATALOG=/path/to/mcphub_custom/servers.json pnpm gen:catalog
 *
 * Bundled local MCP catalog (the community "MCPM" list as vendored by MCP Hub).
 * It exists so the market panel has a catalog with no network at all, and it is
 * the stdio half of what mcphub's market shows: each entry carries a complete
 * command line plus \`\${VAR}\` holes for the credentials the user must supply.
 *
 * Upstream: ${document.provenance.source}
 * License:  ${document.provenance.upstreamLicense} — attribution kept deliberately
 *           visible here because this repository is MIT and this data is not.
 */

/** Raw catalog document; shape asserted once in \`local-catalog.ts\`, not inferred here. */
export const LOCAL_CATALOG_RAW: unknown = ${body}
`
writeFileSync(outPath, file)
console.log(`wrote ${Object.keys(servers).length} local catalog entries -> ${outPath}`)
console.log(`size: ${(Buffer.byteLength(file) / 1024).toFixed(0)} KB (raw), source had ${Object.keys(raw).length} entries`)
