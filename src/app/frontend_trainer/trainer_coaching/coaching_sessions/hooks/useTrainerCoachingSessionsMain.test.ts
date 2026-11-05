import { act, renderHook } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import { useTrainerSessionsMain } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/useTrainerCoachingSessionsMain';

const handleScheduleSubmit = vi.fn();
const handleCancelSession = vi.fn();
const handleNoShowSession = vi.fn();
const handleAttendanceSubmit = vi.fn();
const handleEditSuccess = vi.fn();

vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/useTrainerCoachingSessionsFilters', () => ({
  useTrainerSessionsFilters: () => ({ filter: 'ALL', setFilter: vi.fn(), date: '2026-10-04', setDate: vi.fn() }),
}));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/useTrainerCoachingSessionsQuery', () => ({
  useTrainerSessionsQuery: () => ({ data: [{ id: 'session-1' }], isPending: false, isError: false, isFetching: false, refetch: vi.fn() }),
  useTrainerSessionsSessionMembersQuery: () => ({ data: [{ id: 'member-1', name: 'Aman' }] }),
}));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/useTrainerCoachingSessionsActions', () => ({
  useTrainerSessionsActions: () => ({
    handleScheduleSubmit,
    handleCancelSession,
    handleNoShowSession,
    handleAttendanceSubmit,
    handleEditSuccess,
    createSessionPending: false,
    markNoShowSessionPending: false,
    cancelSessionPending: false,
    markAttendancePending: false,
    updateSessionPending: false,
  }),
}));

describe('useTrainerSessionsMain', () => {
  it('composes server query data and action handlers into a stable view model', () => {
    const { result } = renderHook(() => useTrainerSessionsMain());
    expect(result.current.sessions).toHaveLength(1);
    expect(result.current.memberOptions).toEqual([{ value: 'member-1', label: 'Aman' }]);
    expect(result.current.handleCancelSession).toBe(handleCancelSession);
  });

  it('owns modal identity locally while delegating mutation behavior to the action hook', () => {
    const { result } = renderHook(() => useTrainerSessionsMain());
    act(() => result.current.setAttendanceSession({ id: 'session-1' } as never));
    expect(result.current.attendanceSession?.id).toBe('session-1');
    expect(result.current.handleAttendanceSubmit).toBe(handleAttendanceSubmit);
  });
});
