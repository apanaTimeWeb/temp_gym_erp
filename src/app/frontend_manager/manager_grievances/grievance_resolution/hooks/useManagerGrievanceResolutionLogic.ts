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
  const { search, setSearch, status, setStatus, category, setCategory, date, setDate } = useManagerGrievanceResolutionUrlState();
  const normalizedSearch = search.trim().toLowerCase();
  const filteredTickets = useMemo(() => tickets.filter((ticket) => {
    const matchesSearch = !normalizedSearch
      || ticket.memberName.toLowerCase().includes(normalizedSearch)
      || ticket.issue.toLowerCase().includes(normalizedSearch);
    const matchesStatus = status === 'ALL' || ticket.status === status;
    const matchesCategory = category === 'ALL' || ticket.category === category;
    let matchesDate = true;
    if (date && date !== 'all' && ticket.loggedAt) {
      const ticketTime = new Date(ticket.loggedAt).getTime();
      const now = new Date();
      if (date === 'this_month') {
        const start = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
        matchesDate = ticketTime >= start;
      } else if (date === 'last_month') {
        const start = new Date(now.getFullYear(), now.getMonth() - 1, 1).getTime();
        const end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999).getTime();
        matchesDate = ticketTime >= start && ticketTime <= end;
      } else if (date === 'this_year') {
        const start = new Date(now.getFullYear(), 0, 1).getTime();
        matchesDate = ticketTime >= start;
      }
    }
    return matchesSearch && matchesStatus && matchesCategory && matchesDate;
  }), [normalizedSearch, status, category, date, tickets]);

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
    status,
    setStatus,
    category,
    setCategory,
    date,
    setDate,
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
