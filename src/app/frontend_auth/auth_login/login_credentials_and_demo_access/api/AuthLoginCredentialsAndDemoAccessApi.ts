// RESPONSIBILITY: Owns the browser-facing Auth API contract, response validation, and mutation transport for login flows.
// DATA FLOW: Login form hook -> AuthApi -> same-origin route -> AuthUser -> TanStack Query cache.

import { apiFetch } from '@/lib/api';

import { AuthApiError } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/api/AuthLoginCredentialsAndDemoAccessApiError';

import { AuthErrorConstants } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessErrorConstants';

import { AuthSessionConstants } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessSessionConstants';

import { AuthSessionResponseSchema } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/schemas/AuthLoginCredentialsAndDemoAccessSchema';

import { AuthUrlConfig } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/config/auth_login_credentials_and_demo_access.url_config';

import type { AuthLoginCredentials, AuthRole, AuthUser } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/types/AuthLoginCredentialsAndDemoAccessContracts';

/**
 * Validates the browser-facing Auth response envelope and returns only the sanitized user payload.
 * @description Rejects malformed or HTTP/body status mismatches before the Login layer consumes the response.
 * @dependencies AuthSessionResponseSchema and AuthApiError.
 * @edge-case Error responses must contain a matching HTTP statusCode; success responses must omit it.
 */
function parseAuthSessionResponse(rawPayload: unknown, httpStatus: number, httpOk: boolean): AuthUser {
  const parsed = AuthSessionResponseSchema.safeParse(rawPayload);
  if (!parsed.success || parsed.data.success !== httpOk) {
    throw new AuthApiError('', AuthErrorConstants.CODE.RESPONSE_INVALID);
  }

  if (!httpOk && !parsed.data.success && parsed.data.statusCode !== httpStatus) {
    throw new AuthApiError('', AuthErrorConstants.CODE.RESPONSE_INVALID);
  }

  if (!parsed.data.success) {
    throw new AuthApiError(parsed.data.message, parsed.data.errorCode, parsed.data.validationErrors);
  }
  if (!parsed.data.data) {
    throw new AuthApiError('', AuthErrorConstants.CODE.RESPONSE_INVALID);
  }

  return parsed.data.data;
}

/**
 * Sends a module-owned Auth session mutation through the global API transport.
 * @description Centralizes POST header and JSON serialization behavior so Login APIs do not duplicate transport details.
 * @dependencies apiFetch and AuthSessionConstants.
 * @edge-case The caller must supply the stable idempotency key for the current user intent.
 */
async function postAuthSession(endpoint: string, body: unknown, idempotencyKey: string): Promise<AuthUser> {
  let response: Response;
  try {
    response = await apiFetch(endpoint, {
      method: 'POST',
      headers: {
        [AuthSessionConstants.HEADERS.CONTENT_TYPE]: AuthSessionConstants.HEADERS.CONTENT_TYPE_JSON,
        [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: idempotencyKey,
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });
  } catch {
    throw new AuthApiError('', AuthErrorConstants.CODE.RESPONSE_UNREADABLE);
  }

  let rawPayload: unknown;
  try {
    rawPayload = await response.json();
  } catch {
    throw new AuthApiError('', AuthErrorConstants.CODE.RESPONSE_UNREADABLE);
  }

  return parseAuthSessionResponse(rawPayload, response.status, response.ok);
}

export const AuthApi = {
  /**
   * Authenticates user-entered credentials through the secure same-origin session route.
   * @param credentials Validated email/password values.
   * @param idempotencyKey Stable key for the current user intent.
   */
  async login(credentials: AuthLoginCredentials, idempotencyKey: string): Promise<AuthUser> {
    return postAuthSession(AuthUrlConfig.PROXY_API.SESSION, credentials, idempotencyKey);
  },

  /**
   * Starts a development-only demo login without sending fixture credentials to the browser.
   * @param role Demo role selected by the user.
   * @param idempotencyKey Stable key for the current demo-login intent.
   */
  async loginDemo(role: AuthRole, idempotencyKey: string): Promise<AuthUser> {
    return postAuthSession(AuthUrlConfig.PROXY_API.DEMO_LOGIN, { role }, idempotencyKey);
  },
} as const;
