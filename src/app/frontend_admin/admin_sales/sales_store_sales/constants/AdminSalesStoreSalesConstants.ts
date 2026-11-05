// RESPONSIBILITY: Date presets and payment-status presentation for Store Sales only.
export const DATE_FILTERS = ['this_month', 'last_month', 'last_3_months', 'last_6_months', 'this_year', 'monthly', 'yearly', 'custom'] as const;
export const ADMIN_SALES_ORDER_STATUS = { PAID: 'paid' } as const;
export const ADMIN_SALES_PAYMENT_MODE_STYLES: Record<string, string> = { Cash: 'bg-pay-cash-bg text-pay-cash', UPI: 'bg-pay-upi-bg text-pay-upi', Card: 'bg-pay-card-bg text-pay-card', Bank: 'bg-pay-bank-bg text-pay-bank' };
