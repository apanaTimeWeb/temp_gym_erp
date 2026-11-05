// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';

import { useTranslations } from 'next-intl';

import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_attendance/attendance_tracking/constants/ManagerAttendanceTrackingLocalPaginationDefaults';
import { useManagerInfrastructureDebounce } from '@/app/frontend_manager/manager_attendance/attendance_tracking/hooks/useManagerAttendanceTrackingLocalDebounce';
import { ManagerInfrastructureGetErrorMessage } from '@/app/frontend_manager/manager_attendance/attendance_tracking/utils/ManagerAttendanceTrackingLocalGetErrorMessage';

import { ATTENDANCE_TABS } from '@/app/frontend_manager/manager_attendance/attendance_tracking/constants/manager_attendance_tracking_shared.constants';
import { useManagerAttendanceTrackingMutations } from '@/app/frontend_manager/manager_attendance/attendance_tracking/hooks/useManagerAttendanceTrackingMutations';
import { useAttendanceListQuery, useTodayStatsQuery, useActiveMembersQuery, useStaffQuery } from '@/app/frontend_manager/manager_attendance/attendance_tracking/hooks/useManagerAttendanceTrackingQueries';
import { useManagerAttendanceTrackingUiStore } from '@/app/frontend_manager/manager_attendance/attendance_tracking/state/useManagerAttendanceTrackingUiStore';
import { ManagerAttendanceTrackingDisplayValue } from '@/app/frontend_manager/manager_attendance/attendance_tracking/utils/ManagerAttendanceTrackingFormatters';
import type { AttendanceTab } from '@/app/frontend_manager/manager_attendance/attendance_tracking/types/manager_attendance_tracking.types';
import type { ManagerAttendanceTrackingViewModel } from '@/app/frontend_manager/manager_attendance/attendance_tracking/types/manager_attendance_tracking.types';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates attendance feature state and its documented UI/API boundary through useManagerAttendanceTrackingLogic.
 * @dependencies Uses ManagerAttendanceTrackingFormatters, useManagerAttendanceTrackingMutations, useManagerAttendanceTrackingQueries, useManagerAttendanceTrackingUiStore.
 * @edge-case surfaces request errors without exposing transport details; preserves explicit loading state until the query or mutation settles; preserves shareable filter, search, sort, or pagination state in the URL.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerAttendanceTrackingLogic owns the attendance feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerAttendanceTrackingLogic(): ManagerAttendanceTrackingViewModel {
  const t = useTranslations('MANAGER_ATTENDANCE_TRACKING');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ui = useManagerAttendanceTrackingUiStore();
  const rawPage = Number(searchParams.get('page') || '1');
  const currentPage = Number.isSafeInteger(rawPage) && rawPage > 0 ? rawPage : 1;
  const search = searchParams.get('search') || '';
  const dateFilter = searchParams.get('date') || '';
  const statusFilter = searchParams.get('status') || '';
  const tabParam = searchParams.get('tab') as AttendanceTab | null;
  const tab: AttendanceTab = tabParam && ATTENDANCE_TABS.includes(tabParam) ? tabParam : ATTENDANCE_TABS[0];
  const debouncedSearch = useManagerInfrastructureDebounce(search, 300);

  const setUrlParam = useCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value); else params.delete(key);
    if (key !== 'page') params.set('page', '1');
    router.replace(params.size ? `${pathname}?${params.toString()}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    const current = searchParams.get('search') || '';
    if (debouncedSearch !== current) setUrlParam('search', debouncedSearch || null);
  }, [debouncedSearch, searchParams, setUrlParam]);

  const setSearch = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set('search', value); else params.delete('search');
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);
  const setDateFilter = useCallback((value: string) => setUrlParam('date', value || null), [setUrlParam]);
  const setStatusFilter = useCallback((value: string) => setUrlParam('status', value || null), [setUrlParam]);
  const setCurrentPage = useCallback((value: number) => setUrlParam('page', String(Math.max(1, value))), [setUrlParam]);
  const setTab = useCallback((value: AttendanceTab) => setUrlParam('tab', value), [setUrlParam]);

  const params = useMemo(() => {
    const next: Record<string, string> = { page: String(currentPage), limit: String(MANAGER_ITEMS_PER_PAGE) };
    if (debouncedSearch) next.search = debouncedSearch;
    if (dateFilter) next.date = dateFilter;
    if (statusFilter) next.status = statusFilter;
    if (tab !== 'Daily Attendance Report') next.type = tab === 'Member Attendance' ? 'MEMBER' : 'STAFF';
    return next;
  }, [currentPage, dateFilter, debouncedSearch, statusFilter, tab]);

  const { data: listData, isPending: listLoading, isError: listError, error: listErrorValue, refetch } = useAttendanceListQuery(params);
  const { data: statsData, isPending: statsLoading, isError: statsError, error: statsErrorValue } = useTodayStatsQuery();
  const { data: membersData, isError: membersError, error: membersErrorValue } = useActiveMembersQuery();
  const { data: staffData, isError: staffError, error: staffErrorValue } = useStaffQuery();
  const members = useMemo(() => membersData?.members || [], [membersData]);
  const staff = useMemo(() => staffData?.staff || [], [staffData]);
  const records = listData?.attendances || [];
  const totalRecords = listData?.total || 0;
  const todayStats = statsData || { totalCheckIns: 0, memberCheckIns: 0, staffCheckIns: 0 };
  const isPending = listLoading || statsLoading;
  const isError = listError || statsError || membersError || staffError;
  const attendanceQueryError = [listErrorValue, statsErrorValue, membersErrorValue, staffErrorValue].find(Boolean);
  const errorMessage = attendanceQueryError ? ManagerInfrastructureGetErrorMessage(attendanceQueryError, t('TEXT_GENERIC_ERROR')) : '';
  const { markAttendance } = useManagerAttendanceTrackingMutations(members, staff, ui.setSaving, ui.setShowModal, ui.setForm, ui.showToast);

  const exportAttendance = useCallback(() => {
    const csvContent = [
      ['Date', 'Name', 'Role', 'Status', 'Check In', 'Check Out'],
      ...records.map((record) => [
        record.date, ManagerAttendanceTrackingDisplayValue(record.member?.name || record.staff?.name), record.type === 'MEMBER' ? 'Member' : 'Staff',
        ManagerAttendanceTrackingDisplayValue(record.status), ManagerAttendanceTrackingDisplayValue(record.checkIn), ManagerAttendanceTrackingDisplayValue(record.checkOut ?? record.checkOutTime),
      ]),
    ].map((row) => row.map((cell) => { const raw = String(cell ?? ''); const safe = /^[\s]*[=+@\-\t\r]/.test(raw) ? `'${raw}` : raw; return `"${safe.replaceAll('"', '""')}"`; }).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = `attendance_export_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link); link.click(); document.body.removeChild(link); URL.revokeObjectURL(url);
  }, [records]);

  return {
    records, totalRecords, todayStats, members, staff, isPending, isError, errorMessage, saving: ui.saving, toast: ui.toast,
    tab, setTab, search, setSearch, dateFilter, setDateFilter, statusFilter, setStatusFilter, currentPage, setCurrentPage,
    showModal: ui.showModal, setShowModal: ui.setShowModal, calendarUser: ui.calendarUser, setCalendarUser: ui.setCalendarUser,
    form: ui.form, setForm: ui.setForm, showToast: ui.showToast, hideToast: ui.hideToast,
    loadAll: async () => { await refetch(); }, markAttendance, exportAttendance,
  };
}
