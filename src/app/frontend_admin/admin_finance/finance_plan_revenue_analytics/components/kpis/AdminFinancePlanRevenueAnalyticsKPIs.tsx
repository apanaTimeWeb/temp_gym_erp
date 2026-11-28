"use client";
// RESPONSIBILITY: Renders KPI cards for the Plan Revenue dashboard.
// DATA FLOW: feature data/state and user input → AdminFinancePlanRevenueAnalyticsKPIs → accessible UI/events routed to owning hooks (admin_finance/finance_plan_revenue_analytics/components/kpis/AdminFinancePlanRevenueAnalyticsKPIs.tsx)

import { useLocale, useTranslations } from 'next-intl';

import { IndianRupee, Users, TrendingUp, Award } from 'lucide-react';
import type { RevenueAggregates } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/types/AdminFinancePlanRevenueAnalyticsTypes';
import { AdminPlansFormatCurrency } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/utils/AdminFinancePlanRevenueAnalyticsFormatCurrency';
import { formatNumber, formatPercent1dp } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/utils/AdminFinancePlanRevenueAnalyticsFormatters';
import type { AdminPlansRevenueKPIsProps } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/types/AdminFinancePlanRevenueAnalyticsKPIsPropsTypes';

/**
 * AdminFinancePlanRevenueAnalyticsKPIs renders the admin plans revenue kpis UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinancePlanRevenueAnalyticsKPIs: Renders KPI cards for the Plan Revenue dashboard.
 * @dependencies Consumes AdminPlansRevenueTypes, AdminPlansFormatters.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinancePlanRevenueAnalyticsKPIs({ aggregates }: AdminPlansRevenueKPIsProps) {
  const t = useTranslations();
  const locale = useLocale();
  const kpis = [
    {
      label: t('plans.AdminAuditRepair.totalRevenue'),
      value: AdminPlansFormatCurrency(aggregates.totalRevenue, undefined, locale),
      icon: IndianRupee,
      iconColor: 'text-orange-400',
      iconBg: 'bg-orange-500/20 border-orange-500/40',
      surface: 'bg-card dark:bg-gradient-to-br dark:from-[#2B1513] dark:via-[#141B2D] dark:to-[#0C1220]',
      border: 'border-orange-500/40',
      topBar: 'from-[#FF5A1F] via-[#FB923C] to-transparent',
    },
    {
      label: t('plans.AdminAuditRepair.totalSubscriptions'),
      value: formatNumber(aggregates.totalSubscriptions, locale),
      icon: Users,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/20 border-emerald-500/40',
      surface: 'bg-card dark:bg-gradient-to-br dark:from-[#0C2722] dark:via-[#121E2D] dark:to-[#0C1220]',
      border: 'border-emerald-500/40',
      topBar: 'from-[#10B981] via-[#34D399] to-transparent',
    },
    {
      label: t('plans.AdminAuditRepair.avgRenewalRate'),
      value: `${formatPercent1dp(aggregates.avgRenewalRate, locale)}%`,
      icon: TrendingUp,
      iconColor: 'text-sky-400',
      iconBg: 'bg-sky-500/20 border-sky-500/40',
      surface: 'bg-card dark:bg-gradient-to-br dark:from-[#0E2438] dark:via-[#131D2E] dark:to-[#0C1220]',
      border: 'border-sky-500/40',
      topBar: 'from-[#38BDF8] via-[#22D3EE] to-transparent',
    },
    {
      label: t('plans.AdminAuditRepair.topPerformingPlan'),
      value: aggregates.topPerformingPlanName,
      icon: Award,
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-500/20 border-amber-500/40',
      surface: 'bg-card dark:bg-gradient-to-br dark:from-[#281E10] dark:via-[#151B2C] dark:to-[#0C1220]',
      border: 'border-amber-500/40',
      topBar: 'from-[#F59E0B] via-[#FACC15] to-transparent',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4" data-testid="admin_plans-adminplansrevenuekpis-summary">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div key={kpi.label} className={`relative overflow-hidden rounded-2xl p-5 shadow-card border ${kpi.surface} ${kpi.border} flex items-center justify-between gap-3`}>
            <span aria-hidden="true" className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${kpi.topBar}`} />
            <div className="min-w-0 overflow-hidden">
              <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-1 truncate">{kpi.label}</p>
              <p className="text-kpi font-extrabold text-text-primary tabular-nums truncate" title={kpi.value.toString()}>{kpi.value}</p>
            </div>
            <div className={`p-2.5 rounded-xl border flex items-center justify-center shrink-0 ${kpi.iconBg}`}>
              <Icon size={18} strokeWidth={2.2} className={kpi.iconColor} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
