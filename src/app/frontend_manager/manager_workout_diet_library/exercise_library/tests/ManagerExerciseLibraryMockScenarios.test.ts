// RESPONSIBILITY: Guards the required eight-state mock catalog for workout_plans.
import { describe, expect, it } from 'vitest';
import { MANAGEREXERCISELIBRARY_MOCK_SCENARIOS } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/mocks/scenarios/ManagerExerciseLibraryMockScenarios';

describe('ManagerWorkoutPlans mock scenario catalog', () => {
  it('declares all required transport and UI states', () => {
    expect(Object.keys(MANAGEREXERCISELIBRARY_MOCK_SCENARIOS)).toEqual(['ACTIVE', 'EMPTY', 'SERVER_500', 'TIMEOUT', 'UNAUTHORIZED', 'INVALID', 'CANCELLED', 'RETRY']);
  });
});
