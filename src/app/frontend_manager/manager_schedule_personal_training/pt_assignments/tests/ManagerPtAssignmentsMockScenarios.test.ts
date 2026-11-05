// RESPONSIBILITY: Guards the required eight-state mock catalog for pt_assignments.
import { describe, expect, it } from 'vitest';
import { MANAGERPTASSIGNMENTS_MOCK_SCENARIOS } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/mocks/scenarios/ManagerPtAssignmentsMockScenarios';

describe('ManagerPtAssignments mock scenario catalog', () => {
  it('declares all required transport and UI states', () => {
    expect(Object.keys(MANAGERPTASSIGNMENTS_MOCK_SCENARIOS)).toEqual(['ACTIVE', 'EMPTY', 'SERVER_500', 'TIMEOUT', 'UNAUTHORIZED', 'INVALID', 'CANCELLED', 'RETRY']);
  });
});
