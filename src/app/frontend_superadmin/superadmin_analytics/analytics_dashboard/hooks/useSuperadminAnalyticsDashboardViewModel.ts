'use client';
import { useMemo } from 'react';

import { useLocale } from 'next-intl';

import { useSuperadminAnalyticsDashboardChartViewModel } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/hooks/useSuperadminAnalyticsDashboardChartViewModel';
import { useSuperadminAnalyticsDashboardKpiViewModel } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/hooks/useSuperadminAnalyticsDashboardKpiViewModel';
import { SuperadminAnalyticsFormatCurrency } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/utils/SuperadminAnalyticsDashboardFormatCurrency';
import { formatDecimal } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/utils/SuperadminAnalyticsDashboardFormatters';

import type { SuperadminAnalyticsDashboardViewModel } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/types/superadmin_analytics_dashboard_view_model.types';
import type { MonthlyAnalyticsDataPoint, RevenueMetrics } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/types/superadmin_analytics_dashboard.types';



// DATA FLOW: API / URL state / module client state → useLocale → superadmin_analytics view components.
/**
 * @description Owns all dashboard-level analytics derivation consumed by the Main view.
 * @dependencies Delegates KPI and chart derivation to feature-owned view-model hooks and currency formatting to the feature utility.
 * @edge-case Missing currency keeps financial values visibly unavailable instead of silently defaulting to a currency.
 */
// DATA FLOW: Feature/API/query inputs → useSuperadminAnalyticsDashboardViewModel → owning feature view/components.
/**
 * @description Owns the feature-local superadmin analytics dashboard view model responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminAnalyticsDashboardViewModel(
  metrics: RevenueMetrics | null,
  monthlyData: MonthlyAnalyticsDataPoint[],
): SuperadminAnalyticsDashboardViewModel {
  const locale = useLocale();
  const kpiCards = useSuperadminAnalyticsDashboardKpiViewModel(metrics);
  const charts = useSuperadminAnalyticsDashboardChartViewModel(monthlyData, metrics?.currency);

  return useMemo(() => {
    if (!metrics) {
      return {
        kpiCards,
        charts,
        secondaryMetrics: [],
      };
    }

    const money = (amountMinor: number): string => (
      metrics.currency
        ? SuperadminAnalyticsFormatCurrency(amountMinor, metrics.currency, locale)
        : '—'
    );

    const secondaryMetrics: SuperadminAnalyticsDashboardViewModel['secondaryMetrics'] = [
      {
        key: 'ltv',
        labelKey: 'ui.ltv_lifetime_value_e28bea2',
        helperKey: 'ui.per_tenant_average_f9627ea',
        value: money(metrics.ltv),
        tone: 'success',
        icon: 'activity',
      },
      {
        key: 'cac',
        labelKey: 'ui.cac_customer_acquisition_cost_b50fd03',
        helperKey: 'ui.ltv_cac_64158f3',
        value: money(metrics.cac),
        helperValue: metrics.cac > 0 ? formatDecimal(metrics.ltv / metrics.cac, 1) : undefined,
        tone: 'warning',
        icon: 'currency',
      },
    ];

    return { kpiCards, charts, secondaryMetrics };
  }, [charts, kpiCards, locale, metrics]);
}

