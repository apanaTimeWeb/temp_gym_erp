// RESPONSIBILITY: API client for Manager Support Tickets endpoints.
import type { ApiResponse } from '@/lib/api';
import { apiFetch } from '@/lib/api';
import { MANAGER_SUPPORT_TICKETS_ROUTES } from '@/app/frontend_manager/manager_help_support/support_tickets/config/manager_support_tickets.url_config';
import type { SupportTicket, SupportTicketKPIs } from '@/app/frontend_manager/manager_help_support/support_tickets/types/manager_support_tickets.types';
import type { CreateSupportTicketFormValues, ReplySupportTicketFormValues } from '@/app/frontend_manager/manager_help_support/support_tickets/schemas/manager_support_tickets.schemas';
import { MOCK_SUPPORT_TICKETS, MOCK_SUPPORT_KPIS } from '@/app/frontend_manager/manager_help_support/support_tickets/mocks/fixtures/ManagerSupportTicketsMockData';

let inMemoryTickets = [...MOCK_SUPPORT_TICKETS];

export const ManagerSupportTicketsApi = {
  fetchTickets: async (status?: string, category?: string): Promise<ApiResponse<SupportTicket[]>> => {
    try {
      const response = await apiFetch<SupportTicket[]>(MANAGER_SUPPORT_TICKETS_ROUTES.API.TICKETS);
      return response;
    } catch {
      let filtered = inMemoryTickets;
      if (status && status !== 'ALL') {
        filtered = filtered.filter((t) => t.status === status);
      }
      if (category && category !== 'ALL') {
        filtered = filtered.filter((t) => t.category === category);
      }
      return { success: true, message: 'Tickets fetched successfully', data: filtered, requestId: `req-${Date.now()}` };
    }
  },

  fetchKPIs: async (): Promise<ApiResponse<SupportTicketKPIs>> => {
    try {
      const response = await apiFetch<SupportTicketKPIs>(MANAGER_SUPPORT_TICKETS_ROUTES.API.STATS);
      return response;
    } catch {
      return {
        success: true,
        message: 'KPI stats retrieved',
        data: {
          totalTickets: inMemoryTickets.length,
          openTickets: inMemoryTickets.filter((t) => t.status === 'OPEN').length,
          inProgressTickets: inMemoryTickets.filter((t) => t.status === 'IN_PROGRESS').length,
          resolvedTickets: inMemoryTickets.filter((t) => t.status === 'RESOLVED').length,
        },
        requestId: `req-${Date.now()}`,
      };
    }
  },

  createTicket: async (values: CreateSupportTicketFormValues, idempotencyKey: string): Promise<ApiResponse<SupportTicket>> => {
    const newTicket: SupportTicket = {
      id: `t-${Date.now()}`,
      ticketNumber: `TICK-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: values.subject,
      category: values.category,
      priority: values.priority,
      status: 'OPEN',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      description: values.description,
      messages: [
        {
          id: `m-${Date.now()}`,
          senderRole: 'MANAGER',
          senderName: 'Gym Manager',
          message: values.description,
          sentAt: new Date().toISOString(),
        },
      ],
    };
    inMemoryTickets = [newTicket, ...inMemoryTickets];
    return { success: true, data: newTicket, message: 'Support ticket raised successfully to Admin', requestId: `req-${Date.now()}` };
  },

  sendReply: async (ticketId: string, values: ReplySupportTicketFormValues): Promise<ApiResponse<SupportTicket>> => {
    const ticket = inMemoryTickets.find((t) => t.id === ticketId);
    if (!ticket) {
      return { success: false, data: null, message: 'Ticket not found', errorCode: 'NOT_FOUND', statusCode: 404, requestId: `req-${Date.now()}` };
    }
    const newMsg = {
      id: `m-${Date.now()}`,
      senderRole: 'MANAGER' as const,
      senderName: 'Gym Manager',
      message: values.message,
      sentAt: new Date().toISOString(),
    };
    ticket.messages.push(newMsg);
    ticket.updatedAt = new Date().toISOString();
    return { success: true, data: ticket, message: 'Reply sent to Admin', requestId: `req-${Date.now()}` };
  },
};
