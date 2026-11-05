"use client";
// RESPONSIBILITY: Renders the human-readable masked label for one subscription payment method.
// DATA FLOW: feature data/state and user input → AdminSubscriptionsManagementPaymentMethodLabel → accessible UI/events routed to owning hooks (admin_subscriptions/subscriptions_overview/components/payment_method/AdminSubscriptionsManagementPaymentMethodLabel.tsx)

import { useTranslations } from 'next-intl';
import type { PaymentMethod } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/types/AdminBillingSubscriptionsOverviewTypes';

import type { AdminSubscriptionsPaymentMethodLabelProps } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/types/AdminBillingSubscriptionsOverviewPaymentMethodLabelPropsTypes';
import { maskAdminSubscriptionsUpiIdentifier } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/utils/AdminBillingSubscriptionsOverviewMaskPaymentIdentifier';


/**
 * AdminSubscriptionsManagementPaymentMethodLabel renders the admin subscriptions payment method label UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSubscriptionsManagementPaymentMethodLabel: Renders the human-readable masked label for one subscription payment method.
 * @dependencies Consumes AdminSubscriptionsTypes, AdminSubscriptionsPaymentMethodLabelPropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminSubscriptionsManagementPaymentMethodLabel({ paymentMethod }: AdminSubscriptionsPaymentMethodLabelProps) {
  const t = useTranslations();

  if (paymentMethod.type === 'upi') return <span className="text-sm font-semibold text-primary" aria-label={t('subscriptions.AdminSubscriptionsPaymentMethodLabel.text_5871b8d86f')}>{maskAdminSubscriptionsUpiIdentifier(paymentMethod.upiId)}</span>;
  if (paymentMethod.type === 'netbanking') return <span className="text-sm font-semibold text-primary">{paymentMethod.bankName} {t('subscriptions.AdminSubscriptionsPaymentMethodLabel.text_3f2b426323')}</span>;
  return (
    <span className="text-sm font-semibold text-primary">
      {paymentMethod.brand} •••• {paymentMethod.last4}
      <span className="text-xs text-secondary ml-2">{t('subscriptions.AdminSubscriptionsPaymentMethodLabel.text_5871b8d86f')}{paymentMethod.expiryMonth}/{paymentMethod.expiryYear}</span>
    </span>
  );
}
