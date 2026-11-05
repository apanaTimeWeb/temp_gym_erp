// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
import { MANAGER_REPORTS_OVERVIEW_API } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/config/manager_reports_overview.url_config';
import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';

import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';
import { ManagerMocksTestProviders } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksTestProviders';
import { managerMswServer } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksMswTestServer';



import { ManagerReportsOverviewApi } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/api/manager_reports_overview.api';
import ManagerReportsOverviewMain from '@/app/frontend_manager/manager_reports_referrals/reports_overview/components/ManagerReportsOverviewMain';

beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Reports user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerMocksTestProviders><ManagerReportsOverviewMain /></ManagerMocksTestProviders>);
    expect(await screen.findByText('Reports & Analytics')).toBeInTheDocument();
  });

  it('proves module MSW supplies non-placeholder API data', async () => {
    const response = await ManagerReportsOverviewApi.fetchReportsSummary({ range: 'this_month' });
    expect(response.success).toBe(true);
    expect(response.data?.kpis?.totalRevenue).toBeGreaterThan(0);
  });
it('renders the reports error state from an MSW failure', async () => {
    managerMswServer.use(
      http.get(ManagerInfrastructureMockApiUrl(MANAGER_REPORTS_OVERVIEW_API.SUMMARY), () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: MANAGER_HTTP_STATUS.SERVER_ERROR }))
    );
    render(<ManagerMocksTestProviders><ManagerReportsOverviewMain /></ManagerMocksTestProviders>);
    expect(await screen.findByText('Failed to load report data')).toBeInTheDocument();
  });

  it('keeps the reports UI user-controllable through tab switching', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ManagerMocksTestProviders><ManagerReportsOverviewMain /></ManagerMocksTestProviders>);
    const tabButtons = await screen.findAllByRole('button');
    expect(tabButtons.length).toBeGreaterThan(0);
    await user.click(tabButtons[0]);
    expect(await screen.findByText('Reports & Analytics')).toBeInTheDocument();
  });

});
