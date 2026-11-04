// RESPONSIBILITY: Verify the owner-local MSW Logout upstream is mutable and resettable.
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { AuthUrlConfig } from '@/app/frontend_auth/auth_logout/logout_session_termination/config/auth_logout_session_termination.url_config';
import { AuthSessionConstants } from '@/app/frontend_auth/auth_logout/logout_session_termination/constants/AuthLogoutSessionTerminationSessionConstants';
import { closeMockServer, installMockServer, observedLogoutKeys, resetMockServer } from './harness/bootstrap';

vi.mock('@/config/env', () => ({ env: { NEXT_PUBLIC_API_URL: 'http://localhost:4000' } }));
beforeAll(installMockServer);
afterEach(resetMockServer);
afterAll(closeMockServer);

describe('Standalone Logout upstream MSW harness', () => {
  it('intercepts logout and resets its mutable request-key observations', async () => {
    const key = 'd91de635-6ccb-4b77-9a9c-33c08dfe429f';
    const response = await fetch(`http://localhost:4000${AuthUrlConfig.BACKEND_API.LOGOUT}`, {
      method: 'POST', headers: {
        [AuthSessionConstants.HEADERS.AUTHORIZATION]: `${AuthSessionConstants.AUTHORIZATION_PREFIX}test-token`,
        [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: key,
      },
    });
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ success: true, data: null });
    expect(observedLogoutKeys()).toEqual([key]);
    resetMockServer();
    expect(observedLogoutKeys()).toEqual([]);
  });
});
