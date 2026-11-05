// RESPONSIBILITY: Owns canonical initial/default values for module form state.
import type { DietFormValues } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/types/manager_library_diet_plans_diet_form.types';

export const EMPTY_DIET_FORM: DietFormValues = {
  name: '', goal: 'Weight Loss', calories: undefined, protein: undefined, carbs: undefined, fats: undefined, description: '', meals: ''
};
