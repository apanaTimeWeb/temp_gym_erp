// RESPONSIBILITY: Calculates Dashboard date preset ranges for URL/API query values. No JSX or network calls.
import { format, startOfMonth, endOfMonth, subMonths, startOfYear, endOfYear } from 'date-fns';

/** Returns YYYY-MM-DD date bounds for a Dashboard date preset using date-fns. */
/**
 * @description Provides dashboard formatting or feature utility behavior for getSuperadminDashboardPresetRange.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function getSuperadminDashboardPresetRange(preset: string, now = new Date()): { from: string; to: string } {
  switch (preset) {
    case 'this_month': return { from: format(startOfMonth(now), 'yyyy-MM-dd'), to: format(now, 'yyyy-MM-dd') };
    case 'last_month': { const month = subMonths(now, 1); return { from: format(startOfMonth(month), 'yyyy-MM-dd'), to: format(endOfMonth(month), 'yyyy-MM-dd') }; }
    case 'last_3_months': return { from: format(subMonths(now, 3), 'yyyy-MM-dd'), to: format(now, 'yyyy-MM-dd') };
    case 'last_6_months': return { from: format(subMonths(now, 6), 'yyyy-MM-dd'), to: format(now, 'yyyy-MM-dd') };
    case 'this_year': return { from: format(startOfYear(now), 'yyyy-MM-dd'), to: format(endOfYear(now), 'yyyy-MM-dd') };
    default: return { from: '', to: '' };
  }
}
