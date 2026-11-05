/**
 * @description Feature-owned store type contract for the module.
 * @dependencies Consumed by the owning Zustand store and feature hooks only.
 * @edge-case Keep state serializable and UI-only; server data belongs to TanStack Query.
 */
// RESPONSIBILITY: Defines the UI-only Zustand state contract for the Superadmin Tickets feature.
import type { SUPERADMIN_SUPPORT_TICKETS_ALL_FILTER } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/constants/superadmin_support_tickets_management.constants';

import type { TicketPriority, TicketStatus } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/types/superadmin_support_tickets_management.types';



export interface SuperadminSupportTicketsState {
  search: string;
  setSearch: (search: string) => void;
  showFilter: boolean;
  setShowFilter: (show: boolean) => void;
  statusFilter: TicketStatus | typeof SUPERADMIN_SUPPORT_TICKETS_ALL_FILTER;
  setStatusFilter: (status: TicketStatus | typeof SUPERADMIN_SUPPORT_TICKETS_ALL_FILTER) => void;
  priorityFilter: TicketPriority | typeof SUPERADMIN_SUPPORT_TICKETS_ALL_FILTER;
  setPriorityFilter: (priority: TicketPriority | typeof SUPERADMIN_SUPPORT_TICKETS_ALL_FILTER) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  detailModalTicketId: string | null;
  setDetailModalTicketId: (id: string | null) => void;
  replyModalTicketId: string | null;
  setReplyModalTicketId: (id: string | null) => void;
  assignModalTicketId: string | null;
  setAssignModalTicketId: (id: string | null) => void;
}
