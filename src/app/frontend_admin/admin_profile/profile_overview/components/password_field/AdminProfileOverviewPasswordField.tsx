"use client";
// RESPONSIBILITY: Renders one password input with visibility toggle and React Hook Form validation feedback.
// DATA FLOW: AdminProfileMain → AdminProfileOverviewPasswordField → passwordForm field registration.

import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { AdminProfilePasswordFieldProps } from '@/app/frontend_admin/admin_profile/profile_overview/types/AdminProfileOverviewTypes';

/**
 * AdminProfileOverviewPasswordField renders the admin profile password field UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminProfileOverviewPasswordField: Renders one password input with visibility toggle and React Hook Form validation feedback.
 * @dependencies Consumes AdminProfileTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminProfileOverviewPasswordField({ label, name, form, visible, onToggle }: AdminProfilePasswordFieldProps) {
  const t = useTranslations();
  const error = form.formState.errors[name];
  const inputId = `admin_profile-${name}`;
  const errorId = `${inputId}-error`;
  return (
    <div>
      <label htmlFor={inputId} className="block text-sm font-medium text-secondary mb-1.5">{label} <span className="text-danger">*</span></label>
      <div className="relative">
        <input id={inputId} type={visible ? 'text' : 'password'} {...form.register(name)} aria-invalid={error ? 'true' : 'false'} aria-describedby={error ? errorId : undefined} className="w-full px-4 py-2.5 pr-10 bg-input border border-border rounded-lg text-primary text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"  data-testid="admin_profile-admin_profile-password-field-control"/>
        <button type="button" onClick={onToggle} aria-label={visible ? t('profile.AdminProfilePasswordField.auto_hide', { label }) : t('profile.AdminProfilePasswordField.auto_show', { label })} className="min-h-11 min-w-11 motion-safe:transition-all motion-safe:duration-base ease-in-out absolute inset-y-0 right-3 flex items-center text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" data-testid="admin_profile-admin_profile-password-field-control-2">
          {visible ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
        </button>
      </div>
      {error && <p id={errorId} role="alert" className="mt-1 text-xs text-danger">{error.message}</p>}
    </div>
  );
}
