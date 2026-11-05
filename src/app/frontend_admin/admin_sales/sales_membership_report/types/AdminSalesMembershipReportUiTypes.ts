// RESPONSIBILITY: Named UI contracts for Admin Sales membership report sorting.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_sales/sales_membership_report/types/AdminSalesAnalyticsUiTypes.ts)

export type AdminSalesMembershipSortKey = 'plan' | 'receivable' | 'received' | 'remaining' | 'refund';
