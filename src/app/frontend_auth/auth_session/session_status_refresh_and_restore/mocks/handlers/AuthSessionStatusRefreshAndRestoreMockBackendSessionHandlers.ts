import { StatusCodes } from 'http-status-codes';

import { http, HttpResponse } from 'msw';

import { env } from '@/config/env';

import { AuthErrorConstants } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/constants/AuthSessionStatusRefreshAndRestoreErrorConstants';

import { AuthResponseMessages } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/constants/AuthSessionStatusRefreshAndRestoreResponseMessages';

import { AuthSessionConstants } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/constants/AuthSessionStatusRefreshAndRestoreSessionConstants';

import { AuthMockFixturesApi } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/mocks/fixtures/AuthSessionStatusRefreshAndRestoreMockFixturesApi';

import { AuthUrlConfig } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/config/auth_session_status_refresh_and_restore.url_config';

// RESPONSIBILITY: Owns the module-owned upstream session, refresh, and logout MSW handlers used by Auth lifecycle tests.

// RESPONSIBILITY: Owns the module-owned upstream session, refresh, and logout MSW behavior for Auth lifecycle tests.

function getBearerToken(request: Request): string | null {
  const authorization = request.headers.get(AuthSessionConstants.HEADERS.AUTHORIZATION);
  const prefix = AuthSessionConstants.AUTHORIZATION_PREFIX;
  if (!authorization?.startsWith(prefix)) return null;
  return authorization.slice(prefix.length).trim() || null;
}

export const AuthMockBackendSessionHandlers = [
  http.get(`${env.NEXT_PUBLIC_API_URL}${AuthUrlConfig.BACKEND_API.ME}`, ({ request }) => {
    const token = getBearerToken(request);
    const user = token ? AuthMockFixturesApi.resolveUserByAccessToken(token) : null;
    if (!user) {
      return HttpResponse.json(
        {
          success: false,
          message: AuthErrorConstants.MESSAGE.SESSION_EXPIRED,
          data: null,
          error: AuthErrorConstants.NAME.UNAUTHORIZED,
          errorCode: AuthErrorConstants.CODE.REFRESH_REJECTED,
          statusCode: StatusCodes.UNAUTHORIZED,
        },
        { status: StatusCodes.UNAUTHORIZED },
      );
    }
    return HttpResponse.json({ success: true, message: AuthResponseMessages.SESSION_IDENTITY, data: user });
  }),
  http.post(`${env.NEXT_PUBLIC_API_URL}${AuthUrlConfig.BACKEND_API.REFRESH}`, ({ request }) => {
    const refreshToken = getBearerToken(request);
    if (!refreshToken) {
      return HttpResponse.json(
        {
          success: false,
          message: AuthErrorConstants.MESSAGE.SESSION_EXPIRED,
          data: null,
          error: AuthErrorConstants.NAME.UNAUTHORIZED,
          errorCode: AuthErrorConstants.CODE.REFRESH_REJECTED,
          statusCode: StatusCodes.UNAUTHORIZED,
        },
        { status: StatusCodes.UNAUTHORIZED },
      );
    }

    const idempotencyKey = request.headers.get(AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY)?.trim() || undefined;
    if (idempotencyKey && AuthMockFixturesApi.isRefreshIdempotencyConflict(idempotencyKey, refreshToken)) {
      return HttpResponse.json(
        {
          success: false,
          message: AuthErrorConstants.MESSAGE.IDEMPOTENCY_CONFLICT,
          data: null,
          error: AuthErrorConstants.NAME.CONFLICT,
          errorCode: AuthErrorConstants.CODE.IDEMPOTENCY_CONFLICT,
          statusCode: StatusCodes.CONFLICT,
        },
        { status: StatusCodes.CONFLICT },
      );
    }
    const tokens = AuthMockFixturesApi.refreshSession(refreshToken, idempotencyKey);
    if (!tokens) {
      return HttpResponse.json(
        {
          success: false,
          message: AuthErrorConstants.MESSAGE.SESSION_EXPIRED,
          data: null,
          error: AuthErrorConstants.NAME.UNAUTHORIZED,
          errorCode: AuthErrorConstants.CODE.REFRESH_REJECTED,
          statusCode: StatusCodes.UNAUTHORIZED,
        },
        { status: StatusCodes.UNAUTHORIZED },
      );
    }
    return HttpResponse.json({ success: true, message: AuthResponseMessages.REFRESH_SUCCESS, data: tokens });
  }),
  http.post(`${env.NEXT_PUBLIC_API_URL}${AuthUrlConfig.BACKEND_API.LOGOUT}`, ({ request }) => {
    const accessToken = getBearerToken(request);
    AuthMockFixturesApi.revokeSession(accessToken ?? undefined, undefined);
    return HttpResponse.json({ success: true, message: AuthResponseMessages.LOGOUT_SUCCESS, data: null });
  }),
] as const;
