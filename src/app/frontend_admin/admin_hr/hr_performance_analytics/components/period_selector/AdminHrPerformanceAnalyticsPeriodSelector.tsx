"use client";
// RESPONSIBILITY: Renders the period selection buttons and export action for the dashboard.
// DATA FLOW: feature data/state and user input → AdminHrPerformanceAnalyticsPeriodSelector → accessible UI/events routed to owning hooks (admin_hr/hr_performance_analytics/components/period_selector/AdminHrPerformanceAnalyticsPeriodSelector.tsx)

import { useTranslations } from 'next-intl';
import { PERFORMANCE_PERIOD_OPTIONS } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/constants/AdminHrPerformanceAnalyticsConstants';
import type { PerformancePeriod } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/types/AdminHrPerformanceAnalyticsTypes';

import type { AdminHrPerformancePeriodSelectorProps } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/types/AdminHrPerformanceAnalyticsPeriodSelectorPropsTypes';


/**
 * AdminHrPerformanceAnalyticsPeriodSelector renders the admin hr performance period selector UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminHrPerformanceAnalyticsPeriodSelector: Renders the period selection buttons and export action for the dashboard.
 * @dependencies Consumes AdminHrConstants, AdminHrPerformanceTypes, AdminHrPerformancePeriodSelectorPropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminHrPerformanceAnalyticsPeriodSelector({ period, onPeriodChange }: AdminHrPerformancePeriodSelectorProps) {
  const t = useTranslations();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex flex-wrap gap-1 bg-input border border-border rounded-xl p-1">
        {PERFORMANCE_PERIOD_OPTIONS.map((opt , __testIdIndex22) => (
          <button type="button"
            key={opt.value}
            onClick={() => onPeriodChange(opt.value)}
            className={`focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95 px-3 py-1.5 rounded-lg text-xs font-semibold motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              period === opt.value
                ? 'bg-primary text-on-primary shadow-card'
                : 'text-secondary hover:text-primary hover:bg-card'
            }`}
           data-testid={`admin_hr-admin_hr-performance-period-selector-select-map22-${__testIdIndex22}-1`}>
            {t(opt.labelKey)}
          </button>
        ))}
      </div>
    </div>
  );
}
