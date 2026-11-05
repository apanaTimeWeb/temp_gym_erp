import { MANAGER_GRIEVANCE_RESOLUTION_API } from '@/app/frontend_manager/manager_grievances/grievance_resolution/config/manager_grievance_resolution.url_config';
import { z } from 'zod';

import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';



import { GrievanceTicketSchema } from '@/app/frontend_manager/manager_grievances/grievance_resolution/schemas/manager_grievance_resolution.schemas';
import type { GrievanceTicket, CreateGrievanceTicketPayload } from '@/app/frontend_manager/manager_grievances/grievance_resolution/types/manager_grievance_resolution.types';


/**
 * @description Provides the ManagerGrievanceResolutionApi implementation for the grievance module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_grievances/manager_grievance_schemas/ManagerGrievanceResolutionSchemas; @/app/frontend_manager/manager_grievances/manager_grievance_url_config; @/app/frontend_manager/manager_grievances/manager_grievance_types/ManagerGrievanceResolutionTypes; @/lib/api
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerGrievanceResolutionApi = {
  fetchGrievanceTickets: async (): Promise<ApiResponse<GrievanceTicket[]>> => apiFetch<ApiResponse<GrievanceTicket[]>>(MANAGER_GRIEVANCE_RESOLUTION_API.BASE, {
    dataSchema: z.array(GrievanceTicketSchema),
  }),
  createGrievanceTicket: async (payload: CreateGrievanceTicketPayload, idempotencyKey: string): Promise<ApiResponse<GrievanceTicket>> => apiFetch<ApiResponse<GrievanceTicket>>(MANAGER_GRIEVANCE_RESOLUTION_API.BASE, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Idempotency-Key': idempotencyKey },
    dataSchema: GrievanceTicketSchema,
  }),
  resolveGrievanceTicket: async (id: string, resolutionNote: string, idempotencyKey: string): Promise<ApiResponse<GrievanceTicket>> => apiFetch<ApiResponse<GrievanceTicket>>(MANAGER_GRIEVANCE_RESOLUTION_API.RESOLVE(id), {
    method: 'POST',
    body: JSON.stringify({ resolutionNote }),
    headers: { 'Idempotency-Key': idempotencyKey },
    dataSchema: GrievanceTicketSchema,
  }),
};
