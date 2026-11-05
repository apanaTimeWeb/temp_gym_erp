import { act, renderHook } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import { useTrainerProgressTrackingStore } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/state/useTrainerCoachingIndividualProgressProgressTrackingStore';





describe('useTrainerProgressTrackingStore', () => {
  it('toggles comparison members and enforces the three-member limit', () => {
    const { result } = renderHook(() => useTrainerProgressTrackingStore());

    act(() => {
      result.current.toggleComparisonMember('m1');
      result.current.toggleComparisonMember('m2');
      result.current.toggleComparisonMember('m3');
      result.current.toggleComparisonMember('m4');
    });

    expect(result.current.selectedComparisonIds).toEqual(['m1', 'm2', 'm3']);

    act(() => result.current.toggleComparisonMember('m2'));
    expect(result.current.selectedComparisonIds).toEqual(['m1', 'm3']);
  });

  it('updates the active metric and modal state', () => {
    const { result } = renderHook(() => useTrainerProgressTrackingStore());

    act(() => {
      result.current.setActiveMetric('bmi');
      result.current.setShowModal(true);
    });

    expect(result.current.activeMetric).toBe('bmi');
    expect(result.current.showModal).toBe(true);
  });
});
