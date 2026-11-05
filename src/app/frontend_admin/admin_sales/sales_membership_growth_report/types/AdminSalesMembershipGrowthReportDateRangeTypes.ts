// RESPONSIBILITY: Defines feature-local TypeScript contracts for sales_membership_growth_report; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_sales/sales_membership_growth_report/types/AdminSalesMembershipGrowthReportAnalyticsDateRangeTypes.ts)

/** Inclusive local-calendar report filter range serialized to API date-only values. */
export interface AdminSalesMembershipGrowthReportDateRange { startDate: string; endDate: string }
