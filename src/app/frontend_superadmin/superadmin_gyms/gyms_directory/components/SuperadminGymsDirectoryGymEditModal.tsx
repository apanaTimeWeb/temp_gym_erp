// RESPONSIBILITY: Renders/orchestrates SuperadminGymsGymEditModal within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminGymsGymEditModal owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: useState
 * MODULE DEPENDENCIES: react, lucide-react, next-intl, react-hook-form, @/components/ui/SearchableDropdown, @/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryGymEditModal, @/app/frontend_superadmin/superadmin_gyms/gyms_directory/utils/SuperadminGymsDirectoryFormatCurrency, @/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryDialogA11y
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the modal UI for editing Gym details. Purely a view component.
import React, { useState } from 'react';

import { X, Eye, EyeOff } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';

import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

import { useSuperadminGymsDirectoryDialogA11y } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryDialogA11y';
import { useSuperadminGymsDirectoryGymEditModal } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryGymEditModal';
import { formatCurrency as SuperadminGymsFormatCurrency } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/utils/SuperadminGymsDirectoryFormatCurrency';


/**
 * @description Owns the SuperadminGymsGymEditModal responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminGymsDirectoryGymEditModal() {
  const t = useTranslations('superadmin_gyms');
  const validationMessage = (message?: string) => {
    switch (message) {
      case 'validation.gymNameRequired': return t('validation.gymNameRequired');
      case 'validation.ownerNameRequired': return t('validation.ownerNameRequired');
      case 'validation.invalidEmail': return t('validation.invalidEmail');
      case 'validation.phoneMin': return t('validation.phoneMin');
      case 'validation.passwordMin': return t('validation.passwordMin');
      case 'validation.planRequired': return t('validation.planRequired');
      default: return t('validation.invalidField');
    }
  };
    const locale = useLocale();

    const { isEditModalOpen, closeEditModal, selectedGym, plans, loadingPlans, plansError, retryPlans, register, handleSubmit, onSubmit, control, errors, isSubmitting, } = useSuperadminGymsDirectoryGymEditModal();
    const dialogRef = useSuperadminGymsDirectoryDialogA11y(isEditModalOpen, closeEditModal);
    const [showPassword, setShowPassword] = React.useState(false);
    if (!isEditModalOpen || !selectedGym)
        return null;
    return (<div ref={dialogRef} tabIndex={-1} className="fixed inset-0 z-40 flex items-center justify-center bg-overlay p-4" role="dialog" aria-modal="true" aria-labelledby="superadmin-gyms-edit-dialog-title" data-testid="superadmin_gyms-gym-edit-modal-dialog">
      <div className="bg-overlay rounded-xl p-7 max-w-md w-full border border-border shadow-dialog relative">
        <button type="button" onClick={closeEditModal} aria-label={t('ui.close_dialog')} className="absolute top-5 end-5 min-h-11 min-w-11 text-secondary hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_gyms-superadmin-gyms-gym-edit-modal-gym-edit-modal-button">
          <X size={18}/>
        </button>

        <h2 id="superadmin-gyms-edit-dialog-title" className="text-lg font-bold text-primary mb-1">{t('ui.edit_gym_details_13d512aa')}</h2>
        <p className="text-sm text-secondary mb-6">{t('ui.update_the_information_for_527d24e4')}{selectedGym.name}{t('ui.text_5058f1af')}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" data-testid="superadmin_gyms-superadmingymsgymeditmodal-form-1">
          {errors.root?.server?.message ? <p role="alert" className="rounded-md border border-danger bg-danger-bg p-3 text-sm text-danger">{String(errors.root.server.message)}</p> : null}
          <div>
            <label htmlFor="superadmin-gyms-edit-name" className="block text-sm font-bold text-secondary mb-1">{t('ui.gym_name_4ad76c40')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
            <input type="text" {...register('name')} id="superadmin-gyms-edit-name" data-dialog-initial-focus="true" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'superadmin-gyms-edit-name-error' : undefined} className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-primary focus:border-focus focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors min-h-11" data-testid="superadmin_gyms-superadmin-gyms-gym-edit-modal-gym-edit-modal-text"/>
            {errors.name && <p id="superadmin-gyms-edit-name-error" role="alert" className="text-xs text-danger mt-1">{validationMessage(errors.name.message)}</p>}
          </div>

          <div>
            <label htmlFor="superadmin-gyms-edit-owner-name" className="block text-sm font-bold text-secondary mb-1">{t('ui.owner_name_b7dbf209')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
            <input type="text" {...register('ownerName')} id="superadmin-gyms-edit-owner-name" aria-invalid={Boolean(errors.ownerName)} aria-describedby={errors.ownerName ? 'superadmin-gyms-edit-owner-name-error' : undefined} className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-primary focus:border-focus focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors min-h-11" data-testid="superadmin_gyms-superadmin-gyms-gym-edit-modal-edit-modal-text-2"/>
            {errors.ownerName && <p id="superadmin-gyms-edit-owner-name-error" role="alert" className="text-xs text-danger mt-1">{validationMessage(errors.ownerName.message)}</p>}
          </div>

          <div>
            <label htmlFor="superadmin-gyms-edit-admin-email" className="block text-sm font-bold text-secondary mb-1">{t('ui.admin_email_214e3596')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
            <input type="email" {...register('adminEmail')} id="superadmin-gyms-edit-admin-email" aria-invalid={Boolean(errors.adminEmail)} aria-describedby={errors.adminEmail ? 'superadmin-gyms-edit-admin-email-error' : undefined} className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-primary focus:border-focus focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors min-h-11" data-testid="superadmin_gyms-superadmin-gyms-gym-edit-modal-gym-edit-modal-email"/>
            {errors.adminEmail && <p id="superadmin-gyms-edit-admin-email-error" role="alert" className="text-xs text-danger mt-1">{validationMessage(errors.adminEmail.message)}</p>}
          </div>

          <div>
            <label htmlFor="superadmin-gyms-edit-phone" className="block text-sm font-bold text-secondary mb-1">{t('ui.phone_number_1e4dbc7e')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
            <input type="text" {...register('phone')} id="superadmin-gyms-edit-phone" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'superadmin-gyms-edit-phone-error' : undefined} className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-primary focus:border-focus focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors min-h-11" placeholder={t('ui.1_555_0000_3686f4d1')} data-testid="superadmin_gyms-superadmin-gyms-gym-edit-modal-edit-modal-text-3"/>
            {errors.phone && <p id="superadmin-gyms-edit-phone-error" role="alert" className="text-xs text-danger mt-1">{validationMessage(errors.phone.message)}</p>}
          </div>

          <div>
            <label htmlFor="superadmin-gyms-edit-temporary-password" className="block text-sm font-bold text-secondary mb-1">{t('ui.reset_password_6072e83b')}<span className="font-normal">{t('ui.optional_d9e6f344')}</span></label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} {...register('temporaryPassword')} id="superadmin-gyms-edit-temporary-password" aria-invalid={Boolean(errors.temporaryPassword)} aria-describedby={errors.temporaryPassword ? 'superadmin-gyms-edit-temporary-password-error' : undefined} className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-primary focus:border-focus focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors pe-10 min-h-11" placeholder={t('ui.leave_blank_to_keep_current_3d206d04')} data-testid="superadmin_gyms-superadmin-gyms-gym-edit-modal-gym-edit-modal-input"/>
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute end-3 top-1/2 -translate-y-1/2 min-h-11 min-w-11 text-secondary hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-label={t('ui.toggle_password_visibility_60e1b286')} data-testid="superadmin_gyms-superadmin-gyms-gym-edit-modal-modal-toggle-password-visibility">
                {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>
            </div>
            {errors.temporaryPassword && <p id="superadmin-gyms-edit-temporary-password-error" role="alert" className="text-xs text-danger mt-1">{validationMessage(errors.temporaryPassword.message)}</p>}
          </div>

          <div>
            <label id="superadmin-gyms-edit-plan-label" className="block text-sm font-bold text-secondary mb-1">{t('ui.subscription_plan_90fe0789')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
            <Controller name="plan" control={control} render={({ field }) => (<SearchableDropdown value={field.value || ''} onChange={field.onChange} aria-labelledby="superadmin-gyms-edit-plan-label" aria-invalid={Boolean(errors.plan)} aria-describedby={errors.plan ? 'superadmin-gyms-edit-plan-error' : undefined} options={plans ? plans.map((p) => ({ label: `${p.name} (${SuperadminGymsFormatCurrency(Number(p.priceMonthly), p.currency || 'INR', locale)}/mo)`, value: p.name })) : []} disabled={loadingPlans} placeholder={loadingPlans ? t('ui.loading_plans') : t('ui.select_plan')} data-testid="superadmin_gyms-gym-edit-modal-plan-dropdown"/>)}/>
            {errors.plan && <p id="superadmin-gyms-edit-plan-error" role="alert" className="text-xs text-danger mt-1">{validationMessage(errors.plan.message)}</p>}
            {plansError && <div role="alert" className="mt-2 flex items-center gap-2 text-xs text-danger"><span>{t('ui.failed_to_load_view_f0191174')}</span><button type="button" onClick={() => void retryPlans()} className="min-h-11 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t('ui.retry_6327b4e5')}</button></div>}
          </div>

          <div className="flex justify-end gap-3 pt-4 mt-6">
            <button type="button" onClick={closeEditModal} className="min-h-11 px-5 py-2.5 rounded-lg text-sm font-medium text-primary border border-border hover:bg-page motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" disabled={isSubmitting} data-testid="superadmin_gyms-superadmin-gyms-gym-edit-modal-gym-edit-modal-cancel">
              {t('ui.cancel_ea478870')}</button>
            <button type="submit" className="min-h-11 px-5 py-2.5 rounded-lg text-sm font-medium text-on-primary bg-primary hover:bg-primary-hover motion-safe:transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" disabled={isSubmitting} data-testid="superadmin_gyms-superadmin-gyms-gym-edit-modal-gym-edit-modal-submit">
              {isSubmitting ? t('ui.saving_8e4c1a2d') : t('ui.save_changes_4c7d9b1a')}
            </button>
          </div>
        </form>
      </div>
    </div>);
}
