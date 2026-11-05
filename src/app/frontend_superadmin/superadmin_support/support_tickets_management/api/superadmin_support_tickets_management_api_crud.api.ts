import { superadminTicketsManagementApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/api/superadmin_support_tickets_management_api_fetch.api';
import { SUPERADMIN_SUPPORT_TICKETS_MANAGEMENT_API } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/config/superadmin_support_tickets_management.url_config';
import { SuperadminSupportTicketsListDataSchema } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/schemas/superadmin_support_tickets_management_api.schemas';
import { SupportTicketSchema } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/schemas/superadmin_support_tickets_management_types.schemas';

import type { SupportTicket } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/types/superadmin_support_tickets_management.types';
import type { ApiResponse } from '@/lib/api';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSupportTicketsApiCrudApi owned by the superadmin_support_tickets feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_support/support_tickets_management/schemas/superadmin_support_tickets_management_api.schemas, @/app/frontend_superadmin/superadmin_support/support_tickets_management/schemas/superadmin_support_tickets_management_types.schemas, @/app/frontend_superadmin/superadmin_support/support_tickets_management/api/superadmin_support_tickets_management_api_fetch.api, @/app/frontend_superadmin/superadmin_support/support_tickets_management/config/superadmin_support_tickets_management.url_config, @/app/frontend_superadmin/superadmin_support/support_tickets_management/types/superadmin_support_tickets_management.types, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */


export const ticketsApi = {
    fetchTickets: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<SupportTicket[]>(`${SUPERADMIN_SUPPORT_TICKETS_MANAGEMENT_API.BASE}${q}`, { dataSchema: SuperadminSupportTicketsListDataSchema });
    },
    fetchTicketById: (id: string) => apiFetch<SupportTicket>(SUPERADMIN_SUPPORT_TICKETS_MANAGEMENT_API.DETAIL(id), { dataSchema: SupportTicketSchema }),
    updateTicket: (id: string, body: Partial<SupportTicket>, idempotencyKey: string) => apiFetch<SupportTicket>(SUPERADMIN_SUPPORT_TICKETS_MANAGEMENT_API.DETAIL(id), {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SupportTicketSchema
    }),
    closeTicket: (id: string, idempotencyKey: string) => apiFetch<SupportTicket>(SUPERADMIN_SUPPORT_TICKETS_MANAGEMENT_API.CLOSE(id), {
        method: 'POST',
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SupportTicketSchema
    }),
    assignTicket: (id: string, assignee: string, idempotencyKey: string) => apiFetch<SupportTicket>(SUPERADMIN_SUPPORT_TICKETS_MANAGEMENT_API.ASSIGN(id), {
        method: 'POST',
        body: JSON.stringify({ assignee }),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SupportTicketSchema
    }),
};

export async function replyToTicket(id: string, replyText: string, idempotencyKey: string): Promise<ApiResponse<SupportTicket>> {
    return apiFetch<SupportTicket>(SUPERADMIN_SUPPORT_TICKETS_MANAGEMENT_API.REPLY(id), {
        method: 'POST',
        body: JSON.stringify({ replyText }),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SupportTicketSchema,
    });
}
