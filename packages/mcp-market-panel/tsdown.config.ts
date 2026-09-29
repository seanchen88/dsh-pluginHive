import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { defineConfig } from 'tsdown'
import { clientBundle } from '../plugin-kit/src/client-bundle.ts'

// Build faces for the market panel:
//   1. the Node host half -> lib/index.js (a no-op plugin; it exists so the
//      Loader row resolves),
//   2. the browser half   -> lib/client.js (catalog UI + install hand-off).
// There is no third face: the package declares no `@Remote`, so typert has
// nothing to generate: installs reuse the MCP panel's remote and the catalog is
// fetched by the browser half.
const here = dirname(fileURLToPath(import.meta.url))
const pluginKitSrc = resolve(here, '../plugin-kit/src/index.ts')

const EXTERNALS = [
  '@deepseek-ai/cordis',
  '@deepseek-ai/dsh-client-locale',
  '@deepseek-ai/dsh-client-ui-settings',
  '@deepseek-ai/dsh-client-ui-sidebar',
  '@deepseek-ai/dsh-client-ui-layout',
  '@deepseek-ai/dsh-client-ui-renderer',
  '@deepseek-ai/dsh-client-ui-slots',
  '@deepseek-ai/dsh-api-remotes',
  'react',
  'react/jsx-runtime',
]

export default defineConfig([
  {
    name: '@dsh-plugins/mcp-market-panel',
    entry: { index: 'src/index.ts' },
    outDir: 'lib',
    format: ['esm'],
    platform: 'node',
    target: 'es2024',
    dts: false,
    clean: false,
    deps: { neverBundle: specifier => specifier.startsWith('@deepseek-ai/') },
  },
  clientBundle('@dsh-plugins/mcp-market-panel', {
    externals: EXTERNALS,
    entry: 'src/client/index.ts',
    // The kit is bundled from source so `*.module.css` resolves beside the `.tsx`
    // files. Nothing is imported from a sibling panel: its `./types` subpath lives
    // under gitignored `lib/`, so a fresh clone could not resolve it.
    alias: { '@dsh-plugins/plugin-kit': pluginKitSrc },
  }),
])
