import { AuthServerRuntimeConfig } from '@/app/frontend_auth/auth_session/session_ghost_restoration/constants/AuthSessionGhostRestorationServerRuntimeConfig';

import { AuthSessionConstants } from '@/app/frontend_auth/auth_session/session_ghost_restoration/constants/AuthSessionGhostRestorationSessionConstants';

import { parseStoredUser } from '@/app/frontend_auth/auth_session/session_ghost_restoration/utils/AuthSessionGhostRestorationStoredUserCookieUtilities';

import type { AuthUser } from '@/app/frontend_auth/auth_session/session_ghost_restoration/types/AuthSessionGhostRestorationContracts';

import type { NextResponse } from 'next/server';

// RESPONSIBILITY: Owns secure HTTP-only Auth session cookie creation, refresh, clearing, and ghost-session restoration.

function getSecureCookieBase() {
  return {
    httpOnly: true,
    secure: AuthServerRuntimeConfig.isProduction(),
    sameSite: 'strict' as const,
    path: '/',
  };
}

/**
 * Writes the two server-owned session token cookies using one shared secure cookie policy.
 * @description Keeps token cookie security flags identical across Login and refresh flows.
 * @dependencies NextResponse and AuthSessionConstants.
 * @edge-case Development may disable the Secure flag so localhost HTTP can function; production keeps it enabled.
 */
function setAccessAndRefreshCookies(response: NextResponse, accessToken: string, refreshToken: string) {
  response.cookies.set(AuthSessionConstants.COOKIES.ACCESS_TOKEN, accessToken, {
    ...getSecureCookieBase(),
    maxAge: AuthSessionConstants.MAX_AGE_SECONDS.ACCESS_TOKEN,
  });
  response.cookies.set(AuthSessionConstants.COOKIES.REFRESH_TOKEN, refreshToken, {
    ...getSecureCookieBase(),
    maxAge: AuthSessionConstants.MAX_AGE_SECONDS.REFRESH_TOKEN,
  });
}

export const AuthCookieUtilities = {
  /**
   * Writes a complete authenticated session using HTTP-only cookies only.
   * @param response Next.js response that receives the Set-Cookie headers.
   * @param accessToken Backend-issued access token kept server-readable only.
   * @param refreshToken Backend-issued refresh token kept server-readable only.
   * @param user Sanitized identity associated with the session.
   */
  setSession(response: NextResponse, accessToken: string, refreshToken: string, user: AuthUser) {
    setAccessAndRefreshCookies(response, accessToken, refreshToken);
    response.cookies.set(AuthSessionConstants.COOKIES.USER, JSON.stringify(user), {
      ...getSecureCookieBase(),
      maxAge: AuthSessionConstants.MAX_AGE_SECONDS.REFRESH_TOKEN,
    });
  },

  /**
   * Refreshes tokens and upgrades any legacy browser-readable identity cookie to HttpOnly.
   * The identity cookie never supplies authorization; it is syntax-validated only for display compatibility.
   */
  refreshSession(response: NextResponse, accessToken: string, refreshToken: string, existingUserJson?: string) {
    setAccessAndRefreshCookies(response, accessToken, refreshToken);
    if (existingUserJson) {
      const user = parseStoredUser(existingUserJson);
      response.cookies.set(AuthSessionConstants.COOKIES.USER, user ? JSON.stringify(user) : '', {
        ...getSecureCookieBase(),
        maxAge: user ? AuthSessionConstants.MAX_AGE_SECONDS.REFRESH_TOKEN : 0,
      });
    }
  },

  /**
   * Clears active and stashed ghost-session cookies regardless of upstream logout success.
   */
  clearSession(response: NextResponse) {
    for (const cookieName of [
      AuthSessionConstants.COOKIES.ACCESS_TOKEN,
      AuthSessionConstants.COOKIES.REFRESH_TOKEN,
      AuthSessionConstants.COOKIES.USER,
      AuthSessionConstants.COOKIES.GHOST_ORIGINAL_ACCESS_TOKEN,
      AuthSessionConstants.COOKIES.GHOST_ORIGINAL_REFRESH_TOKEN,
      AuthSessionConstants.COOKIES.GHOST_ORIGINAL_USER,
    ]) {
      response.cookies.set(cookieName, '', { ...getSecureCookieBase(), maxAge: 0 });
    }
  },

  /**
   * Restores a previously stashed original session and consumes the ghost-session stash.
   * @param userJson Optional stashed user identity; it is validated before being restored.
   * @edge-case A malformed identity cookie is not copied into the active session.
   */
  restoreOriginalGhostSession(response: NextResponse, accessToken: string, refreshToken: string, userJson?: string) {
    setAccessAndRefreshCookies(response, accessToken, refreshToken);
    response.cookies.set(AuthSessionConstants.COOKIES.USER, '', { ...getSecureCookieBase(), maxAge: 0 });

    if (userJson) {
      const validatedUser = parseStoredUser(userJson);
      if (validatedUser) {
        response.cookies.set(AuthSessionConstants.COOKIES.USER, JSON.stringify(validatedUser), {
          ...getSecureCookieBase(),
              maxAge: AuthSessionConstants.MAX_AGE_SECONDS.REFRESH_TOKEN,
        });
      }
    }

    response.cookies.set(AuthSessionConstants.COOKIES.GHOST_ORIGINAL_ACCESS_TOKEN, '', { ...getSecureCookieBase(), maxAge: 0 });
    response.cookies.set(AuthSessionConstants.COOKIES.GHOST_ORIGINAL_REFRESH_TOKEN, '', { ...getSecureCookieBase(), maxAge: 0 });
    response.cookies.set(AuthSessionConstants.COOKIES.GHOST_ORIGINAL_USER, '', { ...getSecureCookieBase(), maxAge: 0 });
  },
};
