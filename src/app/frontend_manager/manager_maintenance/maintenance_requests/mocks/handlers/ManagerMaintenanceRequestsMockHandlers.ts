import { MANAGER_MAINTENANCE_REQUESTS_API } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/config/manager_maintenance_requests.url_config';
import { http, HttpResponse, delay } from 'msw';

import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';



import { MANAGER_MAINTENANCE_REQUESTS_STATUS_VALUES } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/constants/manager_maintenance_requests.constants';
import { MOCK_MAINTENANCE_TICKETS } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/mocks/fixtures/ManagerMaintenanceRequestsMockFixtures';
import { CreateMaintenanceTicketRequestSchema } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/schemas/manager_maintenance_requests.schemas';
import type { MaintenanceTicket } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/types/manager_maintenance_requests.types';


let tickets = [...MOCK_MAINTENANCE_TICKETS];
let ticketIdCounter = 1000;

/**
 * @description Provides the ManagerMaintenanceRequestsMockHandlers implementation for the maintenance module.
 * @dependencies @/app/frontend_manager/manager_maintenance/manager_maintenance_mocks/manager_maintenance_mocks_fixtures/ManagerMaintenanceRequestsMockFixtures; @/app/frontend_manager/manager_maintenance/manager_maintenance_schemas/ManagerMaintenanceRequestsSchemas; @/app/frontend_manager/manager_maintenance/manager_maintenance_url_config; @/app/frontend_manager/manager_infrastructure/manager_infrastructure_constants/ManagerHttpStatus; @/app/frontend_manager/manager_infrastructure/manager_infrastructure_utils/ManagerMockApiUrl
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export function resetManagerMaintenanceRequestsMockState(): void {
  tickets = [...MOCK_MAINTENANCE_TICKETS];
  ticketIdCounter = 1000;
}

export const managerMaintenanceMockHandlers = [
  http.get(MANAGER_MAINTENANCE_REQUESTS_API.BASE, async () => {
    await delay(100);
    return HttpResponse.json({
      success: true,
      message: 'Success',
      data: tickets,
      meta: { total: tickets.length, page: 1, limit: 50, totalPages: 1, hasNextPage: false, hasPrevPage: false },
    });
  }),

  http.post(MANAGER_MAINTENANCE_REQUESTS_API.BASE, async ({ request }) => {
    await delay(100);
    const body = CreateMaintenanceTicketRequestSchema.parse(await request.json());
    const newTicket: MaintenanceTicket = {
      id: `mt${ticketIdCounter++}`,
      title: body.title,
      equipment: body.equipment,
      priority: body.priority,
      estimatedCost: body.estimatedCost,
      status: MANAGER_MAINTENANCE_REQUESTS_STATUS_VALUES.OPEN,
      reportedAt: new Date().toISOString(),
    };
    tickets = [newTicket, ...tickets];
    return HttpResponse.json({ success: true, message: 'Ticket created', data: newTicket });
  }),

  http.post(MANAGER_MAINTENANCE_REQUESTS_API.RESOLVE(':id'), async ({ params }) => {
    await delay(100);
    const id = String(params.id);
    const ticketIndex = tickets.findIndex((ticket) => ticket.id === id);
    if (ticketIndex === -1) {
      return HttpResponse.json({ success: false, message: 'Not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    }
    const current = tickets[ticketIndex];
    if (!current) {
      return HttpResponse.json({ success: false, message: 'Not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    }
    const updatedTicket: MaintenanceTicket = { ...current, status: MANAGER_MAINTENANCE_REQUESTS_STATUS_VALUES.RESOLVED, resolvedAt: new Date().toISOString() };
    tickets[ticketIndex] = updatedTicket;
    return HttpResponse.json({ success: true, message: 'Ticket resolved', data: updatedTicket });
  }),
];
