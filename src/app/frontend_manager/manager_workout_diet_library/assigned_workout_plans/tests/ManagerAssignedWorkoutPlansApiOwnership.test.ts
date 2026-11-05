import { describe, expect, it } from 'vitest';
import { ManagerWorkoutPlansApi } from '@/app/frontend_manager/manager_workout_diet_library/assigned_workout_plans/api/manager_workout_diet_library_assigned_workout_plans.api';

describe('assigned_workout_plans API ownership', () => {
  it('exposes only the methods owned by this autonomous leaf', () => {
    expect(Object.keys(ManagerWorkoutPlansApi).sort()).toEqual(['fetchAssignments', 'fetchExercises', 'fetchWorkouts']);
  });
});
