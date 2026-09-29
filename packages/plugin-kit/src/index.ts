/**
 * `@dsh-plugins/plugin-kit` — shared base for DeepSeek Harness management panels.
 *
 * The default entry is browser-safe: it never imports a harness client package
 * as a value, so bundling it into a client half satisfies the bundle purity
 * gate. Build-time helpers (the client-bundle tsdown preset) live under the
 * `./build` subpath and are Node-only.
 */
export * from './types.ts'
export * from './observable.ts'
export * from './remote.ts'
export * from './panel.ts'
export * from './locale.ts'
export * from './write.ts'
export * from './ui.tsx'
export * from './markdown.tsx'
