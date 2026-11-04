// RESPONSIBILITY: Owns the secure session-status route and returns sanitized authentication state without token material.
import { AuthResponseMessages } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/constants/AuthSessionStatusRefreshAndRestoreResponseMessages';

import { AuthSessionConstants } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/constants/AuthSessionStatusRefreshAndRestoreSessionConstants';

import { AuthTokenStatusSchema } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/schemas/AuthSessionStatusRefreshAndRestoreSchema';

import { AuthApiResponseUtilities } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/utils/AuthSessionStatusRefreshAndRestoreApiResponseUtilities';

import { AuthSessionServerUtilities } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/utils/AuthSessionStatusRefreshAndRestoreSessionServerUtilities';

import type { NextRequest } from 'next/server';



export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get(AuthSessionConstants.COOKIES.ACCESS_TOKEN)?.value;
  const user = await AuthSessionServerUtilities.resolveUser(accessToken);
  const payload = AuthTokenStatusSchema.parse({
    authenticated: Boolean(user),
    user,
  });

  return AuthApiResponseUtilities.success(AuthResponseMessages.SESSION_STATUS, payload);
}
