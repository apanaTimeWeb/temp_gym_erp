'use client';
// DATA FLOW: Inputs enter useSuperadminSystemOpsInfrastructureUptime, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Owns TanStack Query access to historical Superadmin platform uptime points.
import { useQuery } from '@tanstack/react-query';

import { infrastructureApi } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/api/superadmin_system_ops_infrastructure.api';
import { SUPERADMIN_INFRASTRUCTURE_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/api/superadmin_system_ops_infrastructure.query_keys';



/**
 * Purpose: load the historical uptime series used by SuperadminSystemOpsInfrastructureUptimeChart.
 * Inputs: none; the API defines the fixed 24-hour series.
 * Output: query state for uptime points.
 * Side effects: network/cache activity only.
 * Invariant: the chart renders only validated API data and never fabricates values in JSX.
 
 * @description load the historical uptime series used by SuperadminSystemOpsInfrastructureUptimeChart.
 * @dependencies none; the API defines the fixed 24-hour series.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
/**
 * @description Owns the useSuperadminSystemOpsInfrastructureUptime responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export function useSuperadminSystemOpsInfrastructureUptime() {
  return useQuery({
    queryKey: SUPERADMIN_INFRASTRUCTURE_QUERY_KEYS.uptimeHistory,
    queryFn: async () => {
      const response = await infrastructureApi.fetchUptimeHistory();
      if (!response.success) throw new Error(response.message || 'Failed to load uptime history');
      return response;
    },
  });
}
