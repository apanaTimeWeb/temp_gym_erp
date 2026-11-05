'use client';
import { useQuery } from '@tanstack/react-query';
import { ticketsApi } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/api/superadmin_support_tickets_management_api_crud.api';
import { SUPERADMIN_SUPPORT_TICKETS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/api/superadmin_support_tickets_management.query_keys';

/**
 * @description Coordinates the use Superadmin tickets detail concern within its owning Superadmin feature.
 * @dependencies Uses the typed arguments and module-local API, query-key, schema, and utility imports declared in this file; it must not depend on sibling business modules.
 * @edge-case Keep null or empty inputs safe, preserve pending/error/retry/cancellation behavior where applicable, and avoid stale or duplicate mutation effects.
 */
export function useSuperadminSupportTicketsManagementDetail(ticketId: string | null) {
  return useQuery({
    queryKey: SUPERADMIN_SUPPORT_TICKETS_QUERY_KEYS.detail(ticketId ?? ''),
    queryFn: async () => {
      const response = await ticketsApi.fetchTicketById(ticketId!);
      if (!response.success) throw new Error(response.message || 'Failed to load support ticket');
      return response;
    },
    enabled: Boolean(ticketId),
  });
}
