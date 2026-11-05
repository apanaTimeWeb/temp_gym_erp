import { describe, expect, it } from 'vitest';
import { managerExerciseFormSchema, managerWorkoutFormSchema } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/schemas/manager_workout_plans_form_forms.schemas';

describe('Manager Workout form schema input/output parity', () => {
  it('coerces numeric HTML input values into numeric output fields', () => {
    const result = managerWorkoutFormSchema.safeParse({ name: 'Full Body', level: 'BEGINNER', days: '3', exercises: '5', focus: 'Strength', duration: '45 minutes', tags: '' });
    expect(result.success).toBe(true);
    if (result.success) { expect(result.data.days).toBe(3); expect(result.data.exercises).toBe(5); }
  });
  it('keeps the non-coercing exercise form contract valid', () => {
    expect(managerExerciseFormSchema.safeParse({ name: 'Squat', muscle: 'Legs', equipment: 'Barbell', difficulty: 'BEGINNER' }).success).toBe(true);
  });
});
