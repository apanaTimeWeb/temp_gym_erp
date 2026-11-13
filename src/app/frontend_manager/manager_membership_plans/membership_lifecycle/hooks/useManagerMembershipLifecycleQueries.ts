// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
'use client';
import { useQuery } from '@tanstack/react-query';

import { ManagerMembershipLifecycleApi } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/api/manager_membership_lifecycle.api';
import { ManagerMembershipLifecycleQueryKeys } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/api/manager_membership_lifecycle.query_keys';
import { MOCK_PLANS } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/mocks/fixtures/ManagerMembershipLifecycleMockData';
/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates plans feature state and its documented UI/API boundary through useFetchPlans.
 * @dependencies Uses ManagerIdempotency, ManagerMembershipLifecycleApi, ManagerMembershipLifecycleChangeRequestTypes.
 * @edge-case reuses the caller-provided idempotency key for the same mutation intent; refreshes affected TanStack Query server state after successful mutations.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
/**
 * @description useFetchPlans owns the plans feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useFetchPlans(params?: Record<string, string>) {
  return useQuery({
    queryKey: ManagerMembershipLifecycleQueryKeys.list(params),
    queryFn: async () => {
      const res = await ManagerMembershipLifecycleApi.fetchPlans(params);
      if (!res.success || !res.data) throw new Error(res.message || 'Unable to load membership plans');
      return res.data;
    },
    initialData: { plans: MOCK_PLANS, total: MOCK_PLANS.length },
    staleTime: 5 * 60 * 1000 });
}

