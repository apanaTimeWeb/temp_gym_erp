// RESPONSIBILITY: Defines regression tests for useAdminAttendanceDashboardLogic.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_attendance/attendance_dashboard/tests/hooks/useAdminAttendanceDashboardLogic.test.ts)

import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminAttendanceLogic } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/hooks/useAdminAttendanceDashboardLogic';

const setCurrentPage = vi.fn();
const store = { search: 'riya', statusFilter: 'all', branchFilter: 'all', dateRange: 'today', currentPage: 2, setCurrentPage, getState: () => ({ setSearch: vi.fn(), setStatusFilter: vi.fn(), setBranchFilter: vi.fn(), setDateRange: vi.fn() }) };
const queries = [
  { data: { data: [{ id: 'a1' }], meta: { total: 21 } }, status: 'success', error: null, refetch: vi.fn() },
  { data: { data: { present: 20 } }, status: 'success', error: null, refetch: vi.fn() },
  { data: { data: [{ date: '2026-10-05', count: 20 }] }, status: 'success', error: null, refetch: vi.fn() },
];
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('next/navigation', () => ({ useSearchParams: () => new URLSearchParams('branchId=b2') }));
vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_attendance/attendance_dashboard/state/useAdminAttendanceDashboardStore', () => ({ useAdminAttendanceStore: Object.assign(() => store, { getState: () => store.getState() }) }));
vi.mock('@/app/frontend_admin/admin_attendance/attendance_dashboard/hooks/useAdminAttendanceDashboardUrlQuerySync', () => ({ useAdminNavigationLayoutUrlQuerySync: vi.fn() }));
import { useAdminNavigationLayoutUrlQuerySync } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/hooks/useAdminAttendanceDashboardUrlQuerySync';
vi.mock('@/app/frontend_admin/admin_attendance/attendance_dashboard/hooks/useAdminAttendanceDashboardDebounce', () => ({ useAdminAttendanceDebounce: (value: string) => value }));

describe('useAdminAttendanceLogic', () => {
  beforeEach(() => {
    vi.mocked(useQuery).mockReset();
    queries.forEach((q) => vi.mocked(useQuery).mockReturnValueOnce(q as never));
  });


  it('keeps summary and trend failures independent from a successful records query', () => {
    const retryRecords = vi.fn();
    const retrySummary = vi.fn();
    const retryTrend = vi.fn();
    vi.mocked(useQuery).mockReset();
    vi.mocked(useQuery)
      .mockReturnValueOnce({ data: { data: [], meta: { total: 0 } }, status: 'success', error: null, refetch: retryRecords } as never)
      .mockReturnValueOnce({ data: undefined, status: 'error', error: new Error('summary unavailable'), refetch: retrySummary } as never)
      .mockReturnValueOnce({ data: undefined, status: 'error', error: new Error('trend unavailable'), refetch: retryTrend } as never);

    const { result } = renderHook(() => useAdminAttendanceLogic());

    expect(result.current.status).toBe('success');
    expect(result.current.summaryStatus).toBe('error');
    expect(result.current.summaryError).toBe('attendance.AdminRepair.loadFailed');
    expect(result.current.trendStatus).toBe('error');
    expect(result.current.trendError).toBe('attendance.AdminRepair.loadFailed');
    expect(result.current.retrySummary).toBe(retrySummary);
    expect(result.current.retryTrend).toBe(retryTrend);
  });

  it('maps attendance API state to the view and calculates server-side pagination', () => {
    const { result } = renderHook(() => useAdminAttendanceLogic());
    expect(result.current.records).toEqual([{ id: 'a1' }]);
    expect(result.current.allFilteredCount).toBe(21);
    expect(result.current.totalPages).toBeGreaterThan(1);
    expect(result.current.summary).toEqual({ present: 20 });
    expect(result.current.trend).toEqual([{ date: '2026-10-05', count: 20 }]);
    expect(result.current.summaryStatus).toBe('success');
    expect(result.current.trendStatus).toBe('success');
    expect(result.current.retrySummary).toBe(queries[1].refetch);
    expect(result.current.retryTrend).toBe(queries[2].refetch);
  });
  it('normalizes malformed URL pagination before entering query state', () => {
    renderHook(() => useAdminAttendanceLogic());
    const [bindings] = vi.mocked(useAdminNavigationLayoutUrlQuerySync).mock.calls.at(-1)!;
    const page = bindings.find((binding) => binding.key === 'page');
    expect(page).toBeDefined();
    for (const invalid of ['1.5', '-1', 'Infinity', 'NaN', '', '0', '9007199254740992', '1e3', '0x10', '01', '2abc']) {
      page!.setValue(invalid);
      expect(setCurrentPage).toHaveBeenLastCalledWith(1);
    }
    page!.setValue('100001');
    expect(setCurrentPage).toHaveBeenLastCalledWith(100000);
    for (const valid of ['1', '12', '100000']) {
      page!.setValue(valid);
      expect(setCurrentPage).toHaveBeenLastCalledWith(Number(valid));
    }
  });
});
