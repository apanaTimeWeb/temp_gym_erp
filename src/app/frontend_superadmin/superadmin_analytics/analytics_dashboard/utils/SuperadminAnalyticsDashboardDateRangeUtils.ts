// RESPONSIBILITY: Calculates analytics date preset boundaries for URL/API query values. No JSX or network calls.
import { format, startOfMonth, endOfMonth, subMonths, startOfYear, endOfYear } from 'date-fns';
import { SUPERADMIN_ANALYTICS_DATE_RANGES } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/constants/superadmin_analytics_dashboard_date_range.constants';

import type { SuperadminAnalyticsDateRange } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/types/superadmin_analytics_dashboard_date_filter.types';

/** Returns YYYY-MM-DD bounds for an analytics preset using date-fns and the current local calendar. */
/**
 * @description Provides analytics formatting or feature utility behavior for getSuperadminAnalyticsPresetRange.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function getSuperadminAnalyticsPresetRange(preset: string, now = new Date()): { from: string; to: string } {
  switch (preset) {
    case 'this_month': return { from: format(startOfMonth(now), 'yyyy-MM-dd'), to: format(now, 'yyyy-MM-dd') };
    case 'last_month': { const month = subMonths(now, 1); return { from: format(startOfMonth(month), 'yyyy-MM-dd'), to: format(endOfMonth(month), 'yyyy-MM-dd') }; }
    case 'last_3_months': return { from: format(subMonths(now, 3), 'yyyy-MM-dd'), to: format(now, 'yyyy-MM-dd') };
    case 'last_6_months': return { from: format(subMonths(now, 6), 'yyyy-MM-dd'), to: format(now, 'yyyy-MM-dd') };
    case 'this_year': return { from: format(startOfYear(now), 'yyyy-MM-dd'), to: format(endOfYear(now), 'yyyy-MM-dd') };
    default: return { from: '', to: '' };
  }
}


/** Returns true only for a date-range value explicitly supported by the module dropdown. */
export function isSuperadminAnalyticsDateRange(value: string | null): value is SuperadminAnalyticsDateRange {
  return value !== null && (SUPERADMIN_ANALYTICS_DATE_RANGES as readonly string[]).includes(value);
}

/** Validates an ISO calendar date without accepting rollover dates such as February 31. */
export function isValidAnalyticsDateOnly(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

/** Requires valid, ordered date-only bounds for a custom analytics query. */
export function hasValidAnalyticsCustomRange(start: string, end: string): boolean {
  return isValidAnalyticsDateOnly(start) && isValidAnalyticsDateOnly(end) && start <= end;
}
