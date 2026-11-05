/**
 * @description Canonical TanStack Query key registry for the Superadmin Dashboard feature.
 * @invariant Query identity preserves the selected date range in server-state keys.
 */
export const SUPERADMIN_DASHBOARD_QUERY_KEYS = {
  all: ['superadmin_dashboard', 'dashboard'] as const,
  byRange: (timeRange: string, startDate: string, endDate: string) => ['superadmin_dashboard', 'dashboard', timeRange, startDate, endDate] as const,
  businessOverview: ['superadmin_dashboard', 'dashboard_business_overview'] as const,
} as const;
