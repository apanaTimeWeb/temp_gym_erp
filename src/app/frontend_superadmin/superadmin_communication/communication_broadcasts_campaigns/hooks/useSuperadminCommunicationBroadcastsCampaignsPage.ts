'use client';
// DATA FLOW: Owning feature API/query/store state → useSuperadminCommunicationBroadcastsCampaignsPage → consuming feature component.


import { useState, useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { SUPERADMIN_BROADCAST_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/constants/superadmin_communication_broadcasts_campaigns_broadcast.constants';
import { useSuperadminCommunicationBroadcastsCampaignsBroadcastQueueState } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/hooks/useSuperadminCommunicationBroadcastsCampaignsBroadcastQueueState';
import { useSuperadminCommunicationBroadcastsCampaignsData } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/hooks/useSuperadminCommunicationBroadcastsCampaignsData';
import { useSuperadminCommunicationBroadcastsCampaignsIdempotencyKeys } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/hooks/useSuperadminCommunicationBroadcastsCampaignsIdempotencyKeys';
import { useSuperadminCommunicationBroadcastsCampaignsMutations } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/hooks/useSuperadminCommunicationBroadcastsCampaignsMutations';
import { useSuperadminCommunicationBroadcastsCampaignsPageActions } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/hooks/useSuperadminCommunicationBroadcastsCampaignsPageActions';
import { useSuperadminCommunicationBroadcastsCampaignsSendAction } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/hooks/useSuperadminCommunicationBroadcastsCampaignsSendAction';
import { useSuperadminCommunicationBroadcastsCampaignsUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/hooks/useSuperadminCommunicationBroadcastsCampaignsUnsavedChangesGuard';
import { BroadcastSchema } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/schemas/superadmin_communication_broadcasts_campaigns_contract.schemas';

import type { BroadcastFormData, Broadcast, BroadcastStatus } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns.types';

/**
 * @description Manages broadcasts state, queries, and UI interactions for useSuperadminCommunicationBroadcastsCampaignsPage.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminCommunicationBroadcastsCampaignsPage → consuming feature component.
/**
 * @description Coordinates the use Superadmin broadcasts page concern within its owning Superadmin feature.
 * @dependencies Uses the typed arguments and module-local API, query-key, schema, and utility imports declared in this file; it must not depend on sibling business modules.
 * @edge-case Keep null or empty inputs safe, preserve pending/error/retry/cancellation behavior where applicable, and avoid stale or duplicate mutation effects.
 */
export const useSuperadminCommunicationBroadcastsCampaignsPage = () => {
    const t = useTranslations('superadmin_communication_broadcasts');
    const { broadcasts, gyms, status, error, retryBroadcasts, searchQuery, setSearchQuery, statusFilter, setStatusFilter, currentPage, totalPages, setCurrentPage } = useSuperadminCommunicationBroadcastsCampaignsData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const idempotencyKeys = useSuperadminCommunicationBroadcastsCampaignsIdempotencyKeys();
    const queueState = useSuperadminCommunicationBroadcastsCampaignsBroadcastQueueState();
    const form = useForm<BroadcastFormData>({
        resolver: zodResolver(BroadcastSchema),
        defaultValues: {
            title: '',
            content: '',
            targetGymIds: [],
            status: SUPERADMIN_BROADCAST_STATUS_CODES.DRAFT,
            scheduledDate: '',
        },
    });
    const { createMutation, updateMutation, deleteMutation, isMutating } = useSuperadminCommunicationBroadcastsCampaignsMutations({
        setIsModalOpen,
        setEditingId,
        form,
        gyms,
        ...queueState,
    });
    const pageActions = useSuperadminCommunicationBroadcastsCampaignsPageActions({ form, editingId, setEditingId, setIsModalOpen, idempotencyKeys, createMutation, updateMutation, deleteMutation });
    const sendAction = useSuperadminCommunicationBroadcastsCampaignsSendAction({
        broadcasts,
        gyms,
        notifyBlocked: () => toast.error(t('ui.no_recipients_to_deliver'), { id: 'superadmin-broadcast-no-eligible-recipients' }),
        isMutating,
        updateBroadcast: updateMutation.mutateAsync,
        getSendKey: idempotencyKeys.getSendKey,
        clearSendKey: idempotencyKeys.clearSendKey,
        clearUpdateKey: idempotencyKeys.clearUpdateKey,
    });
    useSuperadminCommunicationBroadcastsCampaignsUnsavedChangesGuard(form.formState.isDirty && isModalOpen && !isMutating, t('ui.unsaved_broadcast_discard_repair'));
    const onQueueComplete = useCallback((message: string) => {
        queueState.setQueueModalOpen(false);
        queueState.setQueueBroadcastId(null);
        toast.success(message, { id: 'automated-broadcast-delivery-complete' });
    }, [queueState]);
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
    }, [form]);
    const openCreateModal = useCallback(() => {
        setEditingId(null);
        idempotencyKeys.clearCreateKey();
        form.reset({
            title: '',
            content: '',
            targetGymIds: [],
            status: SUPERADMIN_BROADCAST_STATUS_CODES.DRAFT,
            scheduledDate: '',
        });
        setIsModalOpen(true);
    }, [form]);
    return {
        status,
        error,
        retryBroadcasts,
        broadcasts,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        currentPage,
        totalPages,
        setCurrentPage,
        isModalOpen,
        setIsModalOpen,
        form,
        ...pageActions,
        handleSendBroadcast: sendAction.requestSendConfirmation,
        sendConfirmationBroadcast: sendAction.pendingBroadcast,
        isConfirmingSend: sendAction.isConfirming,
        confirmSendBroadcast: sendAction.confirmSendBroadcast,
        cancelSendConfirmation: sendAction.cancelSendConfirmation,
        editingId,
        isMutating,
        queueModalOpen: queueState.queueModalOpen,
        queueRecipients: queueState.queueRecipients,
        queueBroadcastId: queueState.queueBroadcastId,
        queueTitle: queueState.queueTitle, onQueueComplete, setQueueModalOpen: queueState.setQueueModalOpen
    };
};