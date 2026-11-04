import { StatusCodes } from 'http-status-codes';

import { http, HttpResponse } from 'msw';

import { AuthErrorConstants } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessErrorConstants';

import { AuthUrlConfig } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/config/auth_login_credentials_and_demo_access.url_config';

// RESPONSIBILITY: Owns deterministic browser-facing Auth MSW error/scenario handlers used to exercise Login recovery flows.

export const AuthMockBrowserScenarioHandlers = {
  unavailableLogin: http.post(AuthUrlConfig.PROXY_API.SESSION, () => HttpResponse.json(
    {
      success: false,
      message: AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE,
      data: null,
      error: AuthErrorConstants.NAME.UPSTREAM_UNAVAILABLE,
      errorCode: AuthErrorConstants.CODE.UPSTREAM_UNAVAILABLE,
      statusCode: StatusCodes.BAD_GATEWAY,
    },
    { status: StatusCodes.BAD_GATEWAY },
  )),
} as const;
