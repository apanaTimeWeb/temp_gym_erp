"use client";
// RESPONSIBILITY: Owns Trainer Sessions route orchestration and view-model state; mutation details live in useTrainerSessionsActions.
// DATA FLOW: TrainerSessionsMain → filters/query + action hook → module API/Query cache → view.
import { useState } from 'react';

import { useTrainerSessionsActions } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/useTrainerCoachingSessionsActions';

import { useTrainerSessionsFilters } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/useTrainerCoachingSessionsFilters';

import { useTrainerSessionsQuery, useTrainerSessionsSessionMembersQuery } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/useTrainerCoachingSessionsQuery';

import type { TrainerSessionsTrainerSession } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsTypes';

/**
 * @description Coordinates Trainer Sessions filters, server queries, modal state, and the module-owned action hook into one UI view model.
 * @dependencies Sessions filters/query hooks plus useTrainerSessionsActions for mutations, confirmation, idempotency, and feedback.
 * @edge-case Keeps selected-session identity stable across modal repetition and leaves server state authoritative in TanStack Query.
 */
export function useTrainerSessionsMain() {
  const { filter, setFilter, date, setDate } = useTrainerSessionsFilters();
  const { data: sessions = [], isPending, isError, isFetching, refetch } = useTrainerSessionsQuery(date, filter);
  const memberQuery = useTrainerSessionsSessionMembersQuery();
  const memberOptionsRaw = memberQuery.data ?? [];
  const memberOptions = memberOptionsRaw.map((member) => ({ value: member.id, label: member.name }));
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [attendanceSession, setAttendanceSession] = useState<TrainerSessionsTrainerSession | null>(null);
  const [editingSession, setEditingSession] = useState<TrainerSessionsTrainerSession | null>(null);
  const actions = useTrainerSessionsActions({ setShowScheduleModal, setAttendanceSession, setEditingSession, members: memberOptionsRaw });

  return {
    filter,
    setFilter,
    date,
    setDate,
    sessions,
    filteredSessions: sessions,
    memberOptions,
    memberOptionsIsPending: memberQuery.isPending,
    memberOptionsIsError: memberQuery.isError,
    memberOptionsIsFetching: memberQuery.isFetching,
    retryMemberOptions: () => { void memberQuery.refetch(); },
    isPending,
    isError,
    isFetching,
    refetch,
    showScheduleModal,
    setShowScheduleModal,
    attendanceSession,
    setAttendanceSession,
    editingSession,
    setEditingSession,
    ...actions,
  };
}
