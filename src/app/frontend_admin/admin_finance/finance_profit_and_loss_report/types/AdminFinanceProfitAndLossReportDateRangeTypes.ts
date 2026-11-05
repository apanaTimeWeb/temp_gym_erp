// RESPONSIBILITY: Defines feature-local TypeScript contracts for finance_profit_and_loss_report; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_profit_and_loss_report/types/AdminFinanceProfitAndLossReportDateRangeTypes.ts)

/** Inclusive local-calendar report filter range serialized to API date-only values. */
export interface AdminFinanceProfitAndLossReportDateRange { startDate: string; endDate: string }
