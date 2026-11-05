"use client";
// Route entry for the independently navigable Subscriptions Overview capability.

import AdminSubscriptionsManagementKPIs from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/components/kpis/AdminBillingSubscriptionsOverviewKPIs';
import { useAdminSubscriptionsLogic } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/hooks/useAdminBillingSubscriptionsOverviewLogic';
import { AdminSubscriptionsFormatCurrency } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/utils/AdminBillingSubscriptionsOverviewFormatCurrency';
import { formatDate } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/utils/AdminBillingSubscriptionsOverviewFormatters';
import { PLAN_TIER_STYLES } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/constants/AdminBillingSubscriptionsOverviewConstants';
import { Calendar, ToggleLeft, ToggleRight, Loader2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { AdminNavigationLayoutConfirmProvider as AdminBillingLocalConfirmProvider } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/components/feedback/AdminBillingSubscriptionsOverviewConfirmProvider';

function AdminBillingSubscriptionsOverviewPageContent() {
  const locale = useLocale();
  const t = useTranslations();
  const { subscription, toggleAutoRenew, togglingAutoRenew, retrySubscription, status } = useAdminSubscriptionsLogic();
  const tierStyle = subscription ? PLAN_TIER_STYLES[subscription.tier] : PLAN_TIER_STYLES['growth'];
  return <main className="min-h-full bg-page p-6 text-primary space-y-5">
    <h1 className="text-2xl font-bold">{t('subscriptions.admin_subscriptions_main.auto_tabOverview')}</h1>
    {subscription && <section className={`flex flex-col gap-4 rounded-xl border bg-card p-5 sm:flex-row sm:items-center sm:justify-between ${tierStyle?.border || 'border-border'}`} aria-label={t('subscriptions.admin_subscriptions_main.text_440a9f2ca1')}>
      <div className="flex items-center gap-4"><div className={`rounded-xl p-3 ${tierStyle?.bg || 'bg-card'}`}><Calendar size={18} className={tierStyle?.text || 'text-primary'} aria-hidden="true" /></div><div><p className="text-xs font-semibold uppercase tracking-wider text-secondary">{t('subscriptions.admin_subscriptions_main.text_440a9f2ca1')}</p><p className="text-xl font-bold text-primary">{subscription.planName}</p><p className="mt-0.5 text-sm text-secondary">{AdminSubscriptionsFormatCurrency(subscription.monthlyPrice, undefined, locale)}{t('subscriptions.admin_subscriptions_main.text_7a310fd153')} <span className="font-semibold text-primary">{formatDate(subscription.nextBillingDate, locale)}</span></p></div></div>
      <button type="button" onClick={()=>void toggleAutoRenew()} disabled={togglingAutoRenew} className="inline-flex min-h-11 min-w-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60" aria-label={t('subscriptions.admin_subscriptions_main.text_99209d6924')}>{togglingAutoRenew ? <Loader2 size={18} aria-hidden="true"/> : subscription.autoRenew ? <ToggleRight size={18} className="text-success" aria-hidden="true"/> : <ToggleLeft size={18} className="text-secondary" aria-hidden="true"/>}<span>{togglingAutoRenew ? t('subscriptions.admin_subscriptions_main.auto_3ed83e9c97') : subscription.autoRenew ? t('subscriptions.admin_subscriptions_main.auto_on') : t('subscriptions.admin_subscriptions_main.auto_off')}</span></button>
    </section>}
    {status === 'pending' && <p role="status" className="rounded-lg border border-border bg-card p-4">{t('subscriptions.AdminSubscriptionsError.loadingSubscription')}</p>}
    {status === 'error' && <div role="alert" className="rounded-lg border border-danger bg-danger-bg p-4 text-danger"><p>{t('subscriptions.AdminSubscriptionsError.subscriptionLoadFailed')}</p><button type="button" onClick={()=>void retrySubscription()} className="mt-2 min-h-11 rounded-lg border border-danger px-3">{t('subscriptions.AdminSubscriptionsError.retry')}</button></div>}
    <AdminSubscriptionsManagementKPIs />
    <section className="space-y-5" aria-label={t('subscriptions.admin_subscriptions_main.ariaOverviewWorkflow')}>

    </section>
  </main>;
}

// Mount the context ABOVE the component calling useAdminSubscriptionsLogic().
export default function AdminBillingSubscriptionsOverviewPage() {
  return <AdminBillingLocalConfirmProvider><AdminBillingSubscriptionsOverviewPageContent /></AdminBillingLocalConfirmProvider>;
}
