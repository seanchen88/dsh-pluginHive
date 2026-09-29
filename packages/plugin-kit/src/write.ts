/**
 * Shared write-settling for host mutations whose reply can be lost.
 *
 * Any `@Remote` write that recomposes the profile patch may reload the very host fiber
 * serving the call (`reconcileProfilePatches` runs before the handler returns), so the
 * change lands on disk while the promise never settles. Every caller of such a write —
 * the MCP panel and the MCP market — must degrade to a refetch instead of hanging, which
 * is why this lives in the kit rather than beside one panel.
 */

/** How long to wait for a write's reply before trusting a fresh list instead. */
export const WRITE_SETTLE_MS = 20_000

/** Outcome of a settled write: the reply, a readable failure, or a lost reply. */
export type Settled<Value> =
  | { status: 'ok'; value: Value }
  | { status: 'error'; error: string }
  | { status: 'timeout' }

/**
 * Await a write without ever leaving the caller stuck in a busy state.
 * @param call - the in-flight write.
 * @param ms - settle budget before giving up on the reply.
 */
export async function settleWrite<Value>(
  call: Promise<Value>,
  ms: number = WRITE_SETTLE_MS,
): Promise<Settled<Value>> {
  let timer: ReturnType<typeof setTimeout> | undefined
  const normalized: Promise<Settled<Value>> = call.then(
    (value): Settled<Value> => ({ status: 'ok', value }),
    (error: unknown): Settled<Value> => ({
      status: 'error',
      error: error instanceof Error ? error.message : String(error),
    }),
  )
  const guard = new Promise<Settled<Value>>(resolve => {
    timer = setTimeout(() => { resolve({ status: 'timeout' }) }, ms)
  })
  try {
    return await Promise.race([normalized, guard])
  } finally {
    if (timer !== undefined) clearTimeout(timer)
  }
}
