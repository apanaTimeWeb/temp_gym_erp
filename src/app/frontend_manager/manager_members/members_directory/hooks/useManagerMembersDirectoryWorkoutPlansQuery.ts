// DATA FLOW: Module API → TanStack Query or typed query result → consuming module-owned UI.
'use client';
import { useQuery } from '@tanstack/react-query';

import { ManagerMembersDirectoryApi } from '@/app/frontend_manager/manager_members/members_directory/api/manager_members_directory.api';
import { ManagerMembersDirectoryQueryKeys } from '@/app/frontend_manager/manager_members/members_directory/api/manager_members_directory.query_keys';
/** Loads available workout-plan snapshots only while the assignment panel is open. */
/**
 * @description Coordinates members feature state and its documented UI/API boundary through useManagerMembersDirectoryWorkoutPlansQuery.
 * @dependencies Uses ManagerMembersDirectoryApi.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerMembersDirectoryWorkoutPlansQuery owns the members feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerMembersDirectoryWorkoutPlansQuery(enabled: boolean) {
  return useQuery({
    queryKey: ManagerMembersDirectoryQueryKeys.workoutPlans(),
    queryFn: () => ManagerMembersDirectoryApi.fetchMemberWorkouts(),
    enabled });
}
