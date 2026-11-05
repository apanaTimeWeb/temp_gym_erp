import { act, renderHook } from '@testing-library/react';

import { afterEach, describe, expect, it } from 'vitest';

import { useTrainerWorkoutStore } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/state/useTrainerCoachingWorkoutPlansStore';

describe('useTrainerWorkoutStore', () => {
  afterEach(() => {
    const state = useTrainerWorkoutStore.getState();
    state.setShowWkModal(false);
    state.setEditWorkoutId(null);
    state.setShowExModal(false);
    state.setEditExerciseId(null);
    state.setShowDetailDrawer(false);
    state.setShowAssignModal(false);
  });
  it('stores only UI selection IDs and modal state', () => {
    const { result } = renderHook(() => useTrainerWorkoutStore());
    act(() => {
      result.current.setEditWorkoutId('workout-1');
      result.current.setShowWkModal(true);
      result.current.setEditExerciseId('exercise-1');
      result.current.setShowExModal(true);
    });
    expect(result.current.editWorkoutId).toBe('workout-1');
    expect(result.current.editExerciseId).toBe('exercise-1');
    expect(result.current.showWkModal).toBe(true);
    expect(result.current.showExModal).toBe(true);
  });

  it('clears selection IDs without retaining server entity objects', () => {
    const { result } = renderHook(() => useTrainerWorkoutStore());
    act(() => {
      result.current.setEditWorkoutId(null);
      result.current.setEditExerciseId(null);
    });
    expect(result.current.editWorkoutId).toBeNull();
    expect(result.current.editExerciseId).toBeNull();
  });
});
