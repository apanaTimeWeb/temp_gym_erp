"use client";
// RESPONSIBILITY: Manages the App Integration settings tab.
// DATA FLOW: feature data/state and user input → AdminSettingsManagementAppIntegration → accessible UI/events routed to owning hooks (admin_settings/settings_management/components/app_integration/AdminSettingsManagementAppIntegration.tsx)

import { useTranslations } from 'next-intl';
import { resolveAdminSettingsManagementValidationMessage } from '@/app/frontend_admin/admin_settings/settings_management/utils/AdminSettingsManagementValidationMessages';
import { isSafeAdminSettingsAppStoreUrl } from '@/app/frontend_admin/admin_settings/settings_management/utils/AdminSettingsManagementSafeAppStoreUrl';

import { useState } from 'react';
import { useAdminNavigationLayoutConfirm } from '@/app/frontend_admin/admin_settings/settings_management/hooks/useAdminSettingsManagementConfirm';
import type { AppIntegrationSettingsType } from '@/app/frontend_admin/admin_settings/settings_management/types/AdminSettingsManagementTypes';
import { useAdminSettingsAppIntegrationForm } from '@/app/frontend_admin/admin_settings/settings_management/hooks/useAdminSettingsManagementForms';
import { Save, Loader2, RefreshCw, ExternalLink, Copy, Eye, EyeOff } from 'lucide-react';
import { AdminSettingsManagementToggleSwitch as AdminSettingsToggleSwitch } from '@/app/frontend_admin/admin_settings/settings_management/components/shared/AdminSettingsManagementToggleSwitch';
import type { AdminSettingsAppIntegrationProps } from '@/app/frontend_admin/admin_settings/settings_management/types/AdminSettingsManagementAppIntegrationPropsTypes';

/**
 * AdminSettingsManagementAppIntegration renders the admin settings app integration UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSettingsManagementAppIntegration: Manages the App Integration settings tab.
 * @dependencies Consumes AdminSettingsTypes, useAdminSettingsForms, AdminSettingsToggleSwitch.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export function AdminSettingsManagementAppIntegration({ initialData }: AdminSettingsAppIntegrationProps) {
  const t = useTranslations();
  const getValidationMessage = (message: unknown) => resolveAdminSettingsManagementValidationMessage(message, (key) => t(key));

  const [copiedApiKey, setCopiedApiKey] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const { confirm } = useAdminNavigationLayoutConfirm();
  const { form, formValues, mutation, submitForm } = useAdminSettingsAppIntegrationForm(initialData);

  const onSubmit = async (data: AppIntegrationSettingsType) => {
    if (data.onlinePaymentsEnabled !== initialData.onlinePaymentsEnabled) {
      const approved = await confirm({ title: t('settings.AdminRepair.paymentConfirmTitle'), message: t('settings.AdminRepair.paymentConfirmMessage'), type: 'warning', confirmText: t('settings.AdminRepair.saveChanges'), cancelText: t('settings.AdminRepair.cancel') });
      if (!approved) return;
    }
    await submitForm(data);
  };

  const features = [
    { key: 'memberAppEnabled' as const, label: t('settings.AdminAuditRepair.memberMobileApp') },
    { key: 'qrCheckInEnabled' as const, label: t('settings.AdminAuditRepair.qrCheckIn') },
    { key: 'onlinePaymentsEnabled' as const, label: t('settings.AdminAuditRepair.onlinePayments') },
    { key: 'dietPlanEnabled' as const, label: t('settings.AdminAuditRepair.dietPlanModule') },
    { key: 'workoutPlanEnabled' as const, label: t('settings.AdminAuditRepair.workoutPlanModule') },
    { key: 'progressTrackingEnabled' as const, label: t('settings.AdminAuditRepair.progressTracking') },
    { key: 'pushNotificationsEnabled' as const, label: t('settings.AdminAuditRepair.pushNotifications') },
  ];

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="bg-card rounded-xl shadow-card border border-border mt-6" data-testid="admin_settings-admin_settings-app-integration-submit">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-bold text-primary text-lg">{t('settings.admin_settings_app_integration.text_f27813fca5')}</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => form.reset(initialData)}
            disabled={!form.formState.isDirty || mutation.isPending}
            className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-input text-secondary flex items-center gap-2 motion-safe:transition-colors disabled:opacity-50 motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
           data-testid="admin_settings-admin_settings-app-integration-click">
            <RefreshCw size={18}  strokeWidth={2}/> {t('settings.admin_settings_app_integration.text_44c57abd88')}</button>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="px-4 py-2 text-sm bg-primary text-on-primary rounded-lg font-medium flex items-center gap-2 disabled:opacity-70 hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
           data-testid="admin_settings-admin_settings-app-integration-submit-2">
            {mutation.isPending ? <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true"  strokeWidth={2}/> : <Save size={18}  strokeWidth={2}/>} {mutation.isPending ? t('settings.admin_settings_app_integration.auto_09944d31d6') : t('settings.admin_settings_app_integration.auto_0d7daf5a28')}
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {features.map((f, __testIdIndex59) => (
            <div key={f.key} className="flex items-center justify-between p-3 bg-input rounded-xl border border-border">
              <AdminSettingsToggleSwitch
                checked={formValues[f.key] ?? initialData[f.key]}
                onChange={(v) => form.setValue(f.key, v, { shouldDirty: true })}
                label={f.label}
               data-testid={`admin_settings-admin_settings-app-integration-change-map59-${__testIdIndex59}-1`}/>
            </div>
          ))}
        </div>

        <div className="space-y-4 pt-2 border-t border-border">
          <p className="text-sm font-semibold text-primary">{t('settings.admin_settings_app_integration.text_bd99009f34')}</p>
          {[
            { labelKey: 'appStoreIos', key: 'appStoreLink' as const },
            { labelKey: 'playStoreAndroid', key: 'playStoreLink' as const },
          ].map((f, __testIdIndex75) => {
            const link = formValues[f.key] ?? initialData[f.key];
            const safeLink = isSafeAdminSettingsAppStoreUrl(link);
            return (
              <div key={f.key}>
                <label htmlFor={`admin-settings-app-integration-${f.key}`} className="block text-sm font-medium text-secondary mb-1">{t(`settings.admin_settings_app_integration.${f.labelKey}`)}</label>
                <div className="flex gap-2">
                  <input
                    id={`admin-settings-app-integration-${f.key}`}
                    aria-invalid={Boolean(form.formState.errors[f.key])}
                    aria-describedby={form.formState.errors[f.key] ? `admin-settings-app-integration-${f.key}-error` : undefined}
                    type="url"
                    {...form.register(f.key)}
                    className="flex-1 px-3 py-2.5 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"
                   data-testid={`admin_settings-admin_settings-app-integration-control-map75-${__testIdIndex75}-1`}/>
                  {safeLink ? (
                    <a href={link} target="_blank" rel="noopener noreferrer"
                      className="min-h-11 min-w-11 inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page p-2.5 border border-border rounded-lg text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors motion-safe:duration-base motion-safe:transition-all ease-in-out"
                      aria-label={t('settings.admin_settings_app_integration.text_d2de1a2831')} data-testid={`admin_settings-admin_settings-app-integration-navigate-map75-${__testIdIndex75}-2`}>
                      <ExternalLink size={18} aria-hidden="true"  strokeWidth={2}/>
                    </a>
                  ) : (
                    <span
                      className="min-h-11 min-w-11 inline-flex items-center justify-center p-2.5 border border-border rounded-lg text-disabled"
                      aria-label={t('settings.admin_settings_app_integration.text_linkUnavailable')}
                      data-testid={`admin_settings-admin_settings-app-integration-control-2-map75-${__testIdIndex75}-3`}
                    >
                      <ExternalLink size={18} aria-hidden="true"  strokeWidth={2}/>
                    </span>
                  )}
                </div>
                {form.formState.errors[f.key] && <p id={`admin-settings-app-integration-${f.key}-error`} role="alert" className="text-xs text-danger mt-1">{getValidationMessage(form.formState.errors[f.key]?.message)}</p>}
              </div>
            );
          })}
        </div>

        <div className="space-y-4 pt-2 border-t border-border">
          <p className="text-sm font-semibold text-primary">{t('settings.admin_settings_app_integration.text_aa89cdc2a5')}</p>
          <div>
            <label htmlFor="admin-settings-app-integration-api-key" className="block text-sm font-medium text-secondary mb-1">{t('settings.admin_settings_app_integration.text_47acd2028c')}</label>
            <div className="flex gap-2">
              <input
                id="admin-settings-app-integration-api-key"
                type={showApiKey ? 'text' : 'password'}
                {...form.register('apiKey')}
                readOnly
                placeholder={t('settings.admin_settings_app_integration.text_f6432d43b6')}
                className="flex-1 px-3 py-2.5 text-sm border border-dashed border-border rounded-lg bg-input text-secondary cursor-default opacity-100 min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
               data-testid="admin_settings-admin_settings-app-integration-control-3"/>
              <button
                type="button"
                onClick={() => setShowApiKey((visible) => !visible)}
                className="min-h-11 min-w-11 p-2.5 border border-border rounded-lg text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95"
                aria-label={showApiKey ? t('settings.admin_settings_app_integration.auto_hideApiKey') : t('settings.admin_settings_app_integration.auto_showApiKey')}
                data-testid="admin_settings-admin_settings-app-integration-toggle-api-key-visibility"
              >
                {showApiKey ? <EyeOff size={18} aria-hidden="true"  strokeWidth={2}/> : <Eye size={18} aria-hidden="true"  strokeWidth={2}/>}
              </button>
              <button
                type="button"
                onClick={() => {
                  const key = form.getValues('apiKey');
                  if (!key) return;
                  void navigator.clipboard.writeText(key).then(() => {
                    setCopiedApiKey(true);
                    window.setTimeout(() => setCopiedApiKey(false), 2000);
                  });
                }}
                className="min-h-11 min-w-11 p-2.5 border border-border rounded-lg text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95"
                aria-label={t('settings.admin_settings_app_integration.text_0c1a43787e')}
               data-testid="admin_settings-admin_settings-app-integration-click-2">
                <Copy size={18}  strokeWidth={2}/>
              </button>
            </div>
            {copiedApiKey && <p className="text-xs text-success mt-1">{t('settings.admin_settings_app_integration.text_8e3df45a49')}</p>}
            <p className="text-xs text-secondary mt-1">{t('settings.admin_settings_app_integration.text_36c471f5e4')}</p>
          </div>
          <div>
            <label htmlFor="admin-settings-app-integration-webhook-url" className="block text-sm font-medium text-secondary mb-1">{t('settings.admin_settings_app_integration.text_fa7517b6b6')}</label>
            <input
              aria-describedby={form.formState.errors.webhookUrl ? "admin-settings-app-integration-webhookUrl-error" : undefined} id="admin-settings-app-integration-webhook-url"
              aria-invalid={Boolean(form.formState.errors.webhookUrl)}
              type="url"
              {...form.register('webhookUrl')}
              className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"
             data-testid="admin_settings-admin_settings-app-integration-control-4"/>
            {form.formState.errors.webhookUrl && <p id="admin-settings-app-integration-webhookUrl-error" role="alert" className="text-xs text-danger mt-1">{getValidationMessage(form.formState.errors.webhookUrl.message)}</p>}
          </div>
        </div>
      </div>
    </form>
  );
}
