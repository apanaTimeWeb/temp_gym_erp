/** Canonical TanStack Query keys for the active Usage Meters read flow. */
export const SUPERADMIN_BILLING_USAGE_METERS_QUERY_KEYS = {
  all: ['superadmin_billing_usage_meters'] as const,
  list: (params: Readonly<Record<string, string>>) => ['superadmin_billing_usage_meters', 'list', params] as const,
} as const;
