// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
import { MANAGER_EXPENSE_REGISTER_AND_REPORTING_API } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/config/manager_expense_register_and_reporting.url_config';
import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';

import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';
import { ManagerMocksTestProviders } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksTestProviders';
import { managerMswServer } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksMswTestServer';



import { ManagerExpenseRegisterAndReportingApi } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/api/manager_expense_register_and_reporting.api';
import ManagerExpenseRegisterAndReportingMain from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/components/ManagerExpenseRegisterAndReportingMain';

beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Expenses user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerMocksTestProviders><ManagerExpenseRegisterAndReportingMain /></ManagerMocksTestProviders>);
    expect(await screen.findByText('Expenses')).toBeInTheDocument();
    expect(await screen.findByText('Electricity Bill - August')).toBeInTheDocument();
  });

  it('proves module MSW supplies non-placeholder API data', async () => {
    const response = await ManagerExpenseRegisterAndReportingApi.fetchExpenses({ page: '1', limit: '10' });
    expect(response.success).toBe(true);
    expect(response.data?.expenses?.length ?? 0).toBeGreaterThan(0);
  });
it('renders the expenses empty state from an MSW response', async () => {
    managerMswServer.use(
      http.get(ManagerInfrastructureMockApiUrl(MANAGER_EXPENSE_REGISTER_AND_REPORTING_API.BASE), () => HttpResponse.json({ success: true, message: 'Empty result', data: { expenses: [], total: 0, page: 1, limit: 10 } }))
    );
    render(<ManagerMocksTestProviders><ManagerExpenseRegisterAndReportingMain /></ManagerMocksTestProviders>);
    expect(await screen.findByText('No expenses found')).toBeInTheDocument();
  });

  it('renders the expenses error state from an MSW failure', async () => {
    managerMswServer.use(
      http.get(ManagerInfrastructureMockApiUrl(MANAGER_EXPENSE_REGISTER_AND_REPORTING_API.BASE), () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: MANAGER_HTTP_STATUS.SERVER_ERROR }))
    );
    render(<ManagerMocksTestProviders><ManagerExpenseRegisterAndReportingMain /></ManagerMocksTestProviders>);
    expect(await screen.findByText(/Simulated failure|Unable to load expenses|Failed to load expenses/i)).toBeInTheDocument();
  });

  it('proves the real expenses search input changes the rendered dataset', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ManagerMocksTestProviders><ManagerExpenseRegisterAndReportingMain /></ManagerMocksTestProviders>);
    expect(await screen.findByText('Electricity Bill - August')).toBeInTheDocument();
    const search = await screen.findByPlaceholderText('Search expenses...');
    await user.clear(search);
    await user.type(search, 'ZZZ-No-Such-Expense');
    expect(await screen.findByText('No expenses found')).toBeInTheDocument();
  });

  it('applies page and limit to the expense mock list response', async () => {
    const response = await ManagerExpenseRegisterAndReportingApi.fetchExpenses({ page: '2', limit: '2' });
    expect(response.success).toBe(true);
    expect(response.data?.page).toBe(2);
    expect(response.data?.limit).toBe(2);
    expect(response.data?.expenses).toHaveLength(2);
    expect(response.data?.total).toBeGreaterThan(2);
  });

  it('replays an identical expense create for the same idempotency key', async () => {
    const body = { title: 'RBG05 idempotency probe', category: 'Utilities', amount: 12345, date: '2026-10-01', status: 'PENDING' as const };
    const first = await ManagerExpenseRegisterAndReportingApi.createExpense(body, 'rbg05-expense-same-intent');
    const retry = await ManagerExpenseRegisterAndReportingApi.createExpense(body, 'rbg05-expense-same-intent');
    expect(first.success).toBe(true);
    expect(retry.data?.id).toBe(first.data?.id);
  });

  it('executes the declared unauthorized mock scenario on the expense list handler', async () => {
    const response = await fetch(ManagerInfrastructureMockApiUrl(MANAGER_EXPENSE_REGISTER_AND_REPORTING_API.BASE), { headers: { 'x-manager-mock-scenario': 'UNAUTHORIZED' } });
    expect(response.status).toBe(401);
  });

});
