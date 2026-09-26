import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { defineConfig } from 'tsdown'
import { clientBundle, transpileDecorators } from '../plugin-kit/src/client-bundle.ts'

// Build faces for the Skill panel package: Node host half, browser half, and the
// typert-generated ./typert + ./remote (add `typertPlugin()` from
// @deepseek-ai/dsh-typert-generator to `plugins` in a linked build). Until then
// the client bundle cannot resolve `@dsh-plugins/skill-panel/remote`.
const here = dirname(fileURLToPath(import.meta.url))
const EXTERNALS = [
  '@deepseek-ai/cordis',
  '@deepseek-ai/dsh-typert-protocol',
  '@deepseek-ai/dsh-skill',
  '@deepseek-ai/dsh-client-locale',
  '@deepseek-ai/dsh-client-ui-settings',
  '@deepseek-ai/dsh-client-ui-renderer',
  '@deepseek-ai/dsh-client-ui-slots',
  '@deepseek-ai/dsh-api-remotes',
  'react',
  'react/jsx-runtime',
]

export default defineConfig([
  {
    name: '@dsh-plugins/skill-panel',
    entry: { index: 'src/index.ts', 'types/index': 'src/types.ts' },
    outDir: 'lib',
    format: ['esm'],
    platform: 'node',
    target: 'es2024',
    dts: false,
    clean: false,
    plugins: [transpileDecorators()],
    deps: { neverBundle: specifier => specifier.startsWith('@deepseek-ai/') || specifier === 'fflate' },
  },
  clientBundle('@dsh-plugins/skill-panel', {
    externals: EXTERNALS,
    inlineSafe: [/^@deepseek-ai\/dsh-typert-protocol(\/|$)/],
    entry: 'src/client/index.ts',
    alias: { '@dsh-plugins/plugin-kit': resolve(here, '../plugin-kit/src/index.ts') },
  }),
])
