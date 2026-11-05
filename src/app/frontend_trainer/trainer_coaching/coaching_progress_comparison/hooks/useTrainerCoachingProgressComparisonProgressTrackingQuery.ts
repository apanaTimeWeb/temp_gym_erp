"use client";
// RESPONSIBILITY: Owns Trainer Progress server-state queries and keeps pagination/sort inputs in the Query identity.
// DATA FLOW: URL state -> API params -> Zod-validated response -> TanStack Query -> Progress UI.

import { useQuery } from '@tanstack/react-query';
import { fetchTrainerProgressTrackingCompleteHistory } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/api/TrainerCoachingProgressComparisonCompleteHistoryApi';

import { fetchTrainerProgressTrackingProgressEntries, fetchTrainerProgressTrackingProgressSummary, fetchTrainerProgressTrackingProgressMembers } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/api/TrainerCoachingProgressComparisonProgressTrackingApi';

import { TRAINER_PROGRESS_TRACKING_QUERY_KEYS } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/utils/TrainerCoachingProgressComparisonProgressTrackingQueryKeys';

import type { TrainerProgressTrackingEntriesQueryParams } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/types/TrainerCoachingProgressComparisonProgressTrackingQueryTypes';







/**
 * @description Owns useTrainerProgressTrackingMembersQuery behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerProgressTrackingMembersQuery state and data flow for the progress tracking feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented progress tracking module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerProgressTrackingMembersQuery() {
  return useQuery({
    queryKey: TRAINER_PROGRESS_TRACKING_QUERY_KEYS.members(),
    queryFn: fetchTrainerProgressTrackingProgressMembers,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * @description Owns useTrainerProgressTrackingEntriesQuery behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerProgressTrackingEntriesQuery state and data flow for the progress tracking feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented progress tracking module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerProgressTrackingEntriesQuery(params: TrainerProgressTrackingEntriesQueryParams) {
  return useQuery({
    queryKey: TRAINER_PROGRESS_TRACKING_QUERY_KEYS.entries(params.memberId, { page: params.page, limit: params.limit, sortBy: params.sortBy, sortDirection: params.sortDirection, comparison: params.comparison }),
    queryFn: () => fetchTrainerProgressTrackingProgressEntries(params),
    enabled: Boolean(params.memberId),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * @description Owns useTrainerProgressTrackingSummaryQuery behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerProgressTrackingSummaryQuery state and data flow for the progress tracking feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented progress tracking module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerProgressTrackingSummaryQuery(memberId: string) {
  return useQuery({
    queryKey: TRAINER_PROGRESS_TRACKING_QUERY_KEYS.summary(memberId),
    queryFn: () => fetchTrainerProgressTrackingProgressSummary(memberId),
    enabled: Boolean(memberId),
    staleTime: 5 * 60 * 1000,
  });
}

/** Full history query is distinct from the paginated table query. */
export function useTrainerProgressTrackingCompleteHistoryQuery(memberId: string) {
  return useQuery({ queryKey: TRAINER_PROGRESS_TRACKING_QUERY_KEYS.completeHistory(memberId), queryFn: () => fetchTrainerProgressTrackingCompleteHistory(memberId), enabled: Boolean(memberId), staleTime: 5 * 60 * 1000 });
}
