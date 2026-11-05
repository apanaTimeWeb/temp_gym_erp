// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
import { MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_API } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/config/manager_finance_payments_and_summary.url_config';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';

import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';
import { ManagerMocksTestProviders } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksTestProviders';
import { managerMswServer } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksMswTestServer';



import { ManagerFinancePaymentsAndSummaryApi } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/api/manager_finance_payments_and_summary.api';
import ManagerFinancePaymentsAndSummaryMain from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/components/ManagerFinancePaymentsAndSummaryMain';


beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Finance user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerMocksTestProviders><ManagerFinancePaymentsAndSummaryMain /></ManagerMocksTestProviders>);
    expect(await screen.findByText('Branch Finance')).toBeInTheDocument();
  });

  it('proves module MSW supplies non-placeholder API data', async () => {
    const response = await ManagerFinancePaymentsAndSummaryApi.fetchPayments({ page: '1', limit: '10' });
    expect(response.success).toBe(true);
    expect(response.data?.payments?.length ?? 0).toBeGreaterThan(0);
  });

  it.each(['csv', 'pdf'] as const)('sends the documented %s export format through the API client and MSW handler', async (format) => {
    const response = await ManagerFinancePaymentsAndSummaryApi.exportPaymentsReport(format);
    expect(response.success).toBe(true);
    const exportUrl = response.data?.url;
    if (format === 'pdf') {
      expect(exportUrl).toMatch(/^data:application\/pdf;base64,/);
      expect(atob(exportUrl?.split(',')[1] ?? '').startsWith('%PDF-1.4')).toBe(true);
    } else {
      expect(exportUrl).toMatch(/^data:text\/csv;charset=utf-8,/);
      expect(decodeURIComponent(exportUrl?.split(',')[1] ?? '')).toMatch(/^date,member,amount/);
    }
  });

  it('renders the module empty state from an MSW empty response', async () => {
    managerMswServer.use(
      http.get(ManagerInfrastructureMockApiUrl(MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_API.PAYMENTS_BASE), () => HttpResponse.json({ success: true, message: 'Empty result', data: { payments : [], total: 0 } }))
    );
    render(<ManagerMocksTestProviders><ManagerFinancePaymentsAndSummaryMain /></ManagerMocksTestProviders>);
    expect(await screen.findByText('No payments found')).toBeInTheDocument();
  });

  it('renders a user-facing error state when the module API fails', async () => {
    managerMswServer.use(
      http.get(ManagerInfrastructureMockApiUrl(MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_API.PAYMENTS_BASE), () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: MANAGER_HTTP_STATUS.SERVER_ERROR }))
    );
    render(<ManagerMocksTestProviders><ManagerFinancePaymentsAndSummaryMain /></ManagerMocksTestProviders>);
    const errorText = await screen.findByText(/Failed to load/i);
    expect(errorText).toBeInTheDocument();
  });



  it('updates the visible payment results from the search field', async () => {
    const user = userEvent.setup();
    render(<ManagerMocksTestProviders><ManagerFinancePaymentsAndSummaryMain /></ManagerMocksTestProviders>);
    const input = await screen.findByPlaceholderText('Search payments...');
    await user.type(input, 'Aarav');
    await new Promise(resolve => setTimeout(resolve, 350));
    expect(await screen.findByText('Aarav Patel')).toBeInTheDocument();
    expect(screen.queryByText('Priya Sharma')).not.toBeInTheDocument();
  });

  it('updates the mock finance summary after an idempotent payment creation', async () => {
    const before = await ManagerFinancePaymentsAndSummaryApi.fetchFinanceSummary();
    const payload = { amount: 100, method: 'UPI' as const, invoiceNumber: 'RBG05-IDEMPOTENT', memberId: 'rbg05-member', paidAt: '2026-10-01T10:00:00Z' };
    const first = await ManagerFinancePaymentsAndSummaryApi.createPayment(payload, 'rbg05-payment-same-intent');
    const retry = await ManagerFinancePaymentsAndSummaryApi.createPayment(payload, 'rbg05-payment-same-intent');
    const after = await ManagerFinancePaymentsAndSummaryApi.fetchFinanceSummary();
    expect(first.data?.id).toBe(retry.data?.id);
    expect(after.data?.totalPayments).toBe((before.data?.totalPayments ?? 0) + 1);
    expect(after.data?.totalRevenue).toBeGreaterThan(before.data?.totalRevenue ?? 0);
  });

  it('runs the declared mock unauthorized scenario through the payments handler', async () => {
    const response = await fetch(ManagerInfrastructureMockApiUrl(MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_API.PAYMENTS_BASE), { headers: { 'x-manager-mock-scenario': 'UNAUTHORIZED' } });
    expect(response.status).toBe(401);
  });

});
