import { NextResponse } from 'next/server';

import { afterEach, describe, expect, it, vi } from 'vitest';

import { AuthSessionConstants } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/constants/AuthSessionStatusRefreshAndRestoreSessionConstants';

import { AuthCookieUtilities } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/utils/AuthSessionStatusRefreshAndRestoreCookieUtilities';



describe('AuthCookieUtilities', () => {
  afterEach(() => vi.unstubAllEnvs());
  const user = { id: 'u1', name: 'Admin', email: 'admin@example.com', role: 'ADMIN' as const };

  it('writes access, refresh, and user cookies as HTTP-only', () => {
    const response = NextResponse.json({});
    AuthCookieUtilities.setSession(response, 'access-1', 'refresh-1', user);
    const cookieHeader = response.headers.get('set-cookie') ?? '';

    expect(cookieHeader).toContain(`${AuthSessionConstants.COOKIES.ACCESS_TOKEN}=access-1`);
    expect(cookieHeader).toContain(`${AuthSessionConstants.COOKIES.REFRESH_TOKEN}=refresh-1`);
    expect(cookieHeader).toContain(`${AuthSessionConstants.COOKIES.USER}=`);
    expect(cookieHeader).toContain('HttpOnly');
    for (const name of [AuthSessionConstants.COOKIES.ACCESS_TOKEN, AuthSessionConstants.COOKIES.REFRESH_TOKEN, AuthSessionConstants.COOKIES.USER]) {
      expect(response.cookies.get(name)?.httpOnly).toBe(true);
    }
  });


  it('marks session cookies Secure in production', () => {
    vi.stubEnv('NODE_ENV', 'production');
    const response = NextResponse.json({});
    AuthCookieUtilities.setSession(response, 'access-secure', 'refresh-secure', user);
    const cookieHeader = response.headers.get('set-cookie') ?? '';

    expect(cookieHeader).toContain(`${AuthSessionConstants.COOKIES.ACCESS_TOKEN}=access-secure`);
    expect(cookieHeader).toContain(`${AuthSessionConstants.COOKIES.REFRESH_TOKEN}=refresh-secure`);
    expect(cookieHeader.match(/Secure/gi)?.length).toBeGreaterThanOrEqual(2);
  });

  it('upgrades a legacy client-readable identity cookie during refresh', () => {
    const response = NextResponse.json({});
    AuthCookieUtilities.refreshSession(response, 'new-access', 'new-refresh', JSON.stringify(user));
    expect(response.cookies.get(AuthSessionConstants.COOKIES.USER)?.httpOnly).toBe(true);
    expect(response.cookies.get(AuthSessionConstants.COOKIES.USER)?.value).toContain('admin@example.com');
  });

  it('does not perpetuate an invalid identity cookie during refresh', () => {
    const response = NextResponse.json({});
    AuthCookieUtilities.refreshSession(response, 'new-access', 'new-refresh', '{not-json');
    expect(response.cookies.get(AuthSessionConstants.COOKIES.USER)?.value).toBe('');
    expect(response.cookies.get(AuthSessionConstants.COOKIES.USER)?.maxAge).toBe(0);
  });

  it('does not restore malformed ghost user identity', () => {
    const response = NextResponse.json({});
    AuthCookieUtilities.restoreOriginalGhostSession(response, 'access-2', 'refresh-2', '{"role":"SUPERADMIN"}');
    const cookieHeader = response.headers.get('set-cookie') ?? '';

    expect(cookieHeader).toContain(`${AuthSessionConstants.COOKIES.ACCESS_TOKEN}=access-2`);
    expect(cookieHeader).toContain(`${AuthSessionConstants.COOKIES.REFRESH_TOKEN}=refresh-2`);
    expect(cookieHeader).toContain(`${AuthSessionConstants.COOKIES.GHOST_ORIGINAL_ACCESS_TOKEN}=`);
    expect(cookieHeader).toContain(`${AuthSessionConstants.COOKIES.GHOST_ORIGINAL_REFRESH_TOKEN}=`);
    expect(cookieHeader).toContain(`${AuthSessionConstants.COOKIES.GHOST_ORIGINAL_USER}=`);
    // A restored identity must never be browser-readable.
    expect(response.cookies.get(AuthSessionConstants.COOKIES.USER)?.httpOnly).toBe(true);
    expect(cookieHeader).not.toContain(`${AuthSessionConstants.COOKIES.USER}=%7B%22role%22%3A%22SUPERADMIN%22%7D`);
  });

  it('clears all locally owned Auth cookies', () => {
    const response = NextResponse.json({});
    AuthCookieUtilities.clearSession(response);
    const cookieHeader = response.headers.get('set-cookie') ?? '';
    expect(cookieHeader).toContain(`${AuthSessionConstants.COOKIES.ACCESS_TOKEN}=`);
    expect(cookieHeader).toContain(`${AuthSessionConstants.COOKIES.REFRESH_TOKEN}=`);
    expect(cookieHeader).toContain(`${AuthSessionConstants.COOKIES.USER}=`);
    for (const name of [AuthSessionConstants.COOKIES.GHOST_ORIGINAL_ACCESS_TOKEN, AuthSessionConstants.COOKIES.GHOST_ORIGINAL_REFRESH_TOKEN, AuthSessionConstants.COOKIES.GHOST_ORIGINAL_USER]) {
      expect(response.cookies.get(name)?.maxAge).toBe(0);
    }
  });
  it('clears the active identity cookie when ghost user data is invalid', () => {
    const response = new NextResponse();
    AuthCookieUtilities.restoreOriginalGhostSession(
      response,
      'restored-access',
      'restored-refresh',
      '{invalid-json',
    );

    const setCookieHeader = response.headers.get('set-cookie') ?? '';
    expect(setCookieHeader).toContain(`${AuthSessionConstants.COOKIES.USER}=;`);
  });
});
