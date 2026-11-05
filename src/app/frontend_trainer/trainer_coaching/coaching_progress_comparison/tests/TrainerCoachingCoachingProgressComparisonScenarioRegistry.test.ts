import { describe, expect, it } from 'vitest';
import { createTrainerCoachingCoachingProgressComparisonScenarioRegistry } from '../mocks/scenarios/trainer_coaching_coaching_progress_comparison.scenarios';

describe('coaching_progress_comparison MSW scenario registry', () => {
  it('registers every canonical success, empty, error, timeout, and authorization scenario', () => {
    const registry = createTrainerCoachingCoachingProgressComparisonScenarioRegistry('/scenario-test', { records: [{ id: 'fixture-1' }], total: 1 });
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
