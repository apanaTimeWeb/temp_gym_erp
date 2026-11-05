import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse } from 'msw';
import { AuthErrorConstants } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessErrorConstants';
import { AuthResponseMessages } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessResponseMessages';
import { AuthMockPublicFixtures } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/mocks/fixtures/AuthLoginCredentialsAndDemoAccessMockPublicFixtures';
import { AuthUrlConfig } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/config/auth_login_credentials_and_demo_access.url_config';

// RESPONSIBILITY: Declares the browser-proxy MSW boundary for Auth component tests.
// DATA FLOW: Form component -> apiFetch -> browser MSW handlers -> sanitized AuthUser result.

export const AuthMockBrowserHandlers = [
  http.post(`*${AuthUrlConfig.PROXY_API.SESSION}`, async ({ request }) => {
    const raw = (await request.json().catch(() => ({}))) as { email?: string; password?: string };
    const user = Object.values(AuthMockPublicFixtures.USERS).find((u) => u.email === raw.email);
    if (!user || raw.password !== 'demo123') {
      return HttpResponse.json(
        {
          success: false,
          requestId: '9b3f161a-e3a5-41a4-9781-b33abbf4d4aa',
          message: AuthErrorConstants.MESSAGE.INVALID_CREDENTIALS,
          data: null,
          error: AuthErrorConstants.NAME.AUTHENTICATION_FAILED,
          errorCode: AuthErrorConstants.CODE.BACKEND_REJECTED,
          statusCode: StatusCodes.UNAUTHORIZED,
        },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }
    return HttpResponse.json({
      success: true,
      requestId: '9b3f161a-e3a5-41a4-9781-b33abbf4d4aa',
      message: AuthResponseMessages.LOGIN_SUCCESS,
      data: user,
    });
  }),

  http.post(`*${AuthUrlConfig.PROXY_API.DEMO_LOGIN}`, async ({ request }) => {
    const raw = (await request.json().catch(() => ({}))) as { role?: keyof typeof AuthMockPublicFixtures.USERS };
    const user = raw.role ? AuthMockPublicFixtures.USERS[raw.role] : null;
    if (!user) {
      return HttpResponse.json(
        {
          success: false,
          requestId: '9b3f161a-e3a5-41a4-9781-b33abbf4d4aa',
          message: AuthErrorConstants.MESSAGE.INVALID_REQUEST,
          data: null,
          error: AuthErrorConstants.NAME.VALIDATION,
          errorCode: AuthErrorConstants.CODE.INVALID_REQUEST,
          statusCode: StatusCodes.BAD_REQUEST,
        },
        { status: StatusCodes.BAD_REQUEST }
      );
    }
    return HttpResponse.json({
      success: true,
      requestId: '9b3f161a-e3a5-41a4-9781-b33abbf4d4aa',
      message: AuthResponseMessages.LOGIN_SUCCESS,
      data: user,
    });
  }),
];
