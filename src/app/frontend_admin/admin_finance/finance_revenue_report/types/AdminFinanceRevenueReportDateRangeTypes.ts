// RESPONSIBILITY: Defines feature-local TypeScript contracts for finance_revenue_report; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_revenue_report/types/AdminFinanceRevenueReportDateRangeTypes.ts)

/** Inclusive local-calendar report filter range serialized to API date-only values. */
export interface AdminFinanceRevenueReportDateRange { startDate: string; endDate: string }
