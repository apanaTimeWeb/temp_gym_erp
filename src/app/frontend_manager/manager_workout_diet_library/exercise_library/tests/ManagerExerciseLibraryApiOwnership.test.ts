import { describe, expect, it } from 'vitest';
import { ManagerWorkoutPlansApi } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/api/manager_workout_diet_library_exercise_library.api';

describe('exercise_library API ownership', () => {
  it('exposes only the methods owned by this autonomous leaf', () => {
    expect(Object.keys(ManagerWorkoutPlansApi).sort()).toEqual(['createExercise', 'deleteExercise', 'fetchExercises', 'updateExercise']);
  });
});
