import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useTrainerCoachingSessionsEditForm } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/useTrainerCoachingSessionsEditForm';

const { updateSession, keys, begin, clear } = vi.hoisted(() => {
  const storedKeys = new Map<string, string>();
  const beginKey = vi.fn((actionId: string) => {
    const existing = storedKeys.get(actionId);
    if (existing) return existing;
    const next = `retry-key-${storedKeys.size + 1}`;
    storedKeys.set(actionId, next);
    return next;
  });
  const clearKey = vi.fn((actionId: string) => { storedKeys.delete(actionId); });
  return { updateSession: vi.fn(), keys: storedKeys, begin: beginKey, clear: clearKey };
});

vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/useTrainerCoachingSessionsMutations', () => ({
  useTrainerSessionsMutations: () => ({ updateSession, updateSessionPending: false }),
}));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/TrainerCoachingSessionsuseTrainerInfrastructureIdempotencyKey', () => ({
  useTrainerInfrastructureIdempotencyKey: () => ({ begin, clear }),
}));

describe('useTrainerSessionsEditForm', () => {
  beforeEach(() => { vi.clearAllMocks(); keys.clear(); });

  it('reuses the same idempotency key after a failed update and clears it only after success', async () => {
    updateSession.mockRejectedValueOnce(new Error('ambiguous network failure'));
    updateSession.mockResolvedValueOnce({ data: { id: 'session-1' }, message: 'Updated' });
    const session = { id: 'session-1', time: '09:00 AM', duration: '60m', location: '', room: '' } as never;
    const onSuccess = vi.fn();
    const { result } = renderHook(() => useTrainerCoachingSessionsEditForm(session, onSuccess));

    await act(async () => { await result.current.submit(); });
    expect(updateSession).toHaveBeenNthCalledWith(1, expect.objectContaining({ id: 'session-1', idempotencyKey: 'retry-key-1' }));
    expect(clear).not.toHaveBeenCalled();

    await act(async () => { await result.current.submit(); });
    expect(updateSession).toHaveBeenNthCalledWith(2, expect.objectContaining({ id: 'session-1', idempotencyKey: 'retry-key-1' }));
    expect(clear).toHaveBeenCalledTimes(1);
    expect(clear).toHaveBeenCalledWith('update-session-session-1');
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });
});
