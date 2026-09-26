/**
 * Standalone typert codegen for the panel packages.
 *
 * The harness's typert generator emits each remote-owner package's `./typert`
 * (host registration) and `./remote` (client contribution) from its
 * `@Remote`-decorated controller. It normally runs inside the harness build;
 * this script runs it explicitly and lands the artifacts in each package's
 * `lib/`, exactly as the build would.
 *
 * HARD CONSTRAINT: the generator's `isTypeMetaSymbol` requires
 * `@deepseek-ai/dsh-typert-protocol` to be registered in the SAME analysis
 * root, so generating for these external packages only yields models when the
 * root is the HARNESS checkout and the packages sit inside its `packages/`
 * tree. Point TYPERT_ROOT at that tree; artifacts are written there and then
 * synced back into this repo so `pnpm build` / `--patch` see them locally.
 * Running with this repo as the root discovers the packages but emits nothing.
 *
 * Usage — prefer the wrapper, which stages the packages into the harness and
 * restores it afterwards (see the "环境陷阱" section of AGENTS.md):
 *   TYPERT_ROOT=/abs/harness \
 *   TYPERT_GENERATOR=/abs/harness/packages/typert/generator/lib/index.js \
 *     node scripts/gen-typert.mjs
 */
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
/** Analysis root: this repo only works when the packages are its own members. */
const workspaceRoot = resolve(process.env.TYPERT_ROOT ?? repoRoot)
/**
 * The typert generator is not published to npm - it lives in the harness source tree.
 * Point at a checkout with DSH_REPO (default: a sibling ../deepseek-harness), or give
 * TYPERT_GENERATOR the exact entry file. build / typecheck / verify do not need it.
 */
const harnessRoot = resolve(process.env.DSH_REPO ?? join(repoRoot, '..', 'deepseek-harness'))
const generatorEntry = process.env.TYPERT_GENERATOR
  ?? join(harnessRoot, 'packages', 'typert', 'generator', 'lib', 'index.js')

if (!existsSync(generatorEntry)) {
  throw new Error(
    'Cannot find the typert generator at:\n  ' + generatorEntry + '\n\n' +
    'Clone DeepSeek Harness and set DSH_REPO to its path, or point TYPERT_GENERATOR ' +
    'straight at packages/typert/generator/lib/index.js.\n' +
    'Only re-generating the Remote artifacts needs the harness; build/typecheck/verify do not.\n',
  )
}

const { WorkspaceTypertGenerator } = await import(generatorEntry)

const PACKAGES = ['@dsh-plugins/mcp-panel', '@dsh-plugins/skill-panel']
const generator = new WorkspaceTypertGenerator(workspaceRoot, { checkDiagnostics: false })
const artifacts = generator.generate(PACKAGES, ['host'])

/** Unscoped package-name tail -> the package directory under this repo's packages/. */
const localPackageDir = name => join(repoRoot, 'packages', name.split('/').pop() ?? name, 'lib')

let count = 0
for (const artifact of artifacts) {
  const output = join(workspaceRoot, artifact.packageRoot, 'lib')
  mkdirSync(output, { recursive: true })
  const written = []
  const emit = (file, text) => {
    writeFileSync(join(output, file), text)
    written.push(file)
  }
  emit(`typert.${artifact.face}.js`, artifact.js)
  emit(`typert.${artifact.face}.d.ts`, artifact.dts)
  if (artifact.remote !== undefined) {
    emit('typert.remote-client.js', artifact.remote.js)
    emit('typert.remote-client.d.ts', artifact.remote.dts)
    emit('typert.remote-client.d.ts.map', artifact.remote.dtsMap)
  }
  count++

  // Generated against the harness tree: mirror the artifacts back into this repo.
  if (workspaceRoot !== repoRoot) {
    const dest = localPackageDir(artifact.package)
    mkdirSync(dest, { recursive: true })
    for (const file of written) copyFileSync(join(output, file), join(dest, file))
    console.log(`  emitted + synced ${artifact.package} (face=${artifact.face}, remote=${artifact.remote !== undefined})`)
  } else {
    console.log(`  emitted typert artifacts for ${artifact.package} (face=${artifact.face}, remote=${artifact.remote !== undefined})`)
  }
}
console.log(`gen-typert: ${count} artifact set(s) written for ${PACKAGES.length} package(s) (root=${workspaceRoot})`)
if (count === 0) {
  console.error('gen-typert: no artifacts emitted — run with TYPERT_ROOT pointing at the harness checkout whose packages/ tree contains these packages (see AGENTS.md)')
  process.exit(1)
}
