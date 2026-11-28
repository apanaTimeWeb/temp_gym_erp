// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerLibraryFilterGoal, TrainerLibrarySortDirection, TrainerLibrarySortField } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/types/TrainerCoachingDietLibraryAndAssignmentsTypes';

export interface TrainerLibraryTabsProps {
  search: string;
  setSearch: (value: string) => void;
  filterGoal: string | TrainerLibraryFilterGoal;
  setFilterGoal: (value: TrainerLibraryFilterGoal) => void;
  sortBy?: TrainerLibrarySortField;
  sortDirection?: TrainerLibrarySortDirection;
  onSortChange?: (field: TrainerLibrarySortField) => void;
  onRefresh: () => Promise<void>;
  onCreate?: () => void;
}
