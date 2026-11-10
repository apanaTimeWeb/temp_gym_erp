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

export const managerPtScheduleSessionSchema = z.object({
  assignmentId: z.string().trim().min(1, 'Please select a member PT package'),
  sessionDate: z.string().trim().min(1, 'Session date is required'),
  sessionTime: z.string().trim().min(1, 'Session time is required'),
  durationMinutes: z.number().int().min(15).max(180),
  location: z.string().min(1, 'Location is required'),
  trainerNotes: z.string().optional(),
});

export type ManagerPtAssignmentsAssignmentFormValues = z.infer<typeof managerPtAssignmentSchema>;
export type ManagerPtScheduleSessionFormValues = z.infer<typeof managerPtScheduleSessionSchema>;
