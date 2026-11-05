// RESPONSIBILITY: Owns canonical initial/default values for module form state.
import type { ExerciseFormValues, WorkoutFormValues } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/types/manager_workout_plans_form.types';

export const EMPTY_WORKOUT_FORM: WorkoutFormValues = { name: '', level: 'BEGINNER', days: 0, exercises: 0, focus: '', duration: '', tags: '' };

export const EMPTY_EXERCISE_FORM: ExerciseFormValues = { name: '', muscle: '', equipment: 'Barbell', difficulty: 'BEGINNER' };
