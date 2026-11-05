import { describe, expect, it } from 'vitest';
import enMessages from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/locales/en.json';
import hiMessages from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/locales/hi.json';

function flattenKeys(value: unknown, prefix = ''): string[] {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return [prefix];
  return Object.entries(value).flatMap(([key, child]) => flattenKeys(child, prefix ? `${prefix}.${key}` : key));
}

describe('Auth Login active locale parity', () => {
  it('keeps Hindi translation keys exactly aligned with English', () => {
    expect(flattenKeys(hiMessages).sort()).toEqual(flattenKeys(enMessages).sort());
  });
});
