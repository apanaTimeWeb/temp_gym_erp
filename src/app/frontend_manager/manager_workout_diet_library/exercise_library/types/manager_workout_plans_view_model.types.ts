import type { WorkoutFormValues, ExerciseFormValues } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/types/manager_workout_plans_form.types';
import type { ExerciseSnapshot } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/types/manager_workout_plans_snapshot.types';
import type { Workout } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/types/manager_workout_diet_library_exercise_library.types';


export interface ManagerWorkoutPlansViewModel {
  tab: string;
  setTab: (value: string) => void;
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
  showExModal: boolean;
  setShowExModal: (value: boolean) => void;
  editExId: string | null;
  exForm: ExerciseFormValues;
  setExForm: (value: ExerciseFormValues) => void;
  openAddEx: () => void;
  openEditEx: (exercise: ExerciseSnapshot) => void;
}
