// RESPONSIBILITY: Centralized URL and API route contracts for Manager Support Tickets.
export const MANAGER_SUPPORT_TICKETS_ROUTES = {
  PATHS: {
    LEAF: '/frontend_manager/manager_help_support/support_tickets',
    DOMAIN: '/frontend_manager/manager_help_support',
  },
  API: {
    TICKETS: '/api/v1/manager/support-tickets',
    STATS: '/api/v1/manager/support-tickets/stats',
    REPLY: (ticketId: string) => `/api/v1/manager/support-tickets/${ticketId}/reply`,
  },
} as const;

