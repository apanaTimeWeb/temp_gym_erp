"use client";
// Route entry for the independently navigable Subscriptions Plans capability.
import AdminSubscriptionsManagementPlanCards from '@/app/frontend_admin/admin_billing/billing_subscription_plans/components/plan_cards/AdminBillingSubscriptionPlansPlanCards';
import { useTranslations } from 'next-intl';
import { useAdminSubscriptionsLogic } from '@/app/frontend_admin/admin_billing/billing_subscription_plans/hooks/useAdminBillingSubscriptionPlansLogic';

import { AdminNavigationLayoutConfirmProvider as AdminBillingLocalConfirmProvider } from '@/app/frontend_admin/admin_billing/billing_subscription_plans/components/feedback/AdminBillingSubscriptionPlansConfirmProvider';

function AdminBillingSubscriptionPlansPageContent() {
  const t = useTranslations();
  const { retrySubscription, status } = useAdminSubscriptionsLogic();
  return <main className="min-h-full bg-page p-6 text-primary space-y-5">
    <h1 className="text-2xl font-bold">{t('subscriptions.admin_subscriptions_main.auto_tabPlans')}</h1>
    {status === 'pending' && <p role="status" className="rounded-lg border border-border bg-card p-4">{t('subscriptions.AdminSubscriptionsError.loadingSubscription')}</p>}
    {status === 'error' && <div role="alert" className="rounded-lg border border-danger bg-danger-bg p-4 text-danger"><p>{t('subscriptions.AdminSubscriptionsError.subscriptionLoadFailed')}</p><button type="button" onClick={()=>void retrySubscription()} className="mt-2 min-h-11 rounded-lg border border-danger px-3">{t('subscriptions.AdminSubscriptionsError.retry')}</button></div>}
    <section className="space-y-5" aria-label={t('subscriptions.admin_subscriptions_main.ariaPlansWorkflow')}>
      <AdminSubscriptionsManagementPlanCards />
    </section>
  </main>;
}

// Mount the context ABOVE the component calling useAdminSubscriptionsLogic().
export default function AdminBillingSubscriptionPlansPage() {
  return <AdminBillingLocalConfirmProvider><AdminBillingSubscriptionPlansPageContent /></AdminBillingLocalConfirmProvider>;
}
