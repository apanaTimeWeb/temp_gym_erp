// RESPONSIBILITY: Owns the development-only role demo-login gateway and server-side demo-session issuance.
import { StatusCodes } from 'http-status-codes';

import { AuthLoginErrorConstants as AuthErrorConstants } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessServerConstants';

import { AuthLoginResponseMessages as AuthResponseMessages } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessServerConstants';

import { AuthLoginServerRuntimeConfig as AuthServerRuntimeConfig } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessServerConstants';

import { AuthLoginDemoSessionCompatibility as AuthMockFixturesApi } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/api/AuthLoginCredentialsAndDemoAccessCompatibilityBridges';

import { AuthDemoLoginRequestSchema } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/schemas/AuthLoginCredentialsAndDemoAccessServerSchemas';

import { AuthLoginResponseUtilities as AuthApiResponseUtilities } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/utils/AuthLoginCredentialsAndDemoAccessServerResponsesAndCookies';

import { AuthLoginCookieUtilities as AuthCookieUtilities } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/utils/AuthLoginCredentialsAndDemoAccessServerResponsesAndCookies';

import { AuthLoginIdempotencyFingerprintUtilities as AuthIdempotencyFingerprintUtilities } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/utils/AuthLoginCredentialsAndDemoAccessSecurityUtilities';

import { AuthLoginRequestHeaderUtilities as AuthRequestHeaderUtilities } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/utils/AuthLoginCredentialsAndDemoAccessSecurityUtilities';

import type { NextRequest } from 'next/server';



/**
 * Handles the development-only role demo session flow through the same secure cookie boundary used by Login.
 * @description Validates the role payload, enforces the server-side demo gate, applies idempotency, and returns only the sanitized user identity.
 * @dependencies AuthServerRuntimeConfig, AuthMockFixturesApi, AuthDemoLoginRequestSchema, AuthCookieUtilities, AuthApiResponseUtilities.
 * @edge-case Reusing an idempotency key with a different role is rejected instead of creating a second session.
 */
export async function POST(request: NextRequest) {
  if (!AuthServerRuntimeConfig.isLoginDemoEnabled()) {
    return AuthApiResponseUtilities.failure(
      AuthErrorConstants.MESSAGE.DEMO_DISABLED,
      StatusCodes.NOT_FOUND,
      AuthErrorConstants.NAME.NOT_FOUND,
      AuthErrorConstants.CODE.DEMO_DISABLED,
    );
  }

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
    return AuthApiResponseUtilities.failure(
      AuthErrorConstants.MESSAGE.INVALID_REQUEST,
      StatusCodes.BAD_REQUEST,
      AuthErrorConstants.NAME.VALIDATION,
      AuthErrorConstants.CODE.INVALID_REQUEST,
    );
  }

  const parsed = AuthDemoLoginRequestSchema.safeParse(rawPayload);
  if (!parsed.success) {
    return AuthApiResponseUtilities.failure(
      AuthErrorConstants.MESSAGE.INVALID_INPUT,
      StatusCodes.BAD_REQUEST,
      AuthErrorConstants.NAME.VALIDATION,
      AuthErrorConstants.CODE.INVALID_INPUT,
    );
  }

  const demoEntry = AuthMockFixturesApi.findByRole(parsed.data.role);
  const session = AuthMockFixturesApi.issueSessionForIntent(
    demoEntry.user,
    idempotencyKey,
    AuthIdempotencyFingerprintUtilities.forDemoRole(parsed.data.role),
  );

  if (!session) {
    return AuthApiResponseUtilities.failure(
      AuthErrorConstants.MESSAGE.IDEMPOTENCY_CONFLICT,
      StatusCodes.CONFLICT,
      AuthErrorConstants.NAME.CONFLICT,
      AuthErrorConstants.CODE.IDEMPOTENCY_CONFLICT,
    );
  }

  const response = AuthApiResponseUtilities.success(AuthResponseMessages.LOGIN_SUCCESS, session.user);
  AuthCookieUtilities.setSession(response, session.accessToken, session.refreshToken, session.user);
  return response;
}
