// RESPONSIBILITY: Tests only the pnl report query and export boundary owned by this leaf.
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { AdminFinanceProfitAndLossReportApi } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/api/admin_finance_profit_and_loss_report_api';
import { useAdminFinanceProfitAndLossReportLogic } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/hooks/useAdminFinanceProfitAndLossReportLogic';

const exportReport = vi.fn();
const refetch = vi.fn();
const fixture = { pnlSummary: [], kpis: { totalRevenue: 0, totalExpenses: 0, netProfit: 0, totalPayroll: 0 } };
const testState = vi.hoisted(() => ({ search: 'range=this_month' }));
vi.mock('next/navigation', () => ({ useSearchParams: () => new URLSearchParams(testState.search), useRouter: () => ({ push: vi.fn(), replace: vi.fn() }), usePathname: () => '' }));
vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/api/admin_finance_profit_and_loss_report_api', () => ({ AdminFinanceProfitAndLossReportApi: { fetchPnLReport: vi.fn(), exportReport: vi.fn() } }));
vi.mock('@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/state/useAdminFinanceProfitAndLossReportStore', () => ({ useAdminFinanceProfitAndLossReportStore: () => ({ selectedGymId: 'b1' }) }));
vi.mock('@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/hooks/useAdminFinanceProfitAndLossReportMutations', () => ({ useAdminFinanceProfitAndLossReportMutations: () => ({ exportMutation: { status: 'idle' }, exportReport }) }));

describe('AdminFinanceProfitAndLossReportLogic', () => {
  beforeEach(() => {
    testState.search = 'range=this_month';
    vi.mocked(useQuery).mockReturnValue({ data: fixture, status: 'success', error: null, refetch } as never);
    exportReport.mockReset(); refetch.mockReset();
    vi.mocked(AdminFinanceProfitAndLossReportApi.fetchPnLReport).mockReset();
  });
  it('uses one owning report query with date and branch scope', async () => {
    const { result } = renderHook(() => useAdminFinanceProfitAndLossReportLogic());
    expect(result.current.reportData).toEqual(fixture);
    expect(vi.mocked(useQuery).mock.calls).toHaveLength(1);
    const options = vi.mocked(useQuery).mock.calls[0]?.[0] as { queryKey: unknown[]; queryFn: () => Promise<unknown>; enabled?: boolean };
    expect(JSON.stringify(options.queryKey)).toContain('pnl');
    expect(JSON.stringify(options.queryKey)).toContain('b1');
    expect(options.enabled).toBe(true);
    vi.mocked(AdminFinanceProfitAndLossReportApi.fetchPnLReport).mockResolvedValue({ success: true, message: 'ok', data: fixture, requestId: 'report-test' } as never);
    await options.queryFn();
    expect(AdminFinanceProfitAndLossReportApi.fetchPnLReport).toHaveBeenCalledWith({ from: expect.any(String), to: expect.any(String), branchId: 'b1' });
    await result.current.handleExport('csv');
    expect(exportReport).toHaveBeenCalledWith({ type: 'pnl', format: 'csv', from: expect.any(String), to: expect.any(String), branchId: 'b1' });
  });
  it('does not query or export with an incomplete custom date range', async () => {
    testState.search = 'range=custom&startDate=2026-10-01';
    const { result } = renderHook(() => useAdminFinanceProfitAndLossReportLogic());
    const options = vi.mocked(useQuery).mock.calls[0]?.[0] as { enabled?: boolean };
    expect(result.current.isDateRangeValid).toBe(false);
    expect(result.current.status).toBe('error');
    expect(options.enabled).toBe(false);
    await result.current.handleExport('csv');
    expect(exportReport).not.toHaveBeenCalled();
    expect(AdminFinanceProfitAndLossReportApi.fetchPnLReport).not.toHaveBeenCalled();
  });
  it('retries only the owning report query', async () => {
    const { result } = renderHook(() => useAdminFinanceProfitAndLossReportLogic());
    await result.current.retryReport();
    expect(refetch).toHaveBeenCalledTimes(1);
  });
});
