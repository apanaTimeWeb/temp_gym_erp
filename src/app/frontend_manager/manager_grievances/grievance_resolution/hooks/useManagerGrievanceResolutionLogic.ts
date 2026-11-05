"use client";
// DATA FLOW: User intent → this module mutation hook → module API → query invalidation → consuming module UI.
import { useMemo, useRef } from 'react';

import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureIdempotency';

import { useManagerGrievanceResolutionMutations } from '@/app/frontend_manager/manager_grievances/grievance_resolution/hooks/useManagerGrievanceResolutionMutations';
import { useManagerGrievanceResolutionTickets } from '@/app/frontend_manager/manager_grievances/grievance_resolution/hooks/useManagerGrievanceResolutionQueries';
import { useManagerGrievanceResolutionUrlState } from '@/app/frontend_manager/manager_grievances/grievance_resolution/hooks/useManagerGrievanceResolutionUrlState';
import type { CreateGrievanceTicketPayload } from '@/app/frontend_manager/manager_grievances/grievance_resolution/types/manager_grievance_resolution.types';

/**
 * @description Coordinates grievance feature server state, URL-backed search, and mutation actions for the Manager grievance route.
 * @dependencies Uses the module-owned query, mutation, URL-state, idempotency, and type contracts.
 * @edge-case Keeps search shareable, filters rendered tickets from the current query result, and returns mutation success as an explicit boolean without swallowing UI loading state.
 */
// DATA FLOW: TanStack Query + URL state → useManagerGrievanceResolutionLogic → ManagerGrievanceResolutionMain → ManagerGrievanceResolutionContent
/**
 * @description useManagerGrievanceResolutionLogic owns the feature-level orchestration for the module and keeps server data, client UI state, and side effects at their documented boundaries.
 * @dependencies Uses only feature-owned APIs, schemas, types, constants, stores, and approved global infrastructure.
 * @edge-case Preserves documented loading, empty, error, retry, cancellation, permission, and direct-URL behavior for this flow.
 */
export function useManagerGrievanceResolutionLogic() {
  const createKeyRef = useRef<{ signature: string; key: string } | null>(null);
  const resolveKeyByIdRef = useRef(new Map<string, { signature: string; key: string }>());
  const { data: tickets = [], isPending, isError, error, refetch } = useManagerGrievanceResolutionTickets();
  const { createGrievanceTicket, resolveGrievanceTicket } = useManagerGrievanceResolutionMutations();
  const { search, setSearch } = useManagerGrievanceResolutionUrlState();
  const normalizedSearch = search.trim().toLowerCase();
  const filteredTickets = useMemo(() => tickets.filter((ticket) => (
    !normalizedSearch
      || ticket.memberName.toLowerCase().includes(normalizedSearch)
      || ticket.issue.toLowerCase().includes(normalizedSearch)
  )), [normalizedSearch, tickets]);

  const handleCreateTicket = async (payload: CreateGrievanceTicketPayload) => {
    try {
      const signature = JSON.stringify(payload);
      const current = createKeyRef.current;
      const idempotencyKey = current?.signature === signature ? current.key : ManagerInfrastructureIdempotency();
      createKeyRef.current = { signature, key: idempotencyKey };
      const response = await createGrievanceTicket.mutateAsync({ payload, idempotencyKey });
      if (!response.success) throw new Error(response.message);
      if (createKeyRef.current?.key === idempotencyKey) createKeyRef.current = null;
      return true;
    } catch {
      return false;
    }
  };

  const handleResolveTicket = async (id: string, resolutionNote: string) => {
    try {
      const normalizedResolutionNote = resolutionNote.trim();
      const signature = normalizedResolutionNote;
      const current = resolveKeyByIdRef.current.get(id);
      const idempotencyKey = current?.signature === signature ? current.key : ManagerInfrastructureIdempotency();
      resolveKeyByIdRef.current.set(id, { signature, key: idempotencyKey });
      const response = await resolveGrievanceTicket.mutateAsync({ id, resolutionNote: normalizedResolutionNote, idempotencyKey });
      if (!response.success) throw new Error(response.message);
      if (resolveKeyByIdRef.current.get(id)?.key === idempotencyKey) resolveKeyByIdRef.current.delete(id);
      return true;
    } catch {
      return false;
    }
  };

  return {
    tickets: filteredTickets,
    search,
    setSearch,
    isPending,
    isError,
    error,
    reload: refetch,
    createTicket: handleCreateTicket,
    resolveTicket: handleResolveTicket,
    isCreating: createGrievanceTicket.isPending,
    isResolving: resolveGrievanceTicket.isPending,
  };
}
