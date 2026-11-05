// DATA FLOW: User intent → this module mutation hook → module API → query invalidation → consuming module UI.
'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ManagerProfileAndSecurityApi } from '@/app/frontend_manager/manager_dashboard/profile_and_security/api/manager_profile_and_security.api';
import { ManagerProfileAndSecurityQueryKeys } from '@/app/frontend_manager/manager_dashboard/profile_and_security/api/manager_profile_and_security.query_keys';
import type { UpdateManagerPasswordPayload, UpdateManagerProfileAndSecurityPayload } from '@/app/frontend_manager/manager_dashboard/profile_and_security/types/manager_profile_and_security.types';
/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates profile feature state and its documented UI/API boundary through useManagerProfileAndSecurityMutations.
 * @dependencies Uses ManagerProfileAndSecurityApi, ManagerProfileAndSecurityTypes.
 * @edge-case reuses the caller-provided idempotency key for the same mutation intent; refreshes affected TanStack Query server state after successful mutations.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerProfileAndSecurityMutations owns the profile feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerProfileAndSecurityMutations() {
  const queryClient = useQueryClient();
  const profileMutation = useMutation({ mutationFn: ({ payload, idempotencyKey }: { payload: UpdateManagerProfileAndSecurityPayload; idempotencyKey: string }) => ManagerProfileAndSecurityApi.updateProfile(payload, idempotencyKey), onSuccess: () => queryClient.invalidateQueries({ queryKey: ManagerProfileAndSecurityQueryKeys.current() }) });
  const passwordMutation = useMutation({ mutationFn: ({ payload, idempotencyKey }: { payload: UpdateManagerPasswordPayload; idempotencyKey: string }) => ManagerProfileAndSecurityApi.updatePassword(payload, idempotencyKey), onSuccess: () => queryClient.invalidateQueries({ queryKey: ManagerProfileAndSecurityQueryKeys.current() }) });
  return { profileMutation, passwordMutation };
}
