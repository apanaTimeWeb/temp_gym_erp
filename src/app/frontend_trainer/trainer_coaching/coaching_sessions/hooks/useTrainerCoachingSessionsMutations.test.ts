import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useTrainerSessionsMutations } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/useTrainerCoachingSessionsMutations';

const { invalidateQueries, createApi, updateApi, cancelApi, noShowApi, attendanceApi } = vi.hoisted(() => ({
  invalidateQueries: vi.fn().mockResolvedValue(undefined),
  createApi: vi.fn().mockResolvedValue({ message: 'created' }),
  updateApi: vi.fn().mockResolvedValue({ message: 'updated' }),
  cancelApi: vi.fn().mockResolvedValue({ message: 'cancelled' }),
  noShowApi: vi.fn().mockResolvedValue({ message: 'no show' }),
  attendanceApi: vi.fn().mockResolvedValue({ message: 'attendance saved' }),
}));

vi.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({ invalidateQueries }),
  useMutation: (options: { mutationFn: (variables: unknown) => Promise<unknown>; onSuccess?: () => void }) => ({
    mutateAsync: vi.fn(async (variables: unknown) => { const data = await options.mutationFn(variables); options.onSuccess?.(); return data; }),
    isPending: false,
  }),
}));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_sessions/api/TrainerCoachingSessionsApi', () => ({
  createTrainerSessionsTrainerSession: createApi,
  updateTrainerSessionsTrainerSession: updateApi,
  cancelTrainerSessionsTrainerSession: cancelApi,
  markTrainerSessionsTrainerSessionNoShow: noShowApi,
  markTrainerSessionsTrainerSessionAttendance: attendanceApi,
}));

describe('useTrainerSessionsMutations', () => {
  beforeEach(() => vi.clearAllMocks());

  it('uses the supplied idempotency key for cancellation', async () => {
    const { result } = renderHook(() => useTrainerSessionsMutations());
    await act(async () => { await result.current.cancelSession({ id: 'session-9', idempotencyKey: 'cancel-9' }); });
    expect(cancelApi).toHaveBeenCalledWith('session-9', 'cancel-9');
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['trainer_sessions', 'list'] });
  });

  it('does not invalidate session lists when a mutation rejects a failure envelope', async () => {
    cancelApi.mockRejectedValueOnce(Object.assign(new Error('Cancel rejected'), { errorCode: 'CANCEL_REJECTED', statusCode: 409 }));
    const { result } = renderHook(() => useTrainerSessionsMutations());
    await act(async () => { await expect(result.current.cancelSession({ id: 'session-11', idempotencyKey: 'cancel-11' })).rejects.toMatchObject({ errorCode: 'CANCEL_REJECTED', statusCode: 409 }); });
    expect(invalidateQueries).not.toHaveBeenCalled();
  });

  it('uses the supplied idempotency key for no-show and attendance actions', async () => {
    const { result } = renderHook(() => useTrainerSessionsMutations());
    await act(async () => { await result.current.markNoShowSession({ id: 'session-10', idempotencyKey: 'no-show-10' }); });
    await act(async () => { await result.current.markAttendance({ id: 'session-10', memberIds: ['member-1'], idempotencyKey: 'attendance-10' }); });
    expect(noShowApi).toHaveBeenCalledWith('session-10', 'no-show-10');
    expect(attendanceApi).toHaveBeenCalledWith('session-10', ['member-1'], 'attendance-10');
  });
});
