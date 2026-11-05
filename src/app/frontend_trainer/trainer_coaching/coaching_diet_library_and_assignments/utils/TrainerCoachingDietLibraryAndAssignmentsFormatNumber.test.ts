import { describe, expect, it } from 'vitest';

import { TrainerLibraryFormatNumber } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/utils/TrainerCoachingDietLibraryAndAssignmentsFormatNumber';

describe('TrainerLibraryFormatNumber', () => {
  it('uses the active locale and preserves meaningful zero', () => {
    expect(TrainerLibraryFormatNumber(1234567.5, 'en-IN')).toBe('12,34,567.5');
    expect(TrainerLibraryFormatNumber(0, 'en-IN')).toBe('0');
  });
});
