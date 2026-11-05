import type { LibraryView } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/types/manager_library_diet_plans.types';

export interface ManagerLibraryDietPlansEmptyStateProps {
  view: LibraryView;
  onAdd: () => void;
}
