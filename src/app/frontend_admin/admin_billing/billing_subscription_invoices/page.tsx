"use client";
// Route entry for the independently navigable Subscriptions Invoices capability.
import { AdminNavigationLayoutConfirmProvider } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/components/feedback/AdminBillingSubscriptionInvoicesConfirmProvider';
import AdminSubscriptionsManagementInvoices from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/components/invoices/AdminBillingSubscriptionInvoicesInvoices';
import { useTranslations } from 'next-intl';

export default function AdminBillingSubscriptionInvoicesPage() {
  const t = useTranslations();
  return <main className="min-h-full bg-page p-6 text-primary space-y-5">
    <h1 className="text-2xl font-bold">{t('subscriptions.admin_subscriptions_main.auto_tabInvoices')}</h1>
    <section className="space-y-5" aria-label={t('subscriptions.admin_subscriptions_main.ariaInvoicesWorkflow')}>
      <AdminNavigationLayoutConfirmProvider><AdminSubscriptionsManagementInvoices /></AdminNavigationLayoutConfirmProvider>
    </section>
  </main>;
}
