"use client";
// RESPONSIBILITY: Renders the create/edit coupon modal with full form validation via React Hook Form + Zod.
// DATA FLOW: feature data/state and user input → AdminBillingCouponsManagementModal → accessible UI/events routed to owning hooks (admin_coupons/coupons_management/components/modal/AdminBillingCouponsManagementModal.tsx)

import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { Loader2, X } from 'lucide-react';
import { useAdminBillingCouponsManagementDialogAccessibility } from '@/app/frontend_admin/admin_billing/billing_coupons_management/hooks/useAdminBillingCouponsManagementDialogAccessibility';
import { useAdminCouponsModalForm } from '@/app/frontend_admin/admin_billing/billing_coupons_management/hooks/useAdminBillingCouponsManagementModalForm';
import { COUPON_TYPE_OPTIONS, GYM_OPTIONS } from '@/app/frontend_admin/admin_billing/billing_coupons_management/constants/AdminBillingCouponsManagementConstants';

/**
 * AdminBillingCouponsManagementModal renders the admin coupons modal UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminBillingCouponsManagementModal: Renders the create/edit coupon modal with full form validation via React Hook Form + Zod.
 * @dependencies Consumes useAdminCouponsModalForm, AdminCouponsConstants.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminBillingCouponsManagementModal() {
  const t = useTranslations();
  const getValidationMessage = (message: unknown) => typeof message === 'string' && message.startsWith('__i18n:') ? t(message.slice(7)) : String(message ?? '');

  const { showModal, editId, saving, register, handleSubmit, errors, selectedGyms, toggleGym, handleClose, saveCoupon } = useAdminCouponsModalForm();
  const dialogRef = useRef<HTMLDivElement>(null);
  useAdminBillingCouponsManagementDialogAccessibility({ isOpen: showModal, containerRef: dialogRef, onClose: handleClose });

  if (!showModal) return null;


  return (
    <div ref={dialogRef} data-admin-dialog="true" role="dialog" aria-modal="true" aria-labelledby="admin-coupons-dialog-title" tabIndex={-1} className="fixed inset-0 z-40 flex items-center justify-center p-4 overflow-y-auto" data-testid="admin_coupons-admin_coupons-modal-control">
      <div className="absolute inset-0 bg-overlay backdrop-blur-sm" onClick={() => void handleClose()}  data-testid="admin_coupons-admin_coupons-modal-click"/>
      <div className="relative my-auto bg-overlay border border-border rounded-2xl shadow-dialog w-full max-w-md max-h-dialog-desktop overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-overlay z-10">
          <h2 id="admin-coupons-dialog-title" className="text-lg font-bold text-primary">{editId ? t('coupons.admin_coupons_modal.auto_f637f1087c') : t('coupons.admin_coupons_modal.auto_1ef60f7612')}</h2>
          <button type="button" onClick={() => void handleClose()} className="min-h-11 min-w-11 p-1.5 rounded-lg hover:bg-input text-secondary hover:text-primary motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95" aria-label={t('coupons.admin_coupons_modal.text_70d3a544a3')} data-testid="admin_coupons-admin_coupons-modal-click-2">
            <X size={18}  strokeWidth={2}/>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(saveCoupon)} className="p-6 space-y-4" data-testid="admin_coupons-admin_coupons-modal-submit">
          {/* Code */}
          <div>
            <label htmlFor="admin-coupon-code" className="block text-sm font-medium text-secondary mb-1">{t('coupons.admin_coupons_modal.text_0938f3dd7b')}<span className="text-danger">*</span></label>
              <input id="admin-coupon-code" aria-invalid={Boolean(errors.code)} aria-describedby={errors.code ? "admin-coupon-code-error" : undefined} {...register('code')} placeholder={t('coupons.admin_coupons_modal.text_fd6fb2dc5e')} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-primary uppercase placeholder:normal-case placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"  data-testid="admin_coupons-admin_coupons-modal-control-2"/>
            {errors.code && <p id="admin-coupon-code-error" role="alert" className="text-xs text-danger mt-1">{getValidationMessage(errors.code.message)}</p>}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="admin-coupon-description" className="block text-sm font-medium text-secondary mb-1">{t('coupons.admin_coupons_modal.text_55f8ebc805')}<span className="text-danger">*</span></label>
              <input id="admin-coupon-description" aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? "admin-coupon-description-error" : undefined} {...register('description')} placeholder={t('coupons.admin_coupons_modal.text_6c1c764659')} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"  data-testid="admin_coupons-admin_coupons-modal-control-3"/>
            {errors.description && <p id="admin-coupon-description-error" role="alert" className="text-xs text-danger mt-1">{getValidationMessage(errors.description.message)}</p>}
          </div>

          {/* Type + Value */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="admin-coupon-type" className="block text-sm font-medium text-secondary mb-1">{t('coupons.admin_coupons_modal.text_ab547ca1cd')}<span className="text-danger">*</span></label>
              <select id="admin-coupon-type" {...register('type')} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11" data-testid="admin_coupons-admin_coupons-modal-control-4">
                {COUPON_TYPE_OPTIONS.map((o, __testIdIndex57) => <option key={o.value} value={o.value} data-testid={`admin_coupons-admin_coupons-modal-control-5-map57-${__testIdIndex57}-1`}>{t(o.labelKey)}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="admin-coupon-value" className="block text-sm font-medium text-secondary mb-1">{t('coupons.admin_coupons_modal.text_8dce170de2')}<span className="text-danger">*</span></label>
              <input id="admin-coupon-value" aria-invalid={Boolean(errors.value)} aria-describedby={errors.value ? "admin-coupon-value-error" : undefined} {...register('value')} type="number" min="0" step="0.01" onKeyDown={(e) => { if (e.key === '-' || e.key === 'e') e.preventDefault(); }} placeholder={t('coupons.admin_coupons_modal.text_56551a1daa')} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"  data-testid="admin_coupons-admin_coupons-modal-control-6"/>
              {errors.value && <p id="admin-coupon-value-error" role="alert" className="text-xs text-danger mt-1">{getValidationMessage(errors.value.message)}</p>}
            </div>
          </div>

          {/* Min Order + Max Discount */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="admin-coupon-min-order-amount" className="block text-sm font-medium text-secondary mb-1">{t('coupons.admin_coupons_modal.text_6bd88b8a35')}</label>
              <input id="admin-coupon-min-order-amount" {...register('minOrderAmount')} type="number" min="0" step="0.01" onKeyDown={(e) => { if (e.key === '-' || e.key === 'e') e.preventDefault(); }} placeholder={t('coupons.AdminCouponsModal.text_zeroPlaceholder')} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"  data-testid="admin_coupons-admin_coupons-modal-control-7"/>
            </div>
            <div>
              <label htmlFor="admin-coupon-max-discount" className="block text-sm font-medium text-secondary mb-1">{t('coupons.admin_coupons_modal.text_222c927402')}</label>
              <input id="admin-coupon-max-discount" {...register('maxDiscount')} type="number" min="0" step="0.01" onKeyDown={(e) => { if (e.key === '-' || e.key === 'e') e.preventDefault(); }} placeholder={t('coupons.admin_coupons_modal.text_0eb6dbfd2a')} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"  data-testid="admin_coupons-admin_coupons-modal-control-8"/>
            </div>
          </div>

          {/* Usage Limit */}
          <div>
            <label htmlFor="admin-coupon-usage-limit" className="block text-sm font-medium text-secondary mb-1">{t('coupons.admin_coupons_modal.text_b456dc42d2')}<span className="text-danger">*</span></label>
              <input id="admin-coupon-usage-limit" aria-invalid={Boolean(errors.usageLimit)} aria-describedby={errors.usageLimit ? "admin-coupon-usage-limit-error" : undefined} {...register('usageLimit')} type="number" min="1" step="1" onKeyDown={(e) => { if (e.key === '-' || e.key === 'e') e.preventDefault(); }} placeholder={t('coupons.admin_coupons_modal.text_f48d8391a9')} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"  data-testid="admin_coupons-admin_coupons-modal-control-9"/>
            {errors.usageLimit && <p id="admin-coupon-usage-limit-error" role="alert" className="text-xs text-danger mt-1">{getValidationMessage(errors.usageLimit.message)}</p>}
          </div>

          {/* Assign Gyms */}
          <fieldset aria-describedby={errors.assignedGyms ? "admin-coupon-assigned-gyms-error" : undefined} className="min-w-0">
            <legend className="block text-sm font-medium text-secondary mb-2">{t('coupons.admin_coupons_modal.text_85d7edabb6')}<span className="text-danger">*</span></legend>
            <div className="flex flex-wrap gap-2">
              {GYM_OPTIONS.map((opt, __testIdIndex90) => {
                const isSelected = selectedGyms.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => toggleGym(opt.value)}
                    className={`motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page px-3 py-1.5 rounded-lg text-sm font-medium border motion-safe:transition-all ${isSelected ? 'bg-primary-subtle text-primary border-focus' : 'bg-input text-secondary border-border hover:border-focus'}`}
                   data-testid={`admin_coupons-admin_coupons-modal-click-3-map90-${__testIdIndex90}-1`}>
                    {t(opt.labelKey)}
                  </button>
                );
              })}
            </div>
            {errors.assignedGyms && <p id="admin-coupon-assigned-gyms-error" role="alert" className="text-xs text-danger mt-1">{getValidationMessage(errors.assignedGyms.message)}</p>}
          </fieldset>

          {/* Valid From / Until */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="admin-coupon-valid-from" className="block text-sm font-medium text-secondary mb-1">{t('coupons.admin_coupons_modal.text_5366942a24')}<span className="text-danger">*</span></label>
              <input id="admin-coupon-valid-from" aria-invalid={Boolean(errors.validFrom)} aria-describedby={errors.validFrom ? "admin-coupon-valid-from-error" : undefined} {...register('validFrom')} type="date" className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"  data-testid="admin_coupons-admin_coupons-modal-control-10"/>
              {errors.validFrom && <p id="admin-coupon-valid-from-error" role="alert" className="text-xs text-danger mt-1">{getValidationMessage(errors.validFrom.message)}</p>}
            </div>
            <div>
              <label htmlFor="admin-coupon-valid-until" className="block text-sm font-medium text-secondary mb-1">{t('coupons.admin_coupons_modal.text_a144230d85')}<span className="text-danger">*</span></label>
              <input id="admin-coupon-valid-until" aria-invalid={Boolean(errors.validUntil)} aria-describedby={errors.validUntil ? "admin-coupon-valid-until-error" : undefined} {...register('validUntil')} type="date" className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"  data-testid="admin_coupons-admin_coupons-modal-control-11"/>
              {errors.validUntil && <p id="admin-coupon-valid-until-error" role="alert" className="text-xs text-danger mt-1">{getValidationMessage(errors.validUntil.message)}</p>}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-2 border-t border-border">
            <button type="button" onClick={() => void handleClose()} className="px-4 py-2 bg-input border border-border rounded-lg text-sm font-medium text-secondary hover:text-primary motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95" data-testid="admin_coupons-admin_coupons-modal-click-4">
              {t('coupons.admin_coupons_modal.text_77dfd2135f')}</button>
            <button type="submit" disabled={saving} className="px-5 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold hover:bg-primary-hover motion-safe:transition-colors disabled:opacity-60 disabled:cursor-not-allowed motion-safe:active:scale-95 min-w-32 motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11" data-testid="admin_coupons-admin_coupons-modal-submit-2">
              {saving ? <><Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true"  strokeWidth={2}/> {t('coupons.admin_coupons_modal.auto_0741bc9942')}</> : editId ? t('coupons.admin_coupons_modal.auto_69cc82eca6') : t('coupons.admin_coupons_modal.auto_1ef60f7612')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
