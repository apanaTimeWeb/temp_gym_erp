"use client";
// RESPONSIBILITY: Fetches only the attendance report owned by this leaf.
import { useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { ADMIN_ATTENDANCE_REPORTS_QUERY_KEYS } from '@/app/frontend_admin/admin_attendance/attendance_reports/constants/AdminAttendanceReportsQueryKeys';
import { AdminAttendanceReportsApi } from '@/app/frontend_admin/admin_attendance/attendance_reports/api/admin_attendance_reports_api';
import { useAdminAttendanceReportsMutations } from '@/app/frontend_admin/admin_attendance/attendance_reports/hooks/useAdminAttendanceReportsMutations';
import { useAdminAttendanceReportsStore } from '@/app/frontend_admin/admin_attendance/attendance_reports/state/useAdminAttendanceReportsStore';
import { getAdminAttendanceReportsPresetDateRange, isValidAdminAttendanceReportsDateRange } from '@/app/frontend_admin/admin_attendance/attendance_reports/utils/AdminAttendanceReportsDateRangeUtils';
import type { AdminAttendanceReportsExportFormat, ReportDateRange, AttendanceReportData } from '@/app/frontend_admin/admin_attendance/attendance_reports/types/AdminAttendanceReportsTypes';

const DATE_RANGES: readonly ReportDateRange[] = ['this_month', 'last_month', 'last_3_months', 'last_6_months', 'this_year', 'custom'];

export function useAdminAttendanceReportsLogic() {
  const searchParams = useSearchParams();
  const rawRange = searchParams.get('range');
  const dateRange: ReportDateRange = DATE_RANGES.includes(rawRange as ReportDateRange) ? rawRange as ReportDateRange : 'this_month';
  const queryStartDate = searchParams.get('startDate') ?? '';
  const queryEndDate = searchParams.get('endDate') ?? '';
  const presetRange = useMemo(() => getAdminAttendanceReportsPresetDateRange(dateRange === 'custom' ? 'this_month' : dateRange), [dateRange]);
  const dateBounds = useMemo(() => dateRange === 'custom'
    ? { startDate: queryStartDate, endDate: queryEndDate }
    : { startDate: presetRange.startDate, endDate: presetRange.endDate },
    [dateRange, presetRange.endDate, presetRange.startDate, queryEndDate, queryStartDate]);
  const isDateRangeValid = isValidAdminAttendanceReportsDateRange(dateBounds.startDate, dateBounds.endDate);
  const { selectedGymId } = useAdminAttendanceReportsStore();
  const params = useMemo(() => ({ from: dateBounds.startDate, to: dateBounds.endDate, branchId: selectedGymId === 'all' ? undefined : selectedGymId }), [dateBounds.endDate, dateBounds.startDate, selectedGymId]);
  const query = useQuery< AttendanceReportData >({
    queryKey: ADMIN_ATTENDANCE_REPORTS_QUERY_KEYS.key('report', 'attendance', dateRange, dateBounds.startDate, dateBounds.endDate, selectedGymId),
    queryFn: async () => { const response = await AdminAttendanceReportsApi.fetchAttendanceReport(params); if (!response.data) throw new Error('attendance report response contained no data'); return response.data; },
    enabled: isDateRangeValid,
    staleTime: 300_000,
  });
  const { exportMutation, exportReport } = useAdminAttendanceReportsMutations();
  const handleExport = useCallback(async (format: AdminAttendanceReportsExportFormat) => {
    if (!isDateRangeValid) return;
    await exportReport({ type: 'attendance', format, from: dateBounds.startDate, to: dateBounds.endDate, branchId: selectedGymId === 'all' ? undefined : selectedGymId });
  }, [dateBounds.endDate, dateBounds.startDate, exportReport, isDateRangeValid, selectedGymId]);
  const retryReport = useCallback(async () => { if (isDateRangeValid) await query.refetch(); }, [isDateRangeValid, query]);
  return { reportData: query.data ?? null, status: isDateRangeValid ? query.status : 'error', queryError: query.error, retryReport, isDateRangeValid, dateRange, startDate: dateBounds.startDate, endDate: dateBounds.endDate, exportStatus: exportMutation.status, handleExport };
}
