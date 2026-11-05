import { describe, expect, it } from 'vitest';

import { TrainerLibraryParsePage } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/utils/TrainerCoachingDietLibraryAndAssignmentsParsePage';

describe('TrainerLibraryParsePage', () => {
  it('accepts safe positive integer page values', () => {
    expect(TrainerLibraryParsePage('1')).toBe(1);
    expect(TrainerLibraryParsePage('25')).toBe(25);
    expect(TrainerLibraryParsePage(String(Number.MAX_SAFE_INTEGER))).toBe(Number.MAX_SAFE_INTEGER);
  });

  it.each([
    ['missing', null],
    ['empty', ''],
    ['non-numeric', 'page-two'],
    ['whitespace-padded', ' 2 '],
    ['zero', '0'],
    ['negative', '-2'],
    ['fractional', '2.5'],
    ['unsafe integer', '9007199254740992'],
    ['exponent notation', '1e2'],
  ])('normalizes %s values to page 1', (_label, value) => {
    expect(TrainerLibraryParsePage(value)).toBe(1);
  });
});
