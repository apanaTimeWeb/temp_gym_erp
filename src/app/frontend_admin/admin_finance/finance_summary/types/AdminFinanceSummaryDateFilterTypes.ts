// RESPONSIBILITY: Defines feature-local TypeScript contracts for finance_summary; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_summary/types/AdminFinanceOverviewDateFilterTypes.ts)

export type AdminFinanceDateFilterRange = 'this_month' | 'last_month' | 'last_3_months' | 'last_6_months' | 'this_year' | 'monthly' | 'yearly' | 'custom';
