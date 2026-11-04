import { describe, expect, it } from 'vitest';
import { NextResponse } from 'next/server';
import { AuthCookieUtilities } from '@/app/frontend_auth/auth_logout/logout_session_termination/utils/AuthLogoutSessionTerminationCookieUtilities';
import { AuthSessionConstants } from '@/app/frontend_auth/auth_logout/logout_session_termination/constants/AuthLogoutSessionTerminationSessionConstants';

describe('Auth Logout local cookie cleanup', () => {
  it('expires all six active and ghost cookies using HttpOnly and strict SameSite', () => {
    const response = NextResponse.json({ success: true });
    AuthCookieUtilities.clearSession(response);
    const expected = [AuthSessionConstants.COOKIES.ACCESS_TOKEN,
      AuthSessionConstants.COOKIES.REFRESH_TOKEN, AuthSessionConstants.COOKIES.USER,
      AuthSessionConstants.COOKIES.GHOST_ORIGINAL_ACCESS_TOKEN,
      AuthSessionConstants.COOKIES.GHOST_ORIGINAL_REFRESH_TOKEN,
      AuthSessionConstants.COOKIES.GHOST_ORIGINAL_USER];
    const actual = response.cookies.getAll();
    for (const name of expected) {
      const cookie = actual.find((entry) => entry.name === name);
      expect(cookie).toBeDefined();
      expect(cookie?.value).toBe('');
    }
    const header = response.headers.get('set-cookie') ?? '';
    expect(header).toContain('HttpOnly');
    expect(header).toContain('SameSite=strict');
  });
});
