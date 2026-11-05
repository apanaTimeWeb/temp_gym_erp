// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
'use client';
import { useQuery } from '@tanstack/react-query';

import { ManagerMaintenanceRequestsApi } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/api/manager_maintenance_requests.api';
import { ManagerMaintenanceRequestsQueryKeys } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/api/manager_maintenance_requests.query_keys';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates maintenance feature state and its documented UI/API boundary through useManagerMaintenanceRequestsTickets.
 * @dependencies Uses ManagerMaintenanceRequestsApi.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
/**
 * @description useManagerMaintenanceRequestsTickets owns the maintenance feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerMaintenanceRequestsTickets() {
  return useQuery({
    queryKey: ManagerMaintenanceRequestsQueryKeys.lists(),
    queryFn: async () => (await ManagerMaintenanceRequestsApi.fetchMaintenanceIssues()).data ?? [],
  });
}
