import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { renderHook, waitFor } from '@testing-library/react';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AuthApi } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/api/AuthLoginCredentialsAndDemoAccessApi';

import { AuthApiError } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/api/AuthLoginCredentialsAndDemoAccessApiError';

import { AuthIdempotencyFingerprintUtilities } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/utils/AuthLoginCredentialsAndDemoAccessIdempotencyFingerprintUtilities';

import { useAuthLoginForm } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/hooks/useAuthLoginCredentialsAndDemoAccessLoginForm';

import type { PropsWithChildren } from 'react';



const replaceMock = vi.fn();
const translations: Record<string, string> = {
  'VALIDATION.EMAIL_INVALID': 'Please enter a valid email address',
  'VALIDATION.PASSWORD_MIN_LENGTH': 'Password must be at least 6 characters',
  'ERRORS.UNAVAILABLE': 'We could not sign you in. Please try again.',
};

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => translations[key] ?? key }));
vi.mock('next/navigation', () => ({ useRouter: () => ({ replace: replaceMock }) }));
vi.mock('@/app/frontend_auth/auth_login/login_credentials_and_demo_access/api/AuthLoginCredentialsAndDemoAccessApi', () => ({ AuthApi: { login: vi.fn(), loginDemo: vi.fn() } }));

function createWrapper() {
  const client = new QueryClient({ defaultOptions: { mutations: { retry: false }, queries: { retry: false } } });
  return function Wrapper({ children }: PropsWithChildren) {
    return createElement(QueryClientProvider, { client }, children);
  };
}

describe('useAuthLoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(AuthApi.login).mockResolvedValue({ id: 'u1', name: 'Admin', email: 'admin@example.com', role: 'ADMIN' });
    vi.mocked(AuthApi.loginDemo).mockResolvedValue({ id: 'u1', name: 'Manager', email: 'manager@example.com', role: 'MANAGER' });
  });

  it('keeps one idempotency key for a retry and clears it after success', async () => {
    vi.mocked(AuthApi.login)
      .mockRejectedValueOnce(new AuthApiError('Invalid email or password.'))
      .mockResolvedValueOnce({ id: 'u1', name: 'Admin', email: 'admin@example.com', role: 'ADMIN' });

    const { result } = renderHook(() => useAuthLoginForm(), { wrapper: createWrapper() });
    const credentials = { email: 'admin@example.com', password: 'demo123' };

    await result.current.handleLoginSubmit(credentials);
    await waitFor(() => expect(result.current.form.formState.errors.root?.message).toBe('Invalid email or password.'));
    const firstKey = vi.mocked(AuthApi.login).mock.calls[0]?.[1];

    await result.current.handleLoginSubmit(credentials);
    await waitFor(() => expect(replaceMock).toHaveBeenCalled());
    const secondKey = vi.mocked(AuthApi.login).mock.calls[1]?.[1];
    expect(firstKey).toBe(secondKey);
    expect(firstKey).toEqual(expect.any(String));
  });


  it('generates a new idempotency key when the submitted credential intent changes', async () => {
    let callCount = 0;
    vi.mocked(AuthApi.login).mockImplementation(async () => {
      callCount += 1;
      if (callCount === 1) throw new AuthApiError('Invalid email or password.');
      return { id: 'u1', name: 'Admin', email: 'admin@example.com', role: 'ADMIN' };
    });

    const { result } = renderHook(() => useAuthLoginForm(), { wrapper: createWrapper() });
    await result.current.handleLoginSubmit({ email: 'admin@example.com', password: 'demo123' });
    const firstKey = vi.mocked(AuthApi.login).mock.calls[0]?.[1];

    await result.current.handleLoginSubmit({ email: 'admin@example.com', password: 'different123' });
    await waitFor(() => expect(replaceMock).toHaveBeenCalled());
    const secondKey = vi.mocked(AuthApi.login).mock.calls[1]?.[1];

    expect(firstKey).toEqual(expect.any(String));
    expect(secondKey).toEqual(expect.any(String));
    expect(secondKey).not.toBe(firstKey);
  });

  it('generates a new idempotency key when a demo role intent changes', async () => {
    const { result } = renderHook(() => useAuthLoginForm(), { wrapper: createWrapper() });
    await result.current.handleDemoLogin('MANAGER');
    const firstKey = vi.mocked(AuthApi.loginDemo).mock.calls[0]?.[1];
    replaceMock.mockClear();
    await result.current.handleDemoLogin('ADMIN');
    await waitFor(() => expect(replaceMock).toHaveBeenCalled());
    const secondKey = vi.mocked(AuthApi.loginDemo).mock.calls[1]?.[1];

    expect(firstKey).toEqual(expect.any(String));
    expect(secondKey).toEqual(expect.any(String));
    expect(secondKey).not.toBe(firstKey);
  });


  it('routes fingerprint preparation failures through safe form feedback without sending a request', async () => {
    const fingerprintSpy = vi.spyOn(AuthIdempotencyFingerprintUtilities, 'forLogin').mockRejectedValueOnce(new Error('crypto unavailable'));
    const { result } = renderHook(() => useAuthLoginForm(), { wrapper: createWrapper() });

    await result.current.handleLoginSubmit({ email: 'admin@example.com', password: 'demo123' });

    await waitFor(() => expect(result.current.form.formState.errors.root?.message).toBe('We could not sign you in. Please try again.'));
    expect(AuthApi.login).not.toHaveBeenCalled();
    fingerprintSpy.mockRestore();
  });

  it('routes demo idempotency-key generation failures through safe form feedback', async () => {
    const originalCrypto = globalThis.crypto;
    const failingCrypto = Object.create(originalCrypto) as Crypto;
    failingCrypto.randomUUID = () => { throw new Error('crypto unavailable'); };
    vi.stubGlobal('crypto', failingCrypto);
    const { result } = renderHook(() => useAuthLoginForm(), { wrapper: createWrapper() });

    await result.current.handleDemoLogin('MANAGER');

    await waitFor(() => expect(result.current.form.formState.errors.root?.message).toBe('We could not sign you in. Please try again.'));
    expect(AuthApi.loginDemo).not.toHaveBeenCalled();
    vi.stubGlobal('crypto', originalCrypto);
  });

  it('does not submit Login when Ctrl/Cmd+S originates outside the active Login form', async () => {
    const { result } = renderHook(() => useAuthLoginForm(), { wrapper: createWrapper() });
    const event = new KeyboardEvent('keydown', { key: 's', ctrlKey: true, bubbles: true, cancelable: true });
    document.body.dispatchEvent(event);
    await waitFor(() => expect(AuthApi.login).not.toHaveBeenCalled());
    expect(event.defaultPrevented).toBe(false);
    expect(result.current.form.formState.errors.root).toBeUndefined();
  });

  it('fills the documented role fixture and uses the same submit flow for demo login', async () => {
    const { result } = renderHook(() => useAuthLoginForm(), { wrapper: createWrapper() });
    await result.current.handleDemoLogin('MANAGER');

    await waitFor(() => expect(AuthApi.loginDemo).toHaveBeenCalledWith('MANAGER', expect.any(String)));
  });
});
