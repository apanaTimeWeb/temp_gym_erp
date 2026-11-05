import * as moduleUnderTest from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/hooks/useManagerTrainerScheduleMutations';

describe('useManagerTrainerScheduleMutations contract', () => {
  it('exports the dedicated mutation hook', () => {
    expect(typeof moduleUnderTest.useManagerTrainerScheduleMutations).toBe('function');
  });
});
