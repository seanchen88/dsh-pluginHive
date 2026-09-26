/**
 * Open a fresh chat and seed its composer, so "New skill" can drop the user straight
 * into `create-skill` with the guidance prompt already typed.
 *
 * Every harness capability here is reached through `ctx.get(...)` and NEVER through
 * `inject`: these services belong to other plugins (`uiWorkspace`, `sessions`,
 * `workspaces`, `conversation`), and declaring them as requirements would stop the
 * whole panel from activating on a deployment that lacks one of them. Each lookup is
 * therefore optional, and any miss makes the caller fall back to the clipboard path.
 *
 * Verified against the harness source:
 *  - `uiWorkspace.openWorkspace(workspaceId, beforeOpen?)`
 *    packages/client/ui-workspace/src/client/navigation.ts:45
 *  - `sessions.scope(id) -> AgentContext | undefined`
 *    packages/api/session-controller/src/client/contract/sessions.ts:138
 *  - `conversation.input.for(actx).setDraft(text)` / `.focus()`
 *    packages/client/ui-conversation/src/client/contract/input.ts:176-178,211-213
 *    (InputHub.for THROWS until the session scope is retained: input/hub.ts:69-77)
 *  - `workspaces.list.getSnapshot().items[].workspaceId`
 *    packages/api/workspace-controller/src/client/service.ts:49 + types.ts:18-19
 */
import type { Context } from '@deepseek-ai/cordis'

/** How the "New" action landed: prefilled chat, clipboard, or neither worked. */
export type CreateSkillOutcome = 'opened' | 'clipboard' | 'failed'

/** `input.for(actx)` throws until the new session's scope exists; retry briefly. */
const SCOPE_ATTEMPTS = 8
const SCOPE_RETRY_DELAY_MS = 120

/** Narrow structural views of the harness services we touch (no value imports). */
interface AgentContextLike {
  get(key: string): unknown
}

interface SessionInputLike {
  setDraft(text: string): void
  focus(): void
}

interface ConversationLike {
  input: { for(actx: AgentContextLike): SessionInputLike }
}

interface UiWorkspaceLike {
  openWorkspace(workspaceId: string, beforeOpen?: (sessionId: string) => void): Promise<void>
}

interface SessionsLike {
  scope(sessionId: string): AgentContextLike | undefined
}

interface WorkspacesLike {
  list: { getSnapshot(): { items: ReadonlyArray<{ workspaceId: string }> } }
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => { setTimeout(resolve, ms) })
}

/**
 * Navigate to a fresh session in the current workspace and replace its composer draft.
 * @param ctx - the browser Cordis context.
 * @param text - the draft to seed (skill reference prefix included).
 * @returns true when the composer was seeded; false when any capability is unavailable.
 */
export async function openSessionWithDraft(ctx: Context, text: string): Promise<boolean> {
  const uiWorkspace = ctx.get('uiWorkspace') as unknown as UiWorkspaceLike | undefined
  const sessions = ctx.get('sessions') as unknown as SessionsLike | undefined
  const workspaces = ctx.get('workspaces') as unknown as WorkspacesLike | undefined
  if (uiWorkspace === undefined || sessions === undefined || workspaces === undefined) return false

  // `startSession` inherits "current or most recent" but returns void, so the workspace
  // is resolved explicitly to get back an addressable session id.
  const workspaceId = workspaces.list.getSnapshot().items[0]?.workspaceId
  if (workspaceId === undefined) return false

  let sessionId: string | undefined
  try {
    await uiWorkspace.openWorkspace(workspaceId, (created) => { sessionId = created })
  } catch {
    return false
  }
  if (sessionId === undefined) return false

  for (let attempt = 0; attempt < SCOPE_ATTEMPTS; attempt += 1) {
    const actx = sessions.scope(sessionId)
    if (actx !== undefined) {
      const conversation = actx.get('conversation') as unknown as ConversationLike | undefined
      if (conversation !== undefined) {
        try {
          const input = conversation.input.for(actx)
          input.setDraft(text)
          input.focus()
          return true
        } catch {
          // Scope not retained yet — fall through to the retry below.
        }
      }
    }
    await sleep(SCOPE_RETRY_DELAY_MS)
  }
  return false
}

/**
 * Copy text to the clipboard (the degraded path when no session can be seeded).
 * @param text - payload to copy.
 * @returns whether the browser accepted the write.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
