import { StatusCodes } from 'http-status-codes';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AuthApi } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/api/AuthLoginCredentialsAndDemoAccessApi';

import { AuthResponseMessages } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessResponseMessages';

import { AuthSessionConstants } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessSessionConstants';

import { AuthUrlConfig } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/config/auth_login_credentials_and_demo_access.url_config';



const apiFetchMock = vi.fn();

vi.mock('@/lib/api', () => ({
  apiFetch: apiFetchMock,
}));

describe('AuthApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sends Login credentials with one stable idempotency key and returns sanitized user data', async () => {
    apiFetchMock.mockResolvedValueOnce(new Response(JSON.stringify({
      success: true,
      requestId: "9b3f161a-e3a5-41a4-9781-b33abbf4d4aa",
      message: AuthResponseMessages.LOGIN_SUCCESS,
      data: { id: 'u1', name: 'Admin', email: 'admin@example.com', role: 'ADMIN' },
    }), { status: StatusCodes.OK }));

    const user = await AuthApi.login({ email: 'admin@example.com', password: 'demo123' }, '325142be-9eee-413b-8b55-da92ccbc48a3');

    expect(apiFetchMock).toHaveBeenCalledWith(AuthUrlConfig.PROXY_API.SESSION, {
      method: 'POST',
      headers: {
        [AuthSessionConstants.HEADERS.CONTENT_TYPE]: AuthSessionConstants.HEADERS.CONTENT_TYPE_JSON,
        [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: '325142be-9eee-413b-8b55-da92ccbc48a3',
      },
      body: JSON.stringify({ email: 'admin@example.com', password: 'demo123' }),
      cache: 'no-store',
    });
    expect(user).toEqual({ id: 'u1', name: 'Admin', email: 'admin@example.com', role: 'ADMIN' });
  });

  it('sends a role-only demo Login request with the caller idempotency key', async () => {
    apiFetchMock.mockResolvedValueOnce(new Response(JSON.stringify({
      success: true,
      requestId: "9b3f161a-e3a5-41a4-9781-b33abbf4d4aa",
      message: AuthResponseMessages.LOGIN_SUCCESS,
      data: { id: 'u2', name: 'Manager', email: 'manager@example.com', role: 'MANAGER' },
    }), { status: StatusCodes.OK }));

    const user = await AuthApi.loginDemo('MANAGER', 'f9ee1418-91c1-438d-8e98-fdea88599e6c');

    expect(apiFetchMock).toHaveBeenCalledWith(AuthUrlConfig.PROXY_API.DEMO_LOGIN, {
      method: 'POST',
      headers: {
        [AuthSessionConstants.HEADERS.CONTENT_TYPE]: AuthSessionConstants.HEADERS.CONTENT_TYPE_JSON,
        [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: 'f9ee1418-91c1-438d-8e98-fdea88599e6c',
      },
      body: JSON.stringify({ role: 'MANAGER' }),
      cache: 'no-store',
    });
    expect(user.role).toBe('MANAGER');
  });

});
