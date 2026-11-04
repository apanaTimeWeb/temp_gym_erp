import { StatusCodes } from 'http-status-codes';

import { http, HttpResponse } from 'msw';

import { env } from '@/config/env';

import { AuthErrorConstants } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/constants/AuthSessionStatusRefreshAndRestoreErrorConstants';

import { AuthResponseMessages } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/constants/AuthSessionStatusRefreshAndRestoreResponseMessages';

import { AuthSessionConstants } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/constants/AuthSessionStatusRefreshAndRestoreSessionConstants';

import { AuthMockFixturesApi } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/mocks/fixtures/AuthSessionStatusRefreshAndRestoreMockFixturesApi';

import { AuthLoginCredentialsSchema } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/schemas/AuthSessionStatusRefreshAndRestoreSchema';

import { AuthUrlConfig } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/config/auth_session_status_refresh_and_restore.url_config';

import { AuthIdempotencyFingerprintUtilities } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/utils/AuthSessionStatusRefreshAndRestoreIdempotencyFingerprintUtilities';

// RESPONSIBILITY: Owns the module-owned upstream credential-login MSW handler used by Auth server-transport tests.

// RESPONSIBILITY: Owns the module-owned upstream credential-login MSW behavior without exposing it outside Auth mocks.

export const AuthMockBackendLoginHandlers = [

  http.post(`${env.NEXT_PUBLIC_API_URL}${AuthUrlConfig.BACKEND_API.LOGIN}`, async ({ request }) => {
    const rawPayload: unknown = await request.json().catch(() => null);
    const parsed = AuthLoginCredentialsSchema.safeParse(rawPayload);
    if (!parsed.success) {
      return HttpResponse.json(
        {
          success: false,
          message: AuthErrorConstants.MESSAGE.INVALID_INPUT,
          data: null,
          error: AuthErrorConstants.NAME.VALIDATION,
          errorCode: AuthErrorConstants.CODE.INVALID_INPUT,
          statusCode: StatusCodes.BAD_REQUEST,
        },
        { status: StatusCodes.BAD_REQUEST },
      );
    }

    const user = AuthMockFixturesApi.findByCredentials(parsed.data.email, parsed.data.password);
    if (!user) {
      return HttpResponse.json(
        {
          success: false,
          message: AuthErrorConstants.MESSAGE.INVALID_CREDENTIALS,
          data: null,
          error: AuthErrorConstants.NAME.AUTHENTICATION_FAILED,
          errorCode: AuthErrorConstants.CODE.BACKEND_REJECTED,
          statusCode: StatusCodes.UNAUTHORIZED,
        },
        { status: StatusCodes.UNAUTHORIZED },
      );
    }

    const idempotencyKey = request.headers.get(AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY)?.trim() || null;
    const fingerprint = await AuthIdempotencyFingerprintUtilities.forLogin(parsed.data);
    if (idempotencyKey) {
      const session = AuthMockFixturesApi.issueSessionForIntent(user, idempotencyKey, fingerprint);
      if (!session) {
        return HttpResponse.json(
          {
            success: false,
            message: AuthErrorConstants.MESSAGE.IDEMPOTENCY_CONFLICT,
            data: null,
            error: AuthErrorConstants.NAME.CONFLICT,
            errorCode: AuthErrorConstants.CODE.IDEMPOTENCY_CONFLICT,
            statusCode: StatusCodes.CONFLICT,
          },
          { status: StatusCodes.CONFLICT },
        );
      }
      return HttpResponse.json({ success: true, message: AuthResponseMessages.LOGIN_SUCCESS, data: session });
    }

    return HttpResponse.json({
      success: true,
      message: AuthResponseMessages.LOGIN_SUCCESS,
      data: AuthMockFixturesApi.issueSession(user),
    });
  }),
] as const;
