"use client";
// RESPONSIBILITY: Manages the Payment Gateway settings tab.
// DATA FLOW: feature data/state and user input → AdminSettingsManagementPaymentGateway → accessible UI/events routed to owning hooks (admin_settings/settings_management/components/payment_gateway/AdminSettingsManagementPaymentGateway.tsx)

import { useTranslations } from 'next-intl';
import { resolveAdminSettingsManagementValidationMessage } from '@/app/frontend_admin/admin_settings/settings_management/utils/AdminSettingsManagementValidationMessages';

import { useState } from 'react';
import { useAdminNavigationLayoutConfirm } from '@/app/frontend_admin/admin_settings/settings_management/hooks/useAdminSettingsManagementConfirm';
import type { PaymentGatewaySettingsType } from '@/app/frontend_admin/admin_settings/settings_management/types/AdminSettingsManagementTypes';
import { useAdminSettingsPaymentGatewayForm } from '@/app/frontend_admin/admin_settings/settings_management/hooks/useAdminSettingsManagementForms';
import { Save, Loader2, RefreshCw, CreditCard, Receipt, Eye, EyeOff } from 'lucide-react';
import { AdminSettingsManagementToggleSwitch as AdminSettingsToggleSwitch } from '@/app/frontend_admin/admin_settings/settings_management/components/shared/AdminSettingsManagementToggleSwitch';
import type { AdminSettingsPaymentGatewayProps } from '@/app/frontend_admin/admin_settings/settings_management/types/AdminSettingsManagementPaymentGatewayPropsTypes';

/**
 * AdminSettingsManagementPaymentGateway renders the admin settings payment gateway UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSettingsManagementPaymentGateway: Manages the Payment Gateway settings tab.
 * @dependencies Consumes AdminSettingsTypes, useAdminSettingsForms, AdminSettingsToggleSwitch.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export function AdminSettingsManagementPaymentGateway({ initialData }: AdminSettingsPaymentGatewayProps) {
  const t = useTranslations();
  const getValidationMessage = (message: unknown) => resolveAdminSettingsManagementValidationMessage(message, (key) => t(key));

  const [showWebhookSecret, setShowWebhookSecret] = useState(false);
  const {confirm} = useAdminNavigationLayoutConfirm();

  const { form, formValues, mutation, submitForm } = useAdminSettingsPaymentGatewayForm(initialData);

  const onSubmit = async (data: PaymentGatewaySettingsType) => {
    const proceed = await confirm({ title: t('settings.AdminRepair.paymentConfirmTitle'), message: t('settings.AdminRepair.paymentConfirmMessage'), type: 'warning', confirmText: t('settings.AdminRepair.saveChanges'), cancelText: t('settings.AdminRepair.cancel') });
    if (proceed) await submitForm(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="bg-card rounded-xl shadow-card border border-border mt-6" data-testid="admin_settings-admin_settings-payment-gateway-submit">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-bold text-primary text-lg">{t('settings.admin_settings_payment_gateway.text_ec48c5e870')}</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => form.reset(initialData)}
            disabled={!form.formState.isDirty || mutation.isPending}
            className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-input text-secondary flex items-center gap-2 motion-safe:transition-colors disabled:opacity-50 motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
           data-testid="admin_settings-admin_settings-payment-gateway-click">
            <RefreshCw size={18}  strokeWidth={2}/> {t('settings.admin_settings_payment_gateway.text_44c57abd88')}</button>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="px-4 py-2 text-sm bg-primary text-on-primary rounded-lg font-medium flex items-center gap-2 disabled:opacity-70 hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
           data-testid="admin_settings-admin_settings-payment-gateway-submit-2">
            {mutation.isPending ? <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true"  strokeWidth={2}/> : <Save size={18}  strokeWidth={2}/>} {mutation.isPending ? t('settings.admin_settings_payment_gateway.auto_8f6e2e536c') : t('settings.admin_settings_payment_gateway.auto_9790f49529')}
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-input rounded-xl border border-border p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary-subtle flex items-center justify-center">
                <CreditCard size={18} className="text-primary"  strokeWidth={2}/>
              </div>
              <p className="text-sm font-semibold text-primary">{t('settings.admin_settings_payment_gateway.text_a3ccb33027')}</p>
            </div>
            <div className="w-48">
              <AdminSettingsToggleSwitch
                checked={formValues.razorpayEnabled ?? initialData.razorpayEnabled}
                onChange={(v: boolean) => form.setValue('razorpayEnabled', v, { shouldDirty: true })}
                label={t('settings.AdminRepair.razorpayToggle')}
               data-testid="admin_settings-admin_settings-payment-gateway-change"/>
            </div>
          </div>
          {formValues.razorpayEnabled && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="admin-settings-payment-razorpay-key-id" className="block text-xs font-medium text-secondary mb-1">{t('settings.admin_settings_payment_gateway.text_4ade01490a')}</label>
                <input
                  type="text"
                  id="admin-settings-payment-razorpay-key-id" aria-invalid={Boolean(form.formState.errors.razorpayKeyId)} aria-describedby={form.formState.errors.razorpayKeyId ? "admin-settings-payment-razorpayKeyId-error" : undefined} {...form.register('razorpayKeyId')}
                  placeholder={t('settings.admin_settings_payment_gateway.text_32ec86eb15')}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary font-mono motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"
                 data-testid="admin_settings-admin_settings-payment-gateway-control"/>
                {form.formState.errors.razorpayKeyId && <p id="admin-settings-payment-razorpayKeyId-error" role="alert" className="text-xs text-danger mt-1">{getValidationMessage(form.formState.errors.razorpayKeyId.message)}</p>}
              </div>
              <div>
                <label htmlFor="admin-settings-payment-razorpay-webhook-secret" className="block text-xs font-medium text-secondary mb-1">{t('settings.admin_settings_payment_gateway.text_095d92f566')}</label>
                <div className="flex gap-2">
                  <input
                    type={showWebhookSecret ? 'text' : 'password'}
                    id="admin-settings-payment-razorpay-webhook-secret" aria-invalid={Boolean(form.formState.errors.razorpayWebhookSecret)} aria-describedby={form.formState.errors.razorpayWebhookSecret ? "admin-settings-payment-razorpayWebhookSecret-error" : undefined} {...form.register('razorpayWebhookSecret')}
                    autoComplete="off" spellCheck={false}
                    placeholder={t('settings.admin_settings_payment_gateway.text_9d1a8d8480')}
                    className="flex-1 px-3 py-2 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"
                   data-testid="admin_settings-admin_settings-payment-gateway-control-2"/>
                {form.formState.errors.razorpayWebhookSecret && <p id="admin-settings-payment-razorpayWebhookSecret-error" role="alert" className="text-xs text-danger mt-1">{getValidationMessage(form.formState.errors.razorpayWebhookSecret.message)}</p>}
                  <button
                    type="button"
                    onClick={() => setShowWebhookSecret((visible) => !visible)}
                    className="min-h-11 min-w-11 inline-flex items-center justify-center border border-border rounded-lg text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95"
                    aria-label={showWebhookSecret ? t('settings.admin_settings_payment_gateway.auto_hideWebhookSecret') : t('settings.admin_settings_payment_gateway.auto_showWebhookSecret')}
                    data-testid="admin_settings-admin_settings-payment-gateway-toggle-webhook-secret-visibility"
                  >
                    {showWebhookSecret ? <EyeOff size={18} aria-hidden="true"  strokeWidth={2}/> : <Eye size={18} aria-hidden="true"  strokeWidth={2}/>}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-input rounded-xl border border-border p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-success-bg flex items-center justify-center">
                <Receipt size={18} className="text-success"  strokeWidth={2}/>
              </div>
              <p className="text-sm font-semibold text-primary">{t('settings.admin_settings_payment_gateway.text_40c662cbb8')}</p>
            </div>
            <div className="w-48">
              <AdminSettingsToggleSwitch
                checked={formValues.upiEnabled ?? initialData.upiEnabled}
                onChange={(v: boolean) => form.setValue('upiEnabled', v, { shouldDirty: true })}
                label={t('settings.AdminRepair.upiToggle')}
               data-testid="admin_settings-admin_settings-payment-gateway-change-2"/>
            </div>
          </div>
          {formValues.upiEnabled && (
            <div>
              <label htmlFor="admin-settings-payment-upi-id" className="block text-xs font-medium text-secondary mb-1">{t('settings.admin_settings_payment_gateway.text_d06f3a68c1')}</label>
              <input
                type="text"
                id="admin-settings-payment-upi-id" aria-invalid={Boolean(form.formState.errors.upiId)} aria-describedby={form.formState.errors.upiId ? "admin-settings-payment-upiId-error" : undefined} {...form.register('upiId')}
                placeholder={t('settings.admin_settings_payment_gateway.text_49e07d4849')}
                className="w-full px-3 py-2 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"
               data-testid="admin_settings-admin_settings-payment-gateway-control-3"/>
                {form.formState.errors.upiId && <p id="admin-settings-payment-upiId-error" role="alert" className="text-xs text-danger mt-1">{getValidationMessage(form.formState.errors.upiId.message)}</p>}
            </div>
          )}
        </div>

        <div className="space-y-3 pt-2 border-t border-border">
          <p className="text-sm font-semibold text-primary">{t('settings.admin_settings_payment_gateway.text_a52a31d210')}</p>
          <div className="flex items-center justify-between p-3 bg-input rounded-xl border border-border">
            <AdminSettingsToggleSwitch
              checked={formValues.cashEnabled ?? initialData.cashEnabled}
              onChange={(v: boolean) => form.setValue('cashEnabled', v, { shouldDirty: true })}
              label={t('settings.admin_settings_payment_gateway.auto_acceptCash')}
             data-testid="admin_settings-admin_settings-payment-gateway-change-3"/>
          </div>
          <div className="flex items-center justify-between p-3 bg-input rounded-xl border border-border">
            <AdminSettingsToggleSwitch
              checked={formValues.autoReceiptEnabled ?? initialData.autoReceiptEnabled}
              onChange={(v: boolean) => form.setValue('autoReceiptEnabled', v, { shouldDirty: true })}
              label={t('settings.admin_settings_payment_gateway.auto_generateReceipt')}
             data-testid="admin_settings-admin_settings-payment-gateway-change-4"/>
          </div>
          <div>
            <label htmlFor="admin-settings-payment-receipt-prefix" className="block text-sm font-medium text-secondary mb-1">{t('settings.admin_settings_payment_gateway.text_b07192bdd0')}</label>
            <input
              type="text"
              aria-describedby={form.formState.errors.receiptPrefix ? "admin-settings-payment-receiptPrefix-error" : undefined} id="admin-settings-payment-receipt-prefix" aria-invalid={Boolean(form.formState.errors.receiptPrefix)} {...form.register('receiptPrefix')}
              maxLength={6}
              placeholder={t('settings.admin_settings_payment_gateway.text_b00288757d')}
              className="w-32 px-3 py-2.5 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary font-mono uppercase motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"
             data-testid="admin_settings-admin_settings-payment-gateway-control-4"/>
            {form.formState.errors.receiptPrefix && <p id="admin-settings-payment-receiptPrefix-error" role="alert" className="text-xs text-danger mt-1">{getValidationMessage(form.formState.errors.receiptPrefix.message)}</p>}
            <p className="text-xs text-secondary mt-1">{t('settings.admin_settings_payment_gateway.text_e4d59c7391')}</p>
          </div>
        </div>
      </div>
    </form>
  );
}
