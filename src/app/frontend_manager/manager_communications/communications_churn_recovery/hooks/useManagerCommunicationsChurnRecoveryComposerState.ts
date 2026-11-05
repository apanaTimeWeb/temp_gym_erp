// DATA FLOW: Selected churn member + tier → composer state hook → churn-recovery composer UI → message/channel action.
'use client';

import { useEffect, useState } from 'react';

import { CANCELLATIONS_WIN_BACK_TEMPLATES, COMM_CHANNEL_VALUES } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/constants/manager_communications_campaigns_shared.constants';
import type { CommChannel, WinBackTemplateTier } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/types/manager_communications_communications_churn_recovery.types';

/**
 * @description Owns the churn-recovery composer draft and synchronizes it with the selected member/default tier.
 * @dependencies Module-owned win-back templates and channel constants.
 * @edge-case Reinitializes draft content when the member or default tier changes while keeping manual tier changes local to the current composer.
 */
export function useManagerCommunicationsCampaignsChurnRecoveryComposerState(member: unknown, defaultTier: WinBackTemplateTier) {
  const [channel, setChannel] = useState<CommChannel>(COMM_CHANNEL_VALUES[0]);
  const [tier, setTier] = useState<WinBackTemplateTier>(defaultTier);
  const [message, setMessage] = useState(CANCELLATIONS_WIN_BACK_TEMPLATES[defaultTier].message);
  const [subject, setSubject] = useState(CANCELLATIONS_WIN_BACK_TEMPLATES[defaultTier].subject);
  const memberId = member && typeof member === 'object' && 'id' in member ? String((member as { id?: unknown }).id ?? '') : '';

  // EFFECT: Rehydrate the composer when the selected member or default tier changes so the UI reflects the current business context.
  useEffect(() => {
    setTier(defaultTier);
    const template = CANCELLATIONS_WIN_BACK_TEMPLATES[defaultTier];
    setMessage(template.message);
    setSubject(template.subject);
    setChannel(COMM_CHANNEL_VALUES[0]);
  }, [defaultTier, memberId]);

  const handleTierChange = (newTier: WinBackTemplateTier) => {
    setTier(newTier);
    const template = CANCELLATIONS_WIN_BACK_TEMPLATES[newTier];
    setMessage(template.message);
    setSubject(template.subject);
  };

  return { channel, setChannel, tier, setTier, message, setMessage, subject, setSubject, handleTierChange };
}
