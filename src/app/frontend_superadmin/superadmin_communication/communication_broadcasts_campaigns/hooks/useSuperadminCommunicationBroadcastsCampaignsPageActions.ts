'use client';


import { useCallback } from 'react';

import { SUPERADMIN_BROADCAST_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/constants/superadmin_communication_broadcasts_campaigns_broadcast.constants';
import { useSuperadminCommunicationBroadcastsCampaignsIdempotencyKeys } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/hooks/useSuperadminCommunicationBroadcastsCampaignsIdempotencyKeys';
import { useSuperadminCommunicationBroadcastsCampaignsMutations } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/hooks/useSuperadminCommunicationBroadcastsCampaignsMutations';

import type { Broadcast, BroadcastFormData, BroadcastStatus } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns.types';
import type { UseFormReturn } from 'react-hook-form';

type IdempotencyKeys = ReturnType<typeof useSuperadminCommunicationBroadcastsCampaignsIdempotencyKeys>;
type Mutations = ReturnType<typeof useSuperadminCommunicationBroadcastsCampaignsMutations>;

interface SuperadminCommunicationBroadcastsPageActionsProps {
  form: UseFormReturn<BroadcastFormData>;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  setIsModalOpen: (open: boolean) => void;
  idempotencyKeys: IdempotencyKeys;
  createMutation: Mutations['createMutation'];
  updateMutation: Mutations['updateMutation'];
  deleteMutation: Mutations['deleteMutation'];
}

/** Owns form submit/retry and modal-entry actions, separate from page orchestration. */
export function useSuperadminCommunicationBroadcastsCampaignsPageActions({
  form, editingId, setEditingId, setIsModalOpen, idempotencyKeys,
  createMutation, updateMutation, deleteMutation,
}: SuperadminCommunicationBroadcastsPageActionsProps) {
  const handleCreateBroadcast = useCallback(async (data: BroadcastFormData) => {
    const { scheduledDate, ...rest } = data;
    const payload = scheduledDate ? { ...rest, scheduledDate } : rest;
    if (editingId) {
      const idempotencyKey = idempotencyKeys.getUpdateKey(editingId, payload);
      try {
        await updateMutation.mutateAsync({ id: editingId, data: payload, idempotencyKey });
        idempotencyKeys.clearUpdateKey(editingId);
      } catch {
        // Keep the key stable across retries for the same failed user intent.
      }
      return;
    }
    try {
      await createMutation.mutateAsync({ data: payload as BroadcastFormData, idempotencyKey: idempotencyKeys.getCreateKey(payload) });
      idempotencyKeys.clearCreateKey();
    } catch {
      // Keep the key stable across retries for the same failed create intent.
    }
  }, [editingId, updateMutation, createMutation, idempotencyKeys]);

  const handleDeleteBroadcast = useCallback(async (id: string) => {
    const idempotencyKey = idempotencyKeys.getDeleteKey(id);
    try {
      await deleteMutation.mutateAsync({ id, idempotencyKey });
      idempotencyKeys.clearDeleteKey(id);
    } catch {
      // Keep the key stable across retries for the same failed delete intent.
    }
  }, [deleteMutation, idempotencyKeys]);

  const openEditModal = useCallback((broadcast: Broadcast) => {
    setEditingId(broadcast.id);
    form.reset({
      title: broadcast.title,
      content: broadcast.content,
      targetGymIds: broadcast.targetGymIds || [],
      status: broadcast.status as BroadcastStatus,
      scheduledDate: broadcast.scheduledDate ?? '',
    });
    setIsModalOpen(true);
  }, [form, setEditingId, setIsModalOpen]);

  const openCreateModal = useCallback(() => {
    setEditingId(null);
    idempotencyKeys.clearCreateKey();
    form.reset({ title: '', content: '', targetGymIds: [], status: SUPERADMIN_BROADCAST_STATUS_CODES.DRAFT, scheduledDate: '' });
    setIsModalOpen(true);
  }, [form, idempotencyKeys, setEditingId, setIsModalOpen]);

  return { handleCreateBroadcast, handleDeleteBroadcast, openEditModal, openCreateModal };
}
