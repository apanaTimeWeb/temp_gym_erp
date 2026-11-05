// DATA FLOW: User intent → this module mutation hook → module API → query invalidation → consuming module UI.
'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ManagerMembershipLifecycleApi } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/api/manager_membership_lifecycle.api';
import { ManagerMembershipLifecycleQueryKeys } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/api/manager_membership_lifecycle.query_keys';
import type { ManagerMembershipLifecycleActivatePayload, ManagerMembershipLifecycleRenewPayload, ManagerMembershipLifecycleFreezePayload } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/types/manager_membership_lifecycle_membership.types';
type ManagerMembershipLifecycleMembershipMutationInput<TPayload> = { payload: TPayload; idempotencyKey: string };

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates plans feature state and its documented UI/API boundary through useManagerMembershipLifecycleMembershipMutations.
 * @dependencies Uses ManagerMembershipLifecycleApi, ManagerMembershipLifecycleMembershipTypes.
 * @edge-case reuses the caller-provided idempotency key for the same mutation intent; refreshes affected TanStack Query server state after successful mutations.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerMembershipLifecycleMembershipMutations owns the plans feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerMembershipLifecycleMembershipMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ManagerMembershipLifecycleQueryKeys.membershipOverview() });

  const activateMutation = useMutation({ mutationFn: ({ payload, idempotencyKey }: ManagerMembershipLifecycleMembershipMutationInput<ManagerMembershipLifecycleActivatePayload>) => ManagerMembershipLifecycleApi.activateMembership(payload, idempotencyKey), onSuccess: invalidate });
  const renewMutation = useMutation({ mutationFn: ({ payload, idempotencyKey }: ManagerMembershipLifecycleMembershipMutationInput<ManagerMembershipLifecycleRenewPayload>) => ManagerMembershipLifecycleApi.renewMembership(payload, idempotencyKey), onSuccess: invalidate });
  const freezeMutation = useMutation({ mutationFn: ({ payload, idempotencyKey }: ManagerMembershipLifecycleMembershipMutationInput<ManagerMembershipLifecycleFreezePayload>) => ManagerMembershipLifecycleApi.freezeMembership(payload, idempotencyKey), onSuccess: invalidate });

  return { activateMutation, renewMutation, freezeMutation };
}
