"use client";
// RESPONSIBILITY: Owns canonical URL view state plus Attendance search, date, pagination, and sort query state.
// DATA FLOW: Canonical trainer-attendance route and URL filters -> its own query state.
import { useCallback, useEffect } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { TRAINER_ATTENDANCE_SORT_FIELDS } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/utils/TrainerOperationsTrainerAttendanceAttendanceConstants';
import type { TrainerAttendanceSortDirection, TrainerAttendanceSortField, TrainerAttendanceTab } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/types/TrainerOperationsTrainerAttendanceAttendanceInteractionTypes';
import { TRAINER_ATTENDANCE_VIEW_QUERY_PARAM } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/config/trainer_operations_trainer_attendance.url_config';
import { canonicalizeTrainerAttendanceViewParams, resolveTrainerAttendanceScreenView, trainerAttendanceScreenViewToTab, trainerAttendanceTabToScreenView } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/utils/TrainerOperationsTrainerAttendanceAttendanceViewUrlUtils';

export function useTrainerAttendanceFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const serializedParams = searchParams.toString();

  useEffect(() => {
    const normalized = canonicalizeTrainerAttendanceViewParams(new URLSearchParams(serializedParams));
    if (normalized === null) return;
    router.replace(`${pathname}${normalized ? `?${normalized}` : ''}`, { scroll: false });
  }, [pathname, router, serializedParams]);

  const viewParams = new URLSearchParams(serializedParams);
  // This leaf always owns the trainer's personal attendance, irrespective of a stale view parameter.
  const screenView = 'my-attendance' as const;
  const tab = trainerAttendanceScreenViewToTab(screenView);

  const getCanonicalParams = useCallback(() => {
    const current = new URLSearchParams(serializedParams);
    const normalized = canonicalizeTrainerAttendanceViewParams(current);
    return new URLSearchParams(normalized ?? serializedParams);
  }, [serializedParams]);

  const setUrlParam = useCallback((key: string, value: string | null, resetPage = true) => {
    const params = getCanonicalParams();
    if (value) params.set(key, value); else params.delete(key);
    if (resetPage && key !== 'page') params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [getCanonicalParams, pathname, router]);

  const search = new URLSearchParams(serializedParams).get('search') ?? '';
  const filterDate = new URLSearchParams(serializedParams).get('date') ?? 'ALL_TIME';
  const range = new URLSearchParams(serializedParams).get('range') ?? 'this_month';
  const pageValue = Number(new URLSearchParams(serializedParams).get('page') ?? '1');
  const currentPage = Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1;
  const rawSortBy = new URLSearchParams(serializedParams).get('sortBy') ?? 'date';
  const sortBy: TrainerAttendanceSortField = TRAINER_ATTENDANCE_SORT_FIELDS.includes(rawSortBy as TrainerAttendanceSortField) ? rawSortBy as TrainerAttendanceSortField : 'date';
  const sortDirection: TrainerAttendanceSortDirection = new URLSearchParams(serializedParams).get('sortDirection') === 'asc' ? 'asc' : 'desc';

  const setTab = useCallback((value: TrainerAttendanceTab) => {
    const params = getCanonicalParams();
    params.set(TRAINER_ATTENDANCE_VIEW_QUERY_PARAM, trainerAttendanceTabToScreenView(value));
    params.delete('tab');
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [getCanonicalParams, pathname, router]);
  const setSearch = useCallback((value: string) => setUrlParam('search', value || null), [setUrlParam]);
  const setFilterDate = useCallback((value: string) => setUrlParam('date', value), [setUrlParam]);
  const setCurrentPage = useCallback((value: number) => setUrlParam('page', String(value), false), [setUrlParam]);
  const setSort = useCallback((field: TrainerAttendanceSortField) => {
    const params = getCanonicalParams();
    const nextDirection = field === sortBy && sortDirection === 'asc' ? 'desc' : 'asc';
    params.set('sortBy', field);
    params.set('sortDirection', nextDirection);
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [getCanonicalParams, pathname, router, sortBy, sortDirection]);

  return { screenView, tab, setTab, search, setSearch, filterDate, setFilterDate, currentPage, setCurrentPage, sortBy, sortDirection, setSort, range };
}
