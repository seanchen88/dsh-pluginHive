/**
 * Ambient declaration for the typert-generated `./remote` artifact.
 *
 * `pnpm build` runs the typert generator over `src/controller.ts` and emits
 * `lib/typert.remote-client.js` (the client `TypertRemoteContribution`) plus
 * `lib/typert.host.js` (the host registration). This stub lets the browser half
 * type-check before the generator has run; the generated `.d.ts` is authoritative.
 */
declare module '@dsh-plugins/mcp-panel/remote' {
  import type { TypertRemoteContribution } from '@deepseek-ai/dsh-typert-protocol'
  const contribution: TypertRemoteContribution
  export default contribution
}

declare module '@dsh-plugins/mcp-panel/typert' {
  const host: unknown
  export default host
}
