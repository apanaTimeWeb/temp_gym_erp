// RESPONSIBILITY: TanStack Query hooks for Manager Support Tickets.
import { useQuery } from '@tanstack/react-query';
import { ManagerSupportTicketsApi } from '@/app/frontend_manager/manager_help_support/support_tickets/api/manager_support_tickets.api';
import { ManagerSupportTicketsQueryKeys } from '@/app/frontend_manager/manager_help_support/support_tickets/api/manager_support_tickets.query_keys';

export function useManagerSupportTicketsQueries(status?: string, category?: string) {
  const ticketsQuery = useQuery({
    queryKey: ManagerSupportTicketsQueryKeys.list(status, category),
    queryFn: () => ManagerSupportTicketsApi.fetchTickets(status, category),
    select: (res) => res.data ?? [],
  });

  const kpisQuery = useQuery({
    queryKey: ManagerSupportTicketsQueryKeys.kpis(),
    queryFn: () => ManagerSupportTicketsApi.fetchKPIs(),
    select: (res) => res.data ?? { totalTickets: 0, openTickets: 0, inProgressTickets: 0, resolvedTickets: 0 },
  });

  return { ticketsQuery, kpisQuery };
}

