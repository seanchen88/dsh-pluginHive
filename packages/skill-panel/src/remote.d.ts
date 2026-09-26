/**
 * Ambient declaration for the typert-generated `./remote` artifact of the Skill
 * panel. `pnpm build` regenerates the authoritative `.d.ts` from controller.ts.
 */
declare module '@dsh-plugins/skill-panel/remote' {
  import type { TypertRemoteContribution } from '@deepseek-ai/dsh-typert-protocol'
  const contribution: TypertRemoteContribution
  export default contribution
}

declare module '@dsh-plugins/skill-panel/typert' {
  const host: unknown
  export default host
}
