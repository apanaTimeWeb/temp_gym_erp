"use client";
// RESPONSIBILITY: Owns Attendance route data orchestration, mutation handlers, loading refresh state, and module-scoped modal state for TrainerAttendanceMain.
// DATA FLOW: page.tsx → useTrainerAttendanceMain → Query/mutation hooks + store + feedback → TrainerAttendanceMain view.
import { useState } from 'react';

import { useTrainerAttendanceFilters } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/hooks/useTrainerOperationsMemberAttendanceAttendanceFilters';

import { useTrainerAttendanceMutations } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/hooks/useTrainerOperationsMemberAttendanceAttendanceMutations';

import { useTrainerAttendanceMyHistoryQuery, useTrainerAttendanceRecordsQuery, useTrainerAttendanceStatsQuery, useTrainerAttendanceMembersQuery } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/hooks/useTrainerOperationsMemberAttendanceAttendanceQuery';

import { useTrainerAttendanceStore } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/state/useTrainerOperationsMemberAttendanceAttendanceStore';

import { useTrainerInfrastructureFeedback } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/hooks/TrainerOperationsMemberAttendanceuseTrainerInfrastructureFeedback';

import { useTrainerInfrastructureIdempotencyKey } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/hooks/TrainerOperationsMemberAttendanceuseTrainerInfrastructureIdempotencyKey';

import type { TrainerAttendanceCreateDto } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/types/TrainerOperationsMemberAttendanceAttendanceTypes';










/**
 * @description Coordinates Attendance data queries, feature mutations, UI-only modal state, and refresh feedback for the Trainer Attendance route.
 * @dependencies Attendance filters, TanStack Query hooks, mutation commands, module UI store, idempotency key utility, and global feedback infrastructure.
 * @edge-cases Keeps refresh state local, closes the modal only after a confirmed mutation, and preserves backend-driven success/error messages.
 */
/**
 * @description Manages TrainerAttendanceMain state and data flow for the attendance feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented attendance module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerAttendanceMain({ forcedTab }: { forcedTab?: 'MEMBERS' | 'MY_ATTENDANCE' } = {}) {
  const filters = useTrainerAttendanceFilters();
  const { search, filterDate, currentPage, sortBy, sortDirection } = filters;
  const tab = forcedTab ?? filters.tab;
  const recordsQuery = useTrainerAttendanceRecordsQuery({ tab, search, filterDate, currentPage, sortBy, sortDirection });
  const myAttendanceHistoryQuery = useTrainerAttendanceMyHistoryQuery(tab === 'MY_ATTENDANCE');
  const statsQuery = useTrainerAttendanceStatsQuery();
  const stats = statsQuery.data;
  const membersQuery = useTrainerAttendanceMembersQuery();
  const members = membersQuery.data ?? [];
  const { markAttendance, markAttendancePending, selfCheckIn, selfCheckInPending, selfCheckOut, selfCheckOutPending } = useTrainerAttendanceMutations();
  const { openModal, closeModal, viewMode, showModal, setViewMode } = useTrainerAttendanceStore();
  const { showSuccess, showError } = useTrainerInfrastructureFeedback();
  const mutationKeys = useTrainerInfrastructureIdempotencyKey();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleMarkAttendance = async (data: TrainerAttendanceCreateDto) => {
    const actionId = `record-${data.memberId ?? data.staffId ?? data.date}`;
    const key = mutationKeys.begin(actionId);
    try {
      const response = await markAttendance({ dto: data, idempotencyKey: key });
      mutationKeys.clear(actionId);
      closeModal();
      showSuccess(response.message, `attendance-record-${data.memberId ?? data.staffId ?? data.date}`);
    } catch (error) {
      showError(error, `attendance-record-${data.memberId ?? data.staffId ?? data.date}`);
    }
  };

  const handleSelfCheckIn = async () => {
    const actionId = 'self-check-in';
    const key = mutationKeys.begin(actionId);
    try {
      const response = await selfCheckIn({ idempotencyKey: key });
      mutationKeys.clear(actionId);
      showSuccess(response.message, 'attendance-self-check-in');
    } catch (error) {
      showError(error, 'attendance-self-check-in');
    }
  };

  const handleSelfCheckOut = async () => {
    const actionId = 'self-check-out';
    const key = mutationKeys.begin(actionId);
    try {
      const response = await selfCheckOut({ idempotencyKey: key });
      mutationKeys.clear(actionId);
      showSuccess(response.message, 'attendance-self-check-out');
    } catch (error) {
      showError(error, 'attendance-self-check-out');
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([recordsQuery.refetch(), statsQuery.refetch(), ...(tab === 'MY_ATTENDANCE' ? [myAttendanceHistoryQuery.refetch()] : [])]);
    } finally {
      setIsRefreshing(false);
    }
  };

  return {
    filters,
    tab,
    search,
    filterDate,
    currentPage,
    sortBy,
    sortDirection,
    recordsQuery,
    myAttendanceHistoryQuery,
    myAttendanceRecords: myAttendanceHistoryQuery.data ?? [],
    stats,
    statsQuery,
    members,
    membersQuery,
    markAttendancePending,
    selfCheckInPending,
    selfCheckOutPending,
    openModal,
    closeModal,
    viewMode,
    setViewMode,
    showModal,
    handleMarkAttendance,
    handleSelfCheckIn,
    handleSelfCheckOut,
    handleRefresh,
    isRefreshing,
    records: recordsQuery.data?.records ?? [],
    totalRecords: recordsQuery.data?.total ?? 0,
  };
}
