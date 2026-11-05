import { describe, expect, it } from 'vitest';
import { createTrainerOperationsOperationsTrainerAttendanceScenarioRegistry } from '../mocks/scenarios/trainer_operations_operations_trainer_attendance.scenarios';

describe('operations_trainer_attendance MSW scenario registry', () => {
  it('registers every canonical success, empty, error, timeout, and authorization scenario', () => {
    const registry = createTrainerOperationsOperationsTrainerAttendanceScenarioRegistry('/scenario-test', { records: [{ id: 'fixture-1' }], total: 1 });
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
