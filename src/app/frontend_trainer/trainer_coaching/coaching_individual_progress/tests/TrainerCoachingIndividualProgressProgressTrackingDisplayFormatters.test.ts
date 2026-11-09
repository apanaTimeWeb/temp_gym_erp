import { describe, expect, it } from 'vitest';

import { displayValue } from '@/lib/display_value';
import { TrainerProgressTrackingFormatDate, TrainerProgressTrackingFormatNumber } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/utils/TrainerCoachingIndividualProgressProgressTrackingDisplayFormatters';




describe('Trainer progress tracking display formatters', () => {
  it('renders absent values explicitly', () => {
    expect(displayValue(undefined)).toBe('–');
    expect(displayValue(0)).not.toBe('–');
  });
  it('formats measurements with one decimal maximum', () => {
    expect(TrainerProgressTrackingFormatNumber(1234.56, 'en-IN')).toBe('1,234.6');
    expect(TrainerProgressTrackingFormatDate('2026-02-03T00:00:00.000Z', 'en-IN')).toMatch(/^03 Feb 2026$/);
    expect(TrainerProgressTrackingFormatDate('not-a-date', 'en-IN')).toBe('—');
  });
});
