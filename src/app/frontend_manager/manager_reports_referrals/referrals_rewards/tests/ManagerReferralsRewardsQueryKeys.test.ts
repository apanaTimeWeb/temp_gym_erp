import { describe, expect, it } from 'vitest';

import { ManagerReferralsRewardsQueryKeys } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/api/manager_referrals_rewards.query_keys';

describe('manager_referrals query-key namespace', () => {
  it('uses a stable, feature-specific root for every cache entry', () => {
    expect(ManagerReferralsRewardsQueryKeys.all).toEqual(['manager_referrals']);
  });
});
