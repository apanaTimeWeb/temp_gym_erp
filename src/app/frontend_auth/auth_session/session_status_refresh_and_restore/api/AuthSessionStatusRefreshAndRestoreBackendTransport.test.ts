import { StatusCodes } from 'http-status-codes';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { AuthBackendTransport } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/api/AuthSessionStatusRefreshAndRestoreBackendTransport';

import { AuthSessionConstants } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/constants/AuthSessionStatusRefreshAndRestoreSessionConstants';

import { AuthUrlConfig } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/config/auth_session_status_refresh_and_restore.url_config';



vi.mock('@/config/env', () => ({
  env: { NEXT_PUBLIC_API_URL: 'https://api.test' },
}));

describe('AuthBackendTransport', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock);
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('constructs a no-store POST request using the provided endpoint and headers', async () => {
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ success: true, message: 'ok', data: null }), { status: StatusCodes.OK }));

    const result = await AuthBackendTransport.post(AuthUrlConfig.BACKEND_API.LOGIN, { email: 'a@example.com' }, { [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: '325142be-9eee-413b-ab55-da92ccbc48a3' });

    expect(fetchMock).toHaveBeenCalledWith('https://api.test/auth/login', {
      method: 'POST',
      headers: {
        [AuthSessionConstants.HEADERS.CONTENT_TYPE]: AuthSessionConstants.HEADERS.CONTENT_TYPE_JSON,
        [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: '325142be-9eee-413b-ab55-da92ccbc48a3',
      },
      body: JSON.stringify({ email: 'a@example.com' }),
      cache: 'no-store',
      redirect: 'manual',
    });
    expect(result.response.status).toBe(StatusCodes.OK);
    expect(result.payload).toEqual({ success: true, message: 'ok', data: null });
  });

  it('returns null payload when the upstream response is not JSON', async () => {
    fetchMock.mockResolvedValueOnce(new Response('not-json', { status: StatusCodes.BAD_GATEWAY }));

    const result = await AuthBackendTransport.get(AuthUrlConfig.BACKEND_API.ME);

    expect(result.payload).toBeNull();
    expect(fetchMock).toHaveBeenCalledWith('https://api.test/auth/me', expect.objectContaining({ cache: 'no-store', redirect: 'manual' }));
  });
});
