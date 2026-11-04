/**
 * RESPONSIBILITY: Centralizes Auth error categories, machine-readable codes, and user-safe fallback messages.
 * DATA FLOW: Auth failure -> canonical error code/category -> UI-safe error handling.
 */
export const AuthErrorConstants = {
  NAME: {
    NOT_FOUND: 'NOT_FOUND',
    CONFLICT: 'CONFLICT',
    VALIDATION: 'VALIDATION_ERROR',
    UNAUTHORIZED: 'UNAUTHORIZED',
    AUTHENTICATION_FAILED: 'AUTHENTICATION_FAILED',
    UPSTREAM_UNAVAILABLE: 'UPSTREAM_UNAVAILABLE',
    ENDPOINT_RETIRED: 'ENDPOINT_RETIRED',
    DEMO_DISABLED: 'DEMO_DISABLED',
  },
  CODE: {
    INVALID_REQUEST: 'AUTH.LOGIN.INVALID_REQUEST',
    INVALID_INPUT: 'AUTH.LOGIN.INVALID_INPUT',
    BACKEND_REJECTED: 'AUTH.LOGIN.BACKEND_REJECTED',
    UPSTREAM_UNAVAILABLE: 'AUTH.LOGIN.UPSTREAM_UNAVAILABLE',
    RESPONSE_UNREADABLE: 'AUTH.LOGIN.RESPONSE_UNREADABLE',
    RESPONSE_INVALID: 'AUTH.LOGIN.RESPONSE_INVALID',
    IDEMPOTENCY_REQUIRED: 'AUTH.REQUEST.IDEMPOTENCY_REQUIRED',
    IDEMPOTENCY_CONFLICT: 'AUTH.REQUEST.IDEMPOTENCY_CONFLICT',
    DEMO_INVALID_ROLE: 'AUTH.DEMO.INVALID_ROLE',
    DEMO_DISABLED: 'AUTH.DEMO.DISABLED',
    REFRESH_MISSING_TOKEN: 'AUTH.REFRESH.MISSING_TOKEN',
    REFRESH_REJECTED: 'AUTH.REFRESH.REJECTED',
    REFRESH_UPSTREAM_UNAVAILABLE: 'AUTH.REFRESH.UPSTREAM_UNAVAILABLE',
    GHOST_NO_ORIGINAL_SESSION: 'AUTH.GHOST_RESTORE.NO_ORIGINAL_SESSION',
    SESSION_SET_COOKIE_RETIRED: 'AUTH.SESSION.SET_COOKIE_RETIRED',
  },
  MESSAGE: {
    INVALID_REQUEST: 'Invalid login request.',
    INVALID_INPUT: 'Please correct the highlighted fields.',
    INVALID_CREDENTIALS: 'Invalid email or password.',
    SESSION_EXPIRED: 'Your session has expired. Please sign in again.',
    UPSTREAM_UNAVAILABLE: 'Authentication service is temporarily unavailable. Please try again.',
    GHOST_NO_SESSION: 'No original session is available to restore.',
    SET_COOKIE_RETIRED: 'Direct session cookie writes are disabled. Use the Auth session endpoint.',
    IDEMPOTENCY_REQUIRED: 'This authentication request could not be completed safely. Please try again.',
    IDEMPOTENCY_CONFLICT: 'This authentication request was already used for a different action.',
    DEMO_DISABLED: 'Development demo login is disabled.',
    DEMO_INVALID_ROLE: 'The selected demo role is not available.',
  },
} as const;
