import { MANAGER_MAINTENANCE_REQUESTS_API } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/config/manager_maintenance_requests.url_config';
import { z } from 'zod';

import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';

import { ManagerInfrastructureToManagerMinorUnits } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureToManagerMinorUnits';



import { CreateMaintenanceTicketRequestSchema, CreateMaintenanceTicketSchema, MaintenanceTicketSchema } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/schemas/manager_maintenance_requests.schemas';
import type { CreateMaintenanceTicketPayload, MaintenanceTicket } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/types/manager_maintenance_requests.types';

/**
 * @description Provides maintenance list/create/resolve API operations through the canonical Manager API transport.
 * @dependencies Uses apiFetch, module URL/schema/type contracts, and the shared minor-unit conversion helper.
 * @edge-case Validates response data at the API boundary, sends an Idempotency-Key for create/resolve intents, and generates request payloads in backend minor units. Server/MSW replay semantics remain owned by the handler/backend.
 */
export const ManagerMaintenanceRequestsApi = {
  fetchMaintenanceIssues: async (): Promise<ApiResponse<MaintenanceTicket[]>> => apiFetch<MaintenanceTicket[]>(
    MANAGER_MAINTENANCE_REQUESTS_API.BASE,
    { dataSchema: z.array(MaintenanceTicketSchema) },
  ),

  createMaintenanceTicket: async (
    payload: CreateMaintenanceTicketPayload,
    idempotencyKey: string,
  ): Promise<ApiResponse<MaintenanceTicket>> => {
    const validatedPayload = CreateMaintenanceTicketSchema.parse(payload);
    const requestPayload = CreateMaintenanceTicketRequestSchema.parse({
      ...validatedPayload,
      ...(validatedPayload.estimatedCost === undefined
        ? {}
        : { estimatedCost: ManagerInfrastructureToManagerMinorUnits(validatedPayload.estimatedCost) }),
    });

    return apiFetch<MaintenanceTicket>(MANAGER_MAINTENANCE_REQUESTS_API.BASE, {
      method: 'POST',
      body: JSON.stringify(requestPayload),
      headers: { 'Idempotency-Key': idempotencyKey },
      dataSchema: MaintenanceTicketSchema,
    });
  },

  resolveMaintenanceTicket: async (
    id: string,
    idempotencyKey: string,
  ): Promise<ApiResponse<MaintenanceTicket>> => apiFetch<MaintenanceTicket>(
    MANAGER_MAINTENANCE_REQUESTS_API.RESOLVE(id),
    {
      method: 'POST',
      headers: { 'Idempotency-Key': idempotencyKey },
      dataSchema: MaintenanceTicketSchema,
    },
  ),
};
