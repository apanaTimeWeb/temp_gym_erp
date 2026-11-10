// RESPONSIBILITY: Owns all Maintenance Zod runtime validation schemas and their inferred schema contracts.
import { z } from 'zod';

import { MANAGER_MAINTENANCE_REQUESTS_STATUS_OPTION_VALUES, MANAGER_MAINTENANCE_REQUESTS_PRIORITY_VALUES } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/constants/manager_maintenance_requests.constants';

/**
 * @description Provides the ManagerMaintenanceRequestsSchemas implementation for the maintenance module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const isoDateOrDateTime = z.string().refine((value) => { if (!/^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(value)) return false; const parsed = new Date(value.length === 10 ? `${value}T00:00:00Z` : value); return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value.slice(0, 10); }, 'Invalid ISO date or date-time');
export const MaintenanceStatusSchema = z.enum(MANAGER_MAINTENANCE_REQUESTS_STATUS_OPTION_VALUES);
export const MaintenancePrioritySchema = z.enum(MANAGER_MAINTENANCE_REQUESTS_PRIORITY_VALUES);
export const MaintenanceTicketSchema = z.object({
  id: z.string(),
  title: z.string(),
  equipment: z.string(),
  status: MaintenanceStatusSchema,
  priority: MaintenancePrioritySchema,
  assignedVendor: z.string().optional(),
  estimatedCost: z.number().int().nonnegative().optional(),
  reportedAt: isoDateOrDateTime,
  resolvedAt: isoDateOrDateTime.optional(),
});
export const CreateMaintenanceTicketSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(160),
  equipment: z.string().trim().min(1, 'Equipment is required').max(120),
  priority: MaintenancePrioritySchema,
  assignedVendor: z.string().trim().max(120).optional(),
  estimatedCost: z.number().nonnegative().optional(),
});

export const CreateMaintenanceTicketRequestSchema = z.object({
  title: z.string().min(1),
  equipment: z.string().min(1),
  priority: MaintenancePrioritySchema,
  assignedVendor: z.string().optional(),
  estimatedCost: z.number().int().nonnegative().optional(),
});
