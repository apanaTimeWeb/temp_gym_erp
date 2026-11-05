import { describe, expect, it } from 'vitest';

import { TrainerWorkoutFormatNumber } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/utils/TrainerCoachingWorkoutPlansDisplayFormatters';




describe('Trainer workout display formatters', () => {
  it('formats numeric metrics with locale grouping', () => {
    expect(TrainerWorkoutFormatNumber(123456.7, 'en-IN')).toBe('1,23,456.7');
  });
});
