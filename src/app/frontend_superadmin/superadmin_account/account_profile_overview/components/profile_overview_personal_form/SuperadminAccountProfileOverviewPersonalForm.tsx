// RESPONSIBILITY: Renders/orchestrates SuperadminAccountProfilePersonalForm within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Form for updating the superadmin's personal profile fields.
import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { TIMEZONE_OPTIONS, LANGUAGE_OPTIONS } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/constants/superadmin_account_profile_overview.constants';
import { useSuperadminAccountProfileOverviewUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/hooks/useSuperadminAccountProfileOverviewUnsavedChangesGuard';
import { personalSchema } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/schemas/superadmin_account_profile_overview_personal_form.schemas';
import { applySuperadminAccountProfileOverviewFormApiErrors } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/utils/SuperadminAccountProfileOverviewFormApiErrors';

import type { SuperadminAccountProfilePersonalFormValues, SuperadminAccountProfilePersonalFormProps } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/types/superadmin_account_profile_overview_personal_form.types';


/**
 * @description Form for updating the superadmin's personal profile fields.
 * @dependencies Uses the existing feature-local API, query, state, and approved UI/infrastructure contracts imported by this component.
 * @edge-case Interactive, loading, empty, error, disabled, and repeated-action paths must remain recoverable through the owning feature contract.
 */
export default function SuperadminAccountProfileOverviewPersonalForm({ profile, isSaving, onSave, }: SuperadminAccountProfilePersonalFormProps) {
  const t = useTranslations('superadmin_account_profile');
    const { register, handleSubmit, reset, getValues, setValue, setError, formState: { errors, isDirty, dirtyFields }, } = useForm<SuperadminAccountProfilePersonalFormValues>({
        resolver: zodResolver(personalSchema),
        defaultValues: {
            name: profile.name,
            phone: profile.phone ?? '',
            timezone: profile.timezone ?? 'Asia/Kolkata',
            language: profile.language ?? 'en',
        },
    });
    useSuperadminAccountProfileOverviewUnsavedChangesGuard(isDirty, t('ui.unsaved_profile_changes_leave'));
    // Rule 53: reset when profile prop changes (e.g. after successful save)
    // EXPLANATION: Synchronize component state with external dependencies.
    // EFFECT DEPENDENCIES: Documented intentionally.
    // EFFECT INTENT: Synchronize local UI state with the listed inputs and clean up any browser/resource subscription created by this effect.
    useEffect(() => {
        const nextValues: SuperadminAccountProfilePersonalFormValues = {
            name: profile.name,
            phone: profile.phone ?? '',
            timezone: profile.timezone ?? 'Asia/Kolkata',
            language: profile.language ?? 'en',
        };
        const currentValues = getValues();
        const fields = ['name', 'phone', 'timezone', 'language'] as const;
        const changedDirtyFields = fields.filter((field) => dirtyFields[field] && currentValues[field] !== nextValues[field]);
        // Reset updates the server baseline. Re-apply only dirty values that still differ from that baseline;
        // values confirmed by a successful save become clean instead of remaining permanently dirty.
        reset(nextValues);
        changedDirtyFields.forEach((field) => setValue(field, currentValues[field], { shouldDirty: true }));
    }, [profile, reset, getValues, setValue, dirtyFields]);
    const handleSave = async (values: SuperadminAccountProfilePersonalFormValues) => {
        try { await onSave(values); }
        catch (error: unknown) { applySuperadminAccountProfileOverviewFormApiErrors(error, setError, ['name', 'phone', 'timezone', 'language']); }
    };
    const inputClass = 'min-h-11 w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus:border-focus focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out';
    return (<form onSubmit={handleSubmit(handleSave)} className="space-y-5" data-testid="superadmin_account_profile-superadmin-profile-personal-form-superadminprofilepersonalform-form-submit-1">
      {errors.root?.server?.message ? <p role="alert" className="rounded-md border border-danger bg-danger-bg p-3 text-sm text-danger">{String(errors.root.server.message)}</p> : null}
      <div>
        <label htmlFor="superadmin_account_profile-full-name" className="block text-sm font-medium text-secondary mb-1.5">
          
          {t('ui.full_name_1e99bf3')} <span className="text-danger">{t('ui.text_3389dae3')}</span>
        </label>
        <input id="superadmin_account_profile-full-name" {...register('name')} type="text" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'superadmin_account_profile-full-name-error' : undefined} className={`${inputClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11`} data-testid="superadmin_account_profile-superadmin-profile-personal-form-personal-form-control-1"/>
        {errors.name && (<p className="mt-1 text-xs text-danger" role="alert" id="superadmin_account_profile-full-name-error" data-testid="superadmin_account_profile-superadmin-profile-personal-form-personal-form-alert-1">{t(String(errors.name.message))}</p>)}
      </div>

      <div>
        <label htmlFor="superadmin_account_profile-email" className="block text-sm font-medium text-secondary mb-1.5">{t('ui.email_address_8576ed0')}</label>
        <input id="superadmin_account_profile-email" type="email" value={profile.email} readOnly className={`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page ${inputClass} cursor-not-allowed opacity-60 motion-safe:transition-all motion-safe:duration-base ease-in-out`} data-testid="superadmin_account_profile-superadmin-profile-personal-form-form-control-2-1"/>
        <p className="mt-1 text-xs text-secondary">{t('ui.email_cannot_be_changed_from_this_panel_66751ce')}</p>
      </div>

      <div>
        <label htmlFor="superadmin_account_profile-phone" className="block text-sm font-medium text-secondary mb-1.5">
          
          {t('ui.phone_number_40c5cbd')} <span className="text-danger">{t('ui.text_3389dae3')}</span>
        </label>
        <input id="superadmin_account_profile-phone" {...register('phone')} type="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'superadmin_account_profile-phone-error' : undefined} className={`${inputClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11`} data-testid="superadmin_account_profile-superadmin-profile-personal-form-form-control-3-1"/>
        {errors.phone && (<p className="mt-1 text-xs text-danger" role="alert" id="superadmin_account_profile-phone-error" data-testid="superadmin_account_profile-superadmin-profile-personal-form-form-alert-2-1">{t(String(errors.phone.message))}</p>)}
      </div>

      <div>
        <label htmlFor="superadmin_account_profile-timezone" className="block text-sm font-medium text-secondary mb-1.5">{t('ui.timezone_a1dbd22')}</label>
        <select id="superadmin_account_profile-timezone" {...register('timezone')} className={`${inputClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11`} data-testid="superadmin_account_profile-superadmin-profile-personal-form-form-control-4-1">
          {TIMEZONE_OPTIONS.map((tz) => (<option key={tz} value={tz} data-testid="superadmin_account_profile-superadmin-profile-personal-form-personal-form-action-1">{tz}</option>))}
        </select>
        <p className="mt-1 text-xs text-secondary">{t('ui.used_for_scheduling_and_date_display_across_the__1eec78e')}</p>
      </div>

      <div>
        <label htmlFor="superadmin_account_profile-language" className="block text-sm font-medium text-secondary mb-1.5">{t('ui.language_96c8019')}</label>
        <select id="superadmin_account_profile-language" {...register('language')} className={`${inputClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11`} data-testid="superadmin_account_profile-superadmin-profile-personal-form-form-control-5-1">
          {LANGUAGE_OPTIONS.map((lang) => (<option key={lang.value} value={lang.value} data-testid="superadmin_account_profile-superadmin-profile-personal-form-personal-form-action-2">{t(lang.labelKey)}</option>))}
        </select>
      </div>

      <div className="flex justify-end pt-2">
        <button type="submit" disabled={isSaving || !isDirty} className="min-h-11 min-w-36 flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-on-primary font-semibold text-sm rounded-lg motion-safe:transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:active:scale-95" data-testid="superadmin_account_profile-superadmin-profile-personal-form-personal-form-action1-1">
          {isSaving && <Loader2 size={18} className="motion-safe:animate-spin" strokeWidth={2}/>}
          {isSaving ? t('ui.saving') : t('ui.save_changes_56e2258')}
        </button>
      </div>
    </form>);
}
