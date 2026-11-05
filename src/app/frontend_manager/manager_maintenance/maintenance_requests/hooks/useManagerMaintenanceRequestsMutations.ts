// DATA FLOW: User intent → this module mutation hook → module API → query invalidation → consuming module UI.
'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ManagerInfrastructureShowErrorToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowErrorToast';
import { ManagerInfrastructureShowSuccessToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowSuccessToast';

import { ManagerMaintenanceRequestsApi } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/api/manager_maintenance_requests.api';
import { ManagerMaintenanceRequestsQueryKeys } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/api/manager_maintenance_requests.query_keys';
import type { CreateMaintenanceTicketPayload } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/types/manager_maintenance_requests.types';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates maintenance feature state and its documented UI/API boundary through useManagerMaintenanceRequestsMutations.
 * @dependencies Uses ManagerIdempotency, ManagerMaintenanceRequestsApi, useManagerMaintenanceRequestsQueries, ManagerInfrastructureShowSuccessToast and ManagerInfrastructureShowErrorToast.
 * @edge-case reuses the caller-provided idempotency key for the same mutation intent; refreshes affected TanStack Query server state after successful mutations.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerMaintenanceRequestsMutations owns the maintenance feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerMaintenanceRequestsMutations() {
  const queryClient = useQueryClient();
  const createMaintenanceTicket = useMutation({
    mutationFn: ({ payload, idempotencyKey }: { payload: CreateMaintenanceTicketPayload; idempotencyKey: string }) => ManagerMaintenanceRequestsApi.createMaintenanceTicket(payload, idempotencyKey),
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ManagerMaintenanceRequestsQueryKeys.lists() });
      ManagerInfrastructureShowSuccessToast(response.message, 'manager-maintenance-create-success');
    },
    onError: (error: unknown) => {
      ManagerInfrastructureShowErrorToast(error, 'manager-maintenance-create-error');
    },
  });
  const resolveMaintenanceTicket = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => ManagerMaintenanceRequestsApi.resolveMaintenanceTicket(id, idempotencyKey),
    onSuccess: async (response, id) => {
      await queryClient.invalidateQueries({ queryKey: ManagerMaintenanceRequestsQueryKeys.lists() });
      ManagerInfrastructureShowSuccessToast(response.message, `manager-maintenance-resolve-${id}`);
    },
    onError: (error: unknown) => {
      ManagerInfrastructureShowErrorToast(error, 'manager-maintenance-resolve-error');
    },
  });
  return { createMaintenanceTicket, resolveMaintenanceTicket };
}
