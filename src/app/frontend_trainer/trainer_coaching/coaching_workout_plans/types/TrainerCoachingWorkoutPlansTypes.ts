import { z } from 'zod';

import { TrainerWorkoutWorkoutSchema, TrainerWorkoutExerciseSchema, TrainerWorkoutWorkoutExerciseSchema, TrainerWorkoutCreateWorkoutPlanSchema, TrainerWorkoutCreateExerciseSchema } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/schemas/TrainerCoachingWorkoutPlansDomainSchemas';




// RESPONSIBILITY: Owns TypeScript domain and form contracts derived from Trainer workout validation schemas.
export type TrainerWorkoutWorkout = z.infer<typeof TrainerWorkoutWorkoutSchema>;
export type TrainerWorkoutExercise = z.infer<typeof TrainerWorkoutExerciseSchema>;
export type TrainerWorkoutWorkoutExercise = z.infer<typeof TrainerWorkoutWorkoutExerciseSchema>;
export type TrainerWorkoutCreateWorkoutPlanDto = z.infer<typeof TrainerWorkoutCreateWorkoutPlanSchema>;
export type TrainerWorkoutCreateWorkoutFormValues = z.input<typeof TrainerWorkoutCreateWorkoutPlanSchema>;
export type TrainerWorkoutCreateExerciseDto = z.infer<typeof TrainerWorkoutCreateExerciseSchema>;
export type TrainerWorkoutCreateExerciseFormValues = z.input<typeof TrainerWorkoutCreateExerciseSchema>;
