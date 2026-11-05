import { describe, expect, it } from 'vitest';
import { createTrainerMembersMembersTrainerNotesScenarioRegistry } from '../mocks/scenarios/trainer_members_members_trainer_notes.scenarios';

describe('members_trainer_notes MSW scenario registry', () => {
  it('registers every canonical success, empty, error, timeout, and authorization scenario', () => {
    const registry = createTrainerMembersMembersTrainerNotesScenarioRegistry('/scenario-test', { records: [{ id: 'fixture-1' }], total: 1 });
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
