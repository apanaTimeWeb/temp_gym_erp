// RESPONSIBILITY: Guards the required eight-state mock catalog for trainer_schedule.
import { describe, expect, it } from 'vitest';
import { MANAGERSCHEDULEMANAGEMENT_MOCK_SCENARIOS } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/mocks/scenarios/ManagerTrainerScheduleMockScenarios';

describe('ManagerTrainerSchedule mock scenario catalog', () => {
  it('declares all required transport and UI states', () => {
    expect(Object.keys(MANAGERSCHEDULEMANAGEMENT_MOCK_SCENARIOS)).toEqual(['ACTIVE', 'EMPTY', 'SERVER_500', 'TIMEOUT', 'UNAUTHORIZED', 'INVALID', 'CANCELLED', 'RETRY']);
  });
});
