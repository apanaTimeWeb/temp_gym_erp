// RESPONSIBILITY: Library query parameter type for the feature-owned query contract.
import type { TrainerLibraryFilterGoal, TrainerLibrarySortDirection, TrainerLibrarySortField } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/types/TrainerCoachingDietLibraryAndAssignmentsTypes';

export interface TrainerLibraryQueryParams {
  search?: string;
  goal?: TrainerLibraryFilterGoal;
  page?: number;
  sortBy?: TrainerLibrarySortField;
  sortDirection?: TrainerLibrarySortDirection;
}
