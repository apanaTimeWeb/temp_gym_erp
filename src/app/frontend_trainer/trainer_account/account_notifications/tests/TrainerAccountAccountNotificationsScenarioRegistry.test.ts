import { describe, expect, it } from 'vitest';
import { createTrainerAccountAccountNotificationsScenarioRegistry } from '../mocks/scenarios/trainer_account_account_notifications.scenarios';

describe('account_notifications MSW scenario registry', () => {
  it('registers every canonical success, empty, error, timeout, and authorization scenario', () => {
    const registry = createTrainerAccountAccountNotificationsScenarioRegistry('/scenario-test', { records: [{ id: 'fixture-1' }], total: 1 });
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
