import { describe, expect, it } from 'vitest';
import { createTrainerCoachingCoachingExerciseManagementScenarioRegistry } from '../mocks/scenarios/trainer_coaching_coaching_exercise_management.scenarios';

describe('coaching_exercise_management MSW scenario registry', () => {
  it('registers every canonical success, empty, error, timeout, and authorization scenario', () => {
    const registry = createTrainerCoachingCoachingExerciseManagementScenarioRegistry('/scenario-test', { records: [{ id: 'fixture-1' }], total: 1 });
    expect(Object.keys(registry)).toEqual([
      'ACTIVE_RECORDS',
      'EMPTY_DATA',
      'SERVER_500_ERROR',
      'NETWORK_TIMEOUT',
      'UNAUTHORIZED_401',
      'FORBIDDEN_403',
    ]);
  });
});
