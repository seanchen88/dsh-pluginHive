import type { PanelContext, PanelRegistration } from './types.ts'

/**
 * Contribute a panel as a top-level Settings section (or any list slot).
 *
 * Wraps the shipped pattern:
 * `ctx.slots.inject(name, () => ctx.slots.register(registration, Component))`.
 * The registration is disposed when the owning declaration collapses and
 * reinstalled when it returns, so contributions follow effect lifetimes.
 *
 * @param ctx - the browser Cordis context (has `slots`).
 * @param registration - the slot registration options.
 * @param component - the React component the owner renders.
 */
export function definePanel(
  ctx: Pick<PanelContext, 'slots'>,
  registration: PanelRegistration,
  component: unknown,
): void {
  ctx.slots.inject(registration.name, () => ctx.slots.register(registration, component))
}
