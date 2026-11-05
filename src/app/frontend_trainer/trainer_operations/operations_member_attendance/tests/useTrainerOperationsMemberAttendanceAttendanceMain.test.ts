import { act, renderHook } from '@testing-library/react';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useTrainerAttendanceMain } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/hooks/useTrainerOperationsMemberAttendanceAttendanceMain';

import { TRAINER_ATTENDANCE_URLS } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/config/trainer_operations_member_attendance.url_config';

const markAttendance = vi.fn();
const selfCheckIn = vi.fn();
const selfCheckOut = vi.fn();
const showSuccess = vi.fn();
const showError = vi.fn();
const closeModal = vi.fn();
const refetch = vi.fn();
const begin = vi.fn((actionId: string) => `key-${actionId}`);
const clear = vi.fn();
const pushSearchState = vi.fn();

vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams('tab=ALL&page=1'),
  useRouter: () => ({ push: pushSearchState }),
  usePathname: () => TRAINER_ATTENDANCE_URLS.ROUTES.LIST,
}));
vi.mock('@/app/frontend_trainer/trainer_operations/operations_member_attendance/hooks/useTrainerOperationsMemberAttendanceAttendanceFilters', () => ({
  useTrainerAttendanceFilters: () => ({ tab: 'ALL', search: '', filterDate: 'ALL_TIME', currentPage: 1, sortBy: 'date', sortDirection: 'desc' }),
}));
vi.mock('@/app/frontend_trainer/trainer_operations/operations_member_attendance/hooks/useTrainerOperationsMemberAttendanceAttendanceQuery', () => ({
  useTrainerAttendanceRecordsQuery: () => ({ data: { records: [], total: 0, page: 1, limit: 10 }, refetch }),
  useTrainerAttendanceStatsQuery: () => ({ data: { present: 0 } }),
  useTrainerAttendanceMembersQuery: () => ({ data: [], isPending: false, isFetching: false, isError: false, refetch: vi.fn() }),
}));
vi.mock('@/app/frontend_trainer/trainer_operations/operations_member_attendance/hooks/useTrainerOperationsMemberAttendanceAttendanceMutations', () => ({
  useTrainerAttendanceMutations: () => ({
    markAttendance,
    markAttendancePending: false,
    selfCheckIn,
    selfCheckInPending: false,
    selfCheckOut,
    selfCheckOutPending: false,
  }),
}));
vi.mock('@/app/frontend_trainer/trainer_operations/operations_member_attendance/state/useTrainerOperationsMemberAttendanceAttendanceStore', () => ({
  useTrainerAttendanceStore: () => ({ openModal: vi.fn(), closeModal, viewMode: 'mark', showModal: true, setViewMode: vi.fn() }),
}));
vi.mock('@/app/frontend_trainer/trainer_operations/operations_member_attendance/hooks/TrainerOperationsMemberAttendanceuseTrainerInfrastructureFeedback', () => ({
  useTrainerInfrastructureFeedback: () => ({ showSuccess, showError }),
}));
vi.mock('@/app/frontend_trainer/trainer_operations/operations_member_attendance/hooks/TrainerOperationsMemberAttendanceuseTrainerInfrastructureIdempotencyKey', () => ({
  useTrainerInfrastructureIdempotencyKey: () => ({ begin, clear, current: vi.fn() }),
}));

describe('useTrainerAttendanceMain', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    refetch.mockResolvedValue(undefined);
    markAttendance.mockResolvedValue({ message: 'Attendance recorded' });
    selfCheckIn.mockResolvedValue({ message: 'Checked in' });
    selfCheckOut.mockResolvedValue({ message: 'Checked out' });
    begin.mockImplementation((actionId: string) => `key-${actionId}`);
  });

  it('executes attendance mutations with idempotency keys and closes the modal on success', async () => {
    const { result } = renderHook(() => useTrainerAttendanceMain());
    const dto = { type: 'MEMBER', memberId: 'member-1', date: '2026-10-04', checkIn: '06:00' };

    await act(async () => {
      await result.current.handleMarkAttendance(dto);
    });

    expect(begin).toHaveBeenCalledWith('record-member-1');
    expect(markAttendance).toHaveBeenCalledWith({ dto, idempotencyKey: 'key-record-member-1' });
    expect(clear).toHaveBeenCalledWith('record-member-1');
    expect(closeModal).toHaveBeenCalledOnce();
    expect(showSuccess).toHaveBeenCalledWith('Attendance recorded', 'attendance-record-member-1');
  });

  it('keeps the modal open and reports the backend error when attendance recording fails', async () => {
    markAttendance.mockRejectedValueOnce(new Error('Duplicate record'));
    const { result } = renderHook(() => useTrainerAttendanceMain());
    const dto = { type: 'MEMBER', memberId: 'member-2', date: '2026-10-04', checkIn: '06:00' };

    await act(async () => {
      await result.current.handleMarkAttendance(dto);
    });

    expect(closeModal).not.toHaveBeenCalled();
    expect(clear).not.toHaveBeenCalled();
    expect(showError).toHaveBeenCalledWith(expect.any(Error), 'attendance-record-member-2');
  });

  it('toggles local refresh state around the records refetch', async () => {
    let resolveRefetch!: () => void;
    refetch.mockImplementationOnce(() => new Promise<void>((resolve) => { resolveRefetch = resolve; }));
    const { result } = renderHook(() => useTrainerAttendanceMain());

    let refreshPromise!: Promise<void>;
    act(() => {
      refreshPromise = result.current.handleRefresh();
    });
    expect(result.current.isRefreshing).toBe(true);
    expect(refetch).toHaveBeenCalledOnce();

    await act(async () => {
      resolveRefetch();
      await refreshPromise;
    });
    expect(result.current.isRefreshing).toBe(false);
  });
});
