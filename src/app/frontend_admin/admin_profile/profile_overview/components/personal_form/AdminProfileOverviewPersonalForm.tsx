"use client";
// RESPONSIBILITY: Renders the AdminProfileOverviewPersonalForm UI surface for profile_overview; business state and network mutations remain in feature hooks/services.
// DATA FLOW: feature data/state and user input → AdminProfileOverviewPersonalForm → accessible UI/events routed to owning hooks (admin_profile/profile_overview/components/personal_form/AdminProfileOverviewPersonalForm.tsx)

import { useTranslations } from 'next-intl';
import { Loader2, Save } from 'lucide-react';
import { displayValue } from '@/app/frontend_admin/admin_profile/profile_overview/utils/AdminProfileOverviewDisplayValue';
import type { AdminProfilePersonalFormProps } from '@/app/frontend_admin/admin_profile/profile_overview/types/AdminProfileOverviewComponentPropsTypes';


/** Owns the personal-information form layout; validation and mutation behavior remain with the module hook. 
 * @description AdminProfileOverviewPersonalForm renders the ProfileOverviewPersonalForm interface for its owning feature.
 * @dependencies Uses feature-local hooks and zero-business UI primitives.
 * @edge-case Preserves contract-defined loading, empty, error, permission, and recovery states.
 */
export default function AdminProfileOverviewPersonalForm({ profile, form, isSaving, onSubmit }: AdminProfilePersonalFormProps) {
  const t = useTranslations();
  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-xl border border-border bg-card p-6 shadow-card" data-testid="admin_profile-personal-form">
      <h2 className="text-base font-semibold text-primary">{t('profile.admin_profile_main.text_ad12e4228c')}</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="admin_profile-name" className="mb-1.5 block text-sm font-medium text-secondary">{t('profile.admin_profile_main.text_64346b483c')}<span className="text-danger">*</span></label>
          <input id="admin_profile-name" type="text" autoComplete="name" required {...form.register('name')} aria-invalid={form.formState.errors.name ? 'true' : 'false'} aria-describedby={form.formState.errors.name ? 'admin_profile-name-error' : undefined} className="min-h-11 w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base" data-testid="admin_profile-name-input" />
          {form.formState.errors.name && <p id="admin_profile-name-error" role="alert" className="mt-1 text-xs text-danger">{form.formState.errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="admin_profile-email" className="mb-1.5 block text-sm font-medium text-secondary">{t('profile.admin_profile_main.text_09ba557fd1')}</label>
          <input id="admin_profile-email" type="email" autoComplete="email" value={displayValue(profile?.email)} readOnly className="min-h-11 w-full cursor-default rounded-lg border border-dashed border-border bg-input px-4 py-2.5 text-sm text-secondary opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="admin_profile-email-input" />
          <p className="mt-1 text-xs text-secondary">{t('profile.admin_profile_main.text_a23bc17981')}</p>
        </div>
        <div>
          <label htmlFor="admin_profile-phone" className="mb-1.5 block text-sm font-medium text-secondary">{t('profile.admin_profile_main.text_ab25d61bb1')}</label>
          <input id="admin_profile-phone" type="tel" autoComplete="tel" {...form.register('phone')} aria-invalid={form.formState.errors.phone ? 'true' : 'false'} aria-describedby={form.formState.errors.phone ? 'admin_profile-phone-error' : undefined} className="min-h-11 w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base" data-testid="admin_profile-phone-input" />
          {form.formState.errors.phone && <p id="admin_profile-phone-error" role="alert" className="mt-1 text-xs text-danger">{form.formState.errors.phone.message}</p>}
        </div>
        <div>
          <label htmlFor="admin_profile-role" className="mb-1.5 block text-sm font-medium text-secondary">{t('profile.admin_profile_main.text_c3f104d136')}</label>
          <input id="admin_profile-role" type="text" value={displayValue(profile?.role)} readOnly className="min-h-11 w-full cursor-default rounded-lg border border-dashed border-border bg-input px-4 py-2.5 text-sm text-secondary opacity-100" data-testid="admin_profile-role-input" />
        </div>
      </div>
      <div className="flex justify-end pt-2">
        <button type="submit" disabled={isSaving || !form.formState.isDirty} className="inline-flex min-h-11 min-w-36 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary shadow-card hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:cursor-not-allowed disabled:opacity-60 motion-safe:transition-colors motion-safe:duration-base" data-testid="admin_profile-save-profile">
          {isSaving ? <Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin motion-safe:duration-base" aria-hidden="true" /> : <Save size={18} strokeWidth={2} aria-hidden="true" />}
          {t('profile.admin_profile_main.text_fa2984b367')}
        </button>
      </div>
    </form>
  );
}
