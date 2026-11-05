// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
'use client';
import { useQuery } from '@tanstack/react-query';

import { ManagerGrievanceResolutionApi } from '@/app/frontend_manager/manager_grievances/grievance_resolution/api/manager_grievance_resolution.api';
import { ManagerGrievanceResolutionQueryKeys } from '@/app/frontend_manager/manager_grievances/grievance_resolution/api/manager_grievance_resolution.query_keys';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates grievance feature state and its documented UI/API boundary through useManagerGrievanceResolutionTickets.
 * @dependencies Uses ManagerGrievanceResolutionApi.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
/**
 * @description useManagerGrievanceResolutionTickets owns the grievance feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerGrievanceResolutionTickets() {
  return useQuery({
    queryKey: ManagerGrievanceResolutionQueryKeys.lists(),
    queryFn: async () => (await ManagerGrievanceResolutionApi.fetchGrievanceTickets()).data ?? [],
  });
}
