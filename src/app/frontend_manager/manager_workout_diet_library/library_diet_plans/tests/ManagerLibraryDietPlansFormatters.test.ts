import { describe, expect, it } from 'vitest';

import { ManagerLibraryDietPlansDisplayValue } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/utils/ManagerLibraryDietPlansFormatters';

describe('ManagerLibraryDietPlansDisplayValue', () => {
  it('uses an en-dash for missing values', () => {
    expect(ManagerLibraryDietPlansDisplayValue(null)).toBe('—');
    expect(ManagerLibraryDietPlansDisplayValue(undefined)).toBe('—');
    expect(ManagerLibraryDietPlansDisplayValue('')).toBe('—');
  });

  it('preserves meaningful primitive values', () => {
    expect(ManagerLibraryDietPlansDisplayValue(0)).toBe('0');
    expect(ManagerLibraryDietPlansDisplayValue(false)).toBe('false');
    expect(ManagerLibraryDietPlansDisplayValue('Beginner')).toBe('Beginner');
  });
});
