// RESPONSIBILITY: Tests only the revenue report query and export boundary owned by this leaf.
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { AdminFinanceRevenueReportApi } from '@/app/frontend_admin/admin_finance/finance_revenue_report/api/admin_finance_revenue_report_api';
import { useAdminFinanceRevenueReportLogic } from '@/app/frontend_admin/admin_finance/finance_revenue_report/hooks/useAdminFinanceRevenueReportLogic';

const exportReport = vi.fn();
const refetch = vi.fn();
const fixture = { revenueByGym: [], revenueByMethod: [], revenueByPlan: [], monthlyRevenue: [], kpis: { totalRevenue: 0, totalExpenses: 0, netProfit: 0, totalMembers: 0, newMembers: 0, avgAttendanceRate: 0, totalPayroll: 0 } };
const testState = vi.hoisted(() => ({ search: 'range=this_month' }));
vi.mock('next/navigation', () => ({ useSearchParams: () => new URLSearchParams(testState.search) }));
vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_finance/finance_revenue_report/api/admin_finance_revenue_report_api', () => ({ AdminFinanceRevenueReportApi: { fetchRevenueReport: vi.fn(), exportReport: vi.fn() } }));
vi.mock('@/app/frontend_admin/admin_finance/finance_revenue_report/state/useAdminFinanceRevenueReportStore', () => ({ useAdminFinanceRevenueReportStore: () => ({ selectedGymId: 'b1' }) }));
vi.mock('@/app/frontend_admin/admin_finance/finance_revenue_report/hooks/useAdminFinanceRevenueReportMutations', () => ({ useAdminFinanceRevenueReportMutations: () => ({ exportMutation: { status: 'idle' }, exportReport }) }));

describe('AdminFinanceRevenueReportLogic', () => {
  beforeEach(() => {
    testState.search = 'range=this_month';
    vi.mocked(useQuery).mockReturnValue({ data: fixture, status: 'success', error: null, refetch } as never);
    exportReport.mockReset(); refetch.mockReset();
    vi.mocked(AdminFinanceRevenueReportApi.fetchRevenueReport).mockReset();
  });
  it('uses one owning report query with date and branch scope', async () => {
    const { result } = renderHook(() => useAdminFinanceRevenueReportLogic());
    expect(result.current.reportData).toEqual(fixture);
    expect(vi.mocked(useQuery).mock.calls).toHaveLength(1);
    const options = vi.mocked(useQuery).mock.calls[0]?.[0] as { queryKey: unknown[]; queryFn: () => Promise<unknown>; enabled?: boolean };
    expect(JSON.stringify(options.queryKey)).toContain('revenue');
    expect(JSON.stringify(options.queryKey)).toContain('b1');
    expect(options.enabled).toBe(true);
    vi.mocked(AdminFinanceRevenueReportApi.fetchRevenueReport).mockResolvedValue({ success: true, message: 'ok', data: fixture, requestId: 'report-test' } as never);
    await options.queryFn();
    expect(AdminFinanceRevenueReportApi.fetchRevenueReport).toHaveBeenCalledWith({ from: expect.any(String), to: expect.any(String), branchId: 'b1' });
    await result.current.handleExport('csv');
    expect(exportReport).toHaveBeenCalledWith({ type: 'revenue', format: 'csv', from: expect.any(String), to: expect.any(String), branchId: 'b1' });
  });
  it('does not query or export with an incomplete custom date range', async () => {
    testState.search = 'range=custom&startDate=2026-10-01';
    const { result } = renderHook(() => useAdminFinanceRevenueReportLogic());
    const options = vi.mocked(useQuery).mock.calls[0]?.[0] as { enabled?: boolean };
    expect(result.current.isDateRangeValid).toBe(false);
    expect(result.current.status).toBe('error');
    expect(options.enabled).toBe(false);
    await result.current.handleExport('csv');
    expect(exportReport).not.toHaveBeenCalled();
    expect(AdminFinanceRevenueReportApi.fetchRevenueReport).not.toHaveBeenCalled();
  });
  it('retries only the owning report query', async () => {
    const { result } = renderHook(() => useAdminFinanceRevenueReportLogic());
    await result.current.retryReport();
    expect(refetch).toHaveBeenCalledTimes(1);
  });
});
