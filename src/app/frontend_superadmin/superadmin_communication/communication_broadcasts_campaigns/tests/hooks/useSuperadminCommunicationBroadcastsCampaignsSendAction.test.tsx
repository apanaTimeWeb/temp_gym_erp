import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useSuperadminCommunicationBroadcastsCampaignsSendAction } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/hooks/useSuperadminCommunicationBroadcastsCampaignsSendAction';

const broadcasts = [{ id: 'broadcast-1', title: 'Monthly update', targetGymIds: ['gym-1'], status: 'DRAFT', content: 'hello', scheduledDate: null }] as never;
const gyms = [{ id: 'gym-1', name: 'Gym One', ownerName: 'Owner', phone: '900000001' }] as never;

beforeEach(() => { vi.clearAllMocks(); });

describe('useSuperadminCommunicationBroadcastsCampaignsSendAction', () => {
  it('does not mutate before the user types SEND and clears keys after success', async () => {
    const updateBroadcast = vi.fn().mockResolvedValue({ success: true });
    const clearSendKey = vi.fn();
    const clearUpdateKey = vi.fn();
    const { result } = renderHook(() => useSuperadminCommunicationBroadcastsCampaignsSendAction({ broadcasts, gyms, notifyBlocked: vi.fn(), isMutating: false, updateBroadcast, getSendKey: () => 'key-1', clearSendKey, clearUpdateKey }));

    act(() => { result.current.requestSendConfirmation('broadcast-1'); });
    expect(result.current.pendingBroadcast?.id).toBe('broadcast-1');
    expect(updateBroadcast).not.toHaveBeenCalled();
    await act(async () => { await result.current.confirmSendBroadcast('send'); });
    expect(updateBroadcast).not.toHaveBeenCalled();
    await act(async () => { await result.current.confirmSendBroadcast('SEND'); });

    expect(updateBroadcast).toHaveBeenCalledWith({ id: 'broadcast-1', data: { status: 'SENT' }, idempotencyKey: 'key-1' });
    expect(clearSendKey).toHaveBeenCalledWith('broadcast-1');
    expect(clearUpdateKey).toHaveBeenCalledWith('broadcast-1');
    expect(result.current.pendingBroadcast).toBeNull();
  });

  it('preserves confirmation and same idempotency key after a failed send for retry', async () => {
    const updateBroadcast = vi.fn().mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce({ success: true });
    const getSendKey = vi.fn().mockReturnValue('stable-key');
    const clearSendKey = vi.fn();
    const { result } = renderHook(() => useSuperadminCommunicationBroadcastsCampaignsSendAction({ broadcasts, gyms, notifyBlocked: vi.fn(), isMutating: false, updateBroadcast, getSendKey, clearSendKey, clearUpdateKey: vi.fn() }));
    act(() => { result.current.requestSendConfirmation('broadcast-1'); });
    await act(async () => { await result.current.confirmSendBroadcast('SEND'); });
    expect(result.current.pendingBroadcast?.id).toBe('broadcast-1');
    await act(async () => { await result.current.confirmSendBroadcast('SEND'); });
    expect(updateBroadcast.mock.calls.map(([arg]) => arg.idempotencyKey)).toEqual(['stable-key', 'stable-key']);
    expect(clearSendKey).toHaveBeenCalledTimes(1);
  });

  it('ignores unknown broadcasts and supports explicit cancellation', () => {
    const { result } = renderHook(() => useSuperadminCommunicationBroadcastsCampaignsSendAction({ broadcasts, gyms, notifyBlocked: vi.fn(), isMutating: false, updateBroadcast: vi.fn(), getSendKey: () => 'key', clearSendKey: vi.fn(), clearUpdateKey: vi.fn() }));
    act(() => { result.current.requestSendConfirmation('unknown'); });
    expect(result.current.pendingBroadcast).toBeNull();
    act(() => { result.current.requestSendConfirmation('broadcast-1'); });
    act(() => { result.current.cancelSendConfirmation(); });
    expect(result.current.pendingBroadcast).toBeNull();
  });
  it('blocks a send intent before mutation when no target recipients resolve', () => {
    const updateBroadcast = vi.fn(); const notifyBlocked = vi.fn();
    const { result } = renderHook(() => useSuperadminCommunicationBroadcastsCampaignsSendAction({ broadcasts, gyms: [], notifyBlocked, isMutating: false, updateBroadcast, getSendKey: () => 'key', clearSendKey: vi.fn(), clearUpdateKey: vi.fn() }));
    act(() => { result.current.requestSendConfirmation('broadcast-1'); });
    expect(result.current.pendingBroadcast).toBeNull();
    expect(updateBroadcast).not.toHaveBeenCalled();
    expect(notifyBlocked).toHaveBeenCalledTimes(1);
  });

});
