export const MANAGER_SALES_OVERVIEW_DEFAULT_DATE_RANGE = 'this_month' as const;
export const MANAGER_SALES_OVERVIEW_CUSTOM_DATE_RANGE = 'custom' as const;
export const MANAGER_SALES_OVERVIEW_FIRST_PAGE = 1;
export const MANAGER_SALES_OVERVIEW_PAGE_SIZE = 10;

import type { ManagerSalesOverviewDateRange } from '@/app/frontend_manager/manager_sales_billing/sales_overview/types/manager_sales_overview_date_range.types';
// RESPONSIBILITY: Owns sales date-range presets used by the sales toolbar.
/**
 * @description Provides the ManagerSalesOverviewDateFilterConstants implementation for the sales module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MANAGER_SALES_OVERVIEW_DATE_RANGE_OPTIONS = [
  { value: MANAGER_SALES_OVERVIEW_DEFAULT_DATE_RANGE, label: 'This Month' },
  { value: 'last_month', label: 'Last Month' },
  { value: 'last_3_months', label: 'Last 3 Months' },
  { value: 'last_6_months', label: 'Last 6 Months' },
  { value: 'this_year', label: 'This Year' },
  { value: MANAGER_SALES_OVERVIEW_CUSTOM_DATE_RANGE, label: 'Custom Range' },
] as const satisfies readonly { value: ManagerSalesOverviewDateRange; label: string }[];

export const MANAGER_SALES_OVERVIEW_DATE_RANGE_VALUES = MANAGER_SALES_OVERVIEW_DATE_RANGE_OPTIONS.map((option) => option.value);
