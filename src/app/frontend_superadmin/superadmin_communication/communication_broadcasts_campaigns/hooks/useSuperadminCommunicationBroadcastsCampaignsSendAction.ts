'use client';

import { useCallback, useState } from 'react';

import type { Broadcast, BroadcastFormData, SuperadminCommunicationBroadcastsTenant } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns.types';

interface SuperadminCommunicationBroadcastsSendActionProps {
  broadcasts: Broadcast[];
  gyms: SuperadminCommunicationBroadcastsTenant[];
  notifyBlocked: () => void;
  isMutating: boolean;
  updateBroadcast: (input: { id: string; data: Partial<BroadcastFormData>; idempotencyKey: string }) => Promise<unknown>;
  getSendKey: (id: string) => string;
  clearSendKey: (id: string) => void;
  clearUpdateKey: (id: string) => void;
}

/** Owns a typed-confirmation send intent and preserves its idempotency key across retries. */
export function useSuperadminCommunicationBroadcastsCampaignsSendAction({
  broadcasts, gyms, notifyBlocked, isMutating, updateBroadcast, getSendKey, clearSendKey, clearUpdateKey,
}: SuperadminCommunicationBroadcastsSendActionProps) {
  const [pendingBroadcast, setPendingBroadcast] = useState<Broadcast | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  const requestSendConfirmation = useCallback((id: string) => {
    const broadcast = broadcasts.find((item) => item.id === id);
    if (!broadcast || isMutating || isConfirming) return;
    const targetGymIds = broadcast.targetGymIds ?? [];
    const resolvedGyms = targetGymIds.length > 0 ? gyms.filter((gym) => targetGymIds.includes(gym.id)) : gyms;
    if (resolvedGyms.length === 0) { notifyBlocked(); return; }
    setPendingBroadcast(broadcast);
  }, [broadcasts, gyms, isConfirming, isMutating, notifyBlocked]);

  const cancelSendConfirmation = useCallback(() => {
    if (!isConfirming) setPendingBroadcast(null);
  }, [isConfirming]);

  const confirmSendBroadcast = useCallback(async (typedPhrase: string) => {
    const broadcast = pendingBroadcast;
    if (!broadcast || typedPhrase !== 'SEND' || isMutating || isConfirming) return;
    setIsConfirming(true);
    try {
      await updateBroadcast({
        id: broadcast.id,
        data: { status: 'SENT' },
        idempotencyKey: getSendKey(broadcast.id),
      });
      clearSendKey(broadcast.id);
      clearUpdateKey(broadcast.id);
      setPendingBroadcast(null);
    } catch {
      // Keep the pending confirmation and idempotency key so retry repeats the same intent.
    } finally {
      setIsConfirming(false);
    }
  }, [clearSendKey, clearUpdateKey, getSendKey, isConfirming, isMutating, pendingBroadcast, updateBroadcast]);

  return { requestSendConfirmation, pendingBroadcast, isConfirming, confirmSendBroadcast, cancelSendConfirmation };
}
