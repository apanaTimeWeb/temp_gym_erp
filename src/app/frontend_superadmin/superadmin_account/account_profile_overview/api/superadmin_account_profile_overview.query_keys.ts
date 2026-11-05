/**
 * @description Canonical TanStack Query key registry for the superadmin profile feature.
 * @invariant Query identity must preserve the owning resource and all request-shaping parameters.
 */
export const SUPERADMIN_ACCOUNT_PROFILE_QUERY_KEYS = {
  all: ['superadmin_account_profile', 'profile'] as const,
} as const;
