import { describe, expect, it } from 'vitest';
import { TrainerProgressTrackingCreateProgressEntrySchema, TrainerProgressTrackingProgressEntrySchema } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/schemas/TrainerCoachingIndividualProgressProgressTrackingDomainSchemas';

describe('Trainer Progress Tracking date validation', () => {
  it('accepts calendar-valid ISO date-only values', () => {
    expect(TrainerProgressTrackingCreateProgressEntrySchema.safeParse({ date: '2026-10-16', weightKg: 80, heightCm: 175 }).success).toBe(true);
  });
  it('rejects malformed and impossible calendar dates at create and response boundaries', () => {
    expect(TrainerProgressTrackingCreateProgressEntrySchema.safeParse({ date: 'not-a-date', weightKg: 80, heightCm: 175 }).success).toBe(false);
    expect(TrainerProgressTrackingCreateProgressEntrySchema.safeParse({ date: '2026-02-30', weightKg: 80, heightCm: 175 }).success).toBe(false);
    expect(TrainerProgressTrackingProgressEntrySchema.safeParse({ id: 'p1', memberId: 'm1', date: '2026-02-30', weightKg: 80, heightCm: 175, bmi: 26, recordedBy: 'Trainer John' }).success).toBe(false);
  });
});
