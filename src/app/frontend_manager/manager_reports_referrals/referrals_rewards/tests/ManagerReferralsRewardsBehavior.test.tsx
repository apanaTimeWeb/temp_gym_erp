// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
import { MANAGER_REFERRALS_REWARDS_API } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/config/manager_referrals_rewards.url_config';
import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';

import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';
import { ManagerMocksTestProviders } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksTestProviders';
import { managerMswServer } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksMswTestServer';



import { ManagerReferralsRewardsApi } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/api/manager_referrals_rewards.api';
import ManagerReferralsRewardsMain from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/components/ManagerReferralsRewardsMain';

beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Referrals user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerMocksTestProviders><ManagerReferralsRewardsMain /></ManagerMocksTestProviders>);
    expect(await screen.findByText('Referrals & Rewards')).toBeInTheDocument();
    expect(await screen.findByText('Arjun Sharma')).toBeInTheDocument();
  });

  it('proves module MSW supplies non-placeholder API data', async () => {
    const response = await ManagerReferralsRewardsApi.fetchReferrals({ page: 1, limit: 10 });
    expect(response.success).toBe(true);
    expect(response.data?.length ?? 0).toBeGreaterThan(0);
  });
it('renders the referrals empty state from an MSW response', async () => {
    managerMswServer.use(
      http.get(ManagerInfrastructureMockApiUrl(MANAGER_REFERRALS_REWARDS_API.BASE), () => HttpResponse.json({ success: true, message: 'Empty result', data: [], meta: { totalPages: 1, total: 0 } }))
    );
    render(<ManagerMocksTestProviders><ManagerReferralsRewardsMain /></ManagerMocksTestProviders>);
    expect(await screen.findByText('No referrals found')).toBeInTheDocument();
  });

  it('renders the referrals error state from an MSW failure', async () => {
    managerMswServer.use(
      http.get(ManagerInfrastructureMockApiUrl(MANAGER_REFERRALS_REWARDS_API.BASE), () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: MANAGER_HTTP_STATUS.SERVER_ERROR }))
    );
    render(<ManagerMocksTestProviders><ManagerReferralsRewardsMain /></ManagerMocksTestProviders>);
    expect(await screen.findByText(/Unable to load|Failed to load/i)).toBeInTheDocument();
  });

  it('proves referral search changes the rendered dataset', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ManagerMocksTestProviders><ManagerReferralsRewardsMain /></ManagerMocksTestProviders>);
    expect(await screen.findByText('Arjun Sharma')).toBeInTheDocument();
    const search = await screen.findByPlaceholderText('Search Referrer or Referee...');
    await user.clear(search);
    await user.type(search, 'ZZZ-No-Such-Referral');
    expect(await screen.findByText('No referrals found')).toBeInTheDocument();
  });

});
