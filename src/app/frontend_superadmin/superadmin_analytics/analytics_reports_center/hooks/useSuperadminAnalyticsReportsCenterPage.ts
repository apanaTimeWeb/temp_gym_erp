'use client';
// DATA FLOW: Inputs enter useSuperadminAnalyticsReportsCenterPage, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Owns all Reports server-state queries and keeps query parameters identical across revenue, cancellation, and health requests.
import { useQuery } from '@tanstack/react-query';

import { superadminReportsApi } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/api/superadmin_analytics_reports_center.api';
import { SUPERADMIN_ANALYTICS_REPORTS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/api/superadmin_analytics_reports_center.query_keys';



/**
 * Purpose: Centralizes reports server-state access for the Reports route.
 * Inputs: validated URL-derived report parameters.
 * Output: three independent TanStack Query states used by the view tabs.
 * Side effects: cache reads/refetches only; no local server-data copies.
 * Invariant: report components never import or invoke the API service directly.
 */
/**
 * @description Manages reports state, queries, and UI interactions for useSuperadminAnalyticsReportsCenterPage.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminAnalyticsReportsCenterPage → consuming feature component.
/**
 * @description Coordinates the use Superadmin reports page concern within its owning Superadmin feature.
 * @dependencies Uses the typed arguments and module-local API, query-key, schema, and utility imports declared in this file; it must not depend on sibling business modules.
 * @edge-case Keep null or empty inputs safe, preserve pending/error/retry/cancellation behavior where applicable, and avoid stale or duplicate mutation effects.
 */
export function useSuperadminAnalyticsReportsCenterPage(queryParams: Record<string, string>) {
  const revenueParams = Object.fromEntries(Object.entries(queryParams).filter(([key]) => ['preset', 'startDate', 'endDate'].includes(key)));
  const revenue = useQuery({ queryKey: SUPERADMIN_ANALYTICS_REPORTS_QUERY_KEYS.revenue(revenueParams), queryFn: async () => { const response = await superadminReportsApi.fetchRevenueData(revenueParams); if (!response.success) throw new Error(response.message || 'Failed to load revenue report'); return response; } });
  const cancellations = useQuery({ queryKey: SUPERADMIN_ANALYTICS_REPORTS_QUERY_KEYS.cancellations(queryParams), queryFn: async () => { const response = await superadminReportsApi.fetchCancellationsData(queryParams); if (!response.success) throw new Error(response.message || 'Failed to load cancellations report'); return response; } });
  const health = useQuery({ queryKey: SUPERADMIN_ANALYTICS_REPORTS_QUERY_KEYS.health(queryParams), queryFn: async () => { const response = await superadminReportsApi.fetchHealthData(queryParams); if (!response.success) throw new Error(response.message || 'Failed to load health report'); return response; } });
  return { revenue, cancellations, health };
}
