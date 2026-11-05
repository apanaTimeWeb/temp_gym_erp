/**
 * @description Canonical TanStack Query key registry for the superadmin affiliates feature.
 * @invariant Query identity must preserve the owning resource and all request-shaping parameters.
 */
export const SUPERADMIN_AFFILIATES_QUERY_KEYS = {
  all: ['superadmin_affiliates', 'affiliates'] as const,
  lists: () => [...SUPERADMIN_AFFILIATES_QUERY_KEYS.all, 'list'] as const,
  list: (queryParams: Readonly<Record<string, string>>) => [...SUPERADMIN_AFFILIATES_QUERY_KEYS.lists(), queryParams] as const,
  payoutHistory: ['superadmin_affiliates', 'affiliates', 'payout-history'] as const,
} as const;
