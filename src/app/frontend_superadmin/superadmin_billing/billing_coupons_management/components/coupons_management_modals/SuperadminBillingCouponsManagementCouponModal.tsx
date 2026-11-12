// RESPONSIBILITY: Renders the Create Coupon modal form. Receives form state via props from useCouponsPage. No API calls.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminBillingCouponsCouponModal owned by the superadmin_coupons feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useRef, useSuperadminBillingCouponsManagementDialogFocus, useTranslations.
 * MODULE DEPENDENCIES: react, lucide-react, next-intl, react-hook-form, @/components/ui/SearchableDropdown, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/constants/superadmin_billing_coupons_management.constants, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/utils/SuperadminBillingCouponsManagementDateUtils, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/hooks/useSuperadminBillingCouponsManagementDialogFocus, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/types/superadmin_billing_coupons_management_coupon_modal.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import React, { useRef } from 'react';

import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';

import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

import { SUPERADMIN_COUPON_DISCOUNT_TYPE_OPTIONS } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/constants/superadmin_billing_coupons_management.constants';
import { useSuperadminBillingCouponsManagementDialogFocus } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/hooks/useSuperadminBillingCouponsManagementDialogFocus';
import { getSuperadminBillingCouponsTodayISODate } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/utils/SuperadminBillingCouponsManagementDateUtils';

import type { SuperadminBillingCouponsCouponModalProps } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/types/superadmin_billing_coupons_management_coupon_modal.types';


/** @description Renders the create/edit coupon modal shell and field composition. @dependencies Consumes React Hook Form state and the owning module submit callback. @edge-case Does not reset or close until the owning mutation reports success. */
export const SuperadminBillingCouponsCouponModal: React.FC<SuperadminBillingCouponsCouponModalProps> = ({ isOpen, onClose, form, onSubmit, isSubmitting = false, }) => {
  const t = useTranslations('superadmin_coupons');
    const todayIsoDate = getSuperadminBillingCouponsTodayISODate();
    const dialogRef = useRef<HTMLDivElement>(null);
    useSuperadminBillingCouponsManagementDialogFocus(isOpen, dialogRef, onClose);
    if (!isOpen)
        return null;
    return (<div ref={dialogRef} tabIndex={-1} aria-labelledby="superadmin-coupons-create-title" className="fixed inset-0 bg-overlay z-40 flex items-center justify-center overflow-y-auto p-4 backdrop-blur-sm" role="dialog" aria-modal="true" data-testid="superadmin_coupons-coupon-modal-dialog">
      <div className="bg-overlay border border-border rounded-xl w-full max-w-md shadow-dialog my-auto max-h-dialog-desktop flex flex-col">
        <div className="flex shrink-0 items-center justify-between px-7 py-5 border-b border-border">
          <h2 id="superadmin-coupons-create-title" className="text-lg font-bold text-primary">{t('ui.create_global_coupon_53ce473c')}</h2>
          <button type="button" aria-label={t('ui.close_create_coupon')} onClick={onClose} className="min-h-11 min-w-11 flex items-center justify-center rounded-md text-secondary hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_coupons-superadmin-coupons-coupon-modal-superadmin-coupon-modal-button">
            <X size={18}/>
          </button>
        </div>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="min-h-0 flex-1 flex flex-col" data-testid="superadmin_coupons-superadmincouponscouponmodal-form-1">
          <div className="min-h-0 flex-1 overflow-y-auto custom-scrollbar p-7 space-y-5">
            {form.formState.errors.root?.server?.message ? <p role="alert" className="rounded-md border border-danger bg-danger-bg p-3 text-sm text-danger">{String(form.formState.errors.root.server.message)}</p> : null}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="superadmin-coupon-create-code" className="text-sm font-bold text-secondary">{t('ui.coupon_code_9d463ea3')}<span className="text-disabled font-normal ms-1">{t('ui.optional_d9e6f344')}</span></label>
              <input id="superadmin-coupon-create-code" aria-invalid={Boolean(form.formState.errors.code)} aria-describedby="superadmin-coupon-create-code-error" {...form.register('code', {
          onChange: (e) => {
              e.target.value = e.target.value.toUpperCase();
          }
      })} className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary font-mono uppercase focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-colors min-h-11" placeholder={t('ui.leave_blank_to_auto_generate_36c44533')} data-testid="superadmin_coupons-superadmin-coupons-coupon-modal-superadmin-coupon-modal-input"/>
              {form.formState.errors.code && <span id="superadmin-coupon-create-code-error" className="text-xs text-danger" role="alert">{form.formState.errors.code.message}</span>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label id="superadmin-coupon-create-discount-type-label" className="text-sm font-bold text-secondary">{t('ui.discount_type_f908785b')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
                <Controller name="discountType" control={form.control} render={({ field }) => (<SearchableDropdown value={field.value || ''} onChange={field.onChange} options={SUPERADMIN_COUPON_DISCOUNT_TYPE_OPTIONS.map((option) => ({ label: t(option.labelKey), value: option.value }))} aria-label={t('ui.discount_type_f908785b')} aria-invalid={Boolean(form.formState.errors.discountType)} aria-describedby={form.formState.errors.discountType ? 'superadmin-coupon-create-discount-type-error' : undefined} data-testid="superadmin_coupons-coupon-modal-discount-type"/>)}/>
                {form.formState.errors.discountType && <span id="superadmin-coupon-create-discount-type-error" className="text-xs text-danger" role="alert">{form.formState.errors.discountType.message}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="superadmin-coupon-create-discount-value" className="text-sm font-bold text-secondary">
                  {form.watch('discountType') === 'PERCENTAGE' ? t('ui.discount_percent_3a7d1c2e') : t('ui.discount_amount_5b9e2d4f')} <span className="text-danger">{t('ui.text_3389dae3')}</span>
                </label>
                <div className="relative">
                  {form.watch('discountType') === 'EXACT' && (<span className="absolute start-4 top-1/2 -translate-y-1/2 text-secondary text-sm font-semibold">{t('ui.rs_af69e868')}</span>)}
                  <input id="superadmin-coupon-create-discount-value" aria-invalid={Boolean(form.formState.errors.discountValue)} aria-describedby="superadmin-coupon-create-discount-value-error" type="number" onKeyDown={(e) => { if (e.key === '-' || e.key === 'e' || e.key === '+')
          e.preventDefault(); }} min="0.01" step={form.watch('discountType') === 'PERCENTAGE' ? 1 : 0.01} max={form.watch('discountType') === 'PERCENTAGE' ? 100 : undefined} {...form.register('discountValue', { valueAsNumber: true })} className={`w-full ${form.watch('discountType') === 'EXACT' ? 'ps-9 pe-4' : 'px-4'} py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-colors min-h-11`} placeholder={form.watch('discountType') === 'PERCENTAGE' ? '25' : '500'} data-testid="superadmin_coupons-superadmin-coupons-coupon-modal-superadmin-coupon-modal-number"/>
                </div>
                {form.formState.errors.discountValue && <span id="superadmin-coupon-create-discount-value-error" className="text-xs text-danger" role="alert">{form.formState.errors.discountValue.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="superadmin-coupon-create-max-uses" className="text-sm font-bold text-secondary">{t('ui.max_uses_eed40cb4')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
                <input id="superadmin-coupon-create-max-uses" aria-invalid={Boolean(form.formState.errors.maxUses)} aria-describedby="superadmin-coupon-create-max-uses-error" type="number" onKeyDown={(e) => { if (e.key === '-' || e.key === 'e' || e.key === '+')
          e.preventDefault(); }} min="1" step="1" {...form.register('maxUses', { valueAsNumber: true })} className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-colors min-h-11" placeholder={t('ui.100_f899139d')} data-testid="superadmin_coupons-superadmin-coupons-coupon-modal-coupon-modal-number-2"/>
                {form.formState.errors.maxUses && <span id="superadmin-coupon-create-max-uses-error" className="text-xs text-danger" role="alert">{form.formState.errors.maxUses.message}</span>}
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label htmlFor="superadmin-coupon-create-expiry-date" className="text-sm font-bold text-secondary">{t('ui.expiry_date_5abc7a3a')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
                <input id="superadmin-coupon-create-expiry-date" aria-invalid={Boolean(form.formState.errors.expiryDate)} aria-describedby="superadmin-coupon-create-expiry-date-error" type="date" min={todayIsoDate} {...form.register('expiryDate')} className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-colors min-h-11" data-testid="superadmin_coupons-superadmin-coupons-coupon-modal-superadmin-coupon-modal-date"/>
                {form.formState.errors.expiryDate && <span id="superadmin-coupon-create-expiry-date-error" className="text-xs text-danger" role="alert">{form.formState.errors.expiryDate.message}</span>}
              </div>
            </div>
          </div>

          <div className="flex shrink-0 justify-end gap-3 p-5 border-t border-border">
            <button type="button" onClick={onClose} className="px-5 py-2.5 bg-transparent border border-border hover:bg-surface-highlight text-primary font-medium rounded-lg motion-safe:transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11" data-testid="superadmin_coupons-superadmin-coupons-coupon-modal-superadmin-coupon-modal-cancel">
              {t('ui.cancel_ea478870')}</button>
            <button type="submit" disabled={isSubmitting} aria-busy={isSubmitting} className="min-w-36 px-5 py-2.5 bg-primary hover:bg-primary-hover text-on-primary font-medium rounded-lg motion-safe:transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11" data-testid="superadmin_coupons-superadmin-coupons-coupon-modal-coupon-modal-create-coupon">
              {isSubmitting ? t('ui.saving_coupon') : t('ui.create_coupon_90e43665')}</button>
          </div>
        </form>
      </div>
    </div>);
};
