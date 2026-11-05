import { MANAGER_GRIEVANCE_RESOLUTION_API } from '@/app/frontend_manager/manager_grievances/grievance_resolution/config/manager_grievance_resolution.url_config';
import { http, HttpResponse, delay } from 'msw';
import { z } from 'zod';

import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';



import { MANAGER_GRIEVANCE_RESOLUTION_STATUS_VALUES } from '@/app/frontend_manager/manager_grievances/grievance_resolution/constants/manager_grievance_resolution.constants';
import { MOCK_GRIEVANCE_TICKETS } from '@/app/frontend_manager/manager_grievances/grievance_resolution/mocks/fixtures/ManagerGrievanceResolutionMockFixtures';
import { CreateGrievanceTicketSchema } from '@/app/frontend_manager/manager_grievances/grievance_resolution/schemas/manager_grievance_resolution.schemas';
import type { GrievanceTicket } from '@/app/frontend_manager/manager_grievances/grievance_resolution/types/manager_grievance_resolution.types';


let tickets = [...MOCK_GRIEVANCE_TICKETS];
let ticketIdCounter = 1000;

/**
 * @description Provides the ManagerGrievanceResolutionMockHandlers implementation for the grievance module.
 * @dependencies @/app/frontend_manager/manager_grievances/manager_grievance_mocks/manager_grievance_mocks_fixtures/ManagerGrievanceResolutionMockFixtures; @/app/frontend_manager/manager_grievances/manager_grievance_schemas/ManagerGrievanceResolutionSchemas; @/app/frontend_manager/manager_grievances/manager_grievance_url_config; @/app/frontend_manager/manager_infrastructure/manager_infrastructure_constants/ManagerHttpStatus; @/app/frontend_manager/manager_infrastructure/manager_infrastructure_utils/ManagerMockApiUrl
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export function resetManagerGrievanceResolutionMockState(): void {
  tickets = [...MOCK_GRIEVANCE_TICKETS];
  ticketIdCounter = 1000;
}

export const managerGrievanceMockHandlers = [
  http.get(MANAGER_GRIEVANCE_RESOLUTION_API.BASE, async () => {
    await delay(100);
    return HttpResponse.json({
      success: true,
      message: 'Success',
      data: tickets,
      meta: { total: tickets.length, page: 1, limit: 50, totalPages: 1, hasNextPage: false, hasPrevPage: false },
    });
  }),

  http.post(MANAGER_GRIEVANCE_RESOLUTION_API.BASE, async ({ request }) => {
    await delay(100);
    const body = CreateGrievanceTicketSchema.parse(await request.json());
    const newTicket: GrievanceTicket = {
      id: `gt${ticketIdCounter++}`,
      memberName: body.memberName,
      category: body.category,
      issue: body.issue,
      status: MANAGER_GRIEVANCE_RESOLUTION_STATUS_VALUES.OPEN,
      loggedAt: new Date().toISOString(),
    };
    tickets = [newTicket, ...tickets];
    return HttpResponse.json({ success: true, message: 'Grievance created', data: newTicket });
  }),

  http.post(MANAGER_GRIEVANCE_RESOLUTION_API.RESOLVE(':id'), async ({ params, request }) => {
    await delay(100);
    const id = String(params.id);
    const body = z.object({ resolutionNote: z.string().min(1) }).parse(await request.json());
    const ticketIndex = tickets.findIndex((ticket) => ticket.id === id);
    if (ticketIndex === -1) {
      return HttpResponse.json({ success: false, message: 'Not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    }
    const current = tickets[ticketIndex];
    if (!current) {
      return HttpResponse.json({ success: false, message: 'Not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    }
    const updatedTicket: GrievanceTicket = {
      ...current,
      status: MANAGER_GRIEVANCE_RESOLUTION_STATUS_VALUES.CLOSED,
      resolvedAt: new Date().toISOString(),
      resolutionNote: body.resolutionNote,
    };
    tickets[ticketIndex] = updatedTicket;
    return HttpResponse.json({ success: true, message: 'Grievance resolved', data: updatedTicket });
  }),
];
