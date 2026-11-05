'use client';
// DATA FLOW: Inputs enter useSuperadminSystemOpsOverviewSummary, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Owns TanStack Query server state for the System Ops summary feature.
import { useQuery } from '@tanstack/react-query';

import { fetchSuperadminSystemOpsSummary } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/api/superadmin_system_ops_overview.api';
import { SUPERADMIN_SYSTEM_OPS_OVERVIEW_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/api/superadmin_system_ops_overview.query_keys';



/**
 * Purpose: Loads the System Ops dashboard summary from the feature API contract.
 * Data flow: API → TanStack Query → SuperadminSystemOpsMain.
 * Invariant: no backend state is stored in Zustand or Context.
 
 * @description Loads the System Ops dashboard summary from the feature API contract.
 * @dependencies Consumes feature-local state/API/query contracts and approved global infrastructure only.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
export function useSuperadminSystemOpsOverviewSummary() {
  return useQuery({
    queryKey: SUPERADMIN_SYSTEM_OPS_OVERVIEW_QUERY_KEYS.summary,
    queryFn: async () => {
      const response = await fetchSuperadminSystemOpsSummary();
      if (!response.success) throw new Error(response.message || 'Failed to load system operations summary');
      return response;
    },
  });
}
