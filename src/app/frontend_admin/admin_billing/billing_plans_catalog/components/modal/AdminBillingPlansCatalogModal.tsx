"use client";
// RESPONSIBILITY: Renders the modal form for creating or editing a membership plan. Uses React Hook Form + Zod validation.
// DATA FLOW: feature data/state and user input → AdminBillingPlansCatalogModal → accessible UI/events routed to owning hooks (admin_plans/plans_catalog/components/modal/AdminBillingPlansCatalogModal.tsx)

import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { useAdminBillingPlansCatalogDialogAccessibility } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/hooks/useAdminBillingPlansCatalogDialogAccessibility';

import { Controller } from 'react-hook-form';
import { X, Save, Loader2 } from 'lucide-react';
import { AdminNavigationLayoutSearchableDropdown } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/components/searchable_dropdown/AdminBillingPlansCatalogSearchableDropdown';
import { useAdminPlansModalForm } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/hooks/useAdminBillingPlansCatalogModalForm';
import { TIERS } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/constants/admin_billing_plans_catalog.constants';
import type { PlanFormValues } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/types/AdminBillingPlansCatalogTypes';
import type { AdminPlansModalProps } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/types/AdminBillingPlansCatalogModalPropsTypes';

/**
 * AdminBillingPlansCatalogModal renders the admin plans modal UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminBillingPlansCatalogModal: Renders the modal form for creating or editing a membership plan. Uses React Hook Form + Zod validation.
 * @dependencies Consumes AdminNavigationLayoutSearchableDropdown, useAdminPlansModalForm, AdminPlansConstants, AdminPlansTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminBillingPlansCatalogModal({ logic }: AdminPlansModalProps) {
  const t = useTranslations();
  const getValidationMessage = (message: unknown) => typeof message === 'string' && message.startsWith('__i18n:') ? t(message.slice('__i18n:'.length)) : String(message ?? '');

  const { showModal, editId, saving, register, handleSubmit, control, errors, handleClose, savePlan } = useAdminPlansModalForm(logic);
  const dialogRef = useRef<HTMLDivElement>(null);
  useAdminBillingPlansCatalogDialogAccessibility({ isOpen: showModal, containerRef: dialogRef, onClose: handleClose });

  if (!showModal) return null;


  return (
    <div ref={dialogRef} data-admin-dialog="true" role="dialog" aria-modal="true" aria-labelledby="admin-plans-modal-title" tabIndex={-1} className="fixed inset-0 bg-overlay z-40 flex items-center justify-center p-4 overflow-y-auto" data-testid="admin_plans-admin_plans-modal-control">
      <div className="my-auto bg-overlay rounded-2xl shadow-dialog shadow-dialog w-full max-w-md max-h-dialog-desktop overflow-y-auto border border-border">
        <div className="sticky top-0 bg-card px-6 py-4 border-b border-border flex items-center justify-between">
          <h3 id="admin-plans-modal-title" className="text-lg font-bold text-primary">
            {editId ? t('plans.admin_plans_modal.remaining_editPlan') : t('plans.admin_plans_modal.remaining_createNewPlan')}
          </h3>
          <button
            type="button"
            onClick={() => void handleClose()}
            className="min-h-11 min-w-11 p-2 rounded-lg hover:bg-primary-subtle text-secondary motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page ease-in-out motion-safe:active:scale-95"
            aria-label={t('plans.admin_plans_modal.text_70d3a544a3')}
           data-testid="admin_plans-admin_plans-modal-click">
            <X size={18}  strokeWidth={2}/>
          </button>
        </div>
        <form onSubmit={handleSubmit(savePlan)} className="p-6 space-y-4" data-testid="admin_plans-admin_plans-modal-submit">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="admin-plan-name" className="block text-sm font-medium text-secondary mb-1">{t('plans.admin_plans_modal.text_ec0632cbbf')}</label>
              <input
                id="admin-plan-name"
                type="text"
                placeholder={t('plans.admin_plans_modal.text_9911dade32')}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'admin-plan-name-error' : undefined}
                {...register('name')}
                className={`focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary motion-safe:transition-colors ${
                  errors.name ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-primary'
                }`}
               data-testid="admin_plans-admin_plans-modal-control-2"/>
              {errors.name && <p id="admin-plan-name-error" role="alert" className="text-danger text-xs mt-1">{getValidationMessage(errors.name.message)}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1" id="admin-plan-tier-label">{t('plans.admin_plans_modal.text_5bd44ebe63')}</label>
              <Controller
                name="tier"
                control={control}
                render={({ field }) => (
                  <div className={editId ? 'opacity-70 pointer-events-none' : ''}>
                    <AdminNavigationLayoutSearchableDropdown
                      value={field.value || ''}
                      aria-label={t('plans.admin_plans_modal.text_5bd44ebe63')}
                      onChange={field.onChange}
                      options={TIERS.map(t => ({ label: t, value: t }))}
                      placeholder={editId ? t('plans.AdminPlansModal.text_fixedTier') : undefined}
                     testId="admin_plans-admin_plans-modal-change"/>
                  </div>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: t('plans.AdminPlansModal.text_oneMonthPrice'), key: 'price1Month' },
              { label: t('plans.AdminPlansModal.text_threeMonthsPrice'), key: 'price3Month' },
              { label: t('plans.AdminPlansModal.text_sixMonthsPrice'), key: 'price6Month' },
              { label: t('plans.AdminPlansModal.text_twelveMonthsPrice'), key: 'price12Month' },
              { label: t('plans.AdminPlansModal.text_customPricePerDay'), key: 'priceCustom' },
            ].map((f, __testIdIndex82) => (
              <div key={f.key}>
                <label htmlFor={`admin-plan-${f.key}`} className="block text-sm font-medium text-secondary mb-1">{f.label}</label>
                <input
                  id={`admin-plan-${f.key}`}
                  aria-invalid={Boolean(errors[f.key as keyof PlanFormValues])}
                  aria-describedby={errors[f.key as keyof PlanFormValues] ? `admin-plan-${f.key}-error` : undefined}
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder={t('plans.AdminPlansModal.text_zeroPlaceholder')}
                  onKeyDown={(e) => { if (e.key === '-' || e.key === 'e' || e.key === '+') e.preventDefault(); }}
                  {...register(f.key as keyof PlanFormValues)}
                  className={`focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary motion-safe:transition-colors ${
                    errors[f.key as keyof PlanFormValues] ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-primary'
                  }`}
                 data-testid={`admin_plans-admin_plans-modal-control-3-map82-${__testIdIndex82}-1`}/>
                {errors[f.key as keyof PlanFormValues] && (
                  <p id={`admin-plan-${f.key}-error`} className="text-danger text-xs mt-1">{getValidationMessage(errors[f.key as keyof PlanFormValues]?.message)}</p>
                )}
              </div>
            ))}
          </div>
          <div>
            <label htmlFor="admin-plan-features" className="block text-sm font-medium text-secondary mb-1">{t('plans.admin_plans_modal.text_4696ca3454')}</label>
            <textarea
              id="admin-plan-features"
              rows={5}
              aria-invalid={Boolean(errors.features)}
              aria-describedby={errors.features ? 'admin-plan-features-error' : undefined}
              placeholder={t('plans.admin_plans_modal.auto_eeae04113e')}
              {...register('features')}
              className={`focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 resize-none bg-input text-primary motion-safe:transition-colors ${
                errors.features ? 'border-border focus-visible:ring-primary' : 'border-border focus-visible:ring-primary'
              }`}
             data-testid="admin_plans-admin_plans-modal-control-4"/>
            {errors.features && <p id="admin-plan-features-error" role="alert" className="text-danger text-xs mt-1">{getValidationMessage(errors.features.message)}</p>}
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => void handleClose()}
              className="flex-1 py-2.5 border border-border rounded-xl text-sm font-medium text-primary hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page ease-in-out min-h-11 min-w-11"
             data-testid="admin_plans-admin_plans-modal-click-2">
              {t('plans.admin_plans_modal.text_77dfd2135f')}</button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold text-on-primary bg-primary hover:bg-primary-hover flex items-center justify-center gap-2 disabled:opacity-70 motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11"
             data-testid="admin_plans-admin_plans-modal-submit-2">
              {saving
                ? <Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin motion-safe:duration-base"/>
                : <><Save size={18}  strokeWidth={2}/>{editId ? t('plans.admin_plans_modal.auto_2e26fa2246') : t('plans.admin_plans_modal.remaining_createPlan')}</>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
