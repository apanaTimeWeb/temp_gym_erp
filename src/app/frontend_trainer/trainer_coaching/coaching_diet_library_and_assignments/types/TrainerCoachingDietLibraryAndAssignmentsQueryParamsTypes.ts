// RESPONSIBILITY: Library query parameter type for the feature-owned query contract.
import type { TrainerLibraryFilterGoal } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/types/TrainerCoachingDietLibraryAndAssignmentsTypes';

export interface TrainerLibraryQueryParams {
  search?: string;
  goal?: TrainerLibraryFilterGoal;
  page?: number;
}
