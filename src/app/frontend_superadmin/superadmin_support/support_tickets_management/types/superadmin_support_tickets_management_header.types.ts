// RESPONSIBILITY: Type contract extracted from SuperadminSupportTicketsHeader.tsx; no business behavior.
import { SUPERADMIN_SUPPORT_TICKETS_ALL_FILTER } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/constants/superadmin_support_tickets_management.constants';

import type { TicketStatus, TicketPriority } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/types/superadmin_support_tickets_management.types';



export interface SuperadminSupportTicketsHeaderProps {
    search: string;
    setSearch: (value: string) => void;
    showFilter: boolean;
    setShowFilter: (show: boolean) => void;
    statusFilter: TicketStatus | typeof SUPERADMIN_SUPPORT_TICKETS_ALL_FILTER;
    setStatusFilter: (status: TicketStatus | typeof SUPERADMIN_SUPPORT_TICKETS_ALL_FILTER) => void;
    priorityFilter: TicketPriority | typeof SUPERADMIN_SUPPORT_TICKETS_ALL_FILTER;
    setPriorityFilter: (priority: TicketPriority | typeof SUPERADMIN_SUPPORT_TICKETS_ALL_FILTER) => void;
    onFilterChange: () => void;
}
