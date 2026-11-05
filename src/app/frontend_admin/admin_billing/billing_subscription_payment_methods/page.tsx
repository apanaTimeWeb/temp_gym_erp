"use client";
// Route entry for the independently navigable Subscriptions Payment methods capability.
import AdminSubscriptionsManagementPaymentMethod from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/components/payment_method/AdminBillingSubscriptionPaymentMethodsPaymentMethod';
import { useTranslations } from 'next-intl';

export default function AdminSubscriptionsPaymentmethodsPage() {
  const t = useTranslations();
  return <main className="min-h-full bg-page p-6 text-primary space-y-5">
    <h1 className="text-2xl font-bold">{t('subscriptions.admin_subscriptions_main.auto_tabPayment')}</h1>
    <section className="space-y-5" aria-label={t('subscriptions.admin_subscriptions_main.ariaPaymentMethodsWorkflow')}>
      <AdminSubscriptionsManagementPaymentMethod />
    </section>
  </main>;
}
