"use client";
// DATA FLOW: User intent → this module mutation hook → module API → query invalidation → consuming module UI.
import { useRef } from 'react';

import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureIdempotency';

import { useManagerMaintenanceRequestsMutations } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/hooks/useManagerMaintenanceRequestsMutations';
import { useManagerMaintenanceRequestsTickets } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/hooks/useManagerMaintenanceRequestsQueries';
import type { CreateMaintenanceTicketPayload } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/types/manager_maintenance_requests.types';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates maintenance feature state and its documented UI/API boundary through useManagerMaintenanceRequestsLogic.
 * @dependencies Uses useManagerMaintenanceRequestsMutations, useManagerMaintenanceRequestsQueries, ManagerMaintenanceRequestsTypes.
 * @edge-case surfaces request errors without exposing transport details; preserves explicit loading state until the query or mutation settles; reuses the caller-provided idempotency key for the same mutation intent.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerMaintenanceRequestsLogic owns the maintenance feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerMaintenanceRequestsLogic() {
  const createKeyRef = useRef<string | null>(null);
  const resolveKeyByIdRef = useRef(new Map<string, string>());
  const { data: tickets = [], isPending, isError, error, refetch } = useManagerMaintenanceRequestsTickets();
  const { createMaintenanceTicket, resolveMaintenanceTicket } = useManagerMaintenanceRequestsMutations();

  const handleCreateTicket = async (payload: CreateMaintenanceTicketPayload) => {
    try {
      const idempotencyKey = createKeyRef.current ?? ManagerInfrastructureIdempotency(); createKeyRef.current = idempotencyKey;
      const response = await createMaintenanceTicket.mutateAsync({ payload, idempotencyKey });
      if (!response.success) return false;
      createKeyRef.current = null;
      return true;
    } catch {
      return false;
    }
  };

  const handleResolveTicket = async (id: string) => {
    try {
      const idempotencyKey = resolveKeyByIdRef.current.get(id) ?? ManagerInfrastructureIdempotency(); resolveKeyByIdRef.current.set(id, idempotencyKey);
      const response = await resolveMaintenanceTicket.mutateAsync({ id, idempotencyKey });
      if (!response.success) return false;
      resolveKeyByIdRef.current.delete(id);
      return true;
    } catch {
      return false;
    }
  };

  return {
    tickets,
    isPending,
    isError,
    error,
    reload: refetch,
    createTicket: handleCreateTicket,
    resolveTicket: handleResolveTicket,
    isCreating: createMaintenanceTicket.isPending,
    isResolving: resolveMaintenanceTicket.isPending,
  };
}
