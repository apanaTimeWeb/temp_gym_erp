import { describe, expect, it } from 'vitest';

import { canonicalizeTrainerWorkoutViewParams, resolveTrainerWorkoutScreenView } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/utils/TrainerCoachingWorkoutPlansViewUrlUtils';

describe('TrainerWorkoutViewUrlUtils', () => {
  it('defaults to plans when the URL omits view state', () => {
    expect(resolveTrainerWorkoutScreenView(new URLSearchParams('search=squat&page=2&category=Strength'))).toBe('plans');
  });

  it.each(['plans', 'exercises'])('normalizes the obsolete %s tab while retaining search/page/sort/category params', (tab) => {
    const normalized = canonicalizeTrainerWorkoutViewParams(new URLSearchParams(`tab=${tab}&search=squat&page=3&sortBy=name&sortDirection=desc&category=Strength`));
    const result = new URLSearchParams(normalized ?? '');
    expect(result.get('view')).toBe(tab);
    expect(result.has('tab')).toBe(false);
    expect(result.get('search')).toBe('squat');
    expect(result.get('page')).toBe('3');
    expect(result.get('sortBy')).toBe('name');
    expect(result.get('sortDirection')).toBe('desc');
    expect(result.get('category')).toBe('Strength');
  });

  it('removes invalid views but keeps the rest of the query string intact', () => {
    const result = new URLSearchParams(canonicalizeTrainerWorkoutViewParams(new URLSearchParams('view=wrong&search=squat&page=5&category=Cardio')) ?? '');
    expect(result.has('view')).toBe(false);
    expect(result.get('search')).toBe('squat');
    expect(result.get('page')).toBe('5');
    expect(result.get('category')).toBe('Cardio');
  });
});
