import { describe, expect, it } from 'vitest';

import { TrainerProgressTrackingComparisonSnapshotBuilder } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/utils/TrainerCoachingIndividualProgressProgressTrackingComparisonSnapshotBuilder';




describe('TrainerProgressTrackingComparisonSnapshotBuilder', () => {
  it('returns an insufficient snapshot for an empty history', () => {
    expect(TrainerProgressTrackingComparisonSnapshotBuilder('member-1', 'Member One', [])).toMatchObject({
      memberId: 'member-1',
      totalEntries: 0,
      trend: 'insufficient',
    });
  });

  it('sorts entries and derives changes from the earliest to latest records', () => {
    const snapshot = TrainerProgressTrackingComparisonSnapshotBuilder('member-1', 'Member One', [
      { id: '2', memberId: 'member-1', date: '2026-02-01', weightKg: 79, heightCm: 170, bmi: 27, bodyFatPercent: 23, muscleMassKg: 32, waistCm: 90, notes: '', recordedBy: 'trainer-1' },
      { id: '1', memberId: 'member-1', date: '2026-01-01', weightKg: 82, heightCm: 170, bmi: 28, bodyFatPercent: 25, muscleMassKg: 31, waistCm: 92, notes: '', recordedBy: 'trainer-1' },
    ]);
    expect(snapshot.totalEntries).toBe(2);
    expect(snapshot.latestWeightKg).toBe(79);
    expect(snapshot.weightChangeKg).toBe(-3);
    expect(snapshot.bodyFatChange).toBe(-2);
    expect(snapshot.muscleMassChange).toBe(1);
    expect(snapshot.trend).toBe('improving');
  });
});
