// RESPONSIBILITY: Login-owned frozen server error, role, cookie, message and demo-runtime contracts.
// Verified against the original Auth session constants in RBG02; do not change wire values.
import { z } from 'zod';

export const AuthLoginRoleConstants = { SUPERADMIN:'SUPERADMIN', ADMIN:'ADMIN', MANAGER:'MANAGER', TRAINER:'TRAINER' } as const;
export const AuthLoginSessionConstants = {
  PASSWORD_MIN_LENGTH: 6,
  COOKIES: { ACCESS_TOKEN:'gymsmart_token', REFRESH_TOKEN:'gymsmart_refresh_token', USER:'gymsmart_user' },
  HEADERS: { IDEMPOTENCY_KEY:'Idempotency-Key', CONTENT_TYPE:'Content-Type', CONTENT_TYPE_JSON:'application/json' },
  MAX_AGE_SECONDS: { ACCESS_TOKEN: 15*60, REFRESH_TOKEN:7*24*60*60 },
} as const;
export const AuthLoginErrorConstants = {
  NAME: { NOT_FOUND:'NOT_FOUND', CONFLICT:'CONFLICT', VALIDATION:'VALIDATION_ERROR', AUTHENTICATION_FAILED:'AUTHENTICATION_FAILED', UPSTREAM_UNAVAILABLE:'UPSTREAM_UNAVAILABLE' },
  CODE: { INVALID_REQUEST:'AUTH.LOGIN.INVALID_REQUEST', INVALID_INPUT:'AUTH.LOGIN.INVALID_INPUT', BACKEND_REJECTED:'AUTH.LOGIN.BACKEND_REJECTED', UPSTREAM_UNAVAILABLE:'AUTH.LOGIN.UPSTREAM_UNAVAILABLE', IDEMPOTENCY_REQUIRED:'AUTH.REQUEST.IDEMPOTENCY_REQUIRED', IDEMPOTENCY_CONFLICT:'AUTH.REQUEST.IDEMPOTENCY_CONFLICT', DEMO_DISABLED:'AUTH.DEMO.DISABLED' },
  MESSAGE: { INVALID_REQUEST:'Invalid login request.', INVALID_INPUT:'Please correct the highlighted fields.', INVALID_CREDENTIALS:'Invalid email or password.', UPSTREAM_UNAVAILABLE:'Authentication service is temporarily unavailable. Please try again.', IDEMPOTENCY_REQUIRED:'This authentication request could not be completed safely. Please try again.', IDEMPOTENCY_CONFLICT:'This authentication request was already used for a different action.', DEMO_DISABLED:'Development demo login is disabled.' },
} as const;
export const AuthLoginResponseMessages = { LOGIN_SUCCESS:'Login successful' } as const;
const serverEnvSchema = z.object({ NODE_ENV:z.enum(['development','test','production']).default('production'), AUTH_DEMO_MODE:z.enum(['true','false']).default('false') });
function serverEnv() { return serverEnvSchema.parse({ NODE_ENV:process.env.NODE_ENV || 'production', AUTH_DEMO_MODE:process.env.AUTH_DEMO_MODE || 'false' }); }
export const AuthLoginServerRuntimeConfig = {
  isProduction():boolean { return serverEnv().NODE_ENV==='production'; },
  isLoginDemoEnabled():boolean { const e=serverEnv(); return e.NODE_ENV!=='production' && e.AUTH_DEMO_MODE==='true'; },
} as const;
