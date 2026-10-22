/**
 * Domain Remote failure codes owned by the Skill panel.
 *
 * DSH 0.2.1-rc.2 types `RemoteError`'s `code` as the closed union
 * `RemoteErrorCode = keyof RemoteErrorDetailsMap`, where the protocol package
 * declares only the universal carrier codes (`gateway/bad-request`,
 * `gateway/cancelled`, `gateway/internal`). Per the protocol's contract, each
 * owner merges its own domain codes into `RemoteErrorDetailsMap` next to the
 * throwing code — so the panel's `gateway/not-found` must be declared here, or
 * `new RemoteError('gateway/not-found', ...)` fails to type-check against the
 * real (non-stub) protocol types.
 */
declare module '@deepseek-ai/dsh-typert-protocol' {
  interface RemoteErrorDetailsMap {
    /** A looked-up skill is absent from the requested scope. */
    'gateway/not-found': {}
  }
}
