/**
 * @description Provides the ManagerExpenseRegisterAndReportingChartConstants implementation for the expenses module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MANAGER_EXPENSE_CHART_COLORS = [
  'var(--chart-warning)',
  'var(--chart-info)',
  'var(--chart-success)',
  'var(--chart-danger)',
  'var(--chart-primary)',
  'var(--chart-warning)',
] as const;
