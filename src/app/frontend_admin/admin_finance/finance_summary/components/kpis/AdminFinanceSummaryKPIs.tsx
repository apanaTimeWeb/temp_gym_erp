"use client";
// RESPONSIBILITY: Displays read-only Finance KPIs and exposes only the meaningful Pending Amount status filter.
// DATA FLOW: feature data/state and user input → AdminFinanceOverviewKPIs → accessible UI/events routed to owning hooks (admin_finance/finance_summary/components/kpis/AdminFinanceOverviewKPIs.tsx)

import { FINANCE_PAYMENT_STATUSES } from '@/app/frontend_admin/admin_finance/finance_summary/constants/AdminFinanceSummaryConstants';
import { useTranslations } from 'next-intl';

import { useLocale } from 'next-intl';
import { useAdminFinanceLogic } from '@/app/frontend_admin/admin_finance/finance_summary/hooks/useAdminFinanceSummaryLogic';
import { FileText, TrendingUp, IndianRupee, CreditCard } from 'lucide-react';
import { AdminFinanceFormatCurrency } from '@/app/frontend_admin/admin_finance/finance_summary/utils/AdminFinanceSummaryFormatCurrency';


/**
 * AdminFinanceOverviewKPIs renders the admin finance kpis UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinanceOverviewKPIs: Displays read-only Finance KPIs and exposes only the meaningful Pending Amount status filter.
 * @dependencies Consumes useAdminFinanceLogic, AdminFinanceFormatCurrency.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinanceOverviewKPIs() {
  const t = useTranslations();
  const locale = useLocale();
  const { summary, summaryStatus, statusFilter, setStatusFilter } = useAdminFinanceLogic();
  if (!summary || summaryStatus === 'error') return null;

  const kpis = [
    { label: t('finance.AdminAuditRepair.totalRevenue'), value: AdminFinanceFormatCurrency(summary.totalRevenue, undefined, locale), icon: TrendingUp, colorClass: 'text-success', bgClass: 'bg-success-bg', activeBorder: 'border-border' },
    { label: t('finance.AdminAuditRepair.monthlyRevenue'), value: AdminFinanceFormatCurrency(summary.monthlyRevenue, undefined, locale), icon: IndianRupee, colorClass: 'text-primary', bgClass: 'bg-primary-subtle', activeBorder: 'border-focus' },
    { label: t('finance.AdminAuditRepair.pendingAmount'), value: AdminFinanceFormatCurrency(summary.pendingAmount, undefined, locale), icon: FileText, colorClass: 'text-warning', bgClass: 'bg-warning-bg', activeBorder: 'border-border', filter: FINANCE_PAYMENT_STATUSES[1] },
    { label: t('finance.AdminAuditRepair.totalExpenses'), value: AdminFinanceFormatCurrency(summary.totalExpenses, undefined, locale), icon: CreditCard, colorClass: 'text-danger', bgClass: 'bg-danger-bg', activeBorder: 'border-border' },
    { label: t('finance.AdminAuditRepair.netProfit'), value: AdminFinanceFormatCurrency(summary.netProfit, undefined, locale), icon: TrendingUp, colorClass: 'text-success', bgClass: 'bg-success-bg', activeBorder: 'border-border' },
  ] as const;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
      {kpis.map((kpi , __testIdIndex34) => {
        const isPendingFilter = 'filter' in kpi;
        const isActive = isPendingFilter && statusFilter === kpi.filter;
        const content = (
          <>
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${kpi.bgClass}`}><kpi.icon size={18} className={kpi.colorClass} /></div>
            <div className="min-w-0"><p className="truncate text-xs font-medium text-secondary">{kpi.label}</p><p className={`truncate text-lg font-bold ${isActive ? kpi.colorClass : 'text-primary'}`}>{kpi.value}</p></div>
          </>
        );
        const className = `flex items-center gap-3 rounded-xl border-2 bg-card p-4 text-left shadow-card motion-safe:transition-all ${isActive ? kpi.activeBorder : 'border-border'} ${isPendingFilter ? 'hover:shadow-card' : ''}`;
        return isPendingFilter ? (
          <button key={kpi.label} type="button" className={`focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11 motion-safe:active:scale-95 ${className} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out`} aria-pressed={isActive} onClick={() => setStatusFilter(isActive ? 'All' : kpi.filter)} data-testid={`admin_finance-admin_finance-kpis-click-map34-${__testIdIndex34}-1`}>{content}</button>
        ) : <div key={kpi.label} className={className}>{content}</div>;
      })}
    </div>
  );
}
