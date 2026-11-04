// RESPONSIBILITY: Owns Auth session termination, best-effort upstream/mock revocation, and unconditional local cookie clearing.
import { logger } from '@/lib/logger';

import { AuthBackendTransport } from '@/app/frontend_auth/auth_logout/logout_session_termination/api/AuthLogoutSessionTerminationBackendTransport';

import { AuthResponseMessages } from '@/app/frontend_auth/auth_logout/logout_session_termination/constants/AuthLogoutSessionTerminationResponseMessages';

import { AuthServerRuntimeConfig } from '@/app/frontend_auth/auth_logout/logout_session_termination/constants/AuthLogoutSessionTerminationServerRuntimeConfig';

import { AuthSessionConstants } from '@/app/frontend_auth/auth_logout/logout_session_termination/constants/AuthLogoutSessionTerminationSessionConstants';

import { AuthDemoSessionService as AuthMockFixturesApi } from '@/server/auth-demo/AuthDemoSessionService';
import { AuthMockTokenConstants } from '@/app/frontend_auth/auth_logout/logout_session_termination/mocks/fixtures/AuthLogoutSessionTerminationMockTokenConstants';

import { AuthBackendLogoutResponseSchema } from '@/app/frontend_auth/auth_logout/logout_session_termination/schemas/AuthLogoutSessionTerminationSchema';

import { AuthUrlConfig } from '@/app/frontend_auth/auth_logout/logout_session_termination/config/auth_logout_session_termination.url_config';

import { AuthApiResponseUtilities } from '@/app/frontend_auth/auth_logout/logout_session_termination/utils/AuthLogoutSessionTerminationApiResponseUtilities';

import { AuthCookieUtilities } from '@/app/frontend_auth/auth_logout/logout_session_termination/utils/AuthLogoutSessionTerminationCookieUtilities';

import { AuthRequestHeaderUtilities } from '@/app/frontend_auth/auth_logout/logout_session_termination/utils/AuthLogoutSessionTerminationRequestHeaderUtilities';

import type { NextRequest } from 'next/server';



export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get(AuthSessionConstants.COOKIES.ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(AuthSessionConstants.COOKIES.REFRESH_TOKEN)?.value;
  // Preserve optional-key legacy logout callers; use the validated key unchanged
  // for upstream revocation so explicit retry attempts retain the same identity.
  // Local cookie cleanup must always succeed, including for malformed headers.
  const suppliedIdempotencyKey = AuthRequestHeaderUtilities.getIdempotencyKey(request);
  const idempotencyKey = suppliedIdempotencyKey ?? crypto.randomUUID();

  if (AuthServerRuntimeConfig.isLoginDemoEnabled() &&
      accessToken?.startsWith(`${AuthMockTokenConstants.ACCESS_PREFIX}_`)) {
    AuthMockFixturesApi.revokeSession(accessToken, refreshToken);
  } else if (accessToken) {
    try {
      const { response: backendResponse, payload } = await AuthBackendTransport.post(
        AuthUrlConfig.BACKEND_API.LOGOUT,
        undefined,
        {
          [AuthSessionConstants.HEADERS.AUTHORIZATION]: `${AuthSessionConstants.AUTHORIZATION_PREFIX}${accessToken}`,
          [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: idempotencyKey,
        },
      );
      const parsedBackend = AuthBackendLogoutResponseSchema.safeParse(payload);
      if (!parsedBackend.success || parsedBackend.data.success !== backendResponse.ok || (!backendResponse.ok && parsedBackend.data.statusCode !== backendResponse.status)) {
        logger.error('Auth backend logout contract mismatch', {
          route: AuthUrlConfig.PROXY_API.LOGOUT,
          module: 'auth/logout',
          statusCode: backendResponse.status,
          timestamp: new Date().toISOString(),
        });
      }
    } catch {
      logger.error('Auth backend logout request failed', {
        route: AuthUrlConfig.PROXY_API.LOGOUT,
        module: 'auth/logout',
        timestamp: new Date().toISOString(),
      });
      // Local session cleanup remains authoritative for logout UX.
    }
  }

  const response = AuthApiResponseUtilities.success(AuthResponseMessages.LOGOUT_SUCCESS, null);
  AuthCookieUtilities.clearSession(response);
  return response;
}
