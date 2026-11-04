// RESPONSIBILITY: Run logout against an owner-local mutable MSW upstream mock.
// No token data is persisted or interpreted as a production authentication secret.
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { NextRequest } from 'next/server';
import { env } from '@/config/env';
import { AuthUrlConfig } from '@/app/frontend_auth/auth_logout/logout_session_termination/config/auth_logout_session_termination.url_config';
import { AuthResponseMessages } from '@/app/frontend_auth/auth_logout/logout_session_termination/constants/AuthLogoutSessionTerminationResponseMessages';
import { AuthSessionConstants } from '@/app/frontend_auth/auth_logout/logout_session_termination/constants/AuthLogoutSessionTerminationSessionConstants';
import { POST } from '@/app/frontend_auth/auth_logout/logout_session_termination/api/route_handlers/AuthLogoutSessionTerminationRouteHandler';

const observedMutationKeys = new Set<string>();
const upstreamLogout = http.post(`${env.NEXT_PUBLIC_API_URL}${AuthUrlConfig.BACKEND_API.LOGOUT}`, ({ request }) => {
  const key = request.headers.get(AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY);
  if (key) observedMutationKeys.add(key);
  return HttpResponse.json({ success: true, message: AuthResponseMessages.LOGOUT_SUCCESS, data: null });
});
export const mockServer = setupServer(upstreamLogout);
export function installMockServer(): void { mockServer.listen({ onUnhandledRequest: 'error' }); }
export function resetMockServer(): void { mockServer.resetHandlers(); observedMutationKeys.clear(); }
export function closeMockServer(): void { mockServer.close(); observedMutationKeys.clear(); }
export function observedLogoutKeys(): readonly string[] { return [...observedMutationKeys]; }
export function makeLogoutRequest(options: { accessToken?: string; idempotencyKey?: string | null } = {}): NextRequest {
  const accessToken = options.accessToken ?? 'test-access-token';
  const idempotencyKey = options.idempotencyKey === undefined ? crypto.randomUUID() : options.idempotencyKey;
  return new NextRequest(new URL(AuthUrlConfig.PROXY_API.LOGOUT, 'http://localhost:3000'), {
    method: 'POST',
    headers: {
      cookie: `${AuthSessionConstants.COOKIES.ACCESS_TOKEN}=${accessToken}`,
      ...(idempotencyKey === null ? {} : { [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: idempotencyKey }),
    },
  });
}
export async function runLogoutScenario(options?: { accessToken?: string; idempotencyKey?: string | null }) {
  return POST(makeLogoutRequest(options));
}
