import { describe, expect, it } from 'vitest';
import { createTrainerOperationsOperationsLeaveRequestsScenarioRegistry } from '../mocks/scenarios/trainer_operations_operations_leave_requests.scenarios';

describe('operations_leave_requests MSW scenario registry', () => {
  it('registers every canonical success, empty, error, timeout, and authorization scenario', () => {
    const registry = createTrainerOperationsOperationsLeaveRequestsScenarioRegistry('/scenario-test', { records: [{ id: 'fixture-1' }], total: 1 });
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
