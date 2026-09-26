#!/usr/bin/env node
/**
 * One-shot typert last mile for the panel packages.
 *
 * Generating `./typert` + `./remote` for packages that live OUTSIDE the harness is
 * fiddly enough to script: the generator only sees a package when it is reachable
 * from the harness root program, which means five things must line up at once, and
 * each one fails silently or with a confusing error:
 *
 *   1. the packages must sit inside `<harness>/packages/<group>/<pkg>` (the workspace
 *      glob covers two levels), because `isTypeMetaSymbol` requires
 *      `@deepseek-ai/dsh-typert-protocol` to be registered in the same analysis root;
 *   2. `<harness>/tsconfig.host.json` must list each package's own `tsconfig.host.json`
 *      under `references` — the generator walks references, not includes;
 *   3. the copied `tsconfig*.json` files must re-point `extends` at the bundled copy of
 *      OUR `tsconfig.base.json` (relative depth differs by one inside the harness tree);
 *   4. `pnpm install` must run so the copies get their workspace links and `lib/` types;
 *   5. afterwards the harness tree MUST be restored — a stray copy or an untracked
 *      build output breaks the repository's "harness stays unmodified" rule.
 *
 * This script performs all five and always runs the cleanup, even on failure.
 *
 * Usage:  node scripts/typert-last-mile.mjs [<path-to-harness>]
 */
import { execFileSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const harness = resolve(process.argv[2] ?? process.env.DSH_REPO ?? join(repoRoot, '..', '..', 'deepseek-harness'))
const group = 'dsh-plugins'
const staging = join(harness, 'packages', group)
/** Packages that own a Remote face and therefore need generation. */
const GENERATED = ['mcp-panel', 'skill-panel']
/** Everything that must be visible to the analysis (workspace-linked deps included). */
const COPIED = [...GENERATED, 'plugin-kit', 'bundled-skills']

if (!existsSync(join(harness, 'pnpm-workspace.yaml'))) {
  console.error(`typert-last-mile: no harness checkout at ${harness}`)
  process.exit(2)
}

const git = (args) => execFileSync('git', ['-C', harness, ...args], { encoding: 'utf8' })
const HOST_CONFIG = join(harness, 'tsconfig.host.json')
const originalHostConfig = readFileSync(HOST_CONFIG, 'utf8')

/** Restore the harness tree to its pristine state; safe to call repeatedly. */
function cleanup() {
  rmSync(staging, { recursive: true, force: true })
  writeFileSync(HOST_CONFIG, originalHostConfig)
  // pnpm rewrites these two during install; revert whatever it touched.
  try { git(['checkout', '--', 'pnpm-workspace.yaml', 'pnpm-lock.yaml']) } catch { /* already clean */ }
  execFileSync('git', ['-C', harness, 'clean', '-fd'], { stdio: 'ignore' })
  const dirty = git(['status', '--porcelain']).trim()
  console.log(dirty === ''
    ? 'typert-last-mile: harness tree restored (0 changes)'
    : `typert-last-mile: WARNING harness still dirty:\n${dirty}`)
}

function sh(command, args, cwd) {
  execFileSync(command, args, { cwd, stdio: 'inherit' })
}

try {
  console.log(`→ staging into ${staging}`)
  rmSync(staging, { recursive: true, force: true })
  mkdirSync(staging, { recursive: true })
  copyFileSync(join(repoRoot, 'tsconfig.base.json'), join(staging, 'tsconfig.base.json'))

  for (const name of COPIED) {
    sh('rsync', ['-a', '--exclude', 'node_modules', '--exclude', '.tmp-build', '--exclude', '*.tsbuildinfo',
      join(repoRoot, 'packages', name) + '/', join(staging, name) + '/'])
    // Relative depth is one level deeper here; re-point extends at our copied base.
    for (const file of ['tsconfig.json', 'tsconfig.host.json', 'tsconfig.client.json']) {
      const path = join(staging, name, file)
      if (!existsSync(path)) continue
      writeFileSync(path, readFileSync(path, 'utf8').replace(
        /"\.\.\/\.\.\/tsconfig\.base\.json"/g, '"../tsconfig.base.json"'))
    }
  }

  console.log('→ registering host-face references in harness tsconfig.host.json')
  const anchor = '  "references": [\n'
  const added = GENERATED.map(name => `    { "path": "./packages/${group}/${name}/tsconfig.host.json" },\n`).join('')
  if (!originalHostConfig.includes(anchor)) {
    throw new Error('harness tsconfig.host.json has no "references" anchor — update this script')
  }
  writeFileSync(HOST_CONFIG, originalHostConfig.replace(anchor, anchor + added))

  console.log('→ pnpm install (workspace links for the staged copies)')
  // Override when the registry is flaky and the store already has everything:
  //   TYPERT_INSTALL_ARGS=--offline node scripts/typert-last-mile.mjs
  const installArgs = (process.env.TYPERT_INSTALL_ARGS ?? '--prefer-offline').trim().split(/\s+/)
  sh('pnpm', ['install', ...installArgs], harness)

  console.log('→ generating ./typert and ./remote')
  execFileSync(process.execPath, [join(repoRoot, 'scripts', 'gen-typert.mjs')], {
    cwd: repoRoot,
    stdio: 'inherit',
    env: {
      ...process.env,
      TYPERT_ROOT: harness,
      TYPERT_GENERATOR: join(harness, 'packages', 'typert', 'generator', 'lib', 'index.js'),
    },
  })
} finally {
  console.log('→ cleaning the harness tree')
  cleanup()
}
