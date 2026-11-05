// RESPONSIBILITY: Exposes the isolated testing-library bootstrap for referrals_rewards.
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { ManagerReferralsRewardsHarness } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/tests/harness/ManagerReferralsRewardsHarness';

export function renderManagerReferralsRewards(ui: ReactElement, options: Omit<RenderOptions, 'wrapper'> = {}) {
  return render(ui, { ...options, wrapper: ({ children }) => <ManagerReferralsRewardsHarness>{children}</ManagerReferralsRewardsHarness> });
}
