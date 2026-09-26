#!/usr/bin/env node
/**
 * Link the `@deepseek-ai/*` peer dependencies into each package from a local
 * DeepSeek Harness checkout.
 *
 * Those packages are the harness's own workspace members. `pnpm build`,
 * `pnpm typecheck` and `pnpm verify` do NOT need them (the client bundle treats
 * them as external and `typecheck/stubs.d.ts` supplies the types), but two things
 * do:
 *
 *   1. Running the built host half from this checkout. The harness never enables
 *      `--preserve-symlinks`, so Node resolves a linked plugin's imports from its
 *      REAL path — walking up from here, not from the harness profile.
 *   2. Re-generating the typert Remote artifacts (`pnpm gen:typert`).
 *
 * The set is derived from each package's own `peerDependencies`, so adding a peer
 * needs no change here. Unknown names are reported rather than guessed at.
 *
 *   DSH_REPO=/path/to/deepseek-harness pnpm setup:harness
 */
import { existsSync, lstatSync, mkdirSync, readFileSync, rmSync, symlinkSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const harness = resolve(process.env.DSH_REPO ?? join(repoRoot, '..', 'deepseek-harness'))

/**
 * Package name tail -> directory inside the harness checkout. Kept explicit on
 * purpose: the mapping is not a rename rule (`cordis-plugin-loader` lives in
 * `vendor/loader`), so a wrong guess would link the wrong source.
 */
const HARNESS_PATHS = {
  cordis: 'vendor/cordis',
  'cordis-plugin-loader': 'vendor/loader',
  'dsh-app-boot': 'packages/boot/app-boot',
  'dsh-atomic-write': 'packages/util/atomic-write',
  'dsh-hmr': 'packages/boot/hmr',
  'dsh-skill': 'packages/skill/skill',
  'dsh-tools': 'packages/core/tools',
  'dsh-typert-protocol': 'packages/typert/protocol',
}

if (!existsSync(join(harness, 'package.json'))) {
  throw new Error(
    `Harness checkout not found at:\n  ${harness}\n\n` +
    'Clone DeepSeek Harness and point DSH_REPO at it, e.g.\n' +
    '  DSH_REPO=../deepseek-harness pnpm setup:harness\n',
  )
}

const packages = ['plugin-kit', 'mcp-panel', 'skill-panel', 'example-panel', 'bundled-skills']
let linked = 0
const missing = new Set()

for (const name of packages) {
  const pkgDir = join(repoRoot, 'packages', name)
  const manifest = JSON.parse(readFileSync(join(pkgDir, 'package.json'), 'utf8'))
  const peers = Object.keys(manifest.peerDependencies ?? {})
    .filter(specifier => specifier.startsWith('@deepseek-ai/'))
    .map(specifier => specifier.slice('@deepseek-ai/'.length))

  for (const peer of peers) {
    const sourceRelative = HARNESS_PATHS[peer]
    if (sourceRelative === undefined) { missing.add(peer); continue }
    const source = join(harness, sourceRelative)
    if (!existsSync(source)) { missing.add(`${peer} (${sourceRelative})`); continue }

    const target = join(pkgDir, 'node_modules', '@deepseek-ai', peer)
    // Replace anything already there (a stale link from a moved checkout included),
    // but never follow a symlink when deleting.
    if (existsSync(target) || lstatSync(target, { throwIfNoEntry: false }) !== null) rmSync(target, { recursive: true, force: true })
    mkdirSync(dirname(target), { recursive: true })
    symlinkSync(relative(dirname(target), source), target, 'dir')
    linked += 1
  }
}

console.log(`linked ${linked} @deepseek-ai peer(s) from ${harness}`)
if (missing.size > 0) {
  console.log(`\nskipped (add them to HARNESS_PATHS once you know where they live):`)
  for (const item of [...missing].sort()) console.log(`  - ${item}`)
}
