/**
 * A reproduction of the harness `clientBundle` tsdown preset for packages that
 * live OUTSIDE the harness repository. The shipped preset (in
 * `packages/client/tsdown.client.ts`) imports harness-internal modules and is
 * not published, so an external plugin reproduces its observable contract here.
 *
 * The contract that matters at runtime:
 *  - output is CommonJS, browser platform, pinned to `lib/client.js`;
 *  - every module wraps in `window.__ModuleLoader__.load({ id, factory })`
 *    (banner + intro + footer below), resolving externals through the injected
 *    `require` (the loader module table — no globals, no import map);
 *  - `@deepseek-ai/*` value imports must be either a requested module-table
 *    external or an inline-safe wire layer; any other one is flagged
 *    (cross-plugin value imports are forbidden — collaborate via services);
 *  - `*.module.css` is compiled with lightningcss into a hashed class map that
 *    also injects its own <style> at factory execution (CSS-modules-inline).
 *
 * This is Node-only (build time); it is excluded from the browser tsconfig.
 */
import { readFile } from 'node:fs/promises'
import { basename, dirname, isAbsolute, resolve as resolvePath } from 'node:path'
import { createRequire } from 'node:module'
import type { UserConfig } from 'tsdown'
import ts from 'typescript'
import { transform } from 'lightningcss'

const DECORATOR_SYNTAX = /^\s*@[A-Za-z_$][\w$]*/m

/**
 * A tsdown/rolldown plugin that lowers standard TypeScript decorators
 * (`@Remote`) to plain JavaScript via `ts.transpileModule`. Without it a
 * decorator-bearing host entry emits raw `@Remote(...)` into `lib/index.js`,
 * which is invalid JavaScript at import time. Mirrors the harness
 * `typertPlugin`'s transform step.
 * @returns a rolldown-compatible plugin.
 */
export function transpileDecorators(): {
  name: string
  transform: (code: string, id: string) => { code: string; map: string | undefined } | undefined
} {
  return {
    name: 'dsh-transpile-decorators',
    transform(code: string, id: string) {
      const file = id.split('?', 1)[0] ?? id
      if (!/\.[cm]?tsx?$/.test(file) || !DECORATOR_SYNTAX.test(code)) return undefined
      const result = ts.transpileModule(code, {
        fileName: file,
        compilerOptions: {
          target: ts.ScriptTarget.ES2024,
          module: ts.ModuleKind.ESNext,
          ...(file.endsWith('x') ? { jsx: ts.JsxEmit.ReactJSX } : {}),
          sourceMap: true,
        },
      })
      return {
        code: result.outputText.replace(/\n?\/\/# sourceMappingURL=.*$/u, '\n'),
        map: result.sourceMapText,
      }
    },
  }
}

/** Options for one client bundle build. */
export interface ClientBundleOptions {
  /** Bare specifiers served by the loader module table (kept external). */
  readonly externals: readonly string[]
  /** Inline-safe `@deepseek-ai/*` subpaths allowed to bundle (wire/type layers). */
  readonly inlineSafe?: readonly (string | RegExp)[]
  /** Client entry source. Defaults to `src/client/index.ts`. */
  readonly entry?: string
  /**
   * Module aliases applied before resolution. Point a workspace package (e.g.
   * `@dsh-plugins/plugin-kit`) at its `src/index.ts` so the bundler reads
   * sources — where `*.module.css` sits beside the `.tsx` — instead of `lib/`
   * (where tsc does not copy stylesheets).
   */
  readonly alias?: Record<string, string>
}

const CSS_VIRTUAL_PREFIX = '\0dsh-css:'
const CSS_VIRTUAL_SUFFIX = '.mjs'

function matches(specifiers: readonly (string | RegExp)[], source: string): boolean {
  return specifiers.some(spec => typeof spec === 'string'
    ? source === spec || source.startsWith(`${spec}/`)
    : spec.test(source))
}

/** Resolve a relative stylesheet import against its importer (or a package specifier). */
function sourceAssetPath(source: string, importer: string | undefined): string {
  if (importer === undefined) return source
  if (!source.startsWith('.') && !isAbsolute(source)) return createRequire(importer).resolve(source)
  return resolvePath(dirname(importer), source)
}

/** Emit a module that injects the compiled stylesheet once and default-exports the class map. */
function styleInjectionModule(id: string, fileId: string, css: string, classMap?: Record<string, string>): string {
  const tagId = `${id}/${basename(fileId)}`
  const lines = [
    `const css = ${JSON.stringify(css)};`,
    `const tagId = ${JSON.stringify(tagId)};`,
    'if (typeof document !== \'undefined\' && document.querySelector(\'style[data-plugin-css=\' + JSON.stringify(tagId) + \']\') === null) {',
    '  const tag = document.createElement(\'style\');',
    `  tag.dataset.plugin = ${JSON.stringify(id)};`,
    '  tag.dataset.pluginCss = tagId;',
    '  tag.textContent = css;',
    '  document.head.appendChild(tag);',
    '}',
    classMap === undefined ? 'export default {};' : `export default ${JSON.stringify(classMap)};`,
  ]
  return lines.join('\n')
}

/**
 * Build the tsdown config for one plugin package's browser half.
 * @param id - the plugin id (npm package name), stamped into the loader handoff.
 * @param options - externals, inline-safe list, and optional entry override.
 * @returns a tsdown `UserConfig` producing `lib/client.js`.
 */
export function clientBundle(id: string, options: ClientBundleOptions): UserConfig {
  const externals = new Set(options.externals)
  const inlineSafe = options.inlineSafe ?? []
  const isRequested = (source: string): boolean => externals.has(source)
  return {
    name: `${id}/client`,
    entry: { client: options.entry ?? 'src/client/index.ts' },
    outDir: 'lib',
    format: 'cjs',
    platform: 'browser',
    target: 'es2024',
    dts: false,
    clean: false,
    sourcemap: true,
    fixedExtension: false,
    deps: {
      neverBundle: isRequested,
      alwaysBundle: (source: string) => !isRequested(source),
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env['NODE_ENV'] ?? 'production'),
    },
    ...(options.alias === undefined ? {} : { alias: options.alias }),
    plugins: [
      {
        name: 'dsh-client-bundle-purity',
        resolveId(source: string) {
          if (!source.startsWith('@deepseek-ai/')) return null
          if (isRequested(source)) return null
          if (matches(inlineSafe, source)) return null
          this.warn(
            `client bundle purity: "${source}" is not a requested module-table external or an inline-safe `
            + `layer for ${id}. Cross-plugin value imports are forbidden; collaborate through cordis services.`,
          )
          return null
        },
      },
      {
        name: 'dsh-css-modules-inline',
        resolveId(source: string, importer: string | undefined) {
          if (!source.endsWith('.module.css')) return null
          const abs = sourceAssetPath(source, importer)
          return CSS_VIRTUAL_PREFIX + abs + CSS_VIRTUAL_SUFFIX
        },
        async load(virtualId: string) {
          if (!virtualId.startsWith(CSS_VIRTUAL_PREFIX)) return null
          const fileId = virtualId.slice(CSS_VIRTUAL_PREFIX.length, -CSS_VIRTUAL_SUFFIX.length)
          const source = await readFile(fileId)
          const { code, exports: cssExports } = transform({
            filename: fileId,
            code: source,
            cssModules: { pattern: '[hash]_[local]' },
            minify: true,
          })
          const classMap: Record<string, string> = {}
          for (const [local, exp] of Object.entries(cssExports ?? {})) classMap[local] = exp.name
          return styleInjectionModule(id, fileId, code.toString(), classMap)
        },
      },
    ],
    outputOptions: {
      entryFileNames: 'client.js',
      chunkFileNames: 'client.[name].js',
      banner: () => `window.__ModuleLoader__.load({ id: ${JSON.stringify(id)}, factory: (require) => {`,
      footer: 'return module.exports; } });',
      intro: 'var module = { exports: {} }; var exports = module.exports;',
    },
  }
}
