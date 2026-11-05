import { z } from 'zod';

/**
 * @description Provides the ManagerPtAssignmentsAssignmentSchema implementation for the pt module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const managerPtAssignmentSchema = z.object({
  memberId: z.string().trim().min(1, 'Member ID is required'),
  trainerId: z.string().trim().min(1, 'Trainer is required'),
  packageId: z.string().trim().min(1, 'PT package is required'),
  startDate: z.string().trim().min(1, 'Start date is required') });

export type ManagerPtAssignmentsAssignmentFormValues = z.infer<typeof managerPtAssignmentSchema>;
