import { MANAGER_REFERRALS_REWARDS_API } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/config/manager_referrals_rewards.url_config';
import { describe, expect, it } from 'vitest';



describe('manager_referrals API URL contract', () => {
  it('matches the feature API contract for BASE', () => { expect(MANAGER_REFERRALS_REWARDS_API.BASE).toBe("/api/v1/manager/referrals"); });
  it('matches the feature API contract for CLAIM', () => { expect(MANAGER_REFERRALS_REWARDS_API.CLAIM('sample-id')).toBe("/api/v1/manager/referrals/sample-id/claim"); });
  it('matches the feature API contract for KPIS', () => { expect(MANAGER_REFERRALS_REWARDS_API.KPIS).toBe("/api/v1/manager/referrals/kpis"); });
});
