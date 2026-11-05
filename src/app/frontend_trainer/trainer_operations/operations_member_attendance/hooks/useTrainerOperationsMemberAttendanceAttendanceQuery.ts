"use client";
// RESPONSIBILITY: Owns TanStack Query access for Attendance server state and explicitly propagates every URL filter to the API.
// DATA FLOW: Attendance URL state → useTrainerAttendanceRecordsQuery params → attendanceApi → TanStack Query → UI
import { useQuery } from '@tanstack/react-query';

import { getUser } from '@/lib/api';

import { fetchAllTrainerAttendanceRecords, fetchTrainerAttendanceRecords, fetchTrainerAttendanceStats, fetchTrainerAttendanceMembersBasic } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/api/TrainerOperationsMemberAttendanceAttendanceApi';

import { TRAINER_ATTENDANCE_HISTORY_PAGE_SIZE } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/utils/TrainerOperationsMemberAttendanceAttendanceConstants';

import { TRAINER_ATTENDANCE_QUERY_KEYS } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/utils/TrainerOperationsMemberAttendanceAttendanceQueryKeys';

import { useTrainerInfrastructureDebounce } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/hooks/TrainerOperationsMemberAttendanceuseTrainerInfrastructureDebounce';

import type { TrainerAttendanceFetchParams, TrainerAttendanceRecordsQueryParams } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/types/TrainerOperationsMemberAttendanceAttendanceInteractionTypes';








/**
 * @description Owns useTrainerAttendanceRecordsQuery behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerAttendanceRecordsQuery state and data flow for the attendance feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented attendance module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerAttendanceRecordsQuery({ tab, search, filterDate, currentPage, sortBy, sortDirection }: TrainerAttendanceRecordsQueryParams) {
  const user = getUser();
  const debouncedSearch = useTrainerInfrastructureDebounce(search, 300);
  const params: TrainerAttendanceFetchParams = {
    page: currentPage,
    limit: TRAINER_ATTENDANCE_HISTORY_PAGE_SIZE,
    type: tab === 'MEMBERS' ? 'MEMBER' : 'STAFF',
    search: debouncedSearch || undefined,
    date: filterDate !== 'ALL_TIME' ? filterDate : undefined,
    staffId: tab === 'MY_ATTENDANCE' && user?.id != null ? String(user.id) : undefined,
    sortBy,
    sortDirection,
  };

  return useQuery({
    queryKey: TRAINER_ATTENDANCE_QUERY_KEYS.records(params),
    queryFn: () => {
      if (tab === 'MY_ATTENDANCE' && user?.id == null) {
        throw new Error('Authenticated trainer identity is unavailable.');
      }
      return fetchTrainerAttendanceRecords(params);
    },
    staleTime: 2 * 60 * 1000,
  });
}

/**
 * @description Owns useTrainerAttendanceStatsQuery behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerAttendanceStatsQuery state and data flow for the attendance feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented attendance module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
/**
 * Loads the complete attendance history for the authenticated trainer, independently of table pagination and filters.
 * The query key is scoped to the trainer identity; the query never falls back to an unscoped STAFF list.
 */
export function useTrainerAttendanceMyHistoryQuery(enabled: boolean) {
  const user = getUser();
  const staffId = user?.id == null ? '' : String(user.id);

  return useQuery({
    queryKey: TRAINER_ATTENDANCE_QUERY_KEYS.myHistory(staffId || 'missing-trainer-identity'),
    queryFn: () => {
      if (!staffId) throw new Error('Authenticated trainer identity is unavailable.');
      return fetchAllTrainerAttendanceRecords({ type: 'STAFF', staffId });
    },
    enabled,
    staleTime: 60 * 1000,
  });
}

export function useTrainerAttendanceStatsQuery() {
  return useQuery({ queryKey: TRAINER_ATTENDANCE_QUERY_KEYS.stats(), queryFn: fetchTrainerAttendanceStats, staleTime: 5 * 60 * 1000 });
}

/**
 * @description Owns useTrainerAttendanceMembersQuery behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerAttendanceMembersQuery state and data flow for the attendance feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented attendance module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerAttendanceMembersQuery() {
  return useQuery({ queryKey: TRAINER_ATTENDANCE_QUERY_KEYS.members(), queryFn: fetchTrainerAttendanceMembersBasic, staleTime: 60 * 60 * 1000 });
}
