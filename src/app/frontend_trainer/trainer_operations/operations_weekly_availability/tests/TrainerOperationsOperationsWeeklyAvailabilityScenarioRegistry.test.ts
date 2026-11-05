import { describe, expect, it } from 'vitest';
import { createTrainerOperationsOperationsWeeklyAvailabilityScenarioRegistry } from '../mocks/scenarios/trainer_operations_operations_weekly_availability.scenarios';

describe('operations_weekly_availability MSW scenario registry', () => {
  it('registers every canonical success, empty, error, timeout, and authorization scenario', () => {
    const registry = createTrainerOperationsOperationsWeeklyAvailabilityScenarioRegistry('/scenario-test', { records: [{ id: 'fixture-1' }], total: 1 });
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
