'use client';
// DATA FLOW: feature API/schema → hook/context → useSuperadminSupportTicketsManagementStore consumers.
// RESPONSIBILITY: Zustand store for Superadmin Tickets UI state (filters, pagination, modals)
import { create } from 'zustand';

import { SUPERADMIN_SUPPORT_TICKETS_ALL_FILTER } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/constants/superadmin_support_tickets_management.constants';

import type { SuperadminSupportTicketsState } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/types/superadmin_support_tickets_management_store.types';



/**
 * Purpose: Zustand store for Superadmin Tickets UI state (filters, pagination, modals).
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 
 * @description Zustand store for Superadmin Tickets UI state (filters, pagination, modals).
 * @dependencies values defined by the exported hook signature.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
/**
 * @description Owns the useSuperadminSupportTicketsManagementStore responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
/**
 * @description Owns module-scoped client UI state for tickets.
 * @dependencies Contains UI-only shared state; server data remains in TanStack Query.
 * @edge-case Must not become a second server-state cache.
 */
// DATA FLOW: Feature UI events → useSuperadminSupportTicketsManagementStore → subscribing module components.
/**
 * @description Owns the feature-local state slice and actions used by this store.
 * @dependencies State is typed by the module-local store interface; server-owned data remains in the feature query layer and must not be duplicated here.
 * @edge-case Keep initial and reset state valid, prevent tenant/session state leakage, and preserve deterministic behavior when actions are repeated.
 */
export const useSuperadminSupportTicketsManagementStore = create<SuperadminSupportTicketsState>((set) => ({
    search: '',
    setSearch: (search) => set({ search, currentPage: 1 }),
    showFilter: false,
    setShowFilter: (showFilter) => set({ showFilter }),
    statusFilter: SUPERADMIN_SUPPORT_TICKETS_ALL_FILTER,
    setStatusFilter: (statusFilter) => set({ statusFilter, currentPage: 1 }),
    priorityFilter: SUPERADMIN_SUPPORT_TICKETS_ALL_FILTER,
    setPriorityFilter: (priorityFilter) => set({ priorityFilter, currentPage: 1 }),
    currentPage: 1,
    setCurrentPage: (currentPage) => set({ currentPage }),
    detailModalTicketId: null,
    setDetailModalTicketId: (id) => set({ detailModalTicketId: id }),
    replyModalTicketId: null,
    setReplyModalTicketId: (replyModalTicketId) => set({ replyModalTicketId }),
    assignModalTicketId: null,
    setAssignModalTicketId: (assignModalTicketId) => set({ assignModalTicketId }),
}));
