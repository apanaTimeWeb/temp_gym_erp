import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminAnalyticsReportsCenterMain } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/hooks/useSuperadminAnalyticsReportsCenterMain';



const setParam = vi.fn();
const requestExport = vi.fn().mockResolvedValue({ success: true, message: 'Export started' , requestId: 'test-request-id'});
vi.mock('@/hooks/useUrlState', () => ({ useUrlState: () => ({ getParam: (key: string, fallback: string) => ({ tab: 'revenue', preset: 'THIS_MONTH' }[key] ?? fallback), setParam }) }));
vi.mock('@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/hooks/useSuperadminAnalyticsReportsCenterPage', () => ({ useSuperadminAnalyticsReportsCenterPage: () => ({ revenue: { data: { data: [{ mrr: 110 }] }, isPending: false, isError: false, refetch: vi.fn() }, cancellations: { data: { data: [{ mrr: 10, daysActive: 30 }] }, isPending: false, isError: false, refetch: vi.fn() }, health: { data: { data: [{ score: 80 }] }, isPending: false, isError: false, refetch: vi.fn() } }) }));
vi.mock('@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/hooks/useSuperadminAnalyticsReportsCenterExportMutation', () => ({ useSuperadminAnalyticsReportsCenterExportMutation: () => ({ requestExport, isRequesting: false }) }));

describe('useSuperadminAnalyticsReportsCenterMain', () => {
  it('derives report metrics and keeps filters in URL state', async () => {
    const { result } = renderHook(() => useSuperadminAnalyticsReportsCenterMain());
    expect(result.current.totalMRR).toBe(110);
    expect(result.current.totalCancelledRevenue).toBe(10);
    expect(result.current.avgHealthScore).toBe(80);
    act(() => result.current.setPlanFilter('PRO'));
    expect(setParam).toHaveBeenCalledWith('planFilter', 'PRO');
    await act(async () => { await result.current.handleExportCSV(); });
    expect(requestExport).toHaveBeenCalled();
  });
});
