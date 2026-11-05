/**
 * @description Provides the ManagerSalesOverviewTableConstants implementation for the sales module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MANAGER_SALES_OVERVIEW_MEMBERSHIP_TABLE_HEADERS = ['Member', 'Plan', 'Start', 'End Date', 'Status', 'Amount', 'Days Left'] as const;
