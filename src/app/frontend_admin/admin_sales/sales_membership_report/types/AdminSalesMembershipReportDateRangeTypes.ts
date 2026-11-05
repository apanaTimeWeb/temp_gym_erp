// RESPONSIBILITY: Defines feature-local TypeScript contracts for sales_analytics; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_sales/sales_membership_report/types/AdminSalesAnalyticsDateRangeTypes.ts)

/** Inclusive local date range serialized by the Sales date filter. */
export interface AdminSalesDateRange { startDate: string; endDate: string }
