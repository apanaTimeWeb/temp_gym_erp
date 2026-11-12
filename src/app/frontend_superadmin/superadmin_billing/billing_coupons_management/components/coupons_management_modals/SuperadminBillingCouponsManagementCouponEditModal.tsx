// RESPONSIBILITY: Renders the Edit Coupon modal form. Manages its own local form state via React Hook Form. No API calls — delegates save to onSubmit prop.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminBillingCouponsCouponEditModal owned by the superadmin_coupons feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: useEffect, useForm
 * MODULE DEPENDENCIES: react, @hookform/resolvers/zod, lucide-react, next-intl, react-hook-form, @/components/ui/SearchableDropdown, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/constants/superadmin_billing_coupons_management.constants, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/schemas/superadmin_billing_coupons_management_contract.schemas, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/utils/SuperadminBillingCouponsManagementDateUtils, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/utils/SuperadminBillingCouponsManagementDiscountValueUtils, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/hooks/useSuperadminBillingCouponsManagementUnsavedChangesGuard, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/hooks/useSuperadminBillingCouponsManagementDialogFocus, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/types/superadmin_billing_coupons_management_coupon_edit_modal.types, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/types/superadmin_billing_coupons_management.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */


import React, { useEffect, useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm, Controller } from 'react-hook-form';

import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

import { SUPERADMIN_COUPON_DISCOUNT_TYPE_OPTIONS } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/constants/superadmin_billing_coupons_management.constants';
import { useSuperadminBillingCouponsManagementDialogFocus } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/hooks/useSuperadminBillingCouponsManagementDialogFocus';
import { useSuperadminBillingCouponsManagementUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/hooks/useSuperadminBillingCouponsManagementUnsavedChangesGuard';
import { createSuperadminBillingCouponsFormSchema } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/schemas/superadmin_billing_coupons_management_contract.schemas';
import { formatSuperadminCouponDateForInput } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/utils/SuperadminBillingCouponsManagementDateUtils';
import { fromSuperadminBillingCouponsMinorUnits } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/utils/SuperadminBillingCouponsManagementDiscountValueUtils';
import { applySuperadminBillingCouponsManagementFormApiErrors } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/utils/SuperadminBillingCouponsManagementFormApiErrors';

import type { SuperadminBillingCouponsCouponEditModalProps } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/types/superadmin_billing_coupons_management_coupon_edit_modal.types';
import type { CouponFormData } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/types/superadmin_billing_coupons_management.types';

/** @description Renders the coupon edit form modal; submission is delegated to the provided form handler. @dependencies Receives validated form state and mutation status through props. @edge-case Keeps entered values intact when submission fails and disables duplicate submission while pending. */
export const SuperadminBillingCouponsCouponEditModal: React.FC<SuperadminBillingCouponsCouponEditModalProps> = ({ isOpen, onClose, onSubmit, coupon, isSubmitting = false, }) => {
  const t = useTranslations('superadmin_coupons');
    const dialogRef = useRef<HTMLDivElement>(null);
    useSuperadminBillingCouponsManagementDialogFocus(isOpen, dialogRef, onClose);
    const { register, handleSubmit, watch, control, setError, formState: { errors, isDirty }, reset } = useForm<CouponFormData>({
        resolver: zodResolver(createSuperadminBillingCouponsFormSchema({
          codeMin: t('validation.code_min'), codeMax: t('validation.code_max'), codeFormat: t('validation.code_format'),
          discountTypeRequired: t('validation.discount_type_required'), discountPositive: t('validation.discount_positive'),
          maxUsesInteger: t('validation.max_uses_integer'), maxUsesMinimum: t('validation.max_uses_minimum'),
          expiryRequired: t('validation.expiry_required'), expiryFuture: t('validation.expiry_future'), percentageMax: t('validation.percentage_max'),
        })),
    });
    useSuperadminBillingCouponsManagementUnsavedChangesGuard(isOpen && isDirty);
    // RESPONSIBILITY: Handle side-effects for SuperadminBillingCouponsCouponEditModal
    // EXPLANATION: Synchronize component state with external dependencies.
    // EFFECT DEPENDENCIES: Documented intentionally.
    // EFFECT INTENT: Synchronize the editable form with the selected record when the modal opens, then let cleanup be handled by React Hook Form.
    useEffect(() => {
        if (isOpen && coupon) {
            reset({
                code: coupon.code,
                discountType: coupon.discountType,
                discountValue: coupon.discountType === 'EXACT' ? fromSuperadminBillingCouponsMinorUnits(coupon.discountValue, coupon.currency || 'INR') : coupon.discountValue,
                maxUses: coupon.maxUses,
                expiryDate: formatSuperadminCouponDateForInput(coupon.expiryDate),
            });
        }
    }, [isOpen, coupon, reset]);
    if (!isOpen || !coupon)
        return null;
    const handleFormSubmit = async (data: CouponFormData) => {
        if (!coupon) return;
        try { await onSubmit(coupon.id, data); }
        catch (error: unknown) { applySuperadminBillingCouponsManagementFormApiErrors(error, setError, ['code', 'discountType', 'discountValue', 'maxUses', 'expiryDate']); }
    };
    return (<div ref={dialogRef} tabIndex={-1} aria-labelledby="superadmin-coupons-edit-title" className="fixed inset-0 bg-overlay z-40 flex items-center justify-center overflow-y-auto p-4 backdrop-blur-sm" role="dialog" aria-modal="true" data-testid="superadmin_coupons-coupon-edit-modal-dialog">
      <div className="bg-overlay border border-border rounded-xl w-full max-w-md shadow-dialog my-auto max-h-dialog-desktop flex flex-col">
        <div className="flex shrink-0 items-center justify-between px-7 py-5 border-b border-border">
          <h2 id="superadmin-coupons-edit-title" className="text-lg font-bold text-primary">{t('ui.edit_coupon_5a092977')}</h2>
          <button type="button" aria-label={t('ui.close_edit_coupon')} onClick={onClose} disabled={isSubmitting} className="min-h-11 min-w-11 flex items-center justify-center rounded-md text-secondary hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_coupons-superadmin-coupons-coupon-edit-modal-coupon-edit-modal-button">
            <X size={18}/>
          </button>
        </div>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="min-h-0 flex-1 flex flex-col" data-testid="superadmin_coupons-superadmincouponscouponeditmodal-form-1">
          <div className="min-h-0 flex-1 overflow-y-auto custom-scrollbar p-7 space-y-5">
            {errors.root?.server?.message ? <p role="alert" className="rounded-md border border-danger bg-danger-bg p-3 text-sm text-danger">{String(errors.root.server.message)}</p> : null}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="superadmin-coupon-edit-code" className="text-sm font-bold text-secondary">{t('ui.coupon_code_9d463ea3')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
              <input id="superadmin-coupon-edit-code" aria-invalid={Boolean(errors.code)} aria-describedby="superadmin-coupon-edit-code-error" {...register('code')} className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary font-mono uppercase focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-colors min-h-11" placeholder={t('ui.e_g_summer2026_47f2cf40')} data-testid="superadmin_coupons-superadmin-coupons-coupon-edit-modal-coupon-edit-modal-input"/>
              {errors.code && <span id="superadmin-coupon-edit-code-error" role="alert" className="text-xs text-danger">{errors.code.message}</span>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label id="superadmin-coupon-edit-discount-type-label" className="text-sm font-bold text-secondary">{t('ui.discount_type_f908785b')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
                <Controller name="discountType" control={control} render={({ field }) => (<SearchableDropdown value={field.value || ''} onChange={field.onChange} options={SUPERADMIN_COUPON_DISCOUNT_TYPE_OPTIONS.map((option) => ({ label: t(option.labelKey), value: option.value }))} aria-label={t('ui.discount_type_f908785b')} aria-invalid={Boolean(errors.discountType)} aria-describedby={errors.discountType ? 'superadmin-coupon-edit-discount-type-error' : undefined} data-testid="superadmin_coupons-coupon-edit-modal-discount-type"/>)}/>
                {errors.discountType && <span id="superadmin-coupon-edit-discount-type-error" role="alert" className="text-xs text-danger">{errors.discountType.message}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="superadmin-coupon-edit-discount-value" className="text-sm font-bold text-secondary">
                  {watch('discountType') === 'PERCENTAGE' ? t('ui.discount_percent_3a7d1c2e') : t('ui.discount_amount_5b9e2d4f')} <span className="text-danger">{t('ui.text_3389dae3')}</span>
                </label>
                <div className="relative">
                  {watch('discountType') === 'EXACT' && (<span className="absolute start-4 top-1/2 -translate-y-1/2 text-secondary text-sm font-semibold">{t('ui.rs_af69e868')}</span>)}
                  <input id="superadmin-coupon-edit-discount-value" aria-invalid={Boolean(errors.discountValue)} aria-describedby="superadmin-coupon-edit-discount-value-error" type="number" onKeyDown={(e) => { if (e.key === '-' || e.key === 'e' || e.key === '+')
          e.preventDefault(); }} min="0.01" step={watch('discountType') === 'PERCENTAGE' ? 1 : 0.01} max={watch('discountType') === 'PERCENTAGE' ? 100 : undefined} {...register('discountValue', { valueAsNumber: true })} className={`w-full ${watch('discountType') === 'EXACT' ? 'ps-9 pe-4' : 'px-4'} py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-colors min-h-11`} placeholder={watch('discountType') === 'PERCENTAGE' ? '25' : '500'} data-testid="superadmin_coupons-superadmin-coupons-coupon-edit-modal-coupon-edit-modal-number"/>
                </div>
                {errors.discountValue && <span id="superadmin-coupon-edit-discount-value-error" role="alert" className="text-xs text-danger">{errors.discountValue.message}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="superadmin-coupon-edit-max-uses" className="text-sm font-bold text-secondary">{t('ui.max_uses_eed40cb4')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
                <input id="superadmin-coupon-edit-max-uses" aria-invalid={Boolean(errors.maxUses)} aria-describedby="superadmin-coupon-edit-max-uses-error" type="number" onKeyDown={(e) => { if (e.key === '-' || e.key === 'e' || e.key === '+')
          e.preventDefault(); }} min="1" step="1" {...register('maxUses', { valueAsNumber: true })} className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-colors min-h-11" placeholder={t('ui.100_f899139d')} data-testid="superadmin_coupons-superadmin-coupons-coupon-edit-modal-edit-modal-number-2"/>
                {errors.maxUses && <span id="superadmin-coupon-edit-max-uses-error" role="alert" className="text-xs text-danger">{errors.maxUses.message}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="superadmin-coupon-edit-expiry-date" className="text-sm font-bold text-secondary">{t('ui.expiry_date_5abc7a3a')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
              <input id="superadmin-coupon-edit-expiry-date" aria-invalid={Boolean(errors.expiryDate)} aria-describedby="superadmin-coupon-edit-expiry-date-error" type="date" {...register('expiryDate')} className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-colors min-h-11" data-testid="superadmin_coupons-superadmin-coupons-coupon-edit-modal-coupon-edit-modal-date"/>
              {errors.expiryDate && <span id="superadmin-coupon-edit-expiry-date-error" role="alert" className="text-xs text-danger">{errors.expiryDate.message}</span>}
            </div>
          </div>

          <div className="flex shrink-0 justify-end gap-3 p-5 border-t border-border">
            <button type="button" onClick={onClose} className="px-5 py-2.5 bg-transparent border border-border hover:bg-surface-highlight text-primary font-medium rounded-lg motion-safe:transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11" data-testid="superadmin_coupons-superadmin-coupons-coupon-edit-modal-coupon-edit-modal-cancel">
              {t('ui.cancel_ea478870')}</button>
            <button type="submit" disabled={isSubmitting} aria-busy={isSubmitting} className="min-w-36 px-5 py-2.5 bg-primary hover:bg-primary-hover text-on-primary font-medium rounded-lg motion-safe:transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11" data-testid="superadmin_coupons-superadmin-coupons-coupon-edit-modal-edit-modal-save-changes">
              {isSubmitting ? t('ui.saving_coupon') : t('ui.save_changes_f5d6040e')}</button>
          </div>
        </form>
      </div>
    </div>);
};
