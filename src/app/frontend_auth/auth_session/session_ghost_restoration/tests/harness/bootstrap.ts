// RESPONSIBILITY: Execute the ghost-session cookie restoration contract in isolation.
// This route has NO upstream HTTP dependency: MSW is deliberately empty, not a fake API.
import { setupServer } from 'msw/node';
import { NextRequest } from 'next/server';
import { AUTH_SESSION_GHOST_RESTORATION_ROUTES } from '@/app/frontend_auth/auth_session/session_ghost_restoration/config/auth_session_ghost_restoration.url_config';
import { POST } from '@/app/frontend_auth/auth_session/session_ghost_restoration/api/route_handlers/AuthSessionGhostRestorationExitGhostLoginRouteHandler';
import { AuthSessionConstants } from '@/app/frontend_auth/auth_session/session_ghost_restoration/constants/AuthSessionGhostRestorationSessionConstants';

export const mockServer = setupServer();
export function installMockServer(): void { mockServer.listen({ onUnhandledRequest: 'error' }); }
export function resetMockServer(): void { mockServer.resetHandlers(); }
export function closeMockServer(): void { mockServer.close(); }

export type GhostRestoreScenario = 'missing-original' | 'original-present';
/** Use a caller-supplied UUID to test retry identity; by default use a valid UUIDv4. */
export function makeGhostRestoreRequest(
  scenario: GhostRestoreScenario,
  options: { alias?: boolean; idempotencyKey?: string | null } = {},
): NextRequest {
  const route = options.alias ? AUTH_SESSION_GHOST_RESTORATION_ROUTES.RESTORE_ALIAS : AUTH_SESSION_GHOST_RESTORATION_ROUTES.RESTORE;
  const key = options.idempotencyKey === undefined ? crypto.randomUUID() : options.idempotencyKey;
  const cookies = scenario === 'original-present'
    ? `${AuthSessionConstants.COOKIES.GHOST_ORIGINAL_ACCESS_TOKEN}=test-original-access; ${AuthSessionConstants.COOKIES.GHOST_ORIGINAL_REFRESH_TOKEN}=test-original-refresh`
    : undefined;
  return new NextRequest(new URL(route, 'http://localhost:3000'), {
    method: 'POST',
    headers: { ...(key === null ? {} : { 'Idempotency-Key': key }), ...(cookies ? { cookie: cookies } : {}) },
  });
}
export async function runGhostRestoreScenario(scenario: GhostRestoreScenario, options?: { alias?: boolean; idempotencyKey?: string | null }) {
  return POST(makeGhostRestoreRequest(scenario, options));
}
