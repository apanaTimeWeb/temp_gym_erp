import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { renderHook, waitFor } from '@testing-library/react';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AuthApi } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/api/AuthLoginCredentialsAndDemoAccessApi';

import { AUTH_QUERY_KEYS } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessQueryKeys';

import { AuthRoleConstants } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessRoleConstants';

import { useAuthLoginMutation } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/hooks/useAuthLoginCredentialsAndDemoAccessLoginMutation';

import type { PropsWithChildren } from 'react';



vi.mock('@/app/frontend_auth/auth_login/login_credentials_and_demo_access/api/AuthLoginCredentialsAndDemoAccessApi', () => ({
  AuthApi: { login: vi.fn(), loginDemo: vi.fn() },
}));

function createWrapper(queryClient: QueryClient) {
  return function Wrapper({ children }: PropsWithChildren) {
    return createElement(QueryClientProvider, { client: queryClient }, children);
  };
}

describe('useAuthLoginMutation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('reconciles the canonical Auth token-status cache from the authoritative Login response', async () => {
    const queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false }, queries: { retry: false } } });
    const user = { id: 'u1', name: 'Admin', email: 'admin@example.com', role: AuthRoleConstants.ADMIN };
    queryClient.setQueryData(AUTH_QUERY_KEYS.tokenStatus(), { authenticated: false, user: null });
    vi.mocked(AuthApi.login).mockResolvedValue(user);

    const { result } = renderHook(() => useAuthLoginMutation(), { wrapper: createWrapper(queryClient) });
    await result.current.mutateCredentials({ email: user.email, password: 'demo123' }, 'intent-cache-1');

    await waitFor(() => expect(queryClient.getQueryData(AUTH_QUERY_KEYS.tokenStatus())).toEqual({ authenticated: true, user }));
  });

  it('passes the caller-owned idempotency key unchanged across retries', async () => {
    const queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false }, queries: { retry: false } } });
    const user = { id: 'u1', name: 'Admin', email: 'admin@example.com', role: AuthRoleConstants.ADMIN };
    vi.mocked(AuthApi.login)
      .mockRejectedValueOnce(new Error('temporary failure'))
      .mockResolvedValueOnce(user);

    const { result } = renderHook(() => useAuthLoginMutation(), { wrapper: createWrapper(queryClient) });
    const credentials = { email: 'admin@example.com', password: 'demo123' };
    await expect(result.current.mutateCredentials(credentials, 'intent-retry-1')).rejects.toThrow('temporary failure');
    await expect(result.current.mutateCredentials(credentials, 'intent-retry-1')).resolves.toEqual(user);

    const calls = vi.mocked(AuthApi.login).mock.calls;
    expect(calls).toHaveLength(2);
    expect(calls[0]?.[1]).toBe('intent-retry-1');
    expect(calls[0]?.[1]).toBe(calls[1]?.[1]);
  });
});
