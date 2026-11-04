// RESPONSIBILITY: Owns secure refresh-token renewal and HTTP-only cookie rotation without returning token material to browser JavaScript.
import { StatusCodes } from 'http-status-codes';

import { logger } from '@/lib/logger';

import { AuthBackendTransport } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/api/AuthSessionStatusRefreshAndRestoreBackendTransport';

import { AuthErrorConstants } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/constants/AuthSessionStatusRefreshAndRestoreErrorConstants';

import { AuthResponseMessages } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/constants/AuthSessionStatusRefreshAndRestoreResponseMessages';

import { AuthServerRuntimeConfig } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/constants/AuthSessionStatusRefreshAndRestoreServerRuntimeConfig';

import { AuthSessionConstants } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/constants/AuthSessionStatusRefreshAndRestoreSessionConstants';

import { AuthMockFixturesApi } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/mocks/fixtures/AuthSessionStatusRefreshAndRestoreMockFixturesApi';
import { AuthMockTokenConstants } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/mocks/fixtures/AuthSessionStatusRefreshAndRestoreMockTokenConstants';

import { AuthBackendRefreshResponseSchema } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/schemas/AuthSessionStatusRefreshAndRestoreSchema';

import { AuthUrlConfig } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/config/auth_session_status_refresh_and_restore.url_config';

import { AuthApiResponseUtilities } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/utils/AuthSessionStatusRefreshAndRestoreApiResponseUtilities';

import { AuthCookieUtilities } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/utils/AuthSessionStatusRefreshAndRestoreCookieUtilities';

import { AuthRequestHeaderUtilities } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/utils/AuthSessionStatusRefreshAndRestoreRequestHeaderUtilities';

import type { NextRequest } from 'next/server';



export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get(AuthSessionConstants.COOKIES.REFRESH_TOKEN)?.value;
  if (!refreshToken) {
    return AuthApiResponseUtilities.failure(
      AuthErrorConstants.MESSAGE.SESSION_EXPIRED,
      StatusCodes.UNAUTHORIZED,
      AuthErrorConstants.NAME.UNAUTHORIZED,
      AuthErrorConstants.CODE.REFRESH_MISSING_TOKEN,
    );
  }

  // Existing URL contract permits a missing key. Never silently replace a malformed
  // caller-supplied key: doing so changes the caller's retry identity.
  const suppliedIdempotencyKey = AuthRequestHeaderUtilities.getIdempotencyKey(request);
  if (request.headers.has(AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY) && suppliedIdempotencyKey === null) {
    return AuthApiResponseUtilities.failure(
      AuthErrorConstants.MESSAGE.IDEMPOTENCY_REQUIRED,
      StatusCodes.BAD_REQUEST,
      AuthErrorConstants.NAME.VALIDATION,
      AuthErrorConstants.CODE.IDEMPOTENCY_REQUIRED,
    );
  }
  const idempotencyKey = suppliedIdempotencyKey ?? crypto.randomUUID();

  if (AuthServerRuntimeConfig.isLoginDemoEnabled() &&
      refreshToken.startsWith(`${AuthMockTokenConstants.REFRESH_PREFIX}_`)) {
    if (AuthMockFixturesApi.isRefreshIdempotencyConflict(idempotencyKey, refreshToken)) {
      return AuthApiResponseUtilities.failure(
        AuthErrorConstants.MESSAGE.IDEMPOTENCY_CONFLICT,
        StatusCodes.CONFLICT,
        AuthErrorConstants.NAME.CONFLICT,
        AuthErrorConstants.CODE.IDEMPOTENCY_CONFLICT,
      );
    }
    const refreshed = AuthMockFixturesApi.refreshSession(refreshToken, idempotencyKey);
    if (!refreshed) {
      const response = AuthApiResponseUtilities.failure(
        AuthErrorConstants.MESSAGE.SESSION_EXPIRED,
        StatusCodes.UNAUTHORIZED,
        AuthErrorConstants.NAME.UNAUTHORIZED,
        AuthErrorConstants.CODE.REFRESH_REJECTED,
      );
      AuthCookieUtilities.clearSession(response);
      return response;
    }

    const response = AuthApiResponseUtilities.success(AuthResponseMessages.REFRESH_SUCCESS, null);
    AuthCookieUtilities.refreshSession(
      response, refreshed.accessToken, refreshed.refreshToken,
      request.cookies.get(AuthSessionConstants.COOKIES.USER)?.value,
    );
    return response;
  }

  try {
    const headers = {
      [AuthSessionConstants.HEADERS.AUTHORIZATION]: `${AuthSessionConstants.AUTHORIZATION_PREFIX}${refreshToken}`,
      [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: idempotencyKey,
    };
    const { response: backendResponse, payload } = await AuthBackendTransport.post(
      AuthUrlConfig.BACKEND_API.REFRESH,
      undefined,
      headers,
    );

    const parsedBackend = AuthBackendRefreshResponseSchema.safeParse(payload);

    if (!parsedBackend.success || parsedBackend.data.success !== backendResponse.ok) {
      const response = AuthApiResponseUtilities.failure(
        AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE,
        StatusCodes.BAD_GATEWAY,
        AuthErrorConstants.NAME.UPSTREAM_UNAVAILABLE,
        AuthErrorConstants.CODE.REFRESH_UPSTREAM_UNAVAILABLE,
      );
      return response;
    }

    if (!backendResponse.ok && parsedBackend.data.statusCode !== backendResponse.status) {
      const response = AuthApiResponseUtilities.failure(
        AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE,
        StatusCodes.BAD_GATEWAY,
        AuthErrorConstants.NAME.UPSTREAM_UNAVAILABLE,
        AuthErrorConstants.CODE.REFRESH_UPSTREAM_UNAVAILABLE,
      );
      return response;
    }

    if (!backendResponse.ok) {
      const responseStatus = backendResponse.status >= StatusCodes.BAD_REQUEST && backendResponse.status < StatusCodes.INTERNAL_SERVER_ERROR
        ? backendResponse.status
        : StatusCodes.BAD_GATEWAY;
      const safeStatus = responseStatus === StatusCodes.UNAUTHORIZED
        ? StatusCodes.UNAUTHORIZED
        : StatusCodes.BAD_GATEWAY;
      const response = AuthApiResponseUtilities.failure(
        safeStatus === StatusCodes.UNAUTHORIZED
          ? AuthErrorConstants.MESSAGE.SESSION_EXPIRED
          : AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE,
        safeStatus,
        safeStatus === StatusCodes.UNAUTHORIZED
          ? AuthErrorConstants.NAME.UNAUTHORIZED
          : AuthErrorConstants.NAME.UPSTREAM_UNAVAILABLE,
        safeStatus === StatusCodes.UNAUTHORIZED
          ? AuthErrorConstants.CODE.REFRESH_REJECTED
          : AuthErrorConstants.CODE.REFRESH_UPSTREAM_UNAVAILABLE,
      );
      if (safeStatus === StatusCodes.UNAUTHORIZED) AuthCookieUtilities.clearSession(response);
      return response;
    }

    if (!parsedBackend.data.data) {
      const response = AuthApiResponseUtilities.failure(
        AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE,
        StatusCodes.BAD_GATEWAY,
        AuthErrorConstants.NAME.UPSTREAM_UNAVAILABLE,
        AuthErrorConstants.CODE.REFRESH_UPSTREAM_UNAVAILABLE,
      );
      return response;
    }

    const response = AuthApiResponseUtilities.success(AuthResponseMessages.REFRESH_SUCCESS, null);
    const newRefreshToken = parsedBackend.data.data.refreshToken ?? refreshToken;
    AuthCookieUtilities.refreshSession(
      response,
      parsedBackend.data.data.accessToken,
      newRefreshToken,
      request.cookies.get(AuthSessionConstants.COOKIES.USER)?.value,
    );
    return response;
  } catch {
    logger.error('Auth backend refresh request failed', {
      route: AuthUrlConfig.PROXY_API.REFRESH,
      module: 'auth/refresh',
      timestamp: new Date().toISOString(),
    });
    return AuthApiResponseUtilities.failure(
      AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE,
      StatusCodes.BAD_GATEWAY,
      AuthErrorConstants.NAME.UPSTREAM_UNAVAILABLE,
      AuthErrorConstants.CODE.REFRESH_UPSTREAM_UNAVAILABLE,
    );
  }
}
