// RESPONSIBILITY: Verify missing branch-reference response is an error, not an empty selector.
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { ReactNode } from 'react';
import { useAdminFinancePayrollReportBranchReference } from '@/app/frontend_admin/admin_finance/finance_payroll_report/hooks/useAdminFinancePayrollReportBranchReference';
import { AdminFinancePayrollReportBranchReferenceApi } from '@/app/frontend_admin/admin_finance/finance_payroll_report/api/admin_finance_payroll_report_branch_reference_api';

vi.mock('@/app/frontend_admin/admin_finance/finance_payroll_report/api/admin_finance_payroll_report_branch_reference_api', () => ({
  AdminFinancePayrollReportBranchReferenceApi: { fetchReportBranchReferences: vi.fn() },
}));

afterEach(() => vi.resetAllMocks());

describe('Payroll report branch-reference failures', () => {
  it('does not present missing successful payload as an empty branch list', async () => {
    vi.mocked(AdminFinancePayrollReportBranchReferenceApi.fetchReportBranchReferences).mockResolvedValue({ success: true, data: null } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useAdminFinancePayrollReportBranchReference(), { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.data).toBeUndefined();
    client.clear();
  });
});
