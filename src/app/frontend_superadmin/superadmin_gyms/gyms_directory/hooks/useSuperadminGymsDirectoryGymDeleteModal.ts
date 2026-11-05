'use client';
import { useEffect, useRef, useState } from 'react';

import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/api/superadmin_gyms_directory.api';
import { SUPERADMIN_GYMS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/api/superadmin_gyms_directory.query_keys';
import { useSuperadminGymsDirectoryStore } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/state/useSuperadminGymsDirectoryStore';
import { resolveSuperadminGymsDirectoryFeedback } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/utils/SuperadminGymsDirectoryFeedback';

// DATA FLOW: Superadmin UI → useSuperadminGymsDirectoryGymDeleteModal → Superadmin module API/state → consuming component
// RESPONSIBILITY: Hook to manage the state and logic of the SuperadminGymsGymDeleteModal.
// DATA FLOW: SuperadminGymsGymDeleteModal -> useSuperadminGymsDirectoryGymDeleteModal -> API


/**
 * Purpose: Hook to manage the state and logic of the SuperadminGymsGymDeleteModal.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
/**
 * @description Manages gyms state, queries, and UI interactions for useSuperadminGymsDirectoryGymDeleteModal.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminGymsDirectoryGymDeleteModal → consuming feature component.
/**
 * @description Coordinates the use Superadmin gyms gym delete modal concern within its owning Superadmin feature.
 * @dependencies Uses the typed arguments and module-local API, query-key, schema, and utility imports declared in this file; it must not depend on sibling business modules.
 * @edge-case Keep null or empty inputs safe, preserve pending/error/retry/cancellation behavior where applicable, and avoid stale or duplicate mutation effects.
 */
export function useSuperadminGymsDirectoryGymDeleteModal() {
    const t = useTranslations('superadmin_gyms');
    const isDeleteModalOpen = useSuperadminGymsDirectoryStore(state => state.isDeleteModalOpen);
    const closeDeleteModal = useSuperadminGymsDirectoryStore(state => state.closeDeleteModal);
    const gymToDelete = useSuperadminGymsDirectoryStore(state => state.gymToDelete);
    const queryClient = useQueryClient();
    const [confirmText, setConfirmText] = useState('');
    const idempotencyKeyRef = useRef<string | null>(null);
    const targetGymIdRef = useRef<string | null>(null);
    const handleClose = () => { if (deleteMutation.isPending) return; idempotencyKeyRef.current = null; targetGymIdRef.current = null; setConfirmText(''); closeDeleteModal(); };
    // Reset confirmation text whenever the modal opens or closes
    // EXPLANATION: Synchronize component state with external dependencies.
    // EFFECT DEPENDENCIES: Documented intentionally.
    // EFFECT INTENT: Synchronize local/UI state with the listed external dependencies.
    useEffect(() => {
        if (!isDeleteModalOpen || !gymToDelete) {
            idempotencyKeyRef.current = null;
            targetGymIdRef.current = null;
            setConfirmText('');
            return;
        }
        if (targetGymIdRef.current !== gymToDelete.id) {
            idempotencyKeyRef.current = null;
            targetGymIdRef.current = gymToDelete.id;
            setConfirmText('');
        }
    }, [isDeleteModalOpen, gymToDelete?.id]);
    const deleteMutation = useMutation({
        mutationFn: async ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => {
            const response = await gymsApi.deleteGym(id, idempotencyKey);
            if (!response.success) throw new Error(response.message || t('ui.action_failed_retry'));
            return response;
        },
        onSuccess: (res, variables) => {
            toast.success(res.message, { id: `superadmin-gym-delete-success-${variables.id}` });
            idempotencyKeyRef.current = null;
            targetGymIdRef.current = null;
            queryClient.invalidateQueries({ queryKey: SUPERADMIN_GYMS_QUERY_KEYS.all });
            closeDeleteModal();
        },
        onError: (err: unknown, variables) => {
            toast.error(resolveSuperadminGymsDirectoryFeedback(err, t('ui.action_failed_retry')), { id: `superadmin-gym-delete-error-${variables.id}` });
        }
    });
    const handleConfirmDelete = () => {
        if (confirmText === t('ui.delete_32f68a60') && gymToDelete) {
            idempotencyKeyRef.current ??= crypto.randomUUID();
            deleteMutation.mutate({ id: gymToDelete.id, idempotencyKey: idempotencyKeyRef.current });
        }
    };
    return {
        isDeleteModalOpen,
        closeDeleteModal: handleClose,
        gymToDelete,
        confirmText,
        setConfirmText,
        handleConfirmDelete,
        actionLoadingId: deleteMutation.isPending ? gymToDelete?.id : null
    };
}
