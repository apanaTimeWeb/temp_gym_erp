// RESPONSIBILITY: Defines feature-local TypeScript contracts for finance_expenses; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_expenses/types/AdminFinanceOverviewDateRangeTypes.ts)

/** Local-calendar date range used by Finance filters and API request builders. */
export interface AdminFinanceDateRange { startDate: string; endDate: string }
