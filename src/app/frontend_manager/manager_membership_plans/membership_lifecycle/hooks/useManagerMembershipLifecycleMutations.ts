// DATA FLOW: Plan-change submit → mutation hook → ManagerMembershipLifecycleApi → TanStack Query invalidation → plans UI.
'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiResponse } from '@/lib/api';

import { ManagerMembershipLifecycleApi } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/api/manager_membership_lifecycle.api';
import { ManagerMembershipLifecycleQueryKeys } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/api/manager_membership_lifecycle.query_keys';
import type { ManagerMembershipLifecycleChangeRequestPayload } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/types/manager_membership_lifecycle_change_request.types';
import type { Plan } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/types/manager_membership_lifecycle.types';

/**
 * @description Owns the Manager plans change-request mutation and cache invalidation.
 * @dependencies Uses ManagerMembershipLifecycleApi and ManagerMembershipLifecycleQueryKeys only; callers provide an intent-scoped idempotency key.
 * @edge-case Keeps plan server state authoritative by invalidating affected queries only after a successful response.
 */
export function useManagerMembershipLifecycleMutations() {
  const queryClient = useQueryClient();
  const invalidate = async () => { await queryClient.invalidateQueries({ queryKey: ManagerMembershipLifecycleQueryKeys.all }); };
  const requireSuccess = async <T,>(request: Promise<ApiResponse<T>>) => { const response = await request; if (!response.success) throw new Error(response.message || 'Membership request failed'); return response; };
  const createChangeRequest = useMutation({ mutationFn: ({ payload, idempotencyKey }: { payload: ManagerMembershipLifecycleChangeRequestPayload; idempotencyKey: string }) => requireSuccess(ManagerMembershipLifecycleApi.createChangeRequest(payload, idempotencyKey)), onSuccess: invalidate });
  const createPlan = useMutation({ mutationFn: ({ payload, idempotencyKey }: { payload: Partial<Plan>; idempotencyKey: string }) => requireSuccess(ManagerMembershipLifecycleApi.createPlan(payload, idempotencyKey)), onSuccess: invalidate });
  const updatePlan = useMutation({ mutationFn: ({ id, payload, idempotencyKey }: { id: string; payload: Partial<Plan>; idempotencyKey: string }) => requireSuccess(ManagerMembershipLifecycleApi.updatePlan(id, payload, idempotencyKey)), onSuccess: invalidate });
  const deletePlan = useMutation({ mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => requireSuccess(ManagerMembershipLifecycleApi.deletePlan(id, idempotencyKey)), onSuccess: invalidate });
  return { createChangeRequest, createPlan, updatePlan, deletePlan };
}
