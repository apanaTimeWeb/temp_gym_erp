"use client";
import type { TrainerProfilePersonalViewProps } from '../types/TrainerAccountAccountPersonalProfileAuxiliaryTypes';
// RESPONSIBILITY: Personal details form view for the Trainer Profile feature.
import { useTranslations } from 'next-intl';
import { Controller, type UseFormReturn } from 'react-hook-form';
import { Loader2, Save, Landmark } from 'lucide-react';

import { TRAINER_PROFILE_SPECIALIZATIONS } from '@/app/frontend_trainer/trainer_account/account_personal_profile/utils/TrainerAccountPersonalProfileProfileConstants';
import type { TrainerProfileData, TrainerProfileFormValues } from '@/app/frontend_trainer/trainer_account/account_personal_profile/types/TrainerAccountPersonalProfileProfileTypes';



export default function TrainerProfilePersonalView({ profileForm, user, saveProfile, saveProfilePending }: TrainerProfilePersonalViewProps) {
  const t = useTranslations('TRAINER_PROFILE');

  return (
    <form onSubmit={profileForm.handleSubmit((values) => saveProfile(values))} className="bg-card border border-border rounded-xl p-6 space-y-5" data-testid="trainer_profile-trainerprofilemain-form_3">
      <h2 className="text-section-title font-semibold text-primary">{t('TEXT_PERSONAL_INFORMATION')}</h2>
      <div className="grid grid-cols-1 gap-5">
        <div>
          <label htmlFor="trainer-profile-name" className="block text-sm font-medium text-secondary mb-1.5">{t('TEXT_FULL_NAME')}</label>
          <input id="trainer-profile-name" {...profileForm.register('name')} aria-invalid={Boolean(profileForm.formState.errors.name)} aria-describedby={profileForm.formState.errors.name ? 'trainer-profile-name-error' : undefined} className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-primary text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="trainer_profile-trainerprofilemain-input_4" />
          {profileForm.formState.errors.name && <p className="text-xs text-danger mt-1" id="trainer-profile-name-error" data-testid="trainer_profile-main-name_error">{t(profileForm.formState.errors.name.message ?? 'TEXT_VALIDATION_ERROR')}</p>}
        </div>
        <div>
          <label htmlFor="trainer-profile-email" className="block text-sm font-medium text-secondary mb-1.5">{t('TEXT_EMAIL_ADDRESS')}</label>
          <input id="trainer-profile-email" value={user.email} readOnly className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-secondary text-sm cursor-not-allowed opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="trainer_profile-trainerprofilemain-input_5" />
        </div>
        <div>
          <label htmlFor="trainer-profile-phone" className="block text-sm font-medium text-secondary mb-1.5">{t('TEXT_PHONE_NUMBER')}</label>
          <input id="trainer-profile-phone" {...profileForm.register('phone')} aria-invalid={Boolean(profileForm.formState.errors.phone)} aria-describedby={profileForm.formState.errors.phone ? 'trainer-profile-phone-error' : undefined} className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-primary text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="trainer_profile-trainerprofilemain-input_6" />
          {profileForm.formState.errors.phone && <p className="text-xs text-danger mt-1" id="trainer-profile-phone-error" data-testid="trainer_profile-main-phone_error">{t(profileForm.formState.errors.phone.message ?? 'TEXT_VALIDATION_ERROR')}</p>}
        </div>
        <Controller
          control={profileForm.control}
          name="specialization"
          render={({ field }) => (
            <div>
              <span className="block text-sm font-medium text-secondary mb-2">{t('TEXT_SPECIALIZATION')}</span>
              <div className="flex flex-wrap gap-2">
                {TRAINER_PROFILE_SPECIALIZATIONS.map((item) => {
                  const selected = field.value.includes(item.value);
                  return (
                    <button key={item.value} type="button" aria-pressed={selected} onClick={() => field.onChange(selected ? field.value.filter((value) => value !== item.value) : [...field.value, item.value])} className={`px-3 py-1.5 rounded-full text-xs font-semibold border motion-safe:transition-all ${selected ? 'bg-primary text-on-primary border-focus' : 'bg-input text-secondary border-border'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95`} data-testid={`trainer_profile-profile-specialization-${item.value}`}>
                      {t(item.labelKey)}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        />
      </div>

      <div className="pt-4 border-t border-border space-y-4">
        <div className="flex items-center gap-2">
          <Landmark size={18} className="text-primary" />
          <h3 className="text-base font-semibold text-primary">Banking & Payout Details</h3>
        </div>
        <p className="text-xs text-secondary">
          Configure your bank account and UPI details for receiving monthly payroll and personal training commissions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="trainer-payout-holder" className="block text-sm font-medium text-secondary mb-1.5">Account Holder Name</label>
            <input
              id="trainer-payout-holder"
              {...profileForm.register('accountHolderName')}
              placeholder="e.g. John Doe"
              className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-primary text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              data-testid="trainer_profile-payout-holder"
            />
          </div>

          <div>
            <label htmlFor="trainer-payout-bank" className="block text-sm font-medium text-secondary mb-1.5">Bank Name</label>
            <input
              id="trainer-payout-bank"
              {...profileForm.register('bankName')}
              placeholder="e.g. HDFC Bank, SBI, ICICI"
              className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-primary text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              data-testid="trainer_profile-payout-bank"
            />
          </div>

          <div>
            <label htmlFor="trainer-payout-account" className="block text-sm font-medium text-secondary mb-1.5">Account Number</label>
            <input
              id="trainer-payout-account"
              {...profileForm.register('accountNumber')}
              placeholder="e.g. 50100234567890"
              className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-primary text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring font-mono"
              data-testid="trainer_profile-payout-account"
            />
          </div>

          <div>
            <label htmlFor="trainer-payout-ifsc" className="block text-sm font-medium text-secondary mb-1.5">IFSC Code</label>
            <input
              id="trainer-payout-ifsc"
              {...profileForm.register('ifscCode')}
              placeholder="e.g. HDFC0001234"
              className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-primary text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring uppercase font-mono"
              data-testid="trainer_profile-payout-ifsc"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="trainer-payout-upi" className="block text-sm font-medium text-secondary mb-1.5">UPI ID (Instant Transfers)</label>
            <input
              id="trainer-payout-upi"
              {...profileForm.register('upiId')}
              placeholder="e.g. trainer@oksbi / trainer@okhdfcbank"
              className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-primary text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring font-mono"
              data-testid="trainer_profile-payout-upi"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button type="submit" disabled={saveProfilePending} className="min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-32 flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-on-primary font-semibold rounded-lg disabled:opacity-60" data-testid="trainer_profile-trainerprofilemain-button_8">
          {saveProfilePending ? <><Loader2 size={18} className="motion-safe:animate-spin" strokeWidth={2} />{t('TEXT_SAVING')}</> : <><Save size={18} strokeWidth={2} />{t('TEXT_SAVE_CHANGES')}</>}
        </button>
      </div>
    </form>
  );
}


export type { TrainerProfilePersonalViewProps } from '../types/TrainerAccountAccountPersonalProfileAuxiliaryTypes';
