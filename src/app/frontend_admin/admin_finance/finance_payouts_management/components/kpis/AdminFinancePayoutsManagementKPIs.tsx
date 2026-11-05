"use client";
// RESPONSIBILITY: KPI cards for the Payouts module.
// DATA FLOW: feature data/state and user input → AdminFinancePayoutsManagementKPIs → accessible UI/events routed to owning hooks (admin_finance/finance_payouts_management/components/kpis/AdminFinancePayoutsManagementKPIs.tsx)

import { useLocale, useTranslations } from 'next-intl';

import { TrendingUp, IndianRupee, TrendingDown, Clock } from 'lucide-react';
import AdminNavigationLayoutStatCard from '@/app/frontend_admin/admin_finance/finance_payouts_management/components/AdminFinancePayoutsManagementStatCard';
import { useAdminPayoutsLogic } from '@/app/frontend_admin/admin_finance/finance_payouts_management/hooks/useAdminFinancePayoutsManagementLogic';
import { AdminPayoutsFormatCurrency } from '@/app/frontend_admin/admin_finance/finance_payouts_management/utils/AdminFinancePayoutsManagementFormatCurrency';


/**
 * AdminFinancePayoutsManagementKPIs renders the admin payouts kpis UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinancePayoutsManagementKPIs: KPI cards for the Payouts module.
 * @dependencies Consumes AdminNavigationLayoutStatCard, useAdminPayoutsLogic, AdminPayoutsFormatCurrency.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinancePayoutsManagementKPIs() {
  const locale = useLocale();
  const t = useTranslations();
  const { kpis, kpiStatus, retryKpis } = useAdminPayoutsLogic();
  const dateSuffix = "";
  if (kpiStatus === 'pending' && !kpis) return <div role="status" aria-live="polite" className="rounded-xl border border-border bg-card p-4 text-sm text-secondary" data-testid="payouts-management-payouts-management-kp-is-status-region">{t('payouts.AdminRepair.loadingSummary')}</div>;
  if (kpiStatus === 'error' && !kpis) return <div role="alert" className="rounded-xl border border-danger bg-danger-bg p-4 text-sm text-danger"><p>{t('payouts.AdminRepair.summaryLoadError')}</p><button type="button" onClick={() => void retryKpis()} className="mt-3 min-h-11 rounded-lg border border-border px-4" data-testid="payouts-management-payouts-management-kp-is-retry-kpis">{t('payouts.AdminRepair.retry')}</button></div>;
  if (!kpis) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4" data-testid="admin_payouts-adminpayoutskpis-summary">
      <AdminNavigationLayoutStatCard title={t('payouts.admin_payouts_kpis.auto_netProfit', { suffix: dateSuffix })} value={AdminPayoutsFormatCurrency(kpis.totalNetProfit, undefined, locale)} change={t('admin_payouts_kpis.auto_afterDeductions')} changeType="up" icon={TrendingUp} iconBg="bg-success-bg" iconColor="text-success"  testId="admin_payouts-adminpayoutskpis-kpi-1"/>
      <AdminNavigationLayoutStatCard title={t('payouts.admin_payouts_kpis.auto_grossRevenue', { suffix: dateSuffix })} value={AdminPayoutsFormatCurrency(kpis.totalGrossRevenue, undefined, locale)} change={t('admin_payouts_kpis.auto_allGymsCombined')} changeType="neutral" icon={IndianRupee} iconBg="bg-primary-subtle" iconColor="text-primary"  testId="admin_payouts-adminpayoutskpis-kpi-2"/>
      <AdminNavigationLayoutStatCard title={t('payouts.admin_payouts_kpis.auto_totalExpenses', { suffix: dateSuffix })} value={AdminPayoutsFormatCurrency(kpis.totalExpenses, undefined, locale)} change={t('admin_payouts_kpis.auto_payrollOps')} changeType="down" icon={TrendingDown} iconBg="bg-danger-bg" iconColor="text-danger"  testId="admin_payouts-adminpayoutskpis-kpi-3"/>
      <AdminNavigationLayoutStatCard title={t('payouts.admin_payouts_kpis.auto_pendingPayouts', { suffix: dateSuffix })} value={kpis.pendingPayouts} change={t('admin_payouts_kpis.auto_awaitingTransfer')} changeType="neutral" icon={Clock} iconBg="bg-warning-bg" iconColor="text-warning"  testId="admin_payouts-adminpayoutskpis-kpi-4"/>
    </div>
  );
}
