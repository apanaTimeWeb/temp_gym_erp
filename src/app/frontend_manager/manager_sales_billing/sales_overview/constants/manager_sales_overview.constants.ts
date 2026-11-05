/** Canonical module-level constant registry for manager_sales; child constant files remain the source of individual entries. */
export const ManagerSalesOverviewConstants = {
  defaultDateRange: 'this_month',
  customDateRange: 'custom',
  firstPage: 1,
  pageSize: 10,
} as const;

export const MANAGER_SALES_OVERVIEW_STATUS_VALUES = {
  PENDING: 'pending',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;
