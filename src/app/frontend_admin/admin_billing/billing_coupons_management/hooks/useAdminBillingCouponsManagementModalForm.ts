"use client";
// RESPONSIBILITY: Owns React Hook Form state, validation lifecycle, unsaved-change protection, and gym selection for AdminCouponsModal.
// DATA FLOW: Feature draft → React Hook Form → Zod validation → AdminCouponsLogic mutation → TanStack Query invalidation.

/**
 * @description useAdminCouponsModalForm owns coupon modal form state, validation, and submit orchestration.
 * @dependencies Consumes only the owning module form/schema/mutation contract.
 * @edge-case Preserves validation, cancel, and failed-submit recovery without leaking business state.
 */

import { useCallback, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAdminCouponsLogic } from '@/app/frontend_admin/admin_billing/billing_coupons_management/hooks/useAdminBillingCouponsManagementLogic';
import { useAdminBillingCouponsManagementUnsavedChangesGuard } from '@/app/frontend_admin/admin_billing/billing_coupons_management/hooks/useAdminBillingCouponsManagementUnsavedChangesGuard';
import { couponFormSchema } from '@/app/frontend_admin/admin_billing/billing_coupons_management/schemas/AdminBillingCouponsManagementSchemas';
import type { CouponFormValues } from '@/app/frontend_admin/admin_billing/billing_coupons_management/types/AdminBillingCouponsManagementTypes';
import { applyAdminBillingCouponsManagementApiValidationErrors } from '@/app/frontend_admin/admin_billing/billing_coupons_management/utils/AdminBillingCouponsManagementApiResponse';

/** Owns the coupon modal form lifecycle and exposes gym-selection state to the view. */
export function useAdminCouponsModalForm() {
  const { showModal, setShowModal, editId, form: storeForm, saveCoupon, saving, clearIntentKey } = useAdminCouponsLogic();
  const form = useForm<CouponFormValues>({ resolver: zodResolver(couponFormSchema), defaultValues: storeForm });
  const { register, handleSubmit, reset, setValue, control, formState: { errors, isDirty } } = form;
  const { confirmDiscardIfDirty } = useAdminBillingCouponsManagementUnsavedChangesGuard(isDirty);

  // EFFECT: Rehydrates create/edit values whenever the modal opens or the selected record changes.
  useEffect(() => {
    if (showModal) reset(storeForm);
  }, [reset, showModal, storeForm]);

  const formValues = useWatch({ control });
  const selectedGyms = formValues.assignedGyms ?? storeForm.assignedGyms ?? [];

  const toggleGym = useCallback((value: string) => {
    if (value === 'all') {
      setValue('assignedGyms', ['all'], { shouldDirty: true });
      return;
    }
    const current = selectedGyms.filter((gym) => gym !== 'all');
    const next = current.includes(value) ? current.filter((gym) => gym !== value) : [...current, value];
    setValue('assignedGyms', next.length ? next : ['all'], { shouldDirty: true });
  }, [selectedGyms, setValue]);

  const handleClose = useCallback(async () => {
    if (!(await confirmDiscardIfDirty())) return;
    // Preserve an idempotency key while a mutation is pending/uncertain; clear it only on confirmed abandonment.
    if (!saving) clearIntentKey(editId ? `update-coupon:${editId}` : 'create-coupon');
    setShowModal(false);
  }, [clearIntentKey, confirmDiscardIfDirty, editId, saving, setShowModal]);

  const saveCouponWithValidation = useCallback((data: CouponFormValues) => {
    return saveCoupon(data, (error) => { applyAdminBillingCouponsManagementApiValidationErrors(error, form.getValues(), form.setError); });
  }, [form.getValues, form.setError, saveCoupon]);

  return { showModal, editId, saving, register, handleSubmit, control, errors, selectedGyms, toggleGym, handleClose, saveCoupon: saveCouponWithValidation };
}
