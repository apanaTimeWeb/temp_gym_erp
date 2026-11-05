// RESPONSIBILITY: Owns runtime Zod schemas for Auth requests, responses, identities, and session contracts.

import { StatusCodes } from 'http-status-codes';

import { z } from 'zod';

import { AuthRoleConstants } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/constants/AuthSessionStatusRefreshAndRestoreRoleConstants';

import { AuthSessionConstants } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/constants/AuthSessionStatusRefreshAndRestoreSessionConstants';

/**
 * Defines the module-owned Zod contracts for Auth requests, responses, identities, cookies, and session status.
 * @description These schemas are the runtime validation boundary before Auth data reaches application logic.
 * @dependencies Zod, HTTP status constants, and Auth session/role constants.
 * @edge-case Non-paginated Auth envelopes reject pagination metadata; error envelopes require a statusCode aligned with HTTP failure responses.
 */
export const AuthRoleSchema = z.enum([
  AuthRoleConstants.SUPERADMIN,
  AuthRoleConstants.ADMIN,
  AuthRoleConstants.MANAGER,
  AuthRoleConstants.TRAINER,
]);

export const AuthUserSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  role: AuthRoleSchema,
  tenantId: z.string().min(1).optional(),
});

export const AuthLoginCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(AuthSessionConstants.PASSWORD_MIN_LENGTH),
});

export const AuthDemoLoginRequestSchema = z.object({
  role: AuthRoleSchema,
});

export const AuthValidationErrorItemSchema = z.object({
  field: z.string(),
  message: z.string(),
});

export const AuthPaginationMetaSchema = z.object({
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  totalPages: z.number().int().nonnegative(),
  hasNextPage: z.boolean(),
  hasPrevPage: z.boolean(),
});

const AuthApiEnvelopeShape = {
  success: z.boolean(),
  message: z.string(),
  data: z.unknown().nullable(),
  meta: AuthPaginationMetaSchema.optional(),
  error: z.string().optional(),
  errorCode: z.string().optional(),
  statusCode: z.number().int().optional(),
  validationErrors: z.array(AuthValidationErrorItemSchema).optional(),
};

function applyCanonicalAuthEnvelopeRules<T extends z.ZodRawShape>(schema: z.ZodObject<T>) {
  return schema.superRefine((val, context) => {
    const value = val as { success?: boolean; statusCode?: number; validationErrors?: unknown; meta?: unknown };
    if (value.success && value.statusCode !== undefined) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ['statusCode'], message: 'Success responses must omit statusCode.' });
    }

    if (!value.success && value.statusCode === undefined) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ['statusCode'], message: 'Error responses must include statusCode.' });
    }

    if (value.validationErrors && value.statusCode !== StatusCodes.BAD_REQUEST) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['validationErrors'],
        message: `validationErrors are only valid on ${StatusCodes.BAD_REQUEST} responses.`,
      });
    }
  });
}

export const AuthBackendLoginDataSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
  user: AuthUserSchema,
});

export const AuthBackendRefreshDataSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1).optional(),
});

function applyNonPaginatedAuthEnvelopeRules<T extends z.ZodRawShape>(schema: z.ZodObject<T>) {
  return applyCanonicalAuthEnvelopeRules(schema).superRefine((val, context) => {
    const value = val as { success?: boolean; statusCode?: number; validationErrors?: unknown; meta?: unknown };
    if (value.meta !== undefined) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ['meta'], message: 'meta is reserved for paginated list responses.' });
    }
  });
}

export const AuthBackendLogoutResponseSchema = applyNonPaginatedAuthEnvelopeRules(z.object({
  ...AuthApiEnvelopeShape,
  data: z.null(),
}));

export const AuthBackendLoginResponseSchema = applyNonPaginatedAuthEnvelopeRules(z.object({
  ...AuthApiEnvelopeShape,
  data: AuthBackendLoginDataSchema.nullable(),
}));

export const AuthBackendUserResponseSchema = applyNonPaginatedAuthEnvelopeRules(z.object({
  ...AuthApiEnvelopeShape,
  data: AuthUserSchema.nullable(),
}));

export const AuthBackendRefreshResponseSchema = applyNonPaginatedAuthEnvelopeRules(z.object({
  ...AuthApiEnvelopeShape,
  data: AuthBackendRefreshDataSchema.nullable(),
}));

// Same-origin Auth responses are stricter than external backend response schemas above.
// Keep the upstream wire contract unchanged unless the backend is separately verified.
export const AuthSessionResponseSchema = z.discriminatedUnion('success', [
  z.object({
    success: z.literal(true), message: z.string(), data: AuthUserSchema.nullable(),
    requestId: z.string().uuid(),
    meta: AuthPaginationMetaSchema.optional(),
  }),
  z.object({
    success: z.literal(false), message: z.string(), data: z.null(),
    requestId: z.string().uuid(), error: z.string().optional(),
    errorCode: z.string(), statusCode: z.number().int().min(400).max(599),
    validationErrors: z.array(AuthValidationErrorItemSchema).optional(),
    meta: AuthPaginationMetaSchema.optional(),
  }),
]).superRefine((value, context) => {
  if ('meta' in value && (value as { meta?: unknown }).meta !== undefined) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['meta'], message: 'meta is reserved for paginated list responses.' });
  }
  if (!value.success && value.validationErrors && value.statusCode !== StatusCodes.BAD_REQUEST) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['validationErrors'], message: 'Only HTTP 400 may carry validationErrors.' });
  }
});

export const AuthSessionUserCookieSchema = AuthUserSchema;
export const AuthTokenStatusSchema = z.object({
  authenticated: z.boolean(),
  user: AuthUserSchema.nullable(),
});
