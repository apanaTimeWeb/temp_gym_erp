/**
 * @description Canonical TanStack Query keys for Superadmin Gyms, including list filters and resource identity.
 * @invariant Different gym IDs and different list parameter sets never share cache entries.
 */
export const SUPERADMIN_GYMS_QUERY_KEYS = {
  all: ['superadmin_gyms'] as const,
  list: (queryParams: Readonly<Record<string, string>>) => ['superadmin_gyms', 'list', queryParams] as const,
  detail: (gymId: string) => ['superadmin_gyms', 'detail', gymId] as const,
  businessControls: ['superadmin_gyms', 'business-controls'] as const,
  subscriptionPlans: ['superadmin_gyms', 'subscription-plans'] as const,
  detailBusinessOverview: (gymId: string) => ['superadmin_gyms', 'detail-business-overview', gymId] as const,
} as const;
