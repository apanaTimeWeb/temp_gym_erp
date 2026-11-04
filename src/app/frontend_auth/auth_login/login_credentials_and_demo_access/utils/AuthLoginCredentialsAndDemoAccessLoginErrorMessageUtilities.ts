/**
 * Maps Auth machine error codes to module-owned user-safe messages.
 * @description Never renders upstream-provided message text; unknown codes use the localized unavailable fallback.
 * @dependencies AuthApiError, AuthErrorConstants, and Login translation-key types.
 * @edge-case Missing, malformed, or unrecognized error codes never expose raw transport details.
 */
import { AuthApiError } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/api/AuthLoginCredentialsAndDemoAccessApiError';

import { AuthErrorConstants } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessErrorConstants';

import { AuthLoginFormTranslationKeys } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessLoginConstants';

import type { AuthLoginFormTranslator } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/types/AuthLoginCredentialsAndDemoAccessLoginTypes';

const SAFE_MESSAGES_BY_CODE: Readonly<Record<string, string>> = {
  [AuthErrorConstants.CODE.INVALID_REQUEST]: AuthErrorConstants.MESSAGE.INVALID_REQUEST,
  [AuthErrorConstants.CODE.INVALID_INPUT]: AuthErrorConstants.MESSAGE.INVALID_INPUT,
  [AuthErrorConstants.CODE.BACKEND_REJECTED]: AuthErrorConstants.MESSAGE.INVALID_CREDENTIALS,
  [AuthErrorConstants.CODE.IDEMPOTENCY_REQUIRED]: AuthErrorConstants.MESSAGE.IDEMPOTENCY_REQUIRED,
  [AuthErrorConstants.CODE.IDEMPOTENCY_CONFLICT]: AuthErrorConstants.MESSAGE.IDEMPOTENCY_CONFLICT,
  [AuthErrorConstants.CODE.DEMO_DISABLED]: AuthErrorConstants.MESSAGE.DEMO_DISABLED,
  [AuthErrorConstants.CODE.DEMO_INVALID_ROLE]: AuthErrorConstants.MESSAGE.DEMO_INVALID_ROLE,
  [AuthErrorConstants.CODE.UPSTREAM_UNAVAILABLE]: AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE,
  [AuthErrorConstants.CODE.RESPONSE_UNREADABLE]: AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE,
  [AuthErrorConstants.CODE.RESPONSE_INVALID]: AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE,
};

export const AuthLoginErrorMessageUtilities = {
  /**
   * Converts an Auth failure into a safe user-visible message.
   * @param error Unknown mutation failure received from the Login mutation boundary.
   * @param translate Active Login translation function used for the unavailable fallback.
   */
  getSafeMessage(error: unknown, translate: AuthLoginFormTranslator): string {
    if (error instanceof AuthApiError && error.errorCode) {
      return SAFE_MESSAGES_BY_CODE[error.errorCode] ?? translate(AuthLoginFormTranslationKeys.ERROR_UNAVAILABLE);
    }
    if (error instanceof AuthApiError && Object.values(SAFE_MESSAGES_BY_CODE).includes(error.message)) {
      return error.message;
    }
    return translate(AuthLoginFormTranslationKeys.ERROR_UNAVAILABLE);
  },
} as const;
