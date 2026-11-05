// DATA FLOW: User intent → this module mutation hook → module API → query invalidation → consuming module UI.
'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ManagerInfrastructureShowErrorToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowErrorToast';
import { ManagerInfrastructureShowSuccessToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowSuccessToast';

import { ManagerGrievanceResolutionApi } from '@/app/frontend_manager/manager_grievances/grievance_resolution/api/manager_grievance_resolution.api';
import { ManagerGrievanceResolutionQueryKeys } from '@/app/frontend_manager/manager_grievances/grievance_resolution/api/manager_grievance_resolution.query_keys';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates grievance feature state and its documented UI/API boundary through useManagerGrievanceResolutionMutations.
 * @dependencies Uses ManagerIdempotency, ManagerGrievanceResolutionApi, useManagerGrievanceResolutionQueries, ManagerInfrastructureShowSuccessToast and ManagerInfrastructureShowErrorToast.
 * @edge-case reuses the caller-provided idempotency key for the same mutation intent; refreshes affected TanStack Query server state after successful mutations.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerGrievanceResolutionMutations owns the grievance feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerGrievanceResolutionMutations() {
  const queryClient = useQueryClient();
  const createGrievanceTicket = useMutation({
    mutationFn: ({ payload, idempotencyKey }: { payload: Parameters<typeof ManagerGrievanceResolutionApi.createGrievanceTicket>[0]; idempotencyKey: string }) => ManagerGrievanceResolutionApi.createGrievanceTicket(payload, idempotencyKey),
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ManagerGrievanceResolutionQueryKeys.lists() });
      ManagerInfrastructureShowSuccessToast(response.message, 'manager-grievance-create-success');
    },
    onError: (error: unknown) => {
      ManagerInfrastructureShowErrorToast(error, 'manager-grievance-create-error');
    },
  });
  const resolveGrievanceTicket = useMutation({
    mutationFn: ({ id, resolutionNote, idempotencyKey }: { id: string; resolutionNote: string; idempotencyKey: string }) => ManagerGrievanceResolutionApi.resolveGrievanceTicket(id, resolutionNote, idempotencyKey),
    onSuccess: async (response, variables) => {
      await queryClient.invalidateQueries({ queryKey: ManagerGrievanceResolutionQueryKeys.lists() });
      ManagerInfrastructureShowSuccessToast(response.message, `manager-grievance-resolve-${variables.id}`);
    },
    onError: (error: unknown) => {
      ManagerInfrastructureShowErrorToast(error, 'manager-grievance-resolve-error');
    },
  });
  return { createGrievanceTicket, resolveGrievanceTicket };
}
