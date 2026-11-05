// RESPONSIBILITY: Centralized static configuration for the Expenses feature; API/server data is intentionally excluded.

/**
 * @description Provides the ManagerExpenseRegisterAndReportingSharedConstants implementation for the expenses module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MANAGER_EXPENSE_MAX_AMOUNT_MAJOR_UNITS = Number.MAX_SAFE_INTEGER / 100;

export const EXPENSE_CATEGORIES = [
  'Electricity',
  'Rent',
  'Water Bill',
  'Equipment Maintenance',
  'Salary/Payroll',
  'Marketing',
  'Office Supplies',
  'Miscellaneous'
];

export const EXPENSE_STATUS_LABELS: Record<string, string> = {
  PAID: 'Paid',
  PENDING: 'Pending' };

export const EXPENSE_STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  PAID: { bg: 'bg-success-bg', text: 'text-success-text' },
  PENDING: { bg: 'bg-danger-bg', text: 'text-danger-text' } };

export const EXPENSES_TABLE_HEADERS = [
  'ID', 'Title', 'Category', 'Amount', 'Date', 'Status', 'Actions'
];

export const EXPENSE_STATUS_VALUES = ['PAID', 'PENDING'] as const;
export const EXPENSE_ALL_STATUS_FILTER = 'All' as const;

export const EXPENSE_PENDING_STATUS = 'PENDING' as const;

export const EXPENSE_PAID_STATUS = 'PAID' as const;
