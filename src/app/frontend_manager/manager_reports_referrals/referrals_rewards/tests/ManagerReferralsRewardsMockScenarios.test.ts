// RESPONSIBILITY: Guards the required eight-state mock catalog for referrals_rewards.
import { describe, expect, it } from 'vitest';
import { MANAGERREFERRALSREWARDS_MOCK_SCENARIOS } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/mocks/scenarios/ManagerReferralsRewardsMockScenarios';

describe('ManagerReferralsRewards mock scenario catalog', () => {
  it('declares all required transport and UI states', () => {
    expect(Object.keys(MANAGERREFERRALSREWARDS_MOCK_SCENARIOS)).toEqual(['ACTIVE', 'EMPTY', 'SERVER_500', 'TIMEOUT', 'UNAUTHORIZED', 'INVALID', 'CANCELLED', 'RETRY']);
  });
});
