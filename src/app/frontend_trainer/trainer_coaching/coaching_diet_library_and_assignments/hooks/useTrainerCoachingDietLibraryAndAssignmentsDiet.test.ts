import { renderHook } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import { useTrainerLibraryDiet } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/hooks/useTrainerCoachingDietLibraryAndAssignmentsDiet';




describe('useTrainerLibraryDiet', () => {
  it('opens and closes the diet detail state', () => {
    const { result } = renderHook(() => useTrainerLibraryDiet());
    expect(result.current.showDietModal).toBe(false);
  });
});
