/**
 * RESPONSIBILITY: Owns authentication cookie names, request-header names, authorization prefixes, and session lifetime configuration.
 * DATA FLOW: Auth clients/routes -> AuthSessionConstants -> cookie/header request behavior.
 */
export const AuthSessionConstants = {
  PASSWORD_MIN_LENGTH: 6,
  COOKIES: {
    ACCESS_TOKEN: 'gymsmart_token',
    REFRESH_TOKEN: 'gymsmart_refresh_token',
    USER: 'gymsmart_user',
    GHOST_ORIGINAL_ACCESS_TOKEN: 'gymsmart_ghost_original_access_token',
    GHOST_ORIGINAL_REFRESH_TOKEN: 'gymsmart_ghost_original_refresh_token',
    GHOST_ORIGINAL_USER: 'gymsmart_ghost_original_user',
  },
  HEADERS: {
    IDEMPOTENCY_KEY: 'Idempotency-Key',
    AUTHORIZATION: 'Authorization',
    CONTENT_TYPE: 'Content-Type',
    CONTENT_TYPE_JSON: 'application/json',
  },
  AUTHORIZATION_PREFIX: 'Bearer ',
  MAX_AGE_SECONDS: {
    ACCESS_TOKEN: 15 * 60,
    REFRESH_TOKEN: 7 * 24 * 60 * 60,
  },
} as const;
