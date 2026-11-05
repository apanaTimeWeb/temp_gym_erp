"use client";
// RESPONSIBILITY: Coordinates Attendance URL/filter state and server data; no business filtering or pagination is performed in the view.
// DATA FLOW: URL/Attendance store → typed query params → AdminAttendanceApi → Zod/MSW → TanStack Query → Attendance views.

import { useTranslations } from 'next-intl';
import type { AdminAttendanceStatusFilter } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/types/AdminAttendanceDashboardTypes';

import { ADMIN_ATTENDANCE_QUERY_KEYS } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/constants/AdminAttendanceDashboardQueryKeys';
import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAdminAttendanceStore } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/state/useAdminAttendanceDashboardStore';
import { useAdminNavigationLayoutUrlQuerySync } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/hooks/useAdminAttendanceDashboardUrlQuerySync';
import { useAdminAttendanceDebounce } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/hooks/useAdminAttendanceDashboardDebounce';
import { AdminAttendanceApi } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/api/admin_attendance_dashboard_api';
import type { AdminAttendanceQueryParams } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/types/AdminAttendanceDashboardQueryTypes';
import { normalizeAdminAttendanceDashboardUrlPage } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/utils/AdminAttendanceDashboardUrlPage';
import { ATTENDANCE_ITEMS_PER_PAGE } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/constants/AdminAttendanceDashboardConstants';
import type { AttendanceStatus, DateRangeFilter } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/types/AdminAttendanceDashboardTypes';
/** @description useAdminAttendanceLogic: Coordinates Attendance URL/filter state and server data; no business filtering or pagination is performed in the view. @dependencies Consumes AdminAttendanceQueryKeys, AdminNavigationLayoutBackendMessage, useAdminAttendanceStore, useAdminNavigationLayoutUrlQuerySync, useAdminNavigationLayoutDebounce, AdminAttendanceApi. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminAttendanceLogic() {
  const t = useTranslations();
  const { search, statusFilter, branchFilter, dateRange, currentPage, setCurrentPage } = useAdminAttendanceStore();
  useAdminNavigationLayoutUrlQuerySync([
    { key: 'search', value: search, defaultValue: '', setValue: (val) => useAdminAttendanceStore.getState().setSearch(val as string) },
    { key: 'status', value: statusFilter, defaultValue: 'all', setValue: (val) => { if (val === 'all' || val === 'present' || val === 'absent' || val === 'late') useAdminAttendanceStore.getState().setStatusFilter(val as AdminAttendanceStatusFilter); } },
    { key: 'branch', value: branchFilter, defaultValue: 'all', setValue: (val) => useAdminAttendanceStore.getState().setBranchFilter(val as string) },
    { key: 'range', value: dateRange, defaultValue: 'today', setValue: (val) => { if (typeof val === 'string' && ['today', 'yesterday', 'this_week', 'this_month', 'last_month'].includes(val)) useAdminAttendanceStore.getState().setDateRange(val as DateRangeFilter); } },
    { key: 'page', value: currentPage, defaultValue: 1, setValue: (value) => setCurrentPage(normalizeAdminAttendanceDashboardUrlPage(value)) },
  ]);
  const debouncedSearch = useAdminAttendanceDebounce(search, 300);
  // The visible branch filter and its URL binding are the single source of truth.
  const activeBranch = branchFilter !== 'all' ? branchFilter : undefined;
  const params: AdminAttendanceQueryParams = { page: currentPage, limit: ATTENDANCE_ITEMS_PER_PAGE, branchId: activeBranch, search: debouncedSearch || undefined, status: statusFilter === 'all' ? undefined : statusFilter, dateRange };

  const recordsQuery = useQuery({
    queryKey: ADMIN_ATTENDANCE_QUERY_KEYS.key('records', params),
    queryFn: () => AdminAttendanceApi.fetchAttendanceRecords(params),
  });
  const summaryParams = { branchId: activeBranch, dateRange } as const;
  const summaryQuery = useQuery({ queryKey: ADMIN_ATTENDANCE_QUERY_KEYS.key('summary', summaryParams), queryFn: () => AdminAttendanceApi.fetchAttendanceSummary(summaryParams) });
  const trendQuery = useQuery({ queryKey: ADMIN_ATTENDANCE_QUERY_KEYS.key('trend', summaryParams), queryFn: () => AdminAttendanceApi.fetchAttendanceTrend(summaryParams) });

  const records = recordsQuery.data?.data ?? [];
  const allFilteredCount = recordsQuery.data?.meta?.total ?? records.length;
  const totalPages = Math.max(1, Math.ceil(allFilteredCount / ATTENDANCE_ITEMS_PER_PAGE));
  useEffect(() => {
    if (recordsQuery.status === 'success' && currentPage > totalPages) setCurrentPage(totalPages);
  }, [recordsQuery.status, currentPage, totalPages, setCurrentPage]);
  const status = recordsQuery.status;
  const recordsError = recordsQuery.error ? t('attendance.AdminRepair.loadFailed') : '';
  const summaryError = summaryQuery.error ? t('attendance.AdminRepair.loadFailed') : '';
  const trendError = trendQuery.error ? t('attendance.AdminRepair.loadFailed') : '';

  return useMemo(() => ({
    records,
    allFilteredCount,
    summary: summaryQuery.data?.data ?? null,
    trend: trendQuery.data?.data ?? [],
    status,
    error: recordsError,
    summaryStatus: summaryQuery.status,
    summaryError,
    trendStatus: trendQuery.status,
    trendError,
    retryRecords: recordsQuery.refetch,
    retrySummary: summaryQuery.refetch,
    retryTrend: trendQuery.refetch,
    currentPage,
    setCurrentPage,
    totalPages,
    loadAll: async () => { await Promise.all([recordsQuery.refetch(), summaryQuery.refetch(), trendQuery.refetch()]); },
    dateRange,
  }), [records, allFilteredCount, summaryQuery.data, summaryQuery.status, summaryError, trendQuery.data, trendQuery.status, trendError, status, recordsError, currentPage, setCurrentPage, totalPages, recordsQuery, summaryQuery, trendQuery, dateRange]);
}
