"use client";
// RESPONSIBILITY: Renders 4 clickable aggregate KPI cards (Total Revenue, Total Expenses,
// DATA FLOW: feature data/state and user input → AdminFinanceBranchProfitAndLossKPIs → accessible UI/events routed to owning hooks (admin_finance/finance_branch_profit_and_loss/components/kpis/AdminFinanceBranchProfitAndLossKPIs.tsx)

import { FINANCE_PNL_STATUS_FILTERS } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/constants/AdminFinanceBranchProfitAndLossConstants';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
// Net Profit, Margin %). Clicking a Profitable/Loss card filters the table below.

import { TrendingUp, TrendingDown, IndianRupee, Percent, Building2, AlertTriangle } from 'lucide-react';
import type { BranchPnlAggregates, PnlStatusFilter } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/types/AdminFinanceBranchProfitAndLossTypes';

import type { AdminFinancePnlKPIsProps } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/types/AdminFinanceBranchProfitAndLossKPIsPropsTypes';


import { formatPercent1dp } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/utils/AdminFinanceBranchProfitAndLossFormatters';
import { AdminFinanceFormatCurrency } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/utils/AdminFinanceBranchProfitAndLossFormatCurrency';

/**
 * AdminFinanceBranchProfitAndLossKPIs renders the admin finance pnl kpis UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinanceBranchProfitAndLossKPIs: Renders 4 clickable aggregate KPI cards (Total Revenue, Total Expenses,
 * @dependencies Consumes AdminFinanceTypes, AdminFinancePnlKPIsPropsTypes, AdminFinanceFormatters.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinanceBranchProfitAndLossKPIs({
  aggregates,
  statusFilter,
  onStatusFilterChange,
}: AdminFinancePnlKPIsProps) {
  const t = useTranslations();
  const locale = useLocale();
  const kpis = [
    {
      label: t('finance.AdminAuditRepair.totalRevenue'),
      value: AdminFinanceFormatCurrency(aggregates.totalRevenue, undefined, locale),
      icon: IndianRupee,
      iconColor: 'text-success',
      iconBg: 'bg-success-bg',
      activeBorder: 'border-border',
      filter: FINANCE_PNL_STATUS_FILTERS.ALL,
      subtext: t('finance.static.all_branches_combined'),
    },
    {
      label: t('finance.AdminAuditRepair.totalExpenses'),
      value: AdminFinanceFormatCurrency(aggregates.totalExpenses, undefined, locale),
      icon: TrendingDown,
      iconColor: 'text-danger',
      iconBg: 'bg-danger-bg',
      activeBorder: 'border-border',
      filter: FINANCE_PNL_STATUS_FILTERS.ALL,
      subtext: t('finance.static.operational_costs'),
    },
    {
      label: t('finance.AdminAuditRepair.netProfit'),
      value: AdminFinanceFormatCurrency(aggregates.totalNetProfit, undefined, locale),
      icon: aggregates.totalNetProfit >= 0 ? TrendingUp : TrendingDown,
      iconColor: aggregates.totalNetProfit >= 0 ? 'text-success' : 'text-danger',
      iconBg: aggregates.totalNetProfit >= 0 ? 'bg-success-bg' : 'bg-danger-bg',
      activeBorder: aggregates.totalNetProfit >= 0 ? 'border-border' : 'border-border',
      filter: FINANCE_PNL_STATUS_FILTERS.ALL,
      subtext: `${formatPercent1dp(aggregates.overallMarginPct, locale)}% margin`,
    },
    {
      label: t('finance.AdminAuditRepair.profitableBranches'),
      value: `${aggregates.profitableBranches}`,
      icon: Building2,
      iconColor: 'text-primary',
      iconBg: 'bg-primary-subtle',
      activeBorder: 'border-focus',
      filter: FINANCE_PNL_STATUS_FILTERS.PROFITABLE,
      subtext: t('finance.static.click_to_filter'),
    },
    {
      label: t('finance.AdminAuditRepair.lossMakingBranches'),
      value: `${aggregates.lossMakingBranches}`,
      icon: AlertTriangle,
      iconColor: 'text-danger',
      iconBg: 'bg-danger-bg',
      activeBorder: 'border-border',
      filter: FINANCE_PNL_STATUS_FILTERS.LOSS,
      subtext: t('finance.static.click_to_filter'),
    },
    {
      label: t('finance.AdminAuditRepair.avgProfitMargin'),
      value: `${formatPercent1dp(aggregates.overallMarginPct, locale)}%`,
      icon: Percent,
      iconColor: 'text-warning',
      iconBg: 'bg-warning-bg',
      activeBorder: 'border-border',
      filter: FINANCE_PNL_STATUS_FILTERS.ALL,
      subtext: t('finance.static.across_all_branches'),
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpis.map((k , __testIdIndex94) => {
        const isInteractive = k.filter === FINANCE_PNL_STATUS_FILTERS.PROFITABLE || k.filter === FINANCE_PNL_STATUS_FILTERS.LOSS;
        const isActive = isInteractive && statusFilter === k.filter;
        const cardContent = (
          <>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${k.iconBg}`}>
              <k.icon size={18} strokeWidth={2} className={k.iconColor} />
            </div>
            <p className="text-xs font-medium text-secondary uppercase tracking-wider truncate">{k.label}</p>
            <p className={`text-xl font-bold mt-0.5 ${isActive ? k.iconColor : 'text-primary'}`}>{k.value}</p>
            <p className="text-xs text-disabled mt-0.5 truncate">{k.subtext}</p>
          </>
        );
        const cardClass = `text-left rounded-xl p-4 border-2 bg-card ${isActive ? k.activeBorder : 'border-border'} ${isInteractive ? 'hover:shadow-card motion-safe:hover:-translate-y-0.5' : ''}`;
        return isInteractive ? (
          <button type="button" key={k.label} onClick={() => onStatusFilterChange(isActive ? 'ALL' : k.filter)} className={`ease-in-out motion-safe:active:scale-95 min-h-11 min-w-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ${cardClass}`} aria-pressed={isActive} aria-label={t('finance.AdminFinancePnlKPIs.auto_filterBy', { label: k.label })} data-testid={`admin_finance-admin_finance-pnl-kpis-click-map94-${__testIdIndex94}-1`}>{cardContent}</button>
        ) : <div key={k.label} className={cardClass}>{cardContent}</div>;
      })}
    </div>
  );
}
