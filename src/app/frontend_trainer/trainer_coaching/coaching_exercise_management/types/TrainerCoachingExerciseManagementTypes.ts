import type { z } from 'zod';
import { TrainerWorkoutExerciseSchema, TrainerWorkoutCreateExerciseSchema } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/schemas/TrainerCoachingExerciseManagementDomainSchemas';
export type TrainerWorkoutExercise = z.infer<typeof TrainerWorkoutExerciseSchema>;
export type TrainerWorkoutCreateExerciseDto = z.infer<typeof TrainerWorkoutCreateExerciseSchema>;
export type TrainerWorkoutCreateExerciseFormValues = z.input<typeof TrainerWorkoutCreateExerciseSchema>;
