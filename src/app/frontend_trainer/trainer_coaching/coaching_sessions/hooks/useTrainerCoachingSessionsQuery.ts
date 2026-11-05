"use client";
// RESPONSIBILITY: Custom query hook for Trainer Sessions.
// DATA FLOW: useTrainerSessionsQuery -> fetchTrainerSessions -> API
import { useQuery } from '@tanstack/react-query';

import { fetchTrainerSessions, fetchTrainerSessionsTrainerSessionMembers } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/api/TrainerCoachingSessionsApi';

import { TRAINER_SESSIONS_QUERY_KEYS } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/config/TrainerCoachingSessionsQueryKeys';

import type { TrainerSessionsSessionFilter } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsTypes';






/**
 * @description Custom query hook for Trainer Sessions.
 * @dependencies useTrainerSessionsQuery -> fetchTrainerSessions -> API
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerSessionsQuery state and data flow for the sessions feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented sessions module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerSessionsQuery(date: string, filter: TrainerSessionsSessionFilter) {
  return useQuery({
    queryKey: TRAINER_SESSIONS_QUERY_KEYS.list({ date, filter }),
    queryFn: () => fetchTrainerSessions(date, filter),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * @description Owns useTrainerSessionsSessionMembersQuery behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerSessionsSessionMembersQuery state and data flow for the sessions feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented sessions module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerSessionsSessionMembersQuery() {
  return useQuery({
    queryKey: TRAINER_SESSIONS_QUERY_KEYS.members(),
    queryFn: fetchTrainerSessionsTrainerSessionMembers,
    staleTime: 60 * 60 * 1000, // 1 hour
  });
}
