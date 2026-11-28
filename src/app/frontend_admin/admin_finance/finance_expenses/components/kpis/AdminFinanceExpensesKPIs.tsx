"use client";
// RESPONSIBILITY: Displays read-only Finance KPIs and exposes only the meaningful Pending Amount status filter.
// DATA FLOW: feature data/state and user input → AdminFinanceOverviewKPIs → accessible UI/events routed to owning hooks (admin_finance/finance_expenses/components/kpis/AdminFinanceOverviewKPIs.tsx)

import { FINANCE_PAYMENT_STATUSES } from '@/app/frontend_admin/admin_finance/finance_expenses/constants/AdminFinanceExpensesConstants';
import { useTranslations } from 'next-intl';

import { useLocale } from 'next-intl';
import { useAdminFinanceLogic } from '@/app/frontend_admin/admin_finance/finance_expenses/hooks/useAdminFinanceExpensesLogic';
import { FileText, TrendingUp, IndianRupee, CreditCard } from 'lucide-react';
import { AdminFinanceFormatCurrency } from '@/app/frontend_admin/admin_finance/finance_expenses/utils/AdminFinanceExpensesFormatCurrency';


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
    { label: t('finance.AdminAuditRepair.totalRevenue'), value: AdminFinanceFormatCurrency(summary.totalRevenue, undefined, locale), icon: TrendingUp, colorClass: 'text-success', bgClass: 'bg-success-bg', activeBorder: 'border-emerald-500/40', surface: 'bg-card dark:bg-gradient-to-br dark:from-[#0C2722] dark:via-[#121E2D] dark:to-[#0C1220]', topBar: 'from-[#10B981] via-[#34D399] to-transparent' },
    { label: t('finance.AdminAuditRepair.monthlyRevenue'), value: AdminFinanceFormatCurrency(summary.monthlyRevenue, undefined, locale), icon: IndianRupee, colorClass: 'text-primary', bgClass: 'bg-primary-subtle', activeBorder: 'border-orange-500/40', surface: 'bg-card dark:bg-gradient-to-br dark:from-[#2B1513] dark:via-[#141B2D] dark:to-[#0C1220]', topBar: 'from-[#FF5A1F] via-[#FB923C] to-transparent' },
    { label: t('finance.AdminAuditRepair.pendingAmount'), value: AdminFinanceFormatCurrency(summary.pendingAmount, undefined, locale), icon: FileText, colorClass: 'text-warning', bgClass: 'bg-warning-bg', activeBorder: 'border-amber-500/50 ring-2 ring-amber-500/40', surface: 'bg-card dark:bg-gradient-to-br dark:from-[#281E10] dark:via-[#151B2C] dark:to-[#0C1220]', topBar: 'from-[#F59E0B] via-[#FACC15] to-transparent', filter: FINANCE_PAYMENT_STATUSES[1] },
    { label: t('finance.AdminAuditRepair.totalExpenses'), value: AdminFinanceFormatCurrency(summary.totalExpenses, undefined, locale), icon: CreditCard, colorClass: 'text-danger', bgClass: 'bg-danger-bg', activeBorder: 'border-rose-500/40', surface: 'bg-card dark:bg-gradient-to-br dark:from-[#2B121B] dark:via-[#141B2D] dark:to-[#0C1220]', topBar: 'from-[#F43F5E] via-[#FB7185] to-transparent' },
    { label: t('finance.AdminAuditRepair.netProfit'), value: AdminFinanceFormatCurrency(summary.netProfit, undefined, locale), icon: TrendingUp, colorClass: 'text-success', bgClass: 'bg-success-bg', activeBorder: 'border-emerald-500/40', surface: 'bg-card dark:bg-gradient-to-br dark:from-[#0C2722] dark:via-[#121E2D] dark:to-[#0C1220]', topBar: 'from-[#10B981] via-[#34D399] to-transparent' },
  ] as const;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {kpis.map((kpi , __testIdIndex34) => {
        const isPendingFilter = 'filter' in kpi;
        const isActive = isPendingFilter && statusFilter === kpi.filter;
        const content = (
          <>
            <span aria-hidden="true" className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${kpi.topBar}`} />
            <div className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 ${kpi.bgClass}`}><kpi.icon size={18} className={kpi.colorClass} /></div>
            <div className="relative min-w-0 flex-1"><p className="truncate text-xs font-semibold uppercase tracking-wider text-secondary">{kpi.label}</p><p className={`truncate text-xl font-extrabold tabular-nums mt-0.5 ${isActive ? kpi.colorClass : 'text-text-primary'}`}>{kpi.value}</p></div>
          </>
        );
        const className = `relative overflow-hidden flex items-center gap-3 rounded-2xl border p-4 text-left shadow-card motion-safe:transition-all motion-safe:hover:-translate-y-0.5 ${kpi.surface} ${isActive ? kpi.activeBorder : 'border-border'}`;
        return isPendingFilter ? (
          <button key={kpi.label} type="button" className={`focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11 motion-safe:active:scale-95 ${className} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out`} aria-pressed={isActive} onClick={() => setStatusFilter(isActive ? 'All' : kpi.filter)} data-testid={`admin_finance-admin_finance-kpis-click-map34-${__testIdIndex34}-1`}>{content}</button>
        ) : <div key={kpi.label} className={className}>{content}</div>;
      })}
    </div>
  );
}
