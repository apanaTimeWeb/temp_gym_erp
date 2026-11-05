/** Canonical module-level constant registry for manager_expenses; child constant files remain the source of individual entries. */
export const ManagerExpenseRegisterAndReportingConstants = {} as const;

export const MANAGER_EXPENSE_STATUS_PAID = 'PAID' as const;

export const MANAGER_EXPENSE_REGISTER_AND_REPORTING_STATUS_VALUES = {
  PENDING: 'PENDING',
  ALL: 'All',
  PAID: 'PAID',
} as const;
