import { describe, expect, it } from 'vitest';
import { managerLibraryExerciseFormSchema } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/schemas/manager_library_diet_plans_exercise_form.schemas';
import { EMPTY_MANAGER_LIBRARY_DIET_PLANS_EXERCISE_FORM } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/constants/manager_library_diet_plans_form_defaults.constants';

describe('Manager Library exercise form schema parity', () => {
  it('keeps invalid empty required fields invalid while allowing empty optional-text values', () => {
    expect(managerLibraryExerciseFormSchema.safeParse(EMPTY_MANAGER_LIBRARY_DIET_PLANS_EXERCISE_FORM).success).toBe(false);
    const validRequiredFields = { ...EMPTY_MANAGER_LIBRARY_DIET_PLANS_EXERCISE_FORM, name: 'Leg Press', category: 'Strength', difficulty: 'BEGINNER' };
    expect(managerLibraryExerciseFormSchema.safeParse({ ...validRequiredFields, description: '', videoUrl: '' }).success).toBe(true);
    expect(managerLibraryExerciseFormSchema.safeParse({ ...validRequiredFields, videoUrl: 'not-a-url' }).success).toBe(false);
  });
});
