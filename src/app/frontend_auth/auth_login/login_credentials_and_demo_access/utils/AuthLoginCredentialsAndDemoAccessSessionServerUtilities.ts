import { logger } from '@/lib/logger';

import { AuthBackendTransport } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/api/AuthLoginCredentialsAndDemoAccessBackendTransport';

import { AuthLoginServerRuntimeConfig as AuthServerRuntimeConfig } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessServerConstants';

import { AuthSessionConstants } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessSessionConstants';

import { AuthLoginDemoSessionCompatibility as AuthMockFixturesApi } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/api/AuthLoginCredentialsAndDemoAccessCompatibilityBridges';
import { AuthMockTokenConstants } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/mocks/fixtures/AuthLoginCredentialsAndDemoAccessMockTokenConstants';

import { AuthBackendUserResponseSchema } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/schemas/AuthLoginCredentialsAndDemoAccessSchema';

import { AuthUrlConfig } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/config/auth_login_credentials_and_demo_access.url_config';

import type { AuthUser } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/types/AuthLoginCredentialsAndDemoAccessContracts';

// RESPONSIBILITY: Owns authoritative server-side Auth session resolution from HTTP-only access-token state.
// DATA FLOW: Auth Login route -> access-token cookie -> AuthSessionServerUtilities -> backend/mock session source -> sanitized AuthUser.

export const AuthSessionServerUtilities = {
  /**
   * Resolves the authenticated user through the authoritative backend session endpoint, or through the feature-owned mock session registry in explicitly enabled demo mode.
   * @param accessToken Token read only from the HTTP-only session cookie.
   * @returns Validated AuthUser or null when the session is absent, invalid, expired, or upstream verification fails.
   */
  async resolveUser(accessToken: string | undefined): Promise<AuthUser | null> {
    if (!accessToken) return null;

    // Demo mode is a capability gate, not a switch that reclassifies genuine backend tokens.
    if (AuthServerRuntimeConfig.isLoginDemoEnabled() &&
        accessToken.startsWith(`${AuthMockTokenConstants.ACCESS_PREFIX}_`)) {
      return AuthMockFixturesApi.resolveUserByAccessToken(accessToken);
    }

    try {
      const { response, payload } = await AuthBackendTransport.get(
        AuthUrlConfig.BACKEND_API.ME,
        { [AuthSessionConstants.HEADERS.AUTHORIZATION]: `${AuthSessionConstants.AUTHORIZATION_PREFIX}${accessToken}` },
      );
      const parsed = AuthBackendUserResponseSchema.safeParse(payload);
      if (!response.ok || !parsed.success || !parsed.data.success || !parsed.data.data) {
        logger.error('Auth session verification contract rejected', {
          route: AuthUrlConfig.BACKEND_API.ME,
          module: 'auth/session',
          statusCode: response.status,
          timestamp: new Date().toISOString(),
        });
        return null;
      }
      return parsed.data.data;
    } catch {
      logger.error('Auth session verification request failed', {
        route: AuthUrlConfig.BACKEND_API.ME,
        module: 'auth/session',
        timestamp: new Date().toISOString(),
      });
      return null;
    }
  },
};
