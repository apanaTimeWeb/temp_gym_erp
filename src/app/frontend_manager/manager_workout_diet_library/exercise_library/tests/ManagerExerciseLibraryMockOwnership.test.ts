import { describe, expect, it } from 'vitest';
import { managerWorkoutHandlers, resetManagerExerciseLibraryMockState } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/mocks/handlers/ManagerExerciseLibraryMockHandlers';

describe('exercise_library mock ownership', () => {
  it('exports a route-local handler collection and explicit state reset', () => {
    expect(Array.isArray(managerWorkoutHandlers)).toBe(true);
    expect(typeof resetManagerExerciseLibraryMockState).toBe('function');
  });
});
