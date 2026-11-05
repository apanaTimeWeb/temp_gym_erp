import type { ManagerFinancePaymentsAndSummaryDateRange } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/types/manager_finance_payments_and_summary.types';
// RESPONSIBILITY: Owns finance date-range presets used by the finance toolbar.
/**
 * @description Provides the ManagerFinancePaymentsAndSummaryDateFilterConstants implementation for the finance module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_DATE_RANGE_OPTIONS = [
  { value: 'this_month', label: 'This Month' },
  { value: 'last_month', label: 'Last Month' },
  { value: 'last_3_months', label: 'Last 3 Months' },
  { value: 'last_6_months', label: 'Last 6 Months' },
  { value: 'this_year', label: 'This Year' },
  { value: 'monthly', label: 'Monthly (All Time)' },
  { value: 'yearly', label: 'Yearly (All Time)' },
  { value: 'custom', label: 'Custom Range' },
] as const satisfies readonly { value: ManagerFinancePaymentsAndSummaryDateRange; label: string }[];
