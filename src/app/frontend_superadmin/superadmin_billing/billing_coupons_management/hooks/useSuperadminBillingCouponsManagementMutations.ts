'use client';
// DATA FLOW: Superadmin UI → useSuperadminBillingCouponsManagementMutations → Superadmin module API/state → consuming component
// RESPONSIBILITY: Execute Superadmin coupon mutations, confirmations, cache updates, and user feedback.
// DATA FLOW: feature API/schema → hook/context → useSuperadminBillingCouponsManagementMutations consumers.
import { useCallback, useRef } from 'react';

import { couponsApi } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/api/superadmin_billing_coupons_management.api';
import { SUPERADMIN_COUPON_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/constants/superadmin_billing_coupons_management.constants';
import { useSuperadminBillingCouponsManagementMutation } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/hooks/useSuperadminBillingCouponsManagementMutation';
import { applySuperadminBillingCouponsManagementFormApiErrors } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/utils/SuperadminBillingCouponsManagementFormApiErrors';

import type { Coupon, CouponStatus, CouponFormData } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/types/superadmin_billing_coupons_management.types';
import type { UseFormReturn } from 'react-hook-form';


/**
 * Purpose: Execute Superadmin coupon mutations, confirmations, cache updates, and user feedback.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
/**
 * @description Manages coupons state, queries, and UI interactions for useSuperadminBillingCouponsManagementMutations.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminBillingCouponsManagementMutations → consuming feature component.
/**
 * @description Coordinates the use Superadmin coupons mutations concern within its owning Superadmin feature.
 * @dependencies Uses the typed arguments and module-local API, query-key, schema, and utility imports declared in this file; it must not depend on sibling business modules.
 * @edge-case Keep null or empty inputs safe, preserve pending/error/retry/cancellation behavior where applicable, and avoid stale or duplicate mutation effects.
 */
export function useSuperadminBillingCouponsManagementMutations(setIsModalOpen: (open: boolean) => void, setIsEditModalOpen: (open: boolean) => void, setSelectedCoupon: (coupon: Coupon | null) => void, selectedCoupon: Coupon | null, form: UseFormReturn<CouponFormData>) {
    const { mutate, isMutating } = useSuperadminBillingCouponsManagementMutation();
    const idempotencyKeysRef = useRef(new Map<string, { fingerprint: string; key: string }>());
    const getKey = (scope: string, intent: unknown) => { const fingerprint = JSON.stringify(intent); const previous = idempotencyKeysRef.current.get(scope); if (previous?.fingerprint === fingerprint) return previous.key; const key = crypto.randomUUID(); idempotencyKeysRef.current.set(scope, { fingerprint, key }); return key; };
    const clearKey = (scope: string) => idempotencyKeysRef.current.delete(scope);
    const handleCreateCoupon = useCallback(async (data: CouponFormData) => {
        const keyScope = 'create';
        const idempotencyKey = getKey(keyScope, data);
        await mutate(() => couponsApi.createCoupon(data, idempotencyKey), {
            toastId: 'superadmin-coupon-create',
            onError: (error) => { applySuperadminBillingCouponsManagementFormApiErrors(error, form.setError, ['code', 'discountType', 'discountValue', 'maxUses', 'expiryDate']); },
            onSuccess: () => {
                clearKey(keyScope);
                setIsModalOpen(false);
                form.reset();
            },
        });
    }, [form, mutate, setIsModalOpen]);
    const handleUpdateCoupon = useCallback(async (id: string, data: Partial<CouponFormData>) => {
        if (!selectedCoupon) return;
        const keyScope = `update:${id}`;
        const idempotencyKey = getKey(keyScope, data);
        await mutate(() => couponsApi.updateCoupon(id, data, idempotencyKey), {
            toastId: `superadmin-coupon-update-${id}`,
            onError: (error) => { applySuperadminBillingCouponsManagementFormApiErrors(error, form.setError, ['code', 'discountType', 'discountValue', 'maxUses', 'expiryDate']); },
            onSuccess: () => {
                clearKey(keyScope);
                setIsEditModalOpen(false);
                setSelectedCoupon(null);
            },
        });
    }, [selectedCoupon, mutate, setIsEditModalOpen, setSelectedCoupon, form]);
    const handleDeleteCoupon = useCallback(async (id: string) => {
        const keyScope = `delete:${id}`;
        const idempotencyKey = getKey(keyScope, { id, action: keyScope });
        await mutate(() => couponsApi.deleteCoupon(id, idempotencyKey), {
            toastId: `superadmin-coupon-delete-${id}`,
            onSuccess: () => { clearKey(keyScope); },
        });
    }, [mutate]);
    const handleToggleRestore = useCallback(async (id: string) => {
        const keyScope = `restore:${id}`;
        const idempotencyKey = getKey(keyScope, { id, action: 'restore' });
        await mutate(() => couponsApi.restoreCoupon(id, idempotencyKey), {
            toastId: `superadmin-coupon-restore-${id}`,
            onSuccess: () => { clearKey(keyScope); },
        });
    }, [mutate]);
    const handleToggleStatus = useCallback(async (id: string, currentStatus: CouponStatus) => {
        if (currentStatus !== SUPERADMIN_COUPON_STATUS_CODES.ACTIVE && currentStatus !== SUPERADMIN_COUPON_STATUS_CODES.INACTIVE) return;
        const newStatus: CouponStatus = currentStatus === SUPERADMIN_COUPON_STATUS_CODES.ACTIVE ? SUPERADMIN_COUPON_STATUS_CODES.INACTIVE : SUPERADMIN_COUPON_STATUS_CODES.ACTIVE;
        const keyScope = `status:${id}`;
        const idempotencyKey = getKey(keyScope, { id, status: newStatus });
        await mutate(() => couponsApi.updateCouponStatus(id, newStatus, idempotencyKey), {
            toastId: `superadmin-coupon-status-${id}`,
            onSuccess: () => { clearKey(keyScope); },
        });
    }, [mutate]);
    return {
        isMutating,
        handleCreateCoupon,
        handleUpdateCoupon,
        handleDeleteCoupon,
        handleToggleRestore,
        handleToggleStatus,
    };
}
