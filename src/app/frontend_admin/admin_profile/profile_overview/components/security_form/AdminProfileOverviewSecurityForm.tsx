"use client";
// RESPONSIBILITY: Renders the AdminProfileOverviewSecurityForm UI surface for profile_overview; business state and network mutations remain in feature hooks/services.
// DATA FLOW: feature data/state and user input → AdminProfileOverviewSecurityForm → accessible UI/events routed to owning hooks (admin_profile/profile_overview/components/security_form/AdminProfileOverviewSecurityForm.tsx)

import { useTranslations } from 'next-intl';
import { Loader2, Lock } from 'lucide-react';
import AdminProfilePasswordField from '@/app/frontend_admin/admin_profile/profile_overview/components/password_field/AdminProfileOverviewPasswordField';
import type { AdminProfileSecurityFormProps } from '@/app/frontend_admin/admin_profile/profile_overview/types/AdminProfileOverviewComponentPropsTypes';


/** Owns password fields and submit feedback while password visibility and mutation state remain hook-owned. 
 * @description AdminProfileOverviewSecurityForm renders the ProfileOverviewSecurityForm interface for its owning feature.
 * @dependencies Uses feature-local hooks and zero-business UI primitives.
 * @edge-case Preserves contract-defined loading, empty, error, permission, and recovery states.
 */
export default function AdminProfileOverviewSecurityForm({ form, isSaving, showCurrent, showNew, showConfirm, onToggleCurrent, onToggleNew, onToggleConfirm, onSubmit }: AdminProfileSecurityFormProps) {
  const t = useTranslations();
  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-xl border border-border bg-card p-6 shadow-card" data-testid="admin_profile-security-form">
      <h2 className="text-base font-semibold text-primary">{t('profile.admin_profile_main.text_49289db43e')}</h2>
      <div className="max-w-md space-y-4">
        <AdminProfilePasswordField label={t('profile.admin_profile_main.auto_898ba9670f')} name="currentPassword" form={form} visible={showCurrent} onToggle={onToggleCurrent} />
        <AdminProfilePasswordField label={t('profile.admin_profile_main.auto_856b015424')} name="newPassword" form={form} visible={showNew} onToggle={onToggleNew} />
        <AdminProfilePasswordField label={t('profile.admin_profile_main.auto_7ee35f2834')} name="confirmPassword" form={form} visible={showConfirm} onToggle={onToggleConfirm} />
      </div>
      <div className="flex justify-end pt-2">
        <button type="submit" disabled={isSaving || !form.formState.isDirty} className="inline-flex min-h-11 min-w-36 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary shadow-card hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:cursor-not-allowed disabled:opacity-60 motion-safe:transition-colors motion-safe:duration-base" data-testid="admin_profile-change-password">
          {isSaving ? <Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin motion-safe:duration-base" aria-hidden="true" /> : <Lock size={18} strokeWidth={2} aria-hidden="true" />}
          {t('profile.admin_profile_main.text_61dcf34e70')}
        </button>
      </div>
    </form>
  );
}
