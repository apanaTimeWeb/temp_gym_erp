// RESPONSIBILITY: Tests only the attendance report query and export boundary owned by this leaf.
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { AdminAttendanceReportsApi } from '@/app/frontend_admin/admin_attendance/attendance_reports/api/admin_attendance_reports_api';
import { useAdminAttendanceReportsLogic } from '@/app/frontend_admin/admin_attendance/attendance_reports/hooks/useAdminAttendanceReportsLogic';

const exportReport = vi.fn();
const refetch = vi.fn();
const fixture = { attendanceSummary: [], attendanceHeatmap: [] };
const testState = vi.hoisted(() => ({ search: 'range=this_month' }));
vi.mock('next/navigation', () => ({ useSearchParams: () => new URLSearchParams(testState.search) }));
vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_attendance/attendance_reports/api/admin_attendance_reports_api', () => ({ AdminAttendanceReportsApi: { fetchAttendanceReport: vi.fn(), exportReport: vi.fn() } }));
vi.mock('@/app/frontend_admin/admin_attendance/attendance_reports/state/useAdminAttendanceReportsStore', () => ({ useAdminAttendanceReportsStore: () => ({ selectedGymId: 'b1' }) }));
vi.mock('@/app/frontend_admin/admin_attendance/attendance_reports/hooks/useAdminAttendanceReportsMutations', () => ({ useAdminAttendanceReportsMutations: () => ({ exportMutation: { status: 'idle' }, exportReport }) }));

describe('AdminAttendanceReportsLogic', () => {
  beforeEach(() => {
    testState.search = 'range=this_month';
    vi.mocked(useQuery).mockReturnValue({ data: fixture, status: 'success', error: null, refetch } as never);
    exportReport.mockReset(); refetch.mockReset();
    vi.mocked(AdminAttendanceReportsApi.fetchAttendanceReport).mockReset();
  });
  it('uses one owning report query with date and branch scope', async () => {
    const { result } = renderHook(() => useAdminAttendanceReportsLogic());
    expect(result.current.reportData).toEqual(fixture);
    expect(vi.mocked(useQuery).mock.calls).toHaveLength(1);
    const options = vi.mocked(useQuery).mock.calls[0]?.[0] as { queryKey: unknown[]; queryFn: () => Promise<unknown>; enabled?: boolean };
    expect(JSON.stringify(options.queryKey)).toContain('attendance');
    expect(JSON.stringify(options.queryKey)).toContain('b1');
    expect(options.enabled).toBe(true);
    vi.mocked(AdminAttendanceReportsApi.fetchAttendanceReport).mockResolvedValue({ success: true, message: 'ok', data: fixture, requestId: 'report-test' } as never);
    await options.queryFn();
    expect(AdminAttendanceReportsApi.fetchAttendanceReport).toHaveBeenCalledWith({ from: expect.any(String), to: expect.any(String), branchId: 'b1' });
    await result.current.handleExport('csv');
    expect(exportReport).toHaveBeenCalledWith({ type: 'attendance', format: 'csv', from: expect.any(String), to: expect.any(String), branchId: 'b1' });
  });
  it('does not query or export with an incomplete custom date range', async () => {
    testState.search = 'range=custom&startDate=2026-10-01';
    const { result } = renderHook(() => useAdminAttendanceReportsLogic());
    const options = vi.mocked(useQuery).mock.calls[0]?.[0] as { enabled?: boolean };
    expect(result.current.isDateRangeValid).toBe(false);
    expect(result.current.status).toBe('error');
    expect(options.enabled).toBe(false);
    await result.current.handleExport('csv');
    expect(exportReport).not.toHaveBeenCalled();
    expect(AdminAttendanceReportsApi.fetchAttendanceReport).not.toHaveBeenCalled();
  });
  it('retries only the owning report query', async () => {
    const { result } = renderHook(() => useAdminAttendanceReportsLogic());
    await result.current.retryReport();
    expect(refetch).toHaveBeenCalledTimes(1);
  });
});
