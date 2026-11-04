// RESPONSIBILITY: Owns the secure ghost-login restore action and consumes the stashed original session material.
import { StatusCodes } from 'http-status-codes';

import { AuthErrorConstants } from '@/app/frontend_auth/auth_session/session_ghost_restoration/constants/AuthSessionGhostRestorationErrorConstants';

import { AuthResponseMessages } from '@/app/frontend_auth/auth_session/session_ghost_restoration/constants/AuthSessionGhostRestorationResponseMessages';

import { AuthSessionConstants } from '@/app/frontend_auth/auth_session/session_ghost_restoration/constants/AuthSessionGhostRestorationSessionConstants';

import { AuthApiResponseUtilities } from '@/app/frontend_auth/auth_session/session_ghost_restoration/utils/AuthSessionGhostRestorationApiResponseUtilities';

import { AuthCookieUtilities } from '@/app/frontend_auth/auth_session/session_ghost_restoration/utils/AuthSessionGhostRestorationCookieUtilities';

import { AuthRequestHeaderUtilities } from '@/app/frontend_auth/auth_session/session_ghost_restoration/utils/AuthSessionGhostRestorationRequestHeaderUtilities';

import type { NextRequest } from 'next/server';



export async function POST(request: NextRequest) {
  // Restoration mutates cookies and therefore requires the same UUIDv4 key as other mutations.
  if (!AuthRequestHeaderUtilities.getIdempotencyKey(request)) {
    return AuthApiResponseUtilities.failure(
      AuthErrorConstants.MESSAGE.IDEMPOTENCY_REQUIRED,
      StatusCodes.BAD_REQUEST,
      AuthErrorConstants.NAME.VALIDATION,
      AuthErrorConstants.CODE.IDEMPOTENCY_REQUIRED,
    );
  }
  const accessToken = request.cookies.get(AuthSessionConstants.COOKIES.GHOST_ORIGINAL_ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(AuthSessionConstants.COOKIES.GHOST_ORIGINAL_REFRESH_TOKEN)?.value;
  const userJson = request.cookies.get(AuthSessionConstants.COOKIES.GHOST_ORIGINAL_USER)?.value;

  if (!accessToken || !refreshToken) {
    return AuthApiResponseUtilities.failure(
      AuthErrorConstants.MESSAGE.GHOST_NO_SESSION,
      StatusCodes.UNAUTHORIZED,
      AuthErrorConstants.NAME.UNAUTHORIZED,
      AuthErrorConstants.CODE.GHOST_NO_ORIGINAL_SESSION,
    );
  }

  const response = AuthApiResponseUtilities.success(AuthResponseMessages.GHOST_RESTORED, null);
  AuthCookieUtilities.restoreOriginalGhostSession(response, accessToken, refreshToken, userJson);
  return response;
}
