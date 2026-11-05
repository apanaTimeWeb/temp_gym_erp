'use client';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { SUPERADMIN_DASHBOARD_TIME_RANGES } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/constants/superadmin_dashboard_overview_date_range.constants';
import { DASHBOARD_TIME_RANGE_LABEL_KEYS } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/constants/superadmin_dashboard_overview.constants';
import { formatDate } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/utils/SuperadminDashboardOverviewFormatters';


/**
 * @description Coordinates the use Superadmin dashboard date range suffix concern within its owning Superadmin feature.
 * @dependencies Uses the typed arguments and module-local API, query-key, schema, and utility imports declared in this file; it must not depend on sibling business modules.
 * @edge-case Keep null or empty inputs safe, preserve pending/error/retry/cancellation behavior where applicable, and avoid stale or duplicate mutation effects.
 */
export function useSuperadminDashboardOverviewDateRangeSuffix(upperCase = true): string {
  const searchParams = useSearchParams();
  const t = useTranslations('superadmin_dashboard');
  const requested = searchParams.get('range') ?? 'this_month';
  const range = (SUPERADMIN_DASHBOARD_TIME_RANGES as readonly string[]).includes(requested) ? requested as keyof typeof DASHBOARD_TIME_RANGE_LABEL_KEYS : 'this_month';
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  let suffix = '';
  if (range === 'custom' && startDate && endDate && endDate >= startDate) {
    suffix = `${t('ui.from_ad82f63')} ${formatDate(startDate)} ${t('ui.to_ad82f63')} ${formatDate(endDate)}`;
  } else {
    suffix = t(DASHBOARD_TIME_RANGE_LABEL_KEYS[range]);
  }
  if (!suffix) return '';
  return upperCase ? ` ${suffix.toLocaleUpperCase()}` : ` ${suffix}`;
}
