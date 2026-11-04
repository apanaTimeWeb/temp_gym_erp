import { describe, expect, it } from 'vitest';

import { AuthLoginFormTranslationKeys } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessLoginConstants';

import { AuthLoginFormSchema } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/schemas/AuthLoginCredentialsAndDemoAccessLoginFormSchema';



describe('AuthLoginFormSchema', () => {
  it('uses translated validation messages and blocks invalid credentials', () => {
    const schema = AuthLoginFormSchema((key) => ({
      [AuthLoginFormTranslationKeys.EMAIL_INVALID]: 'Translated email error',
      [AuthLoginFormTranslationKeys.PASSWORD_MIN_LENGTH]: 'Translated password error',
    }[key]));

    const parsed = schema.safeParse({ email: 'bad', password: '123' });
    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      expect(parsed.error.issues.map((issue) => issue.message)).toEqual([
        'Translated email error',
        'Translated password error',
      ]);
    }
  });
});
