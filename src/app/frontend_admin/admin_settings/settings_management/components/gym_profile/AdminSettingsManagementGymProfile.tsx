"use client";
// RESPONSIBILITY: Manages the Gym Profile settings form.
// DATA FLOW: feature data/state and user input → AdminSettingsManagementGymProfile → accessible UI/events routed to owning hooks (admin_settings/settings_management/components/gym_profile/AdminSettingsManagementGymProfile.tsx)

import { useTranslations } from 'next-intl';
import { resolveAdminSettingsManagementValidationMessage } from '@/app/frontend_admin/admin_settings/settings_management/utils/AdminSettingsManagementValidationMessages';

import type { GymProfileType } from '@/app/frontend_admin/admin_settings/settings_management/types/AdminSettingsManagementTypes';
import { useAdminSettingsGymProfileForm } from '@/app/frontend_admin/admin_settings/settings_management/hooks/useAdminSettingsManagementForms';
import { Save, Loader2, RefreshCw } from 'lucide-react';
import type { AdminSettingsGymProfileProps } from '@/app/frontend_admin/admin_settings/settings_management/types/AdminSettingsManagementGymProfilePropsTypes';

/**
 * AdminSettingsManagementGymProfile renders the admin settings gym profile UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSettingsManagementGymProfile: Manages the Gym Profile settings form.
 * @dependencies Consumes AdminSettingsTypes, useAdminSettingsForms.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export function AdminSettingsManagementGymProfile({ initialData }: AdminSettingsGymProfileProps) {
  const t = useTranslations();
  const getValidationMessage = (message: unknown) => resolveAdminSettingsManagementValidationMessage(message, (key) => t(key));

  const { form, mutation, submitForm } = useAdminSettingsGymProfileForm(initialData);

  const onSubmit = (data: GymProfileType) => submitForm(data);

  const fields = [
    { label: t('settings.AdminAuditRepair.gymName'), field: 'gymName' as const, type: 'text' },
    { label: t('settings.AdminAuditRepair.ownerName'), field: 'ownerName' as const, type: 'text' },
    { label: t('settings.AdminAuditRepair.phoneNumber'), field: 'phone' as const, type: 'tel' },
    { label: t('settings.AdminAuditRepair.email'), field: 'email' as const, type: 'email' },
    { label: t('settings.AdminAuditRepair.city'), field: 'city' as const, type: 'text' },
    { label: t('settings.AdminAuditRepair.gstNumber'), field: 'gstNumber' as const, type: 'text' },
  ];

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="bg-card rounded-xl shadow-card border border-border mt-6" data-testid="admin_settings-admin_settings-gym-profile-control">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-bold text-primary text-lg">{t('settings.admin_settings_gym_profile.text_9f951d3e9a')}</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => form.reset(initialData)}
            disabled={!form.formState.isDirty || mutation.isPending}
            className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-input text-secondary flex items-center gap-2 motion-safe:transition-colors disabled:opacity-50 motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
           data-testid="admin_settings-admin_settings-gym-profile-control-2">
            <RefreshCw size={18}  strokeWidth={2}/> {t('settings.admin_settings_gym_profile.text_44c57abd88')}</button>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="px-4 py-2 text-sm bg-primary text-on-primary rounded-lg font-medium flex items-center gap-2 disabled:opacity-70 hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
           data-testid="admin_settings-admin_settings-gym-profile-control-3">
            {mutation.isPending ? <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true"  strokeWidth={2}/> : <Save size={18}  strokeWidth={2}/>} {mutation.isPending ? t('settings.admin_settings_gym_profile.auto_028d97f2c1') : t('settings.admin_settings_gym_profile.auto_0cb1e0f5e5')}
          </button>
        </div>
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
        {fields.map((f, __testIdIndex53) => (
          <div key={f.field}>
            <label htmlFor={`admin-settings-gym-profile-${f.field}`} className="block text-sm font-medium text-secondary mb-1">{f.label}</label>
            <input
              id={`admin-settings-gym-profile-${f.field}`}
              aria-invalid={Boolean(form.formState.errors[f.field])}
              aria-describedby={form.formState.errors[f.field] ? `admin-settings-gym-profile-${f.field}-error` : undefined}
              type={f.type}
              {...form.register(f.field)}
              className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"
             data-testid={`admin_settings-admin_settings-gym-profile-control-4-map53-${__testIdIndex53}-1`}/>
            {form.formState.errors[f.field] && (
              <p id={`admin-settings-gym-profile-${f.field}-error`} role="alert" className="text-xs text-danger mt-1">{getValidationMessage(form.formState.errors[f.field]?.message)}</p>
            )}
          </div>
        ))}
      </div>
    </form>
  );
}
