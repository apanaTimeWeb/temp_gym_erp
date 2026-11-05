import { describe, expect, it } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/hooks/useManagerReferralsRewardsQueries';

describe("useManagerReferralsRewardsQueries co-located hook contract", () => {
  it("exports the expected callable hook", () => {
    expect(typeof moduleUnderTest.useManagerReferralsRewardsQueries).toBe("function");
  });
});
