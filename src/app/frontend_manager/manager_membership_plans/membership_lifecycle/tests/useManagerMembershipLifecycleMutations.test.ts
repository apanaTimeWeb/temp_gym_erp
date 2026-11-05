import * as moduleUnderTest from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/hooks/useManagerMembershipLifecycleMutations';

describe('useManagerMembershipLifecycleMutations contract', () => {
  it('exports the dedicated mutation hook', () => {
    expect(typeof moduleUnderTest.useManagerMembershipLifecycleMutations).toBe('function');
  });
});
