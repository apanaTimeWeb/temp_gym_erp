// RESPONSIBILITY: Verifies the report export blocker and localized user feedback when the host Blob contract is absent.
// DATA FLOW: test event → report mutation boundary → contract-block error → accessible toast feedback (admin_finance/finance_revenue_report/tests/hooks/useAdminFinanceRevenueReportMutations.test.tsx)

import React from 'react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import { AdminFinanceRevenueReportApi, AdminFinanceRevenueReportBinaryExportContractError } from '@/app/frontend_admin/admin_finance/finance_revenue_report/api/admin_finance_revenue_report_api';
import { useAdminFinanceRevenueReportMutations } from '@/app/frontend_admin/admin_finance/finance_revenue_report/hooks/useAdminFinanceRevenueReportMutations';
import { adminToast } from '@/app/frontend_admin/admin_finance/finance_revenue_report/components/feedback/AdminFinanceRevenueReportToastService';

vi.mock('@/app/frontend_admin/admin_finance/finance_revenue_report/components/feedback/AdminFinanceRevenueReportToastService', () => ({
  adminToast: { success: vi.fn(), error: vi.fn() },
}));

const messages = { reports: { admin_reports_main: { exportContractBlocked: 'CSV export is unavailable until the host API contract defines safe binary-response handling.', exportError: 'The export could not be completed.' } } };
const wrapper = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return <NextIntlClientProvider locale="en" messages={messages}><QueryClientProvider client={client}>{children}</QueryClientProvider></NextIntlClientProvider>;
};

describe('useAdminFinanceRevenueReportMutations', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('blocks unverified binary export and gives localized feedback instead of making a raw fetch', async () => {
    vi.spyOn(AdminFinanceRevenueReportApi, 'exportReport').mockRejectedValue(new AdminFinanceRevenueReportBinaryExportContractError());
    const { result } = renderHook(() => useAdminFinanceRevenueReportMutations(), { wrapper });
    await act(async () => {
      await result.current.exportMutation.mutateAsync({ type: 'revenue', format: 'csv', from: '2026-01-01', to: '2026-01-31' }).catch(() => undefined);
    });
    await waitFor(() => expect(adminToast.error).toHaveBeenCalledWith(messages.reports.admin_reports_main.exportContractBlocked, 'admin-reports-export-error'));
  });
});
