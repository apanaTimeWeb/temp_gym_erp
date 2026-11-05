"use client";
// RESPONSIBILITY: Renders the period selection segment controls.
// DATA FLOW: feature data/state and user input → AdminFinancePlanRevenueAnalyticsPeriodSelector → accessible UI/events routed to owning hooks (admin_finance/finance_plan_revenue_analytics/components/period_selector/AdminFinancePlanRevenueAnalyticsPeriodSelector.tsx)

import { useTranslations } from 'next-intl';
import { REVENUE_PERIOD_OPTIONS } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/constants/AdminFinancePlanRevenueAnalyticsConstants';
import type { RevenuePeriod } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/types/AdminFinancePlanRevenueAnalyticsTypes';

import type { AdminPlansRevenuePeriodSelectorProps } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/types/AdminFinancePlanRevenueAnalyticsPeriodSelectorPropsTypes';


/**
 * AdminFinancePlanRevenueAnalyticsPeriodSelector renders the admin plans revenue period selector UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinancePlanRevenueAnalyticsPeriodSelector: Renders the period selection segment controls.
 * @dependencies Consumes AdminPlansConstants, AdminPlansRevenueTypes, AdminPlansRevenuePeriodSelectorPropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinancePlanRevenueAnalyticsPeriodSelector({ period, onPeriodChange }: AdminPlansRevenuePeriodSelectorProps) {
  const t = useTranslations();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex flex-wrap gap-1 bg-input border border-border rounded-xl p-1">
        {REVENUE_PERIOD_OPTIONS.map((opt , __testIdIndex22) => (
          <button type="button"
            key={opt.value}
            onClick={() => onPeriodChange(opt.value)}
            aria-pressed={period === opt.value}
            className={`focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95 px-3 py-1.5 rounded-lg text-xs font-semibold motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              period === opt.value
                ? 'bg-primary text-on-primary shadow-card'
                : 'text-secondary hover:text-primary hover:bg-card'
            }`}
           data-testid={`admin_plans-admin_plans-revenue-period-selector-select-map22-${__testIdIndex22}-1`}>
            {t(opt.labelKey)}
          </button>
        ))}
      </div>
    </div>
  );
}
