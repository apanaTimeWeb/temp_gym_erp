import { z } from 'zod';

// RESPONSIBILITY: Owns the canonical Auth domain and API type projections derived from module-owned Zod contracts.
import {
  AuthBackendLoginDataSchema,
  AuthBackendRefreshDataSchema,
  AuthDemoLoginRequestSchema,
  AuthLoginCredentialsSchema,
  AuthPaginationMetaSchema,
  AuthRoleSchema,
  AuthSessionUserCookieSchema,
  AuthTokenStatusSchema,
  AuthUserSchema,
  AuthValidationErrorItemSchema,
} from '@/app/frontend_auth/auth_logout/logout_session_termination/schemas/AuthLogoutSessionTerminationSchema';

import type { ApiResponse } from '@/lib/api';



export type AuthUser = z.infer<typeof AuthUserSchema>;
export type AuthRole = z.infer<typeof AuthRoleSchema>;
export type AuthLoginCredentials = z.infer<typeof AuthLoginCredentialsSchema>;
export type AuthDemoLoginRequest = z.infer<typeof AuthDemoLoginRequestSchema>;
export type AuthBackendLoginData = z.infer<typeof AuthBackendLoginDataSchema>;
export type AuthBackendRefreshData = z.infer<typeof AuthBackendRefreshDataSchema>;
export type AuthSessionUserCookie = z.infer<typeof AuthSessionUserCookieSchema>;
export type AuthTokenStatus = z.infer<typeof AuthTokenStatusSchema>;
export type AuthValidationErrorItem = z.infer<typeof AuthValidationErrorItemSchema>;
export type AuthPaginationMeta = z.infer<typeof AuthPaginationMetaSchema>;

export type AuthSessionApiResponse = ApiResponse<AuthUser | null>;
export type AuthBackendLoginApiResponse = ApiResponse<AuthBackendLoginData | null>;
export type AuthBackendRefreshApiResponse = ApiResponse<AuthBackendRefreshData | null>;
export type AuthBackendUserApiResponse = ApiResponse<AuthUser | null>;
export type AuthBackendLogoutApiResponse = ApiResponse<null>;
