// RESPONSIBILITY: Query key factory for Manager Support Tickets TanStack queries.
export const ManagerSupportTicketsQueryKeys = {
  all: ['manager', 'support-tickets'] as const,
  list: (status?: string, category?: string) => ['manager', 'support-tickets', 'list', { status, category }] as const,
  kpis: () => ['manager', 'support-tickets', 'kpis'] as const,
  detail: (id: string) => ['manager', 'support-tickets', 'detail', id] as const,
};

