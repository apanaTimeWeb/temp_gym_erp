import * as moduleUnderTest from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/hooks/useManagerPtAssignmentsMutations';

describe('useManagerPtAssignmentsMutations contract', () => {
  it('exports the dedicated mutation hook', () => {
    expect(typeof moduleUnderTest.useManagerPtAssignmentsMutations).toBe('function');
  });
});
