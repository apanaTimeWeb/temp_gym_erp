// RESPONSIBILITY: Converts Auth route operations into the stable, server-only HTTP response contract.
// DATA FLOW: Auth route -> AuthBackendTransport -> AuthServerHttpAdapter -> upstream Auth API.
import { authServerHttpRequest } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/api/AuthLoginCredentialsAndDemoAccessServerHttpAdapter';
import { AuthLoginSessionConstants as AuthSessionConstants } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessServerConstants';

export const AuthBackendTransport = {
  /** @param endpoint Verified backend GET path. @param headers Headers including optional bearer token. */
  get(endpoint: string, headers?: Record<string, string>) {
    return authServerHttpRequest(endpoint, { method: 'GET', headers: { ...headers } });
  },
  /** @param endpoint Verified backend POST path. @param body JSON payload, if any. @param headers Auth and UUIDv4 idempotency headers. */
  post(endpoint: string, body?: unknown, headers?: Record<string, string>) {
    return authServerHttpRequest(endpoint, {
      method: 'POST',
      headers: { [AuthSessionConstants.HEADERS.CONTENT_TYPE]: AuthSessionConstants.HEADERS.CONTENT_TYPE_JSON, ...headers },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  },
} as const;
