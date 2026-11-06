// RESPONSIBILITY: Renders/orchestrates SuperadminGymsAddGymForm within its owning Superadmin feature module; no direct backend implementation.
'use client';


import { Save, ArrowLeft, Database, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
// RESPONSIBILITY: Renders and composes SuperadminGymsAddGymForm for the owning feature module; business logic and API transport remain in module-owned hooks/services.
import Link from 'next/link';
import { Controller } from 'react-hook-form';

import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

import { SUPERADMIN_GYMS_DIRECTORY_ROUTES as SUPERADMIN_GYMS_MANAGEMENT_ROUTES } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/config/superadmin_gyms_directory.url_config';
import { useSuperadminGymsDirectoryAddGymForm } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryAddGymForm';
import { formatCurrency as SuperadminGymsFormatCurrency } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/utils/SuperadminGymsDirectoryFormatCurrency';

/**
 * @description Owns the SuperadminGymsAddGymForm responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminGymsDirectoryAddGymForm() {
  const t = useTranslations('superadmin_gyms');
    const locale = useLocale();
    const validationMessage = (message?: string) => {
      switch (message) {
        case 'validation.gymNameMin': return t('validation.gymNameMin');
        case 'validation.ownerNameMin': return t('validation.ownerNameMin');
        case 'validation.ownerNameRequired': return t('validation.ownerNameRequired');
        case 'validation.invalidEmail': return t('validation.invalidEmail');
        case 'validation.phoneMin': return t('validation.phoneMin');
        case 'validation.aadharFormat': return t('validation.aadharFormat');
        case 'validation.planRequired': return t('validation.planRequired');
        case 'validation.passwordMin': return t('validation.passwordMin');
        default: return t('validation.invalidField');
      }
    };

    const { register, handleSubmit, onSubmit, control, errors, isProvisioning, provisioningLogs, showPassword, setShowPassword, plans, loadingPlans, plansError, retryPlans, } = useSuperadminGymsDirectoryAddGymForm();
    return (<div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href={SUPERADMIN_GYMS_MANAGEMENT_ROUTES.VIEW('list')} aria-label={t('ui.back_to_module')} className="min-h-11 min-w-11 p-2 bg-card border border-border rounded-lg text-secondary hover:text-on-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_gyms-superadmin-gyms-add-gym-form-add-gym-form-link">
          <ArrowLeft size={18}/>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-primary">{t('ui.provision_new_gym_eee0a81a')}</h1>
          <p className="text-secondary mt-1">{t('ui.this_will_spin_up_a_completely_isolated_data_007f29ec')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-page border border-border rounded-xl p-6 shadow-card space-y-6" data-testid="superadmin_gyms-superadmingymsaddgymform-form-1">
            {errors.root?.server?.message ? <p role="alert" className="rounded-md border border-danger bg-danger-bg p-3 text-sm text-danger">{String(errors.root.server.message)}</p> : null}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="superadmin-add-gym-gymName" className="text-sm font-bold text-secondary">{t('ui.gym_name_4ad76c40')}</label>
                <input {...register('gymName')} id="superadmin-add-gym-gymName" aria-invalid={Boolean(errors.gymName)} aria-describedby={errors.gymName ? 'superadmin-add-gym-gymName-error' : undefined} className="w-full bg-card border border-border text-primary rounded-lg px-4 py-2 focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-colors min-h-11" placeholder={t('ui.e_g_titan_fitness_5bf0541e')} data-testid="superadmin_gyms-superadmin-gyms-add-gym-form-add-gym-gym-name"/>
                {errors.gymName && <p id="superadmin-add-gym-gymName-error" role="alert" className="text-danger text-xs">{validationMessage(errors.gymName.message)}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="superadmin-add-gym-ownerName" className="text-sm font-bold text-secondary">{t('ui.owner_name_b7dbf209')}</label>
                <input {...register('ownerName')} id="superadmin-add-gym-ownerName" aria-invalid={Boolean(errors.ownerName)} aria-describedby={errors.ownerName ? 'superadmin-add-gym-ownerName-error' : undefined} className="w-full bg-card border border-border text-primary rounded-lg px-4 py-2 focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-colors min-h-11" placeholder={t('ui.e_g_john_doe_d29d6b1a')} data-testid="superadmin_gyms-superadmin-gyms-add-gym-form-add-gym-owner-name"/>
                {errors.ownerName && <p id="superadmin-add-gym-ownerName-error" role="alert" className="text-danger text-xs">{validationMessage(errors.ownerName.message)}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="superadmin-add-gym-adminEmail" className="text-sm font-bold text-secondary">{t('ui.admin_email_214e3596')}</label>
                <input type="email" {...register('adminEmail')} id="superadmin-add-gym-adminEmail" aria-invalid={Boolean(errors.adminEmail)} aria-describedby={errors.adminEmail ? 'superadmin-add-gym-adminEmail-error' : undefined} className="w-full bg-card border border-border text-primary rounded-lg px-4 py-2 focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-colors min-h-11" placeholder={t('ui.admin_titanfitness_com_2d38d2d8')} data-testid="superadmin_gyms-superadmin-gyms-add-gym-form-add-gym-admin-email"/>
                {errors.adminEmail && <p id="superadmin-add-gym-adminEmail-error" role="alert" className="text-danger text-xs">{validationMessage(errors.adminEmail.message)}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="superadmin-add-gym-phone" className="text-sm font-bold text-secondary">{t('ui.phone_number_1e4dbc7e')}</label>
                <input {...register('phone')} id="superadmin-add-gym-phone" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'superadmin-add-gym-phone-error' : undefined} className="w-full bg-card border border-border text-primary rounded-lg px-4 py-2 focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-colors min-h-11" placeholder={t('ui.1_555_0000_3686f4d1')} data-testid="superadmin_gyms-superadmin-gyms-add-gym-form-superadmin-add-gym-phone"/>
                {errors.phone && <p id="superadmin-add-gym-phone-error" role="alert" className="text-danger text-xs">{validationMessage(errors.phone.message)}</p>}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="superadmin-add-gym-aadharNumber" className="text-sm font-bold text-secondary">{t('ui.aadhar_number_fcc90631')}</label>
                <input {...register('aadharNumber')} id="superadmin-add-gym-aadharNumber" aria-invalid={Boolean(errors.aadharNumber)} aria-describedby={errors.aadharNumber ? 'superadmin-add-gym-aadharNumber-error' : undefined} className="w-full bg-card border border-border text-primary rounded-lg px-4 py-2 focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-colors min-h-11" placeholder={t('ui.12_digit_aadhar_number_1980ceb4')} maxLength={12} inputMode="numeric" onKeyDown={(e) => {
                  if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return;
                  if (!/^[0-9]$/.test(e.key)) e.preventDefault();
                }} data-testid="superadmin_gyms-superadmin-gyms-add-gym-form-add-gym-aadhar-number"/>
                {errors.aadharNumber && <p id="superadmin-add-gym-aadharNumber-error" role="alert" className="text-danger text-xs">{validationMessage(errors.aadharNumber.message)}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="superadmin-add-gym-temporaryPassword" className="text-sm font-bold text-secondary">{t('ui.temporary_password_0afd501f')}</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} {...register('temporaryPassword')} id="superadmin-add-gym-temporaryPassword" aria-invalid={Boolean(errors.temporaryPassword)} aria-describedby={errors.temporaryPassword ? 'superadmin-add-gym-temporaryPassword-error' : undefined} className="w-full bg-card border border-border text-primary rounded-lg px-4 py-2 pe-10 focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-colors min-h-11" placeholder={t('ui.min_8_characters_60f27527')} data-testid="superadmin_gyms-superadmin-gyms-add-gym-form-add-gym-temporary-password"/>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={t(showPassword ? 'ui.hide_password' : 'ui.show_password')} className="absolute end-3 top-1/2 -translate-y-1/2 min-h-11 min-w-11 text-secondary hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_gyms-superadmin-gyms-add-gym-form-add-gym-form-button">
                    {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                  </button>
                </div>
                {errors.temporaryPassword && <p id="superadmin-add-gym-temporaryPassword-error" role="alert" className="text-danger text-xs">{validationMessage(errors.temporaryPassword.message)}</p>}
              </div>

              <div className="space-y-2">
                <label id="superadmin-add-gym-plan-label" className="text-sm font-bold text-secondary">{t('ui.saas_plan_be057644')}</label>
                <div aria-labelledby="superadmin-add-gym-plan-label"><Controller name="plan" control={control} render={({ field }) => (<SearchableDropdown value={field.value || ''} onChange={field.onChange} aria-labelledby="superadmin-add-gym-plan-label" aria-invalid={Boolean(errors.plan)} aria-describedby={errors.plan ? 'superadmin-add-gym-plan-error' : undefined} options={plans ? plans.map((p) => ({ label: `${p.name} (${SuperadminGymsFormatCurrency(Number(p.priceMonthly), p.currency || 'INR', locale)}/mo)`, value: p.id })) : []} disabled={loadingPlans} placeholder={loadingPlans ? t('ui.loading_plans') : t('ui.select_plan')} data-testid="superadmin_gyms-add-gym-form-plan-dropdown"/>)}/></div>
                {errors.plan && <p id="superadmin-add-gym-plan-error" role="alert" className="text-danger text-xs">{validationMessage(errors.plan.message)}</p>}
                {plansError && <div role="alert" className="mt-2 flex items-center gap-2 text-xs text-danger"><span>{t('ui.failed_to_load_view_f0191174')}</span><button type="button" onClick={() => void retryPlans()} className="min-h-11 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t('ui.retry_6327b4e5')}</button></div>}
              </div>
            </div>

            <div className="pt-4 border-t border-border flex justify-end">
              <button type="submit" disabled={isProvisioning} className="flex items-center gap-2 bg-primary hover:bg-primary-hover disabled:bg-primary-subtle text-on-primary px-6 py-2.5 rounded-lg font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11" data-testid="superadmin_gyms-superadmin-gyms-add-gym-form-add-gym-form-submit">
                {isProvisioning ? (<><Loader2 size={18} className="motion-safe:animate-spin"/> {t('ui.provisioning_db_261ea391')}</>) : (<><Save size={18}/> {t('ui.provision_gym_087ad200')}</>)}
              </button>
            </div>
          </form>
        </div>

        {/* Provisioning Console / Status */}
        <div className="bg-page border border-border rounded-xl p-6 shadow-card">
          <div className="flex items-center gap-2 mb-4 text-primary font-bold border-b border-border pb-4">
            <Database size={18} className="text-primary"/>
            {t('ui.provisioning_console_05a04f51')}</div>
          <div className="bg-card rounded-lg p-4 font-mono text-xs text-secondary h-64 overflow-y-auto space-y-2 border border-border">
            {provisioningLogs.length === 0 ? (<p className="text-secondary italic">{t('ui.awaiting_submit_b697b448')}</p>) : (provisioningLogs.map((log, i) => (<p key={`log-${i}-${log.slice(0, 12)}`} className="motion-safe:animate-in motion-safe:fade-in slide-in-from-bottom-1 text-success">
                  <span aria-hidden="true" className="text-secondary me-2">›</span>{log}
                </p>)))}
          </div>
        </div>
      </div>
    </div>);
}

