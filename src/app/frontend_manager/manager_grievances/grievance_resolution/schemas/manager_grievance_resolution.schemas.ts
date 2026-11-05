// RESPONSIBILITY: Owns all Grievance Zod runtime validation schemas and their inferred schema contracts.
import { z } from 'zod';

import { MANAGER_GRIEVANCE_RESOLUTION_STATUS_OPTION_VALUES, MANAGER_GRIEVANCE_RESOLUTION_CATEGORY_VALUES } from '@/app/frontend_manager/manager_grievances/grievance_resolution/constants/manager_grievance_resolution.constants';

/**
 * @description Provides the ManagerGrievanceResolutionSchemas implementation for the grievance module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const GrievanceStatusSchema = z.enum(MANAGER_GRIEVANCE_RESOLUTION_STATUS_OPTION_VALUES);
export const GrievanceCategorySchema = z.enum(MANAGER_GRIEVANCE_RESOLUTION_CATEGORY_VALUES);
export const GrievanceTicketSchema = z.object({
  id: z.string(),
  memberName: z.string(),
  category: GrievanceCategorySchema,
  issue: z.string(),
  status: GrievanceStatusSchema,
  loggedAt: z.string(),
  resolvedAt: z.string().optional(),
  resolutionNote: z.string().optional(),
});
export const CreateGrievanceTicketSchema = z.object({
  memberName: z.string().trim().min(1, 'Member name is required').max(120, 'Member name is too long'),
  category: GrievanceCategorySchema,
  issue: z.string().trim().min(1, 'Issue description is required').max(2000, 'Issue description is too long'),
});
