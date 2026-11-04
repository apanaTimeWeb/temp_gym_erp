import { StatusCodes } from 'http-status-codes';

import { setupServer } from 'msw/node';

import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { AuthErrorConstants } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/constants/AuthSessionStatusRefreshAndRestoreErrorConstants';

import { AuthSessionConstants } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/constants/AuthSessionStatusRefreshAndRestoreSessionConstants';

import { AuthMockPublicFixtures } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/mocks/fixtures/AuthSessionStatusRefreshAndRestoreMockPublicFixtures';

import { AuthMockBrowserScenarioHandlers } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/mocks/handlers/AuthSessionStatusRefreshAndRestoreMockBrowserScenarioHandlers';

import { AuthTestEnvironmentConstants } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/tests/AuthSessionStatusRefreshAndRestoreTestEnvironmentConstants';

import { AuthUrlConfig } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/config/auth_session_status_refresh_and_restore.url_config';



const server = setupServer(AuthMockBrowserScenarioHandlers.unavailableLogin);

describe('AuthMockBrowserScenarioHandlers', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('returns a canonical backend-unavailable envelope for the Login error scenario', async () => {
    const response = await fetch(new URL(AuthUrlConfig.PROXY_API.SESSION, AuthTestEnvironmentConstants.ORIGIN), {
      method: 'POST',
      headers: { [AuthSessionConstants.HEADERS.CONTENT_TYPE]: AuthSessionConstants.HEADERS.CONTENT_TYPE_JSON },
      body: JSON.stringify({ email: AuthMockPublicFixtures.USERS.ADMIN.email, password: 'demo123' }),
    });
    const body = await response.json();

    expect(response.status).toBe(StatusCodes.BAD_GATEWAY);
    expect(body).toEqual({
      success: false,
      message: AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE,
      data: null,
      error: AuthErrorConstants.NAME.UPSTREAM_UNAVAILABLE,
      errorCode: AuthErrorConstants.CODE.UPSTREAM_UNAVAILABLE,
      statusCode: StatusCodes.BAD_GATEWAY,
    });
  });

});
