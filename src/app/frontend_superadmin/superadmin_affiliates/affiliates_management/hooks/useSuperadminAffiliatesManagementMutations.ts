'use client';
// DATA FLOW: Superadmin UI → useSuperadminAffiliatesManagementMutations → Superadmin module API/state → consuming component
// RESPONSIBILITY: Execute Superadmin affiliate mutations, confirmations, cache updates, and user feedback.
// DATA FLOW: feature API/schema → hook/context → useSuperadminAffiliatesManagementMutations consumers.


import { useCallback, useRef } from 'react';

import { useTranslations } from 'next-intl';

import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';

import { affiliatesApi } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/api/superadmin_affiliates_management.api';
import { SUPERADMIN_AFFILIATE_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/constants/superadmin_affiliates_management.constants';
import { useSuperadminAffiliatesManagementMutation } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/hooks/useSuperadminAffiliatesManagementMutation';
import { applySuperadminAffiliatesManagementFormApiErrors } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/utils/SuperadminAffiliatesManagementFormApiErrors';

import type { Affiliate, AffiliateStatus, AffiliateFormData } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/types/superadmin_affiliates_management.types';
import type { UseFormReturn } from 'react-hook-form';

/**
 * Purpose: Execute Superadmin affiliate mutations, confirmations, cache updates, and user feedback.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 
 * @description Execute Superadmin affiliate mutations, confirmations, cache updates, and user feedback.
 * @dependencies values defined by the exported hook signature.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
/**
 * @description Owns the useSuperadminAffiliatesManagementMutations responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export function useSuperadminAffiliatesManagementMutations(setIsModalOpen: (open: boolean) => void, setEditingAffiliate: (affiliate: Affiliate | null) => void, form: UseFormReturn<AffiliateFormData>, editingAffiliate: Affiliate | null) {
    const t = useTranslations('superadmin_affiliates');
    const { mutate, isMutating } = useSuperadminAffiliatesManagementMutation();
    const idempotencyKeysRef = useRef(new Map<string, { fingerprint: string; key: string }>());
    const getKey = (scope: string, intent: unknown) => {
        const fingerprint = JSON.stringify(intent);
        const previous = idempotencyKeysRef.current.get(scope);
        if (previous?.fingerprint === fingerprint) return previous.key;
        const key = crypto.randomUUID(); idempotencyKeysRef.current.set(scope, { fingerprint, key }); return key;
    };
    const clearKey = (scope: string) => idempotencyKeysRef.current.delete(scope);
    const { confirm } = useConfirm();
    const handleAddAffiliate = useCallback(async (data: AffiliateFormData) => {
        const createKey = getKey('create', data);
        return mutate<Affiliate>(() => affiliatesApi.createAffiliate(data, createKey), {
            toastId: 'superadmin-affiliate-create',
            onError: (error) => { applySuperadminAffiliatesManagementFormApiErrors(error, form.setError, Object.keys(form.getValues()) as (keyof AffiliateFormData)[]); },
            onSuccess: () => {
                clearKey('create');
                setIsModalOpen(false);
                form.reset();
            },
        });
    }, [form, mutate, setIsModalOpen]);
    const handleEditAffiliate = useCallback(async (data: AffiliateFormData) => {
        if (!editingAffiliate) return;
        const updateKey = getKey(`update:${editingAffiliate.id}`, data);
        return mutate<Affiliate>(() => affiliatesApi.updateAffiliate(editingAffiliate.id, data, updateKey), {
            toastId: `superadmin-affiliate-update-${editingAffiliate.id}`,
            onError: (error) => { applySuperadminAffiliatesManagementFormApiErrors(error, form.setError, Object.keys(form.getValues()) as (keyof AffiliateFormData)[]); },
            onSuccess: () => {
                clearKey(`update:${editingAffiliate.id}`);
                setIsModalOpen(false);
                setEditingAffiliate(null);
                form.reset();
            },
        });
    }, [editingAffiliate, form, mutate, setIsModalOpen, setEditingAffiliate]);
    const handleToggleAffiliateStatus = useCallback(async (id: string, currentStatus: AffiliateStatus) => {
        const confirmed = await confirm({ title: currentStatus === SUPERADMIN_AFFILIATE_STATUS_CODES.ACTIVE ? t('ui.confirm_suspend_affiliate_title') : t('ui.confirm_activate_affiliate_title'), message: currentStatus === SUPERADMIN_AFFILIATE_STATUS_CODES.ACTIVE ? t('ui.suspend_affiliate_mutation_message') : t('ui.activate_affiliate_mutation_message'), type: currentStatus === SUPERADMIN_AFFILIATE_STATUS_CODES.ACTIVE ? 'danger' : 'info', confirmText: currentStatus === SUPERADMIN_AFFILIATE_STATUS_CODES.ACTIVE ? t('ui.suspend_affiliate_action') : t('ui.activate_affiliate_action'), cancelText: t('ui.cancel_action') });
        if (!confirmed) return;
        const newStatus: AffiliateStatus = currentStatus === SUPERADMIN_AFFILIATE_STATUS_CODES.ACTIVE ? SUPERADMIN_AFFILIATE_STATUS_CODES.INACTIVE : SUPERADMIN_AFFILIATE_STATUS_CODES.ACTIVE;
        const statusKey = getKey(`status:${id}`, { id, newStatus });
        return mutate<Affiliate>(() => affiliatesApi.updateAffiliateStatus(id, newStatus, statusKey), {
            toastId: `superadmin-affiliate-status-${id}`,
            onSuccess: () => {
                clearKey(`status:${id}`);
            },
        });
    }, [confirm, mutate]);
    const handleDeleteAffiliate = useCallback(async (id: string) => {
        const confirmed = await confirm({ title: t('ui.confirm_delete_affiliate_title'), message: t('ui.delete_affiliate_short_message'), type: 'danger', confirmText: t('ui.delete_action'), cancelText: t('ui.cancel_action') });
        if (!confirmed) return;
        const deleteKey = getKey(`delete:${id}`, { id, action: 'delete' });
        return mutate<void>(() => affiliatesApi.deleteAffiliate(id, deleteKey), {
            toastId: `superadmin-affiliate-delete-${id}`,
            onSuccess: () => {
                clearKey(`delete:${id}`);
            },
        });
    }, [confirm, mutate]);
    const handlePayCommission = useCallback(async (affiliate: Affiliate) => {
        const payKey = getKey(`pay:${affiliate.id}`, { id: affiliate.id, amount: affiliate.pendingPayout, currency: affiliate.currency, action: 'pay' });
        return mutate<Affiliate>(() => affiliatesApi.payAffiliateCommission(affiliate.id, payKey), {
            toastId: `superadmin-affiliate-pay-${affiliate.id}`,
            onSuccess: () => {
                clearKey(`pay:${affiliate.id}`);
            },
        });
    }, [mutate]);
    return {
        isMutating,
        handleAddAffiliate,
        handleEditAffiliate,
        handleToggleAffiliateStatus,
        handleDeleteAffiliate,
        handlePayCommission,
    };
}
