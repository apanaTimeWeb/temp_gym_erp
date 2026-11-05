"use client";
// RESPONSIBILITY: KPI cards for the Subscriptions module.
// DATA FLOW: feature data/state and user input → AdminSubscriptionsManagementKPIs → accessible UI/events routed to owning hooks (admin_subscriptions/subscriptions_overview/components/kpis/AdminSubscriptionsManagementKPIs.tsx)

import { useLocale, useTranslations } from 'next-intl';
import { AdminSubscriptionsFormatCurrency } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/utils/AdminBillingSubscriptionsOverviewFormatCurrency';

import { CreditCard, IndianRupee, FileText, Calendar, TrendingDown, Zap } from 'lucide-react';
import AdminNavigationLayoutStatCard from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/components/AdminBillingSubscriptionsOverviewStatCard';
import { useAdminSubscriptionsLogic } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/hooks/useAdminBillingSubscriptionsOverviewLogic';

/**
 * AdminSubscriptionsManagementKPIs renders the admin subscriptions kpis UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSubscriptionsManagementKPIs: KPI cards for the Subscriptions module.
 * @dependencies Consumes AdminSubscriptionsFormatCurrency, AdminNavigationLayoutStatCard, useAdminSubscriptionsLogic.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminSubscriptionsManagementKPIs() {
  const locale = useLocale();
  const t = useTranslations();
  const { kpis, kpisStatus, retryKpis } = useAdminSubscriptionsLogic();
  const dateSuffix = "";
  if (kpisStatus === 'pending') return <div className="rounded-xl border border-border p-4 text-sm text-secondary" role="status" data-testid="subscriptions-management-subscriptions-management-kp-is-status-region">{t('subscriptions.AdminSubscriptionsError.loadingKpis')}</div>;
  if (kpisStatus === 'error') return <div className="rounded-xl border border-border bg-danger-bg p-4" role="alert"><p className="text-sm text-danger">{t('subscriptions.AdminSubscriptionsError.kpiLoadFailed')}</p><button type="button" onClick={() => void retryKpis()} className="mt-2 min-h-11 rounded-lg border border-border px-3 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="subscriptions-management-subscriptions-management-kp-is-retry-kpis">{t('subscriptions.AdminSubscriptionsError.retry')}</button></div>;
  if (!kpis) return <div className="rounded-xl border border-border p-4 text-sm text-secondary">{t('subscriptions.AdminSubscriptionsError.noKpis')}</div>;

  const fmt = (v: number) => AdminSubscriptionsFormatCurrency(v, undefined, locale);

  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-4" data-testid="admin_subscriptions-adminsubscriptionskpis-summary">
      <AdminNavigationLayoutStatCard title={t('subscriptions.admin_subscriptions_kpis.auto_currentPlan', { suffix: dateSuffix })} value={kpis.currentPlan} icon={Zap} iconBg="bg-primary-subtle" iconColor="text-primary"  testId="admin_subscriptions-adminsubscriptionskpis-kpi-1"/>
      <AdminNavigationLayoutStatCard title={t('subscriptions.admin_subscriptions_kpis.auto_monthlySpend', { suffix: dateSuffix })} value={fmt(kpis.monthlySpend)} icon={IndianRupee} iconBg="bg-success-bg" iconColor="text-success"  testId="admin_subscriptions-adminsubscriptionskpis-kpi-2"/>
      <AdminNavigationLayoutStatCard title={t('subscriptions.admin_subscriptions_kpis.auto_totalInvoices', { suffix: dateSuffix })} value={kpis.totalInvoices} change={t('admin_subscriptions_kpis.auto_allTime')} changeType="neutral" icon={FileText} iconBg="bg-info-bg" iconColor="text-info"  testId="admin_subscriptions-adminsubscriptionskpis-kpi-3"/>
      <AdminNavigationLayoutStatCard title={t('subscriptions.admin_subscriptions_kpis.auto_nextBilling', { suffix: dateSuffix })} value={fmt(kpis.nextBillingAmount)} icon={CreditCard} iconBg="bg-primary-subtle" iconColor="text-primary"  testId="admin_subscriptions-adminsubscriptionskpis-kpi-4"/>
      <AdminNavigationLayoutStatCard title={t('subscriptions.admin_subscriptions_kpis.auto_daysToRenewal', { suffix: dateSuffix })} value={kpis.daysUntilRenewal} change={t('admin_subscriptions_kpis.auto_daysRemaining')} changeType="neutral" icon={Calendar} iconBg="bg-warning-bg" iconColor="text-warning"  testId="admin_subscriptions-adminsubscriptionskpis-kpi-5"/>
      <AdminNavigationLayoutStatCard title={t('subscriptions.admin_subscriptions_kpis.auto_saveAnnual', { suffix: dateSuffix })} value={fmt(kpis.savedWithAnnual)} change={t('admin_subscriptions_kpis.auto_vsMonthlyBilling')} changeType="up" icon={TrendingDown} iconBg="bg-success-bg" iconColor="text-success"  testId="admin_subscriptions-adminsubscriptionskpis-kpi-6"/>
    </div>
  );
}
