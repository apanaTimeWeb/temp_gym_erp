import type { ManagerReportsOverviewDateRange } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/types/manager_reports_overview.types';
// RESPONSIBILITY: Owns reports date-range presets used by the reports toolbar.
/**
 * @description Provides the ManagerReportsOverviewDateFilterConstants implementation for the reports module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const managerReportsOverviewDateRangeOptions = [
  { value: 'this_month', label: 'This Month' },
  { value: 'last_month', label: 'Last Month' },
  { value: 'last_3_months', label: 'Last 3 Months' },
  { value: 'last_6_months', label: 'Last 6 Months' },
  { value: 'this_year', label: 'This Year' },
  { value: 'monthly', label: 'Monthly (All Time)' },
  { value: 'yearly', label: 'Yearly (All Time)' },
] as const satisfies readonly { value: ManagerReportsOverviewDateRange; label: string }[];

/** The single immutable date-range registry consumed by reports filters and shared constants. */
export const MANAGER_REPORTS_OVERVIEW_DATE_RANGE_OPTIONS = Object.freeze(managerReportsOverviewDateRangeOptions);
