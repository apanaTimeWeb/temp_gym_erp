import { describe, expect, it } from 'vitest';
import { TrainerWorkoutCreateWorkoutPlanSchema, TrainerWorkoutCreateExerciseSchema, TrainerWorkoutUpdateWorkoutSchema, TrainerWorkoutUpdateExerciseSchema } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/schemas/TrainerCoachingWorkoutPlansDomainSchemas';

const validPlan = { name: 'Strength plan', level: 'Beginner', days: 3, exercises: 1, focus: 'Strength', duration: '45 mins', tags: 'strength', startDate: '2024-02-29', endDate: '2024-03-01', workoutExercises: [{ name: 'Squat', sets: 3, reps: '10' }] };

describe('Trainer workout domain schemas', () => {
  it('rejects impossible date-only values and accepts a valid leap day', () => {
    expect(TrainerWorkoutCreateWorkoutPlanSchema.safeParse({ ...validPlan, startDate: '2026-02-31' }).success).toBe(false);
    expect(TrainerWorkoutCreateWorkoutPlanSchema.safeParse({ ...validPlan, startDate: '2026-13-01' }).success).toBe(false);
    expect(TrainerWorkoutCreateWorkoutPlanSchema.safeParse({ ...validPlan, startDate: '2024-02-29' }).success).toBe(true);
  });
  it('rejects reversed workout date ranges', () => {
    expect(TrainerWorkoutCreateWorkoutPlanSchema.safeParse({ ...validPlan, startDate: '2026-06-02', endDate: '2026-06-01' }).success).toBe(false);
  });
  it('validates date fields and range order on partial workout updates', () => {
    expect(TrainerWorkoutUpdateWorkoutSchema.safeParse({ startDate: '2026-02-31' }).success).toBe(false);
    expect(TrainerWorkoutUpdateWorkoutSchema.safeParse({ startDate: '2026-06-02', endDate: '2026-06-01' }).success).toBe(false);
    expect(TrainerWorkoutUpdateWorkoutSchema.safeParse({ startDate: '2024-02-29' }).success).toBe(true);
  });
  it('allows blank optional media URLs but rejects malformed and non-HTTP URLs', () => {
    const base = { name: 'Squat', muscle: 'Legs', difficulty: 'Beginner', isActive: true };
    expect(TrainerWorkoutCreateExerciseSchema.safeParse({ ...base, videoUrl: '' }).success).toBe(true);
    expect(TrainerWorkoutCreateExerciseSchema.safeParse({ ...base, videoUrl: 'not a url' }).success).toBe(false);
    expect(TrainerWorkoutCreateExerciseSchema.safeParse({ ...base, imageUrl: 'javascript:alert(1)' }).success).toBe(false);
    expect(TrainerWorkoutCreateExerciseSchema.safeParse({ ...base, videoUrl: 'https://example.com/demo' }).success).toBe(true);
  });
  it('rejects immutable and unknown fields in partial updates', () => {
    expect(TrainerWorkoutUpdateWorkoutSchema.safeParse({ id: 'replacement' }).success).toBe(false);
    expect(TrainerWorkoutUpdateWorkoutSchema.safeParse({ name: 'Updated plan' }).success).toBe(true);
    expect(TrainerWorkoutUpdateExerciseSchema.safeParse({ isActive: false }).success).toBe(false);
    expect(TrainerWorkoutUpdateExerciseSchema.safeParse({ name: 'Updated exercise' }).success).toBe(true);
  });
});
