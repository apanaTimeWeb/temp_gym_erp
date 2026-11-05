// RESPONSIBILITY: Tests only the payroll report query and export boundary owned by this leaf.
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { AdminFinancePayrollReportApi } from '@/app/frontend_admin/admin_finance/finance_payroll_report/api/admin_finance_payroll_report_api';
import { useAdminFinancePayrollReportLogic } from '@/app/frontend_admin/admin_finance/finance_payroll_report/hooks/useAdminFinancePayrollReportLogic';

const exportReport = vi.fn();
const refetch = vi.fn();
const fixture = { payrollSummary: [] };
const testState = vi.hoisted(() => ({ search: 'range=this_month' }));
vi.mock('next/navigation', () => ({ useSearchParams: () => new URLSearchParams(testState.search) }));
vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_finance/finance_payroll_report/api/admin_finance_payroll_report_api', () => ({ AdminFinancePayrollReportApi: { fetchPayrollReport: vi.fn(), exportReport: vi.fn() } }));
vi.mock('@/app/frontend_admin/admin_finance/finance_payroll_report/state/useAdminFinancePayrollReportStore', () => ({ useAdminFinancePayrollReportStore: () => ({ selectedGymId: 'b1' }) }));
vi.mock('@/app/frontend_admin/admin_finance/finance_payroll_report/hooks/useAdminFinancePayrollReportMutations', () => ({ useAdminFinancePayrollReportMutations: () => ({ exportMutation: { status: 'idle' }, exportReport }) }));

describe('AdminFinancePayrollReportLogic', () => {
  beforeEach(() => {
    testState.search = 'range=this_month';
    vi.mocked(useQuery).mockReturnValue({ data: fixture, status: 'success', error: null, refetch } as never);
    exportReport.mockReset(); refetch.mockReset();
    vi.mocked(AdminFinancePayrollReportApi.fetchPayrollReport).mockReset();
  });
  it('uses one owning report query with date and branch scope', async () => {
    const { result } = renderHook(() => useAdminFinancePayrollReportLogic());
    expect(result.current.reportData).toEqual(fixture);
    expect(vi.mocked(useQuery).mock.calls).toHaveLength(1);
    const options = vi.mocked(useQuery).mock.calls[0]?.[0] as { queryKey: unknown[]; queryFn: () => Promise<unknown>; enabled?: boolean };
    expect(JSON.stringify(options.queryKey)).toContain('payroll');
    expect(JSON.stringify(options.queryKey)).toContain('b1');
    expect(options.enabled).toBe(true);
    vi.mocked(AdminFinancePayrollReportApi.fetchPayrollReport).mockResolvedValue({ success: true, message: 'ok', data: fixture, requestId: 'report-test' } as never);
    await options.queryFn();
    expect(AdminFinancePayrollReportApi.fetchPayrollReport).toHaveBeenCalledWith({ from: expect.any(String), to: expect.any(String), branchId: 'b1' });
    await result.current.handleExport('csv');
    expect(exportReport).toHaveBeenCalledWith({ type: 'payroll', format: 'csv', from: expect.any(String), to: expect.any(String), branchId: 'b1' });
  });
  it('does not query or export with an incomplete custom date range', async () => {
    testState.search = 'range=custom&startDate=2026-10-01';
    const { result } = renderHook(() => useAdminFinancePayrollReportLogic());
    const options = vi.mocked(useQuery).mock.calls[0]?.[0] as { enabled?: boolean };
    expect(result.current.isDateRangeValid).toBe(false);
    expect(result.current.status).toBe('error');
    expect(options.enabled).toBe(false);
    await result.current.handleExport('csv');
    expect(exportReport).not.toHaveBeenCalled();
    expect(AdminFinancePayrollReportApi.fetchPayrollReport).not.toHaveBeenCalled();
  });
  it('retries only the owning report query', async () => {
    const { result } = renderHook(() => useAdminFinancePayrollReportLogic());
    await result.current.retryReport();
    expect(refetch).toHaveBeenCalledTimes(1);
  });
});
