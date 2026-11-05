import { describe, expect, it } from 'vitest';
import { managerLibraryDietFormSchema } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/schemas/manager_library_diet_plans_diet_form.schemas';

describe('Manager Library diet form schema input/output parity', () => {
  it('coerces numeric text input to numeric output', () => {
    const result = managerLibraryDietFormSchema.safeParse({ name: 'Balanced Diet', goal: 'Maintenance', calories: '2100', protein: '150', carbs: '220', fats: '65', description: '', meals: '' });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.calories).toBe(2100);
  });
});
