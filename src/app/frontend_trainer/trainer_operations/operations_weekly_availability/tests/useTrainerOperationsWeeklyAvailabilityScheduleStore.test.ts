import { act, renderHook } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import { useTrainerScheduleStore } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/state/useTrainerOperationsWeeklyAvailabilityScheduleStore';





describe('useTrainerScheduleStore', () => {
  it('switches between schedule tabs as UI-only state', () => {
    const { result } = renderHook(() => useTrainerScheduleStore());
    expect(result.current.activeTab).toBe('availability');

    act(() => result.current.setActiveTab('leaves'));
    expect(result.current.activeTab).toBe('leaves');
  });

  it('opens and closes the leave modal', () => {
    const { result } = renderHook(() => useTrainerScheduleStore());

    act(() => result.current.openLeaveModal());
    expect(result.current.showLeaveModal).toBe(true);

    act(() => result.current.closeLeaveModal());
    expect(result.current.showLeaveModal).toBe(false);
  });
});
