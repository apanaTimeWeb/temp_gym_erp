/** Canonical module-level constant registry for manager_finance; child constant files remain the source of individual entries. */
export const ManagerFinancePaymentsAndSummaryConstants = {} as const;

export const MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_PAYMENT_STATUS_PAID = 'PAID' as const;
export const MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_PAYMENT_STATUS_REFUNDED = 'REFUNDED' as const;

export const MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_STATUS_VALUES = {
  PAID: 'PAID',

  ALL: 'ALL',
} as const;
