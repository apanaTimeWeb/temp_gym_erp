// RESPONSIBILITY: Owns the secure credential-login gateway, backend/mock authentication contract, and HTTP-only session cookie issuance.
import { StatusCodes } from 'http-status-codes';

import { logger } from '@/lib/logger';

import { AuthLoginRawResponseTransportCompatibility as AuthBackendTransport } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/api/AuthLoginCredentialsAndDemoAccessCompatibilityBridges';

import { AuthLoginErrorConstants as AuthErrorConstants } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessServerConstants';

import { AuthLoginResponseMessages as AuthResponseMessages } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessServerConstants';

import { AuthLoginServerRuntimeConfig as AuthServerRuntimeConfig } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessServerConstants';

import { AuthLoginSessionConstants as AuthSessionConstants } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessServerConstants';

import { AuthLoginDemoSessionCompatibility as AuthMockFixturesApi } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/api/AuthLoginCredentialsAndDemoAccessCompatibilityBridges';

import { AuthBackendLoginResponseSchema, AuthLoginCredentialsSchema } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/schemas/AuthLoginCredentialsAndDemoAccessServerSchemas';

import { AuthLoginServerUrlConfig as AuthUrlConfig } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/config/auth_login_credentials_and_demo_access.url_config';

import { AuthLoginResponseUtilities as AuthApiResponseUtilities } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/utils/AuthLoginCredentialsAndDemoAccessServerResponsesAndCookies';

import { AuthLoginCookieUtilities as AuthCookieUtilities } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/utils/AuthLoginCredentialsAndDemoAccessServerResponsesAndCookies';

import { AuthLoginIdempotencyFingerprintUtilities as AuthIdempotencyFingerprintUtilities } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/utils/AuthLoginCredentialsAndDemoAccessSecurityUtilities';

import { AuthLoginRequestHeaderUtilities as AuthRequestHeaderUtilities } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/utils/AuthLoginCredentialsAndDemoAccessSecurityUtilities';

import { AuthLoginValidationUtilities as AuthValidationUtilities } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/utils/AuthLoginCredentialsAndDemoAccessSecurityUtilities';

import type { NextRequest } from 'next/server';



export async function POST(request: NextRequest) {
  const idempotencyKey = AuthRequestHeaderUtilities.getIdempotencyKey(request);
  if (!idempotencyKey) {
    return AuthApiResponseUtilities.failure(
      AuthErrorConstants.MESSAGE.IDEMPOTENCY_REQUIRED,
      StatusCodes.BAD_REQUEST,
      AuthErrorConstants.NAME.VALIDATION,
      AuthErrorConstants.CODE.IDEMPOTENCY_REQUIRED,
    );
  }

  let rawPayload: unknown;
  try {
    rawPayload = await request.json();
  } catch {
    logger.error('Auth backend session request failed', {
      route: AuthUrlConfig.PROXY_API.SESSION,
      module: 'auth/session',
      timestamp: new Date().toISOString(),
    });
    return AuthApiResponseUtilities.failure(
      AuthErrorConstants.MESSAGE.INVALID_REQUEST,
      StatusCodes.BAD_REQUEST,
      AuthErrorConstants.NAME.VALIDATION,
      AuthErrorConstants.CODE.INVALID_REQUEST,
    );
  }

  const parsedPayload = AuthLoginCredentialsSchema.safeParse(rawPayload);
  if (!parsedPayload.success) {
    return AuthApiResponseUtilities.failure(
      AuthErrorConstants.MESSAGE.INVALID_INPUT,
      StatusCodes.BAD_REQUEST,
      AuthErrorConstants.NAME.VALIDATION,
      AuthErrorConstants.CODE.INVALID_INPUT,
      AuthValidationUtilities.toValidationErrors(parsedPayload.error.issues),
    );
  }

  const { email, password } = parsedPayload.data;

  if (AuthServerRuntimeConfig.isLoginDemoEnabled()) {
    const demoUser = AuthMockFixturesApi.findByCredentials(email, password);
    if (demoUser) {
      const sessionFingerprint = await AuthIdempotencyFingerprintUtilities.forLogin({ email, password });
      const session = AuthMockFixturesApi.issueSessionForIntent(demoUser, idempotencyKey, sessionFingerprint);
      if (!session) {
        return AuthApiResponseUtilities.failure(
          AuthErrorConstants.MESSAGE.IDEMPOTENCY_CONFLICT,
          StatusCodes.CONFLICT,
          AuthErrorConstants.NAME.CONFLICT,
          AuthErrorConstants.CODE.IDEMPOTENCY_CONFLICT,
        );
      }
      const { accessToken, refreshToken } = session;
      const response = AuthApiResponseUtilities.success(AuthResponseMessages.LOGIN_SUCCESS, demoUser);
      AuthCookieUtilities.setSession(response, accessToken, refreshToken, demoUser);
      return response;
    }
  }

  try {
    const backendHeaders = { [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: idempotencyKey };
    const { response: backendResponse, payload } = await AuthBackendTransport.post(
      AuthUrlConfig.BACKEND_API.LOGIN,
      { email, password },
      backendHeaders,
    );

    const parsedBackend = AuthBackendLoginResponseSchema.safeParse(payload);

    if (!parsedBackend.success) {
      return AuthApiResponseUtilities.failure(
        AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE,
        StatusCodes.BAD_GATEWAY,
        AuthErrorConstants.NAME.UPSTREAM_UNAVAILABLE,
        AuthErrorConstants.CODE.UPSTREAM_UNAVAILABLE,
      );
    }

    if (parsedBackend.data.success !== backendResponse.ok) {
      return AuthApiResponseUtilities.failure(
        AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE,
        StatusCodes.BAD_GATEWAY,
        AuthErrorConstants.NAME.UPSTREAM_UNAVAILABLE,
        AuthErrorConstants.CODE.UPSTREAM_UNAVAILABLE,
      );
    }

    if (!backendResponse.ok && parsedBackend.data.statusCode !== backendResponse.status) {
      return AuthApiResponseUtilities.failure(
        AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE,
        StatusCodes.BAD_GATEWAY,
        AuthErrorConstants.NAME.UPSTREAM_UNAVAILABLE,
        AuthErrorConstants.CODE.UPSTREAM_UNAVAILABLE,
      );
    }

    if (!backendResponse.ok) {
      const responseStatus = backendResponse.status >= StatusCodes.BAD_REQUEST && backendResponse.status < StatusCodes.INTERNAL_SERVER_ERROR
        ? backendResponse.status
        : StatusCodes.BAD_GATEWAY;
      const safeMessage = responseStatus === StatusCodes.BAD_REQUEST
        ? AuthErrorConstants.MESSAGE.INVALID_INPUT
        : responseStatus === StatusCodes.UNAUTHORIZED || responseStatus === StatusCodes.FORBIDDEN
          ? AuthErrorConstants.MESSAGE.INVALID_CREDENTIALS
          : AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE;
      const safeStatus = responseStatus === StatusCodes.BAD_REQUEST
        || responseStatus === StatusCodes.UNAUTHORIZED
        || responseStatus === StatusCodes.FORBIDDEN
        ? responseStatus
        : StatusCodes.BAD_GATEWAY;
      const safeCode = safeStatus === StatusCodes.BAD_REQUEST
        ? AuthErrorConstants.CODE.INVALID_INPUT
        : safeStatus === StatusCodes.UNAUTHORIZED || safeStatus === StatusCodes.FORBIDDEN
          ? AuthErrorConstants.CODE.BACKEND_REJECTED
          : AuthErrorConstants.CODE.UPSTREAM_UNAVAILABLE;
      return AuthApiResponseUtilities.failure(
        safeMessage,
        safeStatus,
        safeStatus === StatusCodes.BAD_GATEWAY
          ? AuthErrorConstants.NAME.UPSTREAM_UNAVAILABLE
          : AuthErrorConstants.NAME.AUTHENTICATION_FAILED,
        safeCode,
      );
    }

    if (!parsedBackend.data.data) {
      return AuthApiResponseUtilities.failure(
        AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE,
        StatusCodes.BAD_GATEWAY,
        AuthErrorConstants.NAME.UPSTREAM_UNAVAILABLE,
        AuthErrorConstants.CODE.UPSTREAM_UNAVAILABLE,
      );
    }

    const response = AuthApiResponseUtilities.success(AuthResponseMessages.LOGIN_SUCCESS, parsedBackend.data.data.user);
    AuthCookieUtilities.setSession(
      response,
      parsedBackend.data.data.accessToken,
      parsedBackend.data.data.refreshToken,
      parsedBackend.data.data.user,
    );
    return response;
  } catch {
    return AuthApiResponseUtilities.failure(
      AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE,
      StatusCodes.BAD_GATEWAY,
      AuthErrorConstants.NAME.UPSTREAM_UNAVAILABLE,
      AuthErrorConstants.CODE.UPSTREAM_UNAVAILABLE,
    );
  }
}
