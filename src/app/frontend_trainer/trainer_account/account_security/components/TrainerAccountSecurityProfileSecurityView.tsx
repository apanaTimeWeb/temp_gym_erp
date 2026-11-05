"use client";
import type { TrainerAccountSecurityPasswordVisibility, TrainerAccountSecuritySecurityViewProps } from '../types/TrainerAccountAccountSecurityAuxiliaryTypes';
// RESPONSIBILITY: Security/password form view for the Trainer Profile feature.
import type { Dispatch, SetStateAction } from 'react';
import { useTranslations } from 'next-intl';
import { Eye, EyeOff, Loader2, Lock } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';

import { TRAINER_ACCOUNT_SECURITY_PASSWORD_FIELDS } from '@/app/frontend_trainer/trainer_account/account_security/utils/TrainerAccountSecurityProfileConstants';
import type { TrainerAccountSecurityTrainerPasswordFormValues } from '@/app/frontend_trainer/trainer_account/account_security/types/TrainerAccountSecurityProfileTypes';





export default function TrainerAccountSecuritySecurityView({ passwordForm, changePassword, changePasswordPending, passwordVisibility, setPasswordVisibility }: TrainerAccountSecuritySecurityViewProps) {
  const t = useTranslations('TRAINER_ACCOUNT_SECURITY');

  return (
    <form onSubmit={passwordForm.handleSubmit((values) => changePassword(values))} className="bg-card border border-border rounded-xl p-6 space-y-5" data-testid="trainer_profile-trainerprofilemain-form_9">
      <h2 className="text-section-title font-semibold text-primary">{t('TEXT_CHANGE_PASSWORD')}</h2>
      {TRAINER_ACCOUNT_SECURITY_PASSWORD_FIELDS.map((field) => {
        const visible = passwordVisibility[field.key];
        return (
          <div key={field.name} className="max-w-md">
            <label htmlFor={`trainer-${field.name}`} className="block text-sm font-medium text-secondary mb-1.5">{t(field.labelKey)}</label>
            <div className="relative">
              <input id={`trainer-${field.name}`} type={visible ? 'text' : 'password'} {...passwordForm.register(field.name)} aria-invalid={Boolean(passwordForm.formState.errors[field.name])} aria-describedby={passwordForm.formState.errors[field.name] ? `trainer-profile-${field.key}-error` : undefined} className="w-full px-4 py-2.5 pe-10 bg-input border border-border rounded-lg text-primary text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid={`trainer_profile-profile-password-${field.key}`} />
              <button type="button" aria-label={visible ? t('TEXT_HIDE_PASSWORD') : t('TEXT_SHOW_PASSWORD')} onClick={() => setPasswordVisibility((current) => ({ ...current, [field.key]: !current[field.key] }))} className="min-w-11 min-h-11 absolute end-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid={`trainer_profile-profile-password-visibility-${field.key}`}>
                {visible ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
              </button>
            </div>
            {passwordForm.formState.errors[field.name] && <p className="text-xs text-danger mt-1" id={`trainer-profile-${field.key}-error`} data-testid={`trainer_profile-main-${field.key}-error`}>{t(passwordForm.formState.errors[field.name]?.message ?? 'TEXT_VALIDATION_ERROR')}</p>}
          </div>
        );
      })}
      <div className="flex justify-end">
        <button type="submit" disabled={changePasswordPending} className="min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-36 flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-on-primary font-semibold rounded-lg disabled:opacity-60" data-testid="trainer_profile-main-password_submit">
          {changePasswordPending ? <><Loader2 size={18} className="motion-safe:animate-spin" strokeWidth={2} />{t('TEXT_UPDATING')}</> : <><Lock size={18} strokeWidth={2} />{t('TEXT_UPDATE_PASSWORD')}</>}
        </button>
      </div>
    </form>
  );
}


export type { TrainerAccountSecurityPasswordVisibility, TrainerAccountSecuritySecurityViewProps } from '../types/TrainerAccountAccountSecurityAuxiliaryTypes';
