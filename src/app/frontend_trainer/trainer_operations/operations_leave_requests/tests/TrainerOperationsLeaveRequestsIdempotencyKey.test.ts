import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useTrainerInfrastructureIdempotencyKey } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/hooks/TrainerOperationsLeaveRequestsuseTrainerInfrastructureIdempotencyKey';

describe('Leave Requests idempotency key lifecycle', () => {
  it('reuses a key for an unchanged retry and rotates it when the payload changes', () => {
    const { result } = renderHook(() => useTrainerInfrastructureIdempotencyKey());
    let firstKey = '';
    act(() => { result.current.syncPayload('request-leave', '{"reason":"Family event"}'); firstKey = result.current.begin('request-leave'); });
    let retryKey = '';
    act(() => { result.current.syncPayload('request-leave', '{"reason":"Family event"}'); retryKey = result.current.begin('request-leave'); });
    expect(retryKey).toBe(firstKey);
    let editedPayloadKey = '';
    act(() => { result.current.syncPayload('request-leave', '{"reason":"Medical appointment"}'); editedPayloadKey = result.current.begin('request-leave'); });
    expect(editedPayloadKey).not.toBe(firstKey);
  });
});
