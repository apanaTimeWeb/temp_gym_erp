// RESPONSIBILITY: Type contract extracted from SuperadminSupportTicketsTable.tsx; no business behavior.
import type { SupportTicket } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/types/superadmin_support_tickets_management.types';

export interface SuperadminSupportTicketsTableProps {
    tickets: SupportTicket[];
    onReply: (ticketId: string) => void;
  onInspect: (ticketId: string) => void;
    onClose?: (ticketId: string) => void;
    onAssign?: (ticketId: string) => void;
}
