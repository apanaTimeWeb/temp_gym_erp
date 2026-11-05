// RESPONSIBILITY: Exercises sales overview workflows through the real feature UI and MSW transport boundary.
import { MANAGER_SALES_OVERVIEW_API } from '@/app/frontend_manager/manager_sales_billing/sales_overview/config/manager_sales_overview.url_config';
import { screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterAll, afterEach, beforeEach } from 'vitest';

import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';
import { managerMswServer } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksMswTestServer';
import { ManagerSalesOverviewApi } from '@/app/frontend_manager/manager_sales_billing/sales_overview/api/manager_sales_overview.api';
import ManagerSalesOverviewMain from '@/app/frontend_manager/manager_sales_billing/sales_overview/components/ManagerSalesOverviewMain';
import { resetManagerSalesOverviewMockScenarioState } from '@/app/frontend_manager/manager_sales_billing/sales_overview/mocks/handlers/ManagerSalesOverviewMockHandlers';
import { renderManagerSalesOverview } from '@/app/frontend_manager/manager_sales_billing/sales_overview/tests/harness/bootstrap';

beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
beforeEach(() => resetManagerSalesOverviewMockScenarioState());
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Sales user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    renderManagerSalesOverview(<ManagerSalesOverviewMain />);
    expect(await screen.findByText('Payment & Billing')).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: 'Membership Report' })).toBeInTheDocument();
  });

  it('returns request IDs and preserves membership report pagination metadata', async () => {
    const response = await ManagerSalesOverviewApi.fetchMembershipReport({ page: '1', limit: '2' });
    expect(response.success).toBe(true);
    if (!response.success) return;
    expect(response.requestId).toMatch(/^manager-sales-overview-mock-/);
    expect(response.data.report).toHaveLength(2);
    expect(response.data.total).toBe(4);
    expect(response.data.page).toBe(1);
    expect(response.data.limit).toBe(2);
  });

  it('applies search and pagination metadata consistently across membership and payment endpoints', async () => {
    const pending = await ManagerSalesOverviewApi.fetchPendingPayments({ search: 'Amit', page: '2', limit: '1' });
    expect(pending.success).toBe(true);
    if (pending.success) {
      expect(pending.data.members.map((member) => member.name)).toEqual(['Amit Kumar']);
      expect(pending.data.total).toBe(200000);
      expect(pending.data.totalCount).toBe(1);
      expect(pending.data.page).toBe(2);
      expect(pending.data.limit).toBe(1);
    }

    const allMemberships = await ManagerSalesOverviewApi.fetchAllMemberships({ search: 'priya', page: '1', limit: '10' });
    expect(allMemberships.success).toBe(true);
    if (allMemberships.success) {
      expect(allMemberships.data.members.map((member) => member.name)).toEqual(['Priya Singh']);
      expect(allMemberships.data.total).toBe(1);
    }
  });

  it.each([
    ['SERVER_500', MANAGER_HTTP_STATUS.SERVER_ERROR],
    ['TIMEOUT', 408],
    ['UNAUTHORIZED', MANAGER_HTTP_STATUS.UNAUTHORIZED],
  ] as const)('executes the %s mock scenario with its failure envelope', async (scenario, statusCode) => {
    const response = await ManagerSalesOverviewApi.fetchMembershipReport({ scenario });
    expect(response.success).toBe(false);
    if (!response.success) {
      expect(response.statusCode).toBe(statusCode);
      expect(response.requestId).toMatch(/^manager-sales-overview-mock-/);
    }
  });

  it('renders the membership-report empty state from a valid empty API response', async () => {
    managerMswServer.use(
      http.get(ManagerInfrastructureMockApiUrl(MANAGER_SALES_OVERVIEW_API.MEMBERSHIP_REPORT), () => HttpResponse.json({ success: true, message: 'Empty result', data: { report: [], totals: { activeCount: 0, revenue: 0, totalReceivable: 0, totalReceived: 0, remaining: 0, refunds: 0 }, total: 0, page: 1, limit: 10 }, requestId: 'sales-test-empty' }))
    );
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    renderManagerSalesOverview(<ManagerSalesOverviewMain />);
    await user.click(await screen.findByRole('button', { name: 'Membership Report' }));
    expect(await screen.findByText('No membership report data')).toBeInTheDocument();
  });

  it('announces a membership-report API failure and exposes a retry action', async () => {
    managerMswServer.use(
      http.get(ManagerInfrastructureMockApiUrl(MANAGER_SALES_OVERVIEW_API.MEMBERSHIP_REPORT), () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null, errorCode: 'SERVER_ERROR', statusCode: MANAGER_HTTP_STATUS.SERVER_ERROR, requestId: 'sales-test-failure' }, { status: MANAGER_HTTP_STATUS.SERVER_ERROR }))
    );
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    renderManagerSalesOverview(<ManagerSalesOverviewMain />);
    await user.click(await screen.findByRole('button', { name: 'Membership Report' }));
    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: 'Try Again' })).toBeInTheDocument();
  });

  it('filters the membership report by member name and returns an empty result for no match', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    renderManagerSalesOverview(<ManagerSalesOverviewMain />);
    await user.click(await screen.findByRole('button', { name: 'Membership Report' }));
    const search = await screen.findByPlaceholderText('Search...');
    await user.clear(search);
    await user.type(search, 'ZZZ-No-Such-Member');
    expect(await screen.findByText('No membership report data')).toBeInTheDocument();
  });

  it('executes the catalog retry scenario as a failure followed by success', async () => {
    const first = await ManagerSalesOverviewApi.fetchMembershipReport({ scenario: 'RETRY' });
    expect(first.success).toBe(false);
    if (first.success) return;
    expect(first.statusCode).toBe(503);
    const second = await ManagerSalesOverviewApi.fetchMembershipReport({ scenario: 'RETRY' });
    expect(second.success).toBe(true);
    if (!second.success) return;
    expect(second.data.report.length).toBeGreaterThan(0);
  });
});
