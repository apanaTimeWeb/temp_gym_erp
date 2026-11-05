'use client';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { SUPERADMIN_ANALYTICS_DATE_FILTER_OPTIONS } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/constants/superadmin_analytics_dashboard_date_filter.constants';


/**
 * @description Resolves the active analytics date-range label from URL state for KPI headings.
 * @dependencies Uses the feature-owned date filter constants and analytics translation namespace.
 * @edge-case Unknown or default `this_month` ranges intentionally return an empty suffix instead of inventing copy.
 */
// DATA FLOW: Feature/API/query inputs → useSuperadminAnalyticsDashboardDateRangeSuffix → owning feature view/components.
/**
 * @description Owns the feature-local superadmin analytics date range suffix responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminAnalyticsDashboardDateRangeSuffix(): string {
  const t = useTranslations('superadmin_analytics');
  const searchParams = useSearchParams();
  const range = searchParams.get('range') ?? 'this_month';
  const option = SUPERADMIN_ANALYTICS_DATE_FILTER_OPTIONS.find((candidate) => candidate.value === range);

  if (!option || range === 'this_month') return '';
  return ` (${t(option.labelKey)})`;
}

