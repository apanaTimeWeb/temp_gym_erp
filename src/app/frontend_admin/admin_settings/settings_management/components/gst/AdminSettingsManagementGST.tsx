"use client";
// RESPONSIBILITY: Manages the GST & Tax settings tab.
// DATA FLOW: feature data/state and user input → AdminSettingsManagementGST → accessible UI/events routed to owning hooks (admin_settings/settings_management/components/gst/AdminSettingsManagementGST.tsx)

import { useTranslations } from 'next-intl';
import { resolveAdminSettingsManagementValidationMessage } from '@/app/frontend_admin/admin_settings/settings_management/utils/AdminSettingsManagementValidationMessages';

import type { GstTaxSettingsType } from '@/app/frontend_admin/admin_settings/settings_management/types/AdminSettingsManagementTypes';
import { useAdminSettingsGstForm } from '@/app/frontend_admin/admin_settings/settings_management/hooks/useAdminSettingsManagementForms';
import { Save, Loader2, RefreshCw } from 'lucide-react';
import { GST_STATE_CODES, TAX_RATE_OPTIONS } from '@/app/frontend_admin/admin_settings/settings_management/constants/AdminSettingsManagementConstants';
import { AdminSettingsManagementToggleSwitch as AdminSettingsToggleSwitch } from '@/app/frontend_admin/admin_settings/settings_management/components/shared/AdminSettingsManagementToggleSwitch';
import type { AdminSettingsGSTProps } from '@/app/frontend_admin/admin_settings/settings_management/types/AdminSettingsManagementGSTPropsTypes';

/**
 * AdminSettingsManagementGST renders the admin settings gst UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSettingsManagementGST: Manages the GST & Tax settings tab.
 * @dependencies Consumes AdminSettingsTypes, useAdminSettingsForms, AdminSettingsConstants, AdminSettingsToggleSwitch.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export function AdminSettingsManagementGST({ initialData }: AdminSettingsGSTProps) {
  const t = useTranslations();
  const getValidationMessage = (message: unknown) => resolveAdminSettingsManagementValidationMessage(message, (key) => t(key));

  const { form, formValues, mutation, submitForm } = useAdminSettingsGstForm(initialData);

  const onSubmit = (data: GstTaxSettingsType) => submitForm(data);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="bg-card rounded-xl shadow-card border border-border mt-6" data-testid="admin_settings-admin_settings-gst-submit">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-bold text-primary text-lg">{t('settings.admin_settings_gst.text_59190446c9')}</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => form.reset(initialData)}
            disabled={!form.formState.isDirty || mutation.isPending}
            className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-input text-secondary flex items-center gap-2 motion-safe:transition-colors disabled:opacity-50 motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
           data-testid="admin_settings-admin_settings-gst-click">
            <RefreshCw size={18}  strokeWidth={2}/> {t('settings.admin_settings_gst.text_44c57abd88')}</button>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="px-4 py-2 text-sm bg-primary text-on-primary rounded-lg font-medium flex items-center gap-2 disabled:opacity-70 hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
           data-testid="admin_settings-admin_settings-gst-submit-2">
            {mutation.isPending ? <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true"  strokeWidth={2}/> : <Save size={18}  strokeWidth={2}/>} {mutation.isPending ? t('settings.admin_settings_gst.auto_fb012e1ccd') : t('settings.admin_settings_gst.auto_5b4d8787d7')}
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="admin-settings-gst-number" className="block text-sm font-medium text-secondary mb-1">{t('settings.admin_settings_gst.text_267c2be361')}</label>
            <input aria-describedby={form.formState.errors.gstNumber ? "admin-settings-gst-gstNumber-error" : undefined} aria-invalid={Boolean(form.formState.errors.gstNumber)} id="admin-settings-gst-number"
              type="text"
              {...form.register('gstNumber')}
              placeholder={t('settings.admin_settings_gst.text_5b7b176259')}
              maxLength={15}
              className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary font-mono uppercase focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"
             data-testid="admin_settings-admin_settings-gst-control"/>
            {form.formState.errors.gstNumber && <p id="admin-settings-gst-gstNumber-error" role="alert" className="text-xs text-danger mt-1">{getValidationMessage(form.formState.errors.gstNumber.message)}</p>}
            <p className="text-xs text-secondary mt-1">{t('settings.admin_settings_gst.text_58fb58b12f')}</p>
          </div>
          <div>
            <label htmlFor="admin-settings-gst-business-legal-name" className="block text-sm font-medium text-secondary mb-1">{t('settings.admin_settings_gst.text_cee9d0b09b')}</label>
            <input aria-describedby={form.formState.errors.businessLegalName ? "admin-settings-gst-businessLegalName-error" : undefined} aria-invalid={Boolean(form.formState.errors.businessLegalName)} id="admin-settings-gst-business-legal-name"
              type="text"
              {...form.register('businessLegalName')}
              placeholder={t('settings.admin_settings_gst.text_ddb15c01fc')}
              className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"
             data-testid="admin_settings-admin_settings-gst-control-2"/>
            {form.formState.errors.businessLegalName && <p id="admin-settings-gst-businessLegalName-error" role="alert" className="text-xs text-danger mt-1">{getValidationMessage(form.formState.errors.businessLegalName.message)}</p>}
          </div>
          <div>
            <label htmlFor="admin-settings-gst-tax-rate" className="block text-sm font-medium text-secondary mb-1">{t('settings.admin_settings_gst.text_480193e678')}</label>
            <select id="admin-settings-gst-tax-rate"
              aria-invalid={Boolean(form.formState.errors.taxRate)}
              aria-describedby={form.formState.errors.taxRate ? "admin-settings-gst-tax-rate-error" : undefined}
              {...form.register('taxRate')}
              className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"
             data-testid="admin_settings-admin_settings-gst-control-3">
              {TAX_RATE_OPTIONS.map((o, __testIdIndex76) => <option key={o.value} value={o.value} data-testid={`admin_settings-admin_settings-gst-control-4-map76-${__testIdIndex76}-1`}>{t(o.labelKey)}</option>)}
            </select>
            {form.formState.errors.taxRate && <p id="admin-settings-gst-tax-rate-error" role="alert" className="text-xs text-danger mt-1">{getValidationMessage(form.formState.errors.taxRate.message)}</p>}
          </div>
          <div>
            <label htmlFor="admin-settings-gst-state-code" className="block text-sm font-medium text-secondary mb-1">{t('settings.admin_settings_gst.text_33b7db29cf')}</label>
            <select id="admin-settings-gst-state-code"
              aria-invalid={Boolean(form.formState.errors.stateCode)}
              aria-describedby={form.formState.errors.stateCode ? "admin-settings-gst-state-code-error" : undefined}
              {...form.register('stateCode')}
              className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"
             data-testid="admin_settings-admin_settings-gst-control-5">
              {GST_STATE_CODES.map((o, __testIdIndex85) => <option key={o.value} value={o.value} data-testid={`admin_settings-admin_settings-gst-control-6-map85-${__testIdIndex85}-1`}>{t(o.labelKey)}</option>)}
            </select>
            {form.formState.errors.stateCode && <p id="admin-settings-gst-state-code-error" role="alert" className="text-xs text-danger mt-1">{getValidationMessage(form.formState.errors.stateCode.message)}</p>}
          </div>
          <div>
            <label htmlFor="admin-settings-gst-hsn-code" className="block text-sm font-medium text-secondary mb-1">{t('settings.admin_settings_gst.text_ce42f158ea')}</label>
            <input aria-describedby={form.formState.errors.hsnCode ? "admin-settings-gst-hsnCode-error" : undefined} aria-invalid={Boolean(form.formState.errors.hsnCode)} id="admin-settings-gst-hsn-code"
              type="text"
              {...form.register('hsnCode')}
              placeholder={t('settings.AdminSettingsGST.text_hsnExample')}
              className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary font-mono focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"
             data-testid="admin_settings-admin_settings-gst-control-7"/>
            {form.formState.errors.hsnCode && <p id="admin-settings-gst-hsnCode-error" role="alert" className="text-xs text-danger mt-1">{getValidationMessage(form.formState.errors.hsnCode.message)}</p>}
            <p className="text-xs text-secondary mt-1">{t('settings.admin_settings_gst.text_8ac5e79843')}</p>
          </div>
        </div>
        <div className="space-y-3 pt-2 border-t border-border">
          <p className="text-sm font-semibold text-primary">{t('settings.admin_settings_gst.text_5b1087edf1')}</p>
          <div className="flex items-center justify-between p-3 bg-input rounded-xl border border-border">
            <AdminSettingsToggleSwitch
              checked={formValues.showGstOnInvoice ?? initialData.showGstOnInvoice}
              onChange={(v) => form.setValue('showGstOnInvoice', v, { shouldDirty: true })}
              label={t('settings.admin_settings_gst.auto_showGstBreakdown')}
             data-testid="admin_settings-admin_settings-gst-change"/>
          </div>
          <div className="flex items-center justify-between p-3 bg-input rounded-xl border border-border">
            <AdminSettingsToggleSwitch
              checked={formValues.taxInclusivePricing ?? initialData.taxInclusivePricing}
              onChange={(v) => form.setValue('taxInclusivePricing', v, { shouldDirty: true })}
              label={t('settings.admin_settings_gst.auto_taxInclusive')}
             data-testid="admin_settings-admin_settings-gst-change-2"/>
          </div>
        </div>
      </div>
    </form>
  );
}
