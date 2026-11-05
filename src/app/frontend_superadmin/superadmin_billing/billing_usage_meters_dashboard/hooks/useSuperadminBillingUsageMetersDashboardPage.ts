'use client';
// DATA FLOW: Inputs enter useSuperadminBillingUsageMetersDashboardPage, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Owns Usage Meters query state for search and page parameters.
import { useQuery } from '@tanstack/react-query';

import { usageMetersApi } from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/api/superadmin_billing_usage_meters_dashboard.api';
import { SUPERADMIN_BILLING_USAGE_METERS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/api/superadmin_billing_usage_meters_dashboard.query_keys';


/**
 * Purpose: Fetches server-backed usage-meter data for the current parameter set.
 * Inputs: query parameters.
 * Output: Query state for the Usage Meters page.
 * Side effects: TanStack Query cache only.
 * Invariant: the component does not call the API service directly.
 */
/**
 * @description Manages usage meters state, queries, and UI interactions for useSuperadminBillingUsageMetersDashboardPage.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminBillingUsageMetersDashboardPage → consuming feature component.
/**
 * @description Coordinates the use Superadmin usage meters page concern within its owning Superadmin feature.
 * @dependencies Uses the typed arguments and module-local API, query-key, schema, and utility imports declared in this file; it must not depend on sibling business modules.
 * @edge-case Keep null or empty inputs safe, preserve pending/error/retry/cancellation behavior where applicable, and avoid stale or duplicate mutation effects.
 */
export function useSuperadminBillingUsageMetersDashboardPage(params: Record<string, string>, enabled = true) {
  return useQuery({ queryKey: SUPERADMIN_BILLING_USAGE_METERS_QUERY_KEYS.list(params), queryFn: async () => {
    const response = await usageMetersApi.fetchUsageMeters(params);
    if (!response.success) throw new Error(response.message || 'Failed to load usage meters');
    return response;
  }, enabled });
}
