// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
'use client';
import { useQuery } from '@tanstack/react-query';

import { ManagerProfileAndSecurityApi } from '@/app/frontend_manager/manager_dashboard/profile_and_security/api/manager_profile_and_security.api';
import { ManagerProfileAndSecurityQueryKeys } from '@/app/frontend_manager/manager_dashboard/profile_and_security/api/manager_profile_and_security.query_keys';
/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates profile feature state and its documented UI/API boundary through useManagerProfileAndSecurityQuery.
 * @dependencies Uses ManagerProfileAndSecurityApi.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
/**
 * @description useManagerProfileAndSecurityQuery owns the profile feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerProfileAndSecurityQuery() {
  return useQuery({ queryKey: ManagerProfileAndSecurityQueryKeys.current(), queryFn: ManagerProfileAndSecurityApi.fetchProfile });
}
