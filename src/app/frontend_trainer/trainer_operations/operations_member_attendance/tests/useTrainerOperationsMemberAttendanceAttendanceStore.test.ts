import { act, renderHook } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import { useTrainerAttendanceStore } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/state/useTrainerOperationsMemberAttendanceAttendanceStore';





describe('useTrainerAttendanceStore', () => {
  it('opens and closes the attendance modal without changing the selected view', () => {
    const { result } = renderHook(() => useTrainerAttendanceStore());

    expect(result.current.showModal).toBe(false);
    expect(result.current.viewMode).toBe('calendar');

    act(() => result.current.openModal());
    expect(result.current.showModal).toBe(true);

    act(() => result.current.closeModal());
    expect(result.current.showModal).toBe(false);
    expect(result.current.viewMode).toBe('calendar');
  });

  it('persists a UI-only view-mode change', () => {
    const { result } = renderHook(() => useTrainerAttendanceStore());
    act(() => result.current.setViewMode('table'));
    expect(result.current.viewMode).toBe('table');
  });
});
