import { describe, expect, it } from 'vitest';
import { canonicalizeTrainerScheduleViewParams, isTrainerScheduleScreenView, resolveTrainerScheduleScreenView } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/utils/TrainerOperationsWeeklyAvailabilityScheduleViewUrlUtils';

describe('weekly availability URL state', () => {
  it('accepts only the canonical availability view', () => {
    expect(isTrainerScheduleScreenView('availability')).toBe(true);
    expect(isTrainerScheduleScreenView('leaves')).toBe(false);
    expect(resolveTrainerScheduleScreenView(new URLSearchParams('view=leaves'))).toBe('availability');
  });

  it('removes a retired leaves view from the URL without disturbing unrelated query state', () => {
    expect(canonicalizeTrainerScheduleViewParams(new URLSearchParams('view=leaves&date=2026-10-19&filter=available'))).toBe('date=2026-10-19&filter=available');
  });
});
