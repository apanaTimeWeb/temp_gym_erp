// RESPONSIBILITY: TypeScript types for Manager Support Tickets domain.
import type { TicketCategory, TicketPriority, TicketStatus } from '@/app/frontend_manager/manager_help_support/support_tickets/constants/manager_support_tickets.constants';

export interface TicketMessage {
  id: string;
  senderRole: 'MANAGER' | 'ADMIN' | 'SUPERADMIN';
  senderName: string;
  message: string;
  sentAt: string;
  attachments?: string[];
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  description: string;
  messages: TicketMessage[];
}

export interface SupportTicketKPIs {
  totalTickets: number;
  openTickets: number;
  inProgressTickets: number;
  resolvedTickets: number;
}

