import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { defineConfig } from 'tsdown'
import { clientBundle } from '../plugin-kit/src/client-bundle.ts'

// The example panel is browser-only (no host Remote). It bundles plugin-kit
// from source so `*.module.css` resolves beside the `.tsx` files.
const here = dirname(fileURLToPath(import.meta.url))
const pluginKitSrc = resolve(here, '../plugin-kit/src/index.ts')

const EXTERNALS = [
  '@deepseek-ai/cordis',
  '@deepseek-ai/dsh-client-locale',
  '@deepseek-ai/dsh-client-ui-settings',
  '@deepseek-ai/dsh-client-ui-renderer',
  '@deepseek-ai/dsh-client-ui-slots',
  'react',
  'react/jsx-runtime',
]

export default defineConfig([
  {
    // Node host half -> lib/index.js (imported by the Loader).
    name: '@dsh-plugins/example-panel',
    entry: { index: 'src/index.ts' },
    outDir: 'lib',
    format: ['esm'],
    platform: 'node',
    target: 'es2024',
    dts: false,
    clean: false,
    deps: { neverBundle: specifier => specifier.startsWith('@deepseek-ai/') },
  },
  clientBundle('@dsh-plugins/example-panel', {
    externals: EXTERNALS,
    entry: 'src/client/index.ts',
    alias: { '@dsh-plugins/plugin-kit': pluginKitSrc },
  }),
])
