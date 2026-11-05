import { describe, expect, it } from 'vitest';
import { ManagerWorkoutPlansApi } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/api/manager_workout_diet_library_workout_plan_management.api';

describe('workout_plan_management API ownership', () => {
  it('exposes only the methods owned by this autonomous leaf', () => {
    expect(Object.keys(ManagerWorkoutPlansApi).sort()).toEqual(['createWorkout', 'deleteWorkout', 'fetchWorkouts', 'updateWorkout']);
  });
});
