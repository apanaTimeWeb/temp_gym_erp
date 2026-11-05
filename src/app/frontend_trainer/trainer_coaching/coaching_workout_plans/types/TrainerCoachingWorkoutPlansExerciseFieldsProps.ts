// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerWorkoutCreateWorkoutFormValues } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/types/TrainerCoachingWorkoutPlansTypes';

import type { Control, UseFormRegister } from 'react-hook-form';

export interface TrainerWorkoutExerciseFieldsProps {
  control: Control<TrainerWorkoutCreateWorkoutFormValues>;
  register: UseFormRegister<TrainerWorkoutCreateWorkoutFormValues>;
}
