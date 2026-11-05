import * as moduleUnderTest from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/hooks/useManagerReferralsRewardsMutations';

describe('useManagerReferralsRewardsMutations contract', () => {
  it('exports the dedicated mutation hook', () => {
    expect(typeof moduleUnderTest.useManagerReferralsRewardsMutations).toBe('function');
  });
});
