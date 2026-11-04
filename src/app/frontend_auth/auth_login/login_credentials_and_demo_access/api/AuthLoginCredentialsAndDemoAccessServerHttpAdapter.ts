import { apiFetchRaw } from '@/lib/api-raw';
// RESPONSIBILITY: Owns the ONLY low-level HTTP call in server-side Auth; never handles client state or cookies.
// FLOW: AuthBackendTransport -> AuthServerHttpAdapter -> configured upstream Auth API -> raw Response and JSON payload.
import { env } from '@/config/env';
import { AuthApiError } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/api/AuthLoginCredentialsAndDemoAccessApiError';

/**
 * Isolated, no-store server transport for auth endpoints that require the original
 * HTTP status and raw Response. Does not rely on undocumented host apiFetch semantics.
 * @param endpoint Verified backend API path from AuthUrlConfig.
 * @param options Request method, headers and optional JSON body from the route handler.
 */
export async function authServerHttpRequest(endpoint: string, options: RequestInit): Promise<{ response: Response; payload: unknown }> {
  const baseUrl = env.NEXT_PUBLIC_API_URL;
  if (!baseUrl || !/^\/[a-z0-9/_-]+$/i.test(endpoint) || endpoint.startsWith('//')) throw new AuthApiError();
  let url: URL;
  try {
    url = new URL(`${baseUrl.replace(/\/$/, '')}${endpoint}`);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new AuthApiError();
  } catch { throw new AuthApiError(); }
  // Do not follow redirects with server-side credentials. The caller evaluates the
  // real status, while Response preserves authorization failure information.
  const response = await apiFetchRaw(url.toString(), { ...options, cache: 'no-store', redirect: 'manual' });
  let payload: unknown = null;
  try { payload = await response.json(); } catch { payload = null; }
  return { response, payload };
}
