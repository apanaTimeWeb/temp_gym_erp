// RESPONSIBILITY: Named UI contracts for Admin Finance payment table sorting.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_payments/types/AdminFinanceOverviewUiTypes.ts)

export type AdminFinancePaymentSortKey = 'invoiceNo' | 'member' | 'amount' | 'method' | 'status' | 'paidAt';
