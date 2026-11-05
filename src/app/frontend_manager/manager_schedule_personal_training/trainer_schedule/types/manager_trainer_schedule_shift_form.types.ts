import type { z } from 'zod';

import type { managerScheduleShiftFormSchema } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/schemas/manager_trainer_schedule_shift_form.schemas';

export type ShiftFormValues = z.infer<typeof managerScheduleShiftFormSchema>;
/**
 * @description Provides the ManagerTrainerScheduleShiftFormTypes implementation for the schedule module.
 * @dependencies @/app/frontend_manager/manager_schedule_personal_training/manager_schedule_schemas/ManagerTrainerScheduleShiftFormSchema
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
