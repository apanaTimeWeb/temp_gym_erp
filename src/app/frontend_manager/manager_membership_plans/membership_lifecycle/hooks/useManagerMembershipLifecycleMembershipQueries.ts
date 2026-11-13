// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
'use client';
import { useQuery } from '@tanstack/react-query';

import { ManagerMembershipLifecycleApi } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/api/manager_membership_lifecycle.api';
import { ManagerMembershipLifecycleQueryKeys } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/api/manager_membership_lifecycle.query_keys';
import { MOCK_PLANS_MEMBERSHIP_OVERVIEW } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/mocks/fixtures/ManagerMembershipLifecycleMembershipMockData';
/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates plans feature state and its documented UI/API boundary through useManagerMembershipLifecycleMembershipOverviewQuery.
 * @dependencies Uses ManagerMembershipLifecycleApi.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
/**
 * @description useManagerMembershipLifecycleMembershipOverviewQuery owns the plans feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerMembershipLifecycleMembershipOverviewQuery() {
  return useQuery({
    queryKey: ManagerMembershipLifecycleQueryKeys.membershipOverview(),
    queryFn: async () => {
      const response = await ManagerMembershipLifecycleApi.fetchMembershipOverview();
      if (!response.data) throw new Error(response.message);
      return response.data;
    },
    initialData: MOCK_PLANS_MEMBERSHIP_OVERVIEW,
  });
}
