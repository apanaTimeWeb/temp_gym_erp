'use client';
import { useEffect, useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';

import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/api/superadmin_gyms_directory.api';
import { SUPERADMIN_GYMS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/api/superadmin_gyms_directory.query_keys';
import { useSuperadminGymsDirectoryGymEditModalPlans } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryGymEditModalPlans';
import { useSuperadminGymsDirectoryUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryUnsavedChangesGuard';
import { gymEditSchema } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/schemas/superadmin_gyms_directory.schemas';
import { useSuperadminGymsDirectoryStore } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/state/useSuperadminGymsDirectoryStore';
import { resolveSuperadminGymsDirectoryFeedback } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/utils/SuperadminGymsDirectoryFeedback';
import { applySuperadminGymsDirectoryFormApiErrors, createSuperadminGymsDirectoryFormApiError } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/utils/SuperadminGymsDirectoryFormApiErrors';

import type { GymEditFormValues } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/schemas/superadmin_gyms_directory.schemas';

// DATA FLOW: Superadmin UI → useSuperadminGymsDirectoryGymEditModal → Superadmin module API/state → consuming component
// RESPONSIBILITY: Handles form validation, modal state, and API submission for editing a Gym.
// DATA FLOW: SuperadminGymsGymEditModal -> useSuperadminGymsDirectoryGymEditModal -> API


/**
 * Purpose: Handles form validation, modal state, and API submission for editing a Gym.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
/**
 * @description Manages gyms state, queries, and UI interactions for useSuperadminGymsDirectoryGymEditModal.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminGymsDirectoryGymEditModal → consuming feature component.
/**
 * @description Coordinates the use Superadmin gyms gym edit modal concern within its owning Superadmin feature.
 * @dependencies Uses the typed arguments and module-local API, query-key, schema, and utility imports declared in this file; it must not depend on sibling business modules.
 * @edge-case Keep null or empty inputs safe, preserve pending/error/retry/cancellation behavior where applicable, and avoid stale or duplicate mutation effects.
 */
export function useSuperadminGymsDirectoryGymEditModal() {
    const t = useTranslations('superadmin_gyms');
    const { confirm } = useConfirm();
    const idempotencyKeyRef = useRef<string | null>(null);
    const targetGymIdRef = useRef<string | null>(null);
    const isEditModalOpen = useSuperadminGymsDirectoryStore(state => state.isEditModalOpen);
    const closeEditModal = useSuperadminGymsDirectoryStore(state => state.closeEditModal);
    const selectedGym = useSuperadminGymsDirectoryStore(state => state.selectedGym);
    const queryClient = useQueryClient();
    const { plans, loadingPlans, plansError, retryPlans } = useSuperadminGymsDirectoryGymEditModalPlans();
    const { register, handleSubmit, reset, control, setError, formState: { errors, isSubmitting, isDirty }, } = useForm<GymEditFormValues>({
        resolver: zodResolver(gymEditSchema),
    });
    // RESPONSIBILITY: Handle side-effects for useSuperadminGymsDirectoryGymEditModal
    // EXPLANATION: Synchronize component state with external dependencies.
    // EFFECT DEPENDENCIES: Documented intentionally.
    // EFFECT INTENT: Synchronize local/UI state with the listed external dependencies.
    useEffect(() => {
        if (!isEditModalOpen || !selectedGym) {
            idempotencyKeyRef.current = null;
            targetGymIdRef.current = null;
            return;
        }
        if (targetGymIdRef.current !== selectedGym.id) {
            idempotencyKeyRef.current = null;
            targetGymIdRef.current = selectedGym.id;
        }
        if (selectedGym && isEditModalOpen) {
            reset({
                name: selectedGym.name,
                ownerName: selectedGym.ownerName,
                adminEmail: selectedGym.adminEmail,
                phone: selectedGym.phone,
                plan: selectedGym.plan,
                temporaryPassword: '',
            });
        }
    }, [selectedGym, isEditModalOpen, reset]);
    const editMutation = useMutation({
        mutationFn: async ({ data, idempotencyKey }: { data: GymEditFormValues; idempotencyKey: string }) => {
            if (!selectedGym) throw new Error(t('ui.action_failed_retry'));
            const response = await gymsApi.updateGym(selectedGym.id, data, idempotencyKey);
            if (!response.success) throw createSuperadminGymsDirectoryFormApiError(response, t('ui.action_failed_retry'));
            return response;
        },
        onSuccess: (res) => {
            toast.success(res.message, { id: 'superadmin-toast-39776d5602' });
            queryClient.invalidateQueries({ queryKey: SUPERADMIN_GYMS_QUERY_KEYS.all });
            idempotencyKeyRef.current = null;
            targetGymIdRef.current = null;
            reset();
            closeEditModal();
        },
        onError: (err: unknown) => {
            applySuperadminGymsDirectoryFormApiErrors(err, setError, ['name', 'ownerName', 'adminEmail', 'phone', 'plan', 'temporaryPassword']);
            toast.error(resolveSuperadminGymsDirectoryFeedback(err, t('ui.action_failed_retry')), { id: 'failed-to-update-gym' });
        }
    });
    useSuperadminGymsDirectoryUnsavedChangesGuard(isEditModalOpen && isDirty && !editMutation.isPending, t('ui.unsaved_gym_changes_discard_repair'));
    const handleClose = async () => {
        if (editMutation.isPending) return;
        if (isDirty) {
            const approved = await confirm({
                title: t('ui.unsaved_changes_title'),
                message: t('ui.unsaved_gym_changes_discard_repair'),
                type: 'warning',
                confirmText: t('ui.discard_changes'),
                cancelText: t('ui.stay_on_page'),
            });
            if (!approved) return;
        }
        idempotencyKeyRef.current = null;
        targetGymIdRef.current = null;
        reset();
        closeEditModal();
    };
    const onSubmit = async (data: GymEditFormValues) => {
        if (selectedGym) {
            idempotencyKeyRef.current ??= crypto.randomUUID();
            editMutation.mutate({ data, idempotencyKey: idempotencyKeyRef.current });
        }
    };
    return {
        isEditModalOpen,
        closeEditModal: handleClose,
        selectedGym,
        plans,
        loadingPlans,
        plansError,
        retryPlans,
        register,
        handleSubmit,
        onSubmit,
        control,
        errors,
        isDirty,
        isSubmitting: isSubmitting || editMutation.isPending,
    };
}
