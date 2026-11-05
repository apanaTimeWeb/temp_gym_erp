// DATA FLOW: Selected member IDs → comparison query data → derived comparison snapshots → progress comparison UI.
import type { TrainerProgressTrackingProgressEntry, TrainerProgressTrackingComparisonMemberSnapshot } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/types/TrainerCoachingProgressComparisonProgressTrackingTypes';

/**
 * @description Builds the comparison snapshot for one member from progress entries in the Trainer module.
 * @dependencies Selected member IDs → comparison query data → derived comparison snapshots → progress comparison UI.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
export function TrainerProgressTrackingComparisonSnapshotBuilder(memberId: string, memberName: string, entries: TrainerProgressTrackingProgressEntry[]): TrainerProgressTrackingComparisonMemberSnapshot {
  const memberEntries = [...entries].sort((a, b) => a.date.localeCompare(b.date));

  if (memberEntries.length === 0) {
    return {
      memberId,
      memberName,
      latestWeightKg: null,
      latestBmi: null,
      latestBodyFatPercent: null,
      latestMuscleMassKg: null,
      weightChangeKg: null,
      bodyFatChange: null,
      muscleMassChange: null,
      totalEntries: 0,
      trend: 'insufficient'
    };
  }

  const first = memberEntries[0]!;
  const latest = memberEntries[memberEntries.length - 1]!;
  const weightChange = memberEntries.length >= 2 ? Math.round((latest.weightKg - first.weightKg) * 10) / 10 : null;
  const bodyFatChange = memberEntries.length >= 2 && latest.bodyFatPercent != null && first.bodyFatPercent != null
    ? Math.round((latest.bodyFatPercent - first.bodyFatPercent) * 10) / 10 : null;
  const muscleMassChange = memberEntries.length >= 2 && latest.muscleMassKg != null && first.muscleMassKg != null
    ? Math.round((latest.muscleMassKg - first.muscleMassKg) * 10) / 10 : null;

  let trend: TrainerProgressTrackingComparisonMemberSnapshot['trend'] = 'insufficient';
  if (memberEntries.length >= 2) {
    const improving = (weightChange !== null && weightChange < -0.5) || (muscleMassChange !== null && muscleMassChange > 0.5);
    const plateau = weightChange !== null && Math.abs(weightChange) <= 0.5 && (muscleMassChange === null || Math.abs(muscleMassChange) <= 0.3);
    trend = improving ? 'improving' : plateau ? 'plateau' : 'declining';
  }

  return {
    memberId,
    memberName,
    latestWeightKg: latest.weightKg,
    latestBmi: latest.bmi,
    latestBodyFatPercent: latest.bodyFatPercent ?? null,
    latestMuscleMassKg: latest.muscleMassKg ?? null,
    weightChangeKg: weightChange,
    bodyFatChange,
    muscleMassChange,
    totalEntries: memberEntries.length,
    trend,
  };
}
