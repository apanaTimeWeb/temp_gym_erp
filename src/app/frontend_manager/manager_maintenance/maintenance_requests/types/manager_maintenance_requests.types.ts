import type { z } from 'zod';

import type { ApiResponse } from '@/lib/api';

import type { MaintenanceStatusSchema, MaintenancePrioritySchema, MaintenanceTicketSchema, CreateMaintenanceTicketSchema, CreateMaintenanceTicketRequestSchema } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/schemas/manager_maintenance_requests.schemas';


export type MaintenanceStatus = z.infer<typeof MaintenanceStatusSchema>;
export type MaintenancePriority = z.infer<typeof MaintenancePrioritySchema>;
export type MaintenanceTicket = z.infer<typeof MaintenanceTicketSchema>;
export type MaintenanceMutationResponse = ApiResponse<MaintenanceTicket>;
export type CreateMaintenanceTicketPayload = z.infer<typeof CreateMaintenanceTicketSchema>;
export type CreateMaintenanceTicketRequest = z.infer<typeof CreateMaintenanceTicketRequestSchema>;
