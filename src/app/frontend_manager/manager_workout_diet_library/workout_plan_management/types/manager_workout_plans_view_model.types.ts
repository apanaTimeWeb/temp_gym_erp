import type { WorkoutFormValues } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/types/manager_workout_plans_form.types';
import type { Workout } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/types/manager_workout_diet_library_workout_plan_management.types';

export interface ManagerWorkoutPlansViewModel {
  search: string;
  setSearch: (value: string) => void;
  levelFilter: string;
  setLevelFilter: (value: string) => void;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  showWkModal: boolean;
  setShowWkModal: (value: boolean) => void;
  editWkId: string | null;
  wkForm: WorkoutFormValues;
  setWkForm: (value: WorkoutFormValues) => void;
  openAddWk: () => void;
  openEditWk: (workout: Workout) => void;
}
