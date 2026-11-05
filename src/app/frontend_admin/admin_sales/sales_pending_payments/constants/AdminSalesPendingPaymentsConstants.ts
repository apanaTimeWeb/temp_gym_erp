// RESPONSIBILITY: Date presets and pending-payment status for this leaf only.
export const DATE_FILTERS = ['this_month', 'last_month', 'last_3_months', 'last_6_months', 'this_year', 'monthly', 'yearly', 'custom'] as const;
export const ADMIN_SALES_PENDING_PAYMENT_STATUS = { PENDING: 'pending' } as const;

/** Page-size value preserved from the supplied Admin v43 source contract. */
export const ADMIN_SALES_PENDING_PAYMENTS_ITEMS_PER_PAGE = 10 as const;
