// RESPONSIBILITY: Canonical query-key parameter contracts for Trainer TrainerWorkoutWorkout.
import type { TrainerWorkoutSortDirection, TrainerWorkoutSortField } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/types/TrainerCoachingExerciseManagementSortTypes';

export interface TrainerWorkoutBrowseQueryParams {
  search: string;
  category: string;
  page: number;
  sortBy: TrainerWorkoutSortField;
  sortDirection: TrainerWorkoutSortDirection;
}
