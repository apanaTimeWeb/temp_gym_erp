// RESPONSIBILITY: Canonical routes and API endpoints owned by Store Sales.
export const ADMIN_SALES_ROUTES={root:'/frontend_admin/admin_sales/sales_store_sales',dashboard:'/frontend_admin/admin_dashboard'} as const;
export const ADMIN_SALES_STORE_ORDERS_URL='/admin/sales/store-orders' as const;
export const ADMIN_SALES_STORE_SUMMARY_URL='/admin/sales/store-summary' as const;
export const ADMIN_SALES_API={storeOrders:ADMIN_SALES_STORE_ORDERS_URL,storeSummary:ADMIN_SALES_STORE_SUMMARY_URL} as const;

// Canonical local fallback destination for this autonomous feature.
export const ADMIN_DASHBOARD_URL = '/frontend_admin/admin_dashboard/dashboard_overview' as const;
