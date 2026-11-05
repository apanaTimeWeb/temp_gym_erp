import { z } from 'zod';

import { MANAGER_WORKOUT_PLANS_LEVEL_VALUES } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/constants/manager_workout_plans.constants';
import { MANAGER_WORKOUT_PLANS_MAX_DAYS, MANAGER_WORKOUT_PLANS_MAX_EXERCISES } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/constants/manager_workout_plans_shared.constants';


/**
 * @description Provides the ManagerWorkoutPlansFormSchemas implementation for the workout module.
 * @dependencies @/app/frontend_manager/manager_workout_diet_library/manager_workout_constants/ManagerWorkoutPlansSharedConstants
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const managerWorkoutFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  level: z.enum(MANAGER_WORKOUT_PLANS_LEVEL_VALUES),
  days: z.coerce.number().int().min(1, 'Must be a valid number > 0').max(MANAGER_WORKOUT_PLANS_MAX_DAYS, 'Too many days'),
  exercises: z.coerce.number().int().min(1, 'Must be a valid number > 0').max(MANAGER_WORKOUT_PLANS_MAX_EXERCISES, 'Too many exercises'),
  focus: z.string().min(2, 'Focus area is required'),
  duration: z.string().min(2, 'Duration is required'),
  tags: z.string(),
});

export type WorkoutFormInput = z.input<typeof managerWorkoutFormSchema>;
export type WorkoutFormValues = z.output<typeof managerWorkoutFormSchema>;

export const managerExerciseFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  muscle: z.string().min(2, 'Primary muscle is required'),
  equipment: z.string().min(1, 'Equipment is required'),
  difficulty: z.enum(MANAGER_WORKOUT_PLANS_LEVEL_VALUES),
});

export type ExerciseFormValues = z.infer<typeof managerExerciseFormSchema>;
