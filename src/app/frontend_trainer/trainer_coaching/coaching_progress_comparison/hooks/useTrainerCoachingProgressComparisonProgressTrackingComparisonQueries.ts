"use client";
// RESPONSIBILITY: Owns comparison-member server-state queries and keeps the progress API contract identical to the individual view.
// DATA FLOW: Comparison member selection → TanStack Query → TrainerProgressTrackingApi → validated comparison data → comparison UI.
import { useQueries } from '@tanstack/react-query';

import { fetchTrainerProgressTrackingCompleteHistory } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/api/TrainerCoachingProgressComparisonCompleteHistoryApi';

import { TRAINER_PROGRESS_TRACKING_QUERY_KEYS } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/utils/TrainerCoachingProgressComparisonProgressTrackingQueryKeys';





/**
 * @description Owns comparison-member server-state queries and keeps the progress API contract identical to the individual view.
 * @dependencies Comparison member selection → TanStack Query → TrainerProgressTrackingApi → validated comparison data → comparison UI.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerProgressTrackingComparisonQueries state and data flow for the progress tracking feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented progress tracking module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerProgressTrackingComparisonQueries(memberIds: string[]) {
  return useQueries({
    queries: memberIds.map((memberId) => ({
      queryKey: TRAINER_PROGRESS_TRACKING_QUERY_KEYS.completeHistory(memberId),
      queryFn: () => fetchTrainerProgressTrackingCompleteHistory(memberId),
      enabled: Boolean(memberId),
      staleTime: 5 * 60 * 1000,
    })),
  });
}
