// RESPONSIBILITY: Defines validation rules for adding and editing trainer shifts.
import { z } from 'zod';
/**
 * @description Provides the ManagerTrainerScheduleShiftFormSchema implementation for the schedule module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const managerScheduleShiftFormSchema = z.object({ trainerId: z.string().min(1, 'Trainer is required'), day: z.string().min(1, 'Day is required'), startTime: z.string().min(1, 'Start time is required'), endTime: z.string().min(1, 'End time is required'), status: z.string().min(1, 'Status is required'), notes: z.string().optional() }).refine((value) => value.startTime < value.endTime, { path: ['endTime'], message: 'End time must be after start time' });
