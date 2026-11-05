// RESPONSIBILITY: Owns canonical initial/default values for module form state.
import type { ManagerLibraryDietPlansExerciseFormValues } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/types/manager_library_diet_plans_exercise_form.types';

export const EMPTY_MANAGER_LIBRARY_DIET_PLANS_EXERCISE_FORM: ManagerLibraryDietPlansExerciseFormValues = {
  name: '',
  category: '',
  muscleGroup: '',
  sets: undefined,
  reps: undefined,
  duration: undefined,
  difficulty: 'BEGINNER',
  description: '',
  videoUrl: '',
  isActive: true,
};
