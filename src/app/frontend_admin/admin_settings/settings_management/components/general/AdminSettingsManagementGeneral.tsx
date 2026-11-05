"use client";
// RESPONSIBILITY: Manages the General Settings tab.
// DATA FLOW: feature data/state and user input → AdminSettingsManagementGeneral → accessible UI/events routed to owning hooks (admin_settings/settings_management/components/general/AdminSettingsManagementGeneral.tsx)

import { useTranslations } from 'next-intl';
import { resolveAdminSettingsManagementValidationMessage } from '@/app/frontend_admin/admin_settings/settings_management/utils/AdminSettingsManagementValidationMessages';

import type { GeneralSettingsFormType } from '@/app/frontend_admin/admin_settings/settings_management/types/AdminSettingsManagementTypes';
import { useAdminSettingsGeneralForm } from '@/app/frontend_admin/admin_settings/settings_management/hooks/useAdminSettingsManagementForms';
import { Save, Loader2, RefreshCw } from 'lucide-react';
import { ADMIN_SETTINGS_GENERAL_SELECT_FIELDS, ADMIN_SETTINGS_GENERAL_TOGGLE_FIELDS, ADMIN_SETTINGS_DATE_FORMAT_OPTIONS } from '@/app/frontend_admin/admin_settings/settings_management/constants/AdminSettingsManagementConstants';
import { AdminSettingsManagementToggleSwitch as AdminSettingsToggleSwitch } from '@/app/frontend_admin/admin_settings/settings_management/components/shared/AdminSettingsManagementToggleSwitch';
import type { AdminSettingsGeneralProps } from '@/app/frontend_admin/admin_settings/settings_management/types/AdminSettingsManagementGeneralPropsTypes';
import { GeneralSettingsFormSchema } from '@/app/frontend_admin/admin_settings/settings_management/schemas/AdminSettingsManagementSchemas';

/**
 * AdminSettingsManagementGeneral renders the admin settings general UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSettingsManagementGeneral: Manages the General Settings tab.
 * @dependencies Consumes AdminSettingsTypes, useAdminSettingsForms, AdminSettingsConstants, AdminSettingsToggleSwitch.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export function AdminSettingsManagementGeneral({ initialData }: AdminSettingsGeneralProps) {
  const t = useTranslations();
  const getValidationMessage = (message: unknown) => resolveAdminSettingsManagementValidationMessage(message, (key) => t(key));

  const { form, formValues, mutation, submitForm } = useAdminSettingsGeneralForm(initialData);

  const onSubmit = (data: GeneralSettingsFormType) => submitForm(data);


  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="bg-card rounded-xl shadow-card border border-border mt-6" data-testid="admin_settings-admin_settings-general-submit">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-bold text-primary text-lg">{t('settings.admin_settings_general.text_71dd223f6b')}</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => form.reset(GeneralSettingsFormSchema.parse(initialData))}
            disabled={!form.formState.isDirty || mutation.isPending}
            className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-input text-secondary flex items-center gap-2 motion-safe:transition-colors disabled:opacity-50 motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
           data-testid="admin_settings-admin_settings-general-click">
            <RefreshCw size={18}  strokeWidth={2}/> {t('settings.admin_settings_general.text_44c57abd88')}</button>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="px-4 py-2 text-sm bg-primary text-on-primary rounded-lg font-medium flex items-center gap-2 disabled:opacity-70 hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
           data-testid="admin_settings-admin_settings-general-submit-2">
            {mutation.isPending ? <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true"  strokeWidth={2}/> : <Save size={18}  strokeWidth={2}/>} {mutation.isPending ? t('settings.admin_settings_general.auto_3222dd4f7a') : t('settings.admin_settings_general.auto_baf38eca81')}
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {ADMIN_SETTINGS_GENERAL_SELECT_FIELDS.map((f, __testIdIndex49) => (
            <div key={f.key}>
              <label htmlFor={`admin-settings-${f.key}`} className="block text-sm font-medium text-secondary mb-1">{t(f.labelKey)}</label>
              <select
                id={`admin-settings-${f.key}`}
                aria-invalid={Boolean(form.formState.errors[f.key])}
                aria-describedby={form.formState.errors[f.key] ? `admin-settings-${f.key}-error` : undefined}
                {...form.register(f.key)}
                className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"
               data-testid={`admin_settings-admin_settings-general-control-map49-${__testIdIndex49}-1`}>
                {f.options.map((o, __testIdIndex56) => <option key={o.value} value={o.value} data-testid={`admin_settings-admin_settings-general-control-2-map49-${__testIdIndex49}-2`}>{t(o.labelKey)}</option>)}
              </select>
              {form.formState.errors[f.key] && <p id={`admin-settings-${f.key}-error`} role="alert" className="text-xs text-danger mt-1">{getValidationMessage(form.formState.errors[f.key]?.message)}</p>}
            </div>
          ))}
          <div>
            <label htmlFor="admin-settings-date-format" className="block text-sm font-medium text-secondary mb-1">{t('settings.admin_settings_general.text_4827931e55')}</label>
            <select
              id="admin-settings-date-format"
              aria-invalid={Boolean(form.formState.errors.dateFormat)}
              aria-describedby={form.formState.errors.dateFormat ? "admin-settings-date-format-error" : undefined}
              {...form.register('dateFormat')}
              className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"
             data-testid="admin_settings-admin_settings-general-control-3">
              {ADMIN_SETTINGS_DATE_FORMAT_OPTIONS.map((option, index) => (
                <option key={option.value} value={option.value} data-testid={`admin_settings-admin_settings-general-control-${index + 4}`}>{t(option.labelKey)}</option>
              ))}
            </select>
              {form.formState.errors.dateFormat && <p id="admin-settings-date-format-error" role="alert" className="text-xs text-danger mt-1">{getValidationMessage(form.formState.errors.dateFormat.message)}</p>}
          </div>
          <div>
            <label htmlFor="admin-settings-session-timeout" className="block text-sm font-medium text-secondary mb-1">{t('settings.admin_settings_general.text_6a1ad2e081')}</label>
            <input
              aria-describedby={form.formState.errors.sessionTimeoutMinutes ? "admin-settings-general-sessionTimeoutMinutes-error" : undefined} aria-invalid={Boolean(form.formState.errors.sessionTimeoutMinutes)} id="admin-settings-session-timeout"
              type="number"
              min="15"
              max="480"
              step="1"
              {...form.register('sessionTimeoutMinutes', { valueAsNumber: true })}
              className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"
             data-testid="admin_settings-admin_settings-general-control-7"/>
            {form.formState.errors.sessionTimeoutMinutes && <p id="admin-settings-general-sessionTimeoutMinutes-error" role="alert" className="text-xs text-danger mt-1">{getValidationMessage(form.formState.errors.sessionTimeoutMinutes.message)}</p>}
          </div>
          <div>
            <label htmlFor="admin-settings-data-retention" className="block text-sm font-medium text-secondary mb-1">{t('settings.admin_settings_general.text_bd87d6356b')}</label>
            <input
              aria-describedby={form.formState.errors.dataRetentionMonths ? "admin-settings-general-dataRetentionMonths-error" : undefined} aria-invalid={Boolean(form.formState.errors.dataRetentionMonths)} id="admin-settings-data-retention"
              type="number"
              min="6"
              max="120"
              step="1"
              {...form.register('dataRetentionMonths', { valueAsNumber: true })}
              className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"
             data-testid="admin_settings-admin_settings-general-control-8"/>
            {form.formState.errors.dataRetentionMonths && <p id="admin-settings-general-dataRetentionMonths-error" role="alert" className="text-xs text-danger mt-1">{getValidationMessage(form.formState.errors.dataRetentionMonths.message)}</p>}
          </div>
        </div>

        <div className="space-y-3 pt-2 border-t border-border">
          <p className="text-sm font-semibold text-primary">{t('settings.admin_settings_general.text_2a98511fed')}</p>
          {ADMIN_SETTINGS_GENERAL_TOGGLE_FIELDS.map((f, __testIdIndex99) => (
            <div key={f.key} className="flex items-center justify-between p-3 bg-input rounded-xl border border-border">
              <AdminSettingsToggleSwitch
                checked={formValues[f.key] ?? initialData[f.key]}
                onChange={(v) => form.setValue(f.key, v, { shouldDirty: true })}
                label={t(f.labelKey)}
               data-testid={`admin_settings-admin_settings-general-change-map99-${__testIdIndex99}-1`}/>
            </div>
          ))}
          <div className="space-y-2 rounded-xl border border-border bg-input p-3">
            <AdminSettingsToggleSwitch
              checked={initialData.twoFactorAuth}
              onChange={() => undefined}
              disabled
              describedBy="admin-settings-two-factor-contract"
              label={t('settings.AdminAuditRepair.twoFactor')}
              data-testid="admin_settings-general-two-factor-disabled" />
            <p id="admin-settings-two-factor-contract" className="text-xs leading-5 text-secondary">
              {t('settings.admin_settings_general.twoFactorContractBlocked')}
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
