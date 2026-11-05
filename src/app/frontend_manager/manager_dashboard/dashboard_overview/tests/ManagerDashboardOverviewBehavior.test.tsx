// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';

import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';
import { ManagerMocksTestProviders } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksTestProviders';
import { managerMswServer } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksMswTestServer';

import { MANAGER_DASHBOARD_OVERVIEW_API } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/config/manager_dashboard_overview.url_config';;

import { ManagerDashboardOverviewApi } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/api/manager_dashboard_overview.api';
import ManagerDashboardOverviewMain from '@/app/frontend_manager/manager_dashboard/dashboard_overview/components/ManagerDashboardOverviewMain';

beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Dashboard user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    const { container } = render(<main><ManagerMocksTestProviders><ManagerDashboardOverviewMain /></ManagerMocksTestProviders></main>);
    expect(await screen.findByText('Dashboard')).toBeInTheDocument();
    expect(await screen.findByText('John Doe')).toBeInTheDocument();
    expect((await axe(container)).violations).toEqual([]);
  });

  it('proves module MSW supplies non-placeholder API data', async () => {
    const response = await ManagerDashboardOverviewApi.fetchDashboardStats({ range: 'monthly' });
    expect(response.success).toBe(true);
    expect(response.data?.totalMembers).toBeGreaterThan(0);
  });
it('renders dashboard empty collection states from an MSW empty response', async () => {
    const { MOCK_DASHBOARD_STATS } = await import('@/app/frontend_manager/manager_dashboard/dashboard_overview/mocks/ManagerDashboardOverviewMockData');
    managerMswServer.use(
      http.get(ManagerInfrastructureMockApiUrl(MANAGER_DASHBOARD_OVERVIEW_API.STATS), () => HttpResponse.json({
        success: true,
        message: 'Empty dashboard collections',
        data: { ...MOCK_DASHBOARD_STATS, recentMembers: [], recentPayments: [], pendingPaymentsList: [], expiringMemberships: [], memberGrowth: [], revenueChart: [], membersByPlan: [] }, requestId: 'mock-dashboard-stats' }))
    );
    const { container } = render(<main><ManagerMocksTestProviders><ManagerDashboardOverviewMain /></ManagerMocksTestProviders></main>);
    expect(await screen.findByText('No members yet. Add your first member!')).toBeInTheDocument();
    expect((await axe(container)).violations).toEqual([]);
  });

  it('renders the dashboard error state from an MSW failure', async () => {
    managerMswServer.use(
      http.get(ManagerInfrastructureMockApiUrl(MANAGER_DASHBOARD_OVERVIEW_API.STATS), () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null, errorCode: 'INTERNAL_ERROR', statusCode: MANAGER_HTTP_STATUS.SERVER_ERROR, requestId: 'mock-dashboard-stats' }, { status: MANAGER_HTTP_STATUS.SERVER_ERROR }))
    );
    const { container } = render(<main><ManagerMocksTestProviders><ManagerDashboardOverviewMain /></ManagerMocksTestProviders></main>);
    expect(await screen.findByText('Failed to load dashboard')).toBeInTheDocument();
    expect((await axe(container)).violations).toEqual([]);
  });

  it('proves the dashboard recent-member search changes rendered results', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<main><ManagerMocksTestProviders><ManagerDashboardOverviewMain /></ManagerMocksTestProviders></main>);
    expect(await screen.findByText('John Doe')).toBeInTheDocument();
    const search = await screen.findByPlaceholderText('Search members...');
    await user.clear(search);
    await user.type(search, 'ZZZ-No-Such-Member');
    expect(await screen.findByText('No members matching "ZZZ-No-Such-Member"')).toBeInTheDocument();
  });

});
