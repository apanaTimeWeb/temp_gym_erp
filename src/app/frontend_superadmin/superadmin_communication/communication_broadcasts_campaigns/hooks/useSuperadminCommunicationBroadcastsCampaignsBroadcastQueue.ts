'use client';

// RESPONSIBILITY: Owns the broadcast recipient-delivery queue lifecycle and state transitions for this leaf.
// DATA FLOW: Modal props -> queue hook -> feature delivery mutation -> validated response -> recipient state -> presentation.
// INVARIANT: Exactly one recipient is processed at a time; failures stop progression until explicit retry.

import { useCallback, useEffect, useRef, useState } from 'react';

import { useTranslations } from 'next-intl';

import { SUPERADMIN_BROADCAST_QUEUE_STATE_CODES } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/constants/superadmin_communication_broadcasts_campaigns_broadcast.constants';
import { useSuperadminCommunicationBroadcastsCampaignsBroadcastDelivery } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/hooks/useSuperadminCommunicationBroadcastsCampaignsBroadcastDelivery';
import { createSuperadminCommunicationBroadcastsCampaignsFormApiError } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/utils/SuperadminCommunicationBroadcastsCampaignsFormApiErrors';

import type {
  SuperadminBroadcastQueueRecipientState,
  SuperadminCommunicationBroadcastsBroadcastQueueModalProps,
} from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns_broadcast_queue_modal.types';


/** Owns the delivery queue state machine; the modal remains a presentation-only view. */
export function useSuperadminCommunicationBroadcastsCampaignsBroadcastQueue({
  isOpen,
  recipients,
  broadcastId,
  onComplete,
}: Pick<SuperadminCommunicationBroadcastsBroadcastQueueModalProps, 'isOpen' | 'recipients' | 'broadcastId' | 'onComplete'>) {
  const t = useTranslations('superadmin_communication_broadcasts');
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [states, setStates] = useState<Record<string, SuperadminBroadcastQueueRecipientState>>({});
  const [lastError, setLastError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const processingIndexRef = useRef<number | null>(null);
  const sessionKeyRef = useRef<string | null>(null);
  const { deliverRecipient } = useSuperadminCommunicationBroadcastsCampaignsBroadcastDelivery();

  useEffect(() => {
    if (!broadcastId) {
      sessionKeyRef.current = null;
      setCurrentIndex(-1);
      setStates({});
      setLastError(null);
      setIsReady(false);
      processingIndexRef.current = null;
      return;
    }
    const sessionKey = `${broadcastId}:${recipients.map((recipient) => recipient.id).join(',')}`;
    if (sessionKeyRef.current === sessionKey) return;
    sessionKeyRef.current = sessionKey;
    const initialStates: Record<string, SuperadminBroadcastQueueRecipientState> = {};
    recipients.forEach((recipient) => {
      initialStates[recipient.id] = SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.PENDING;
    });
    setStates(initialStates);
    setCurrentIndex(recipients.length > 0 ? 0 : -1);
    setLastError(null);
    setIsReady(true);
    processingIndexRef.current = null;
  }, [broadcastId, recipients]);

  useEffect(() => {
    if (!isOpen || !isReady || !broadcastId || currentIndex < 0 || currentIndex >= recipients.length) return;
    if (processingIndexRef.current === currentIndex) return;
    const recipient = recipients[currentIndex];
    if (!recipient || states[recipient.id] === SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.DELIVERED || states[recipient.id] === SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.FAILED) return;

    processingIndexRef.current = currentIndex;
    setStates((previous) => ({ ...previous, [recipient.id]: SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.PROCESSING }));
    setLastError(null);

    void deliverRecipient({ broadcastId, recipientId: recipient.id })
      .then((response) => {
        if (!response.success || !response.data) throw createSuperadminCommunicationBroadcastsCampaignsFormApiError(response);
        setStates((previous) => ({ ...previous, [recipient.id]: SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.DELIVERED }));
        if (currentIndex + 1 >= recipients.length) {
          onComplete(response.message);
          setCurrentIndex(-1);
        } else {
          setCurrentIndex((previous) => previous + 1);
        }
      })
      .catch(() => {
        setStates((previous) => ({ ...previous, [recipient.id]: SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.FAILED }));
        setLastError(t('ui.action_failed_retry'));
      })
      .finally(() => {
        processingIndexRef.current = null;
      });
  }, [broadcastId, currentIndex, deliverRecipient, isOpen, isReady, onComplete, recipients, states, t]);

  const retryRecipient = useCallback((recipientId: string) => {
    const index = recipients.findIndex((recipient) => recipient.id === recipientId);
    if (index < 0) return;
    setLastError(null);
    setStates((previous) => ({ ...previous, [recipientId]: SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.PENDING }));
    setCurrentIndex(index);
  }, [recipients]);

  return { currentIndex, states, lastError, isReady, retryRecipient };
}
