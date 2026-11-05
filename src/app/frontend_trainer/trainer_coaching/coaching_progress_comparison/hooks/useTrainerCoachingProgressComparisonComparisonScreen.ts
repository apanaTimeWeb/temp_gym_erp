"use client";
// RESPONSIBILITY: Owns comparison-only progress queries, selections, snapshots and retry actions.
// DATA FLOW: selected comparison IDs -> member and per-member queries -> read-only comparison view.
import { useCallback, useMemo } from 'react';
import { useTrainerProgressTrackingMembersQuery } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/hooks/useTrainerCoachingProgressComparisonProgressTrackingQuery';
import { useTrainerProgressTrackingComparisonQueries } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/hooks/useTrainerCoachingProgressComparisonProgressTrackingComparisonQueries';
import { useTrainerProgressTrackingStore } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/state/useTrainerCoachingProgressComparisonProgressTrackingStore';
import { TrainerProgressTrackingComparisonSnapshotBuilder } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/utils/TrainerCoachingProgressComparisonProgressTrackingComparisonSnapshotBuilder';

/** Read-only comparison lifecycle; does not fetch single-member history or instantiate mutations. */
export function useTrainerCoachingProgressComparisonComparisonScreen() {
  const membersQuery = useTrainerProgressTrackingMembersQuery();
  const selectedComparisonIds = useTrainerProgressTrackingStore(state => state.selectedComparisonIds);
  const toggleComparisonMember = useTrainerProgressTrackingStore(state => state.toggleComparisonMember);
  const activeComparisonMetric = useTrainerProgressTrackingStore(state => state.activeComparisonMetric);
  const setActiveComparisonMetric = useTrainerProgressTrackingStore(state => state.setActiveComparisonMetric);
  const comparisonQueries = useTrainerProgressTrackingComparisonQueries(selectedComparisonIds.length >= 2 ? selectedComparisonIds : []);

  const comparisonSnapshots = useMemo(() => selectedComparisonIds.map((memberId, index) => {
    const name = membersQuery.data?.find(member => member.id === memberId)?.name ?? memberId;
    return TrainerProgressTrackingComparisonSnapshotBuilder(memberId, name, comparisonQueries[index]?.data?.entries ?? []);
  }), [selectedComparisonIds, membersQuery.data, comparisonQueries]);

  const comparisonIsPending = comparisonQueries.some(query => query.isPending);
  const comparisonIsError = comparisonQueries.some(query => query.isError);
  const retryComparisonQueries = useCallback(() => {
    comparisonQueries.filter(query => query.isError).forEach(query => { void query.refetch(); });
  }, [comparisonQueries]);
  const retryMembers = useCallback(() => { void membersQuery.refetch(); }, [membersQuery]);

  return {
    tData: { members: membersQuery.data ?? [] }, membersQuery, retryMembers,
    selectedComparisonIds, toggleComparisonMember, activeComparisonMetric, setActiveComparisonMetric,
    comparisonSnapshots, comparisonIsPending, comparisonIsError, retryComparisonQueries,
  };
}
