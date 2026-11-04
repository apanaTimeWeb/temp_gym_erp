import { describe, expect, it, vi } from 'vitest';

import { AuthApiError } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/api/AuthLoginCredentialsAndDemoAccessApiError';

import { AuthErrorConstants } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessErrorConstants';

import { AuthLoginErrorMessageUtilities } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/utils/AuthLoginCredentialsAndDemoAccessLoginErrorMessageUtilities';



describe('AuthLoginErrorMessageUtilities', () => {
  const translate = vi.fn((key: string) => `translated:${key}`);

  it('maps a recognized machine code to a module-owned safe message', () => {
    const error = new AuthApiError('Backend says no; internal detail', AuthErrorConstants.CODE.BACKEND_REJECTED);
    expect(AuthLoginErrorMessageUtilities.getSafeMessage(error, translate)).toBe(AuthErrorConstants.MESSAGE.INVALID_CREDENTIALS);
  });

  it('never exposes an arbitrary upstream message, even when its error code is unknown', () => {
    const error = new AuthApiError('secret upstream stack and token', 'UPSTREAM.INTERNAL.DETAIL');
    expect(AuthLoginErrorMessageUtilities.getSafeMessage(error, translate)).toBe('translated:ERRORS.UNAVAILABLE');
  });

  it('uses the translated fallback for arbitrary messages without a machine code', () => {
    expect(AuthLoginErrorMessageUtilities.getSafeMessage(new AuthApiError('private upstream details'), translate)).toBe('translated:ERRORS.UNAVAILABLE');
  });

  it('uses the mapped safe message for recognized upstream-unavailable codes', () => {
    expect(AuthLoginErrorMessageUtilities.getSafeMessage(new AuthApiError('any upstream message', AuthErrorConstants.CODE.UPSTREAM_UNAVAILABLE), translate)).toBe(AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE);
    expect(AuthLoginErrorMessageUtilities.getSafeMessage(new Error('secret'), translate)).toBe('translated:ERRORS.UNAVAILABLE');
  });
});
