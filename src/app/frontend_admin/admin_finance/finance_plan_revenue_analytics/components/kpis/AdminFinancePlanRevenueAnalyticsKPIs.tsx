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
      iconColor: 'text-primary',
      iconBg: 'bg-primary-subtle',
    },
    {
      label: t('plans.AdminAuditRepair.totalSubscriptions'),
      value: formatNumber(aggregates.totalSubscriptions, locale),
      icon: Users,
      iconColor: 'text-success',
      iconBg: 'bg-success-bg',
    },
    {
      label: t('plans.AdminAuditRepair.avgRenewalRate'),
      value: `${formatPercent1dp(aggregates.avgRenewalRate, locale)}%`,
      icon: TrendingUp,
      iconColor: 'text-info',
      iconBg: 'bg-info-bg',
    },
    {
      label: t('plans.AdminAuditRepair.topPerformingPlan'),
      value: aggregates.topPerformingPlanName,
      icon: Award,
      iconColor: 'text-warning',
      iconBg: 'bg-warning-bg',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-testid="admin_plans-adminplansrevenuekpis-summary">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div key={kpi.label} className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${kpi.iconBg}`}>
              <Icon size={18} strokeWidth={2} className={kpi.iconColor} />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1 truncate">{kpi.label}</p>
              <p className="text-2xl font-black text-primary truncate" title={kpi.value.toString()}>{kpi.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
