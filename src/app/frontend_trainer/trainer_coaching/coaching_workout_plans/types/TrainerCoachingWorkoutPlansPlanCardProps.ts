import type { TrainerWorkoutWorkout } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/types/TrainerCoachingWorkoutPlansTypes';

/** Props for the Trainer TrainerWorkoutWorkout plan card used inside the plans grid. */
export interface TrainerWorkoutPlanCardProps {
  plan: TrainerWorkoutWorkout;
  onEdit: () => void;
  onDelete: () => void;
  deleting: boolean;
}
