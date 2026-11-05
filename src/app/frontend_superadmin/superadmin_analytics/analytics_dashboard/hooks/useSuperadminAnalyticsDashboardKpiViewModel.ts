'use client';
import { ArrowDownRight, DollarSign, TrendingUp, Users } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import { SUPERADMIN_ANALYTICS_KPI_DELTA_PERIOD_KEYS } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/constants/superadmin_analytics_dashboard_kpi.constants';
import { useSuperadminAnalyticsDashboardDateRangeSuffix } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/hooks/useSuperadminAnalyticsDashboardDateRangeSuffix';
import { SuperadminAnalyticsFormatCurrency } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/utils/SuperadminAnalyticsDashboardFormatCurrency';

import type { SuperadminAnalyticsKpiCardViewModel } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/types/superadmin_analytics_dashboard_kpi_view_model.types';
import type { RevenueMetrics } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/types/superadmin_analytics_dashboard.types';



// DATA FLOW: API / URL state / module client state → useTranslations → superadmin_analytics view components.
/**
 * @description Converts API analytics metrics into the complete display contract for KPI cards.
 * Inputs: Backend-validated revenue metrics, active i18n locale, and the current date-range suffix.
 * Output: Localized KPI labels, locale-aware monetary values, trend copy, and semantic visual classes.
 * Side effects: None; this hook performs deterministic view-model derivation only.
 * Invariant: Backend financial currency is never fabricated; missing currency produces an explicit en-dash.
 * Dependencies: Feature currency formatter, active i18n locale, date-range suffix infrastructure.
 * Edge cases: Undefined optional cancellation delta and masked currency fields remain safely representable.
 */
// DATA FLOW: Feature/API/query inputs → useSuperadminAnalyticsDashboardKpiViewModel → owning feature view/components.
/**
 * @description Owns the feature-local superadmin analytics kpi view model responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminAnalyticsDashboardKpiViewModel(metrics: RevenueMetrics | null): SuperadminAnalyticsKpiCardViewModel[] {
  const t = useTranslations('superadmin_analytics');
  const locale = useLocale();
  const dateSuffix = useSuperadminAnalyticsDashboardDateRangeSuffix();
  if (!metrics) return [];
  const currency = metrics.currency;
  const formatMoney = (amountMinor: number) => (currency ? SuperadminAnalyticsFormatCurrency(amountMinor, currency, locale) : '—');
  const metricDelta = (value: number | undefined, periodKey: (typeof SUPERADMIN_ANALYTICS_KPI_DELTA_PERIOD_KEYS)[number]): string | undefined =>
    value === undefined ? undefined : `${value > 0 ? '+' : ''}${value}% ${t(periodKey)}`;
  const trend = (value: number | undefined, higherIsBetter: boolean) => value === undefined ? {} : ({
    deltaDirection: value >= 0 ? 'up' as const : 'down' as const,
    deltaTone: (() => { if (value === 0) { return ('neutral' as const); } if ((value > 0) === higherIsBetter) { return ('success' as const); } return ('danger' as const); })(),
  });
  const cancellationTrend = trend(metrics.cancellationDeltaPercent, false);

  return [
    {
      label: `${t('ui.monthly_income')} ${dateSuffix}`.trim(),
      value: formatMoney(metrics.mrr),
      delta: metricDelta(metrics.mrrDeltaPercent, 'ui.from_last_month'),
      ...trend(metrics.mrrDeltaPercent, true),
      icon: DollarSign,
      iconBgClass: 'bg-success-bg',
      iconColorClass: 'text-success',
    },
    {
      label: `${t('ui.arr')} ${dateSuffix}`.trim(),
      value: formatMoney(metrics.arr),
      delta: metricDelta(metrics.arrDeltaPercent, 'ui.from_last_year'),
      ...trend(metrics.arrDeltaPercent, true),
      icon: TrendingUp,
      iconBgClass: 'bg-primary-subtle',
      iconColorClass: 'text-primary',
    },
    {
      label: `${t('ui.members_lost_percent')} ${dateSuffix}`.trim(),
      value: `${metrics.cancellationRate}%`,
      delta: metrics.cancellationDeltaPercent === undefined
        ? t('ui.target_less_than_two_percent')
        : metricDelta(metrics.cancellationDeltaPercent, 'ui.vs_last_month'),
      ...cancellationTrend,
      ...(metrics.cancellationDeltaPercent === undefined ? { deltaTone: metrics.cancellationRate < 2 ? 'success' as const : 'danger' as const } : {}),
      icon: ArrowDownRight,
      iconBgClass: 'bg-danger-bg',
      iconColorClass: 'text-danger',
    },
    {
      label: `${t('ui.active_gyms')} ${dateSuffix}`.trim(),
      value: new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(metrics.activeTenants),
      icon: Users,
      iconBgClass: 'bg-warning-bg',
      iconColorClass: 'text-warning',
    },
    {
      label: `${t('ui.avg_income_per_gym')} ${dateSuffix}`.trim(),
      value: formatMoney(metrics.arpu),
      delta: t('ui.avg_revenue_per_gym'),
      icon: DollarSign,
      iconBgClass: 'bg-primary-subtle',
      iconColorClass: 'text-primary',
    },
  ];
}

