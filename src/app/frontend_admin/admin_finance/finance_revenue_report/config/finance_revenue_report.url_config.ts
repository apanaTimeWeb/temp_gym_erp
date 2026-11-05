// RESPONSIBILITY: Owns internal routes and only the revenue report backend contract for this leaf.
export const ADMIN_DASHBOARD_URL = '/frontend_admin/admin_dashboard/dashboard_overview' as const;
// Existing backend endpoint literals are retained exactly; export remains contract-gated.
export const ADMIN_FINANCE_REVENUE_REPORT_ROUTES = { root: '/frontend_admin/admin_finance/finance_revenue_report' as const } as const;
export const ADMIN_FINANCE_REVENUE_REPORT_BRANCH_REFERENCE_URL = '/admin/branches/fetchBranches' as const;
export const ADMIN_FINANCE_REVENUE_REPORT_BASE_URL = '/frontend_admin/admin_finance' as const;
export const ADMIN_FINANCE_REVENUE_REPORT_REVENUE_URL = '/admin/reports/revenue' as const;
export const ADMIN_FINANCE_REVENUE_REPORT_EXPORT_URL = '/admin/reports/export' as const;
export const ADMIN_FINANCE_REVENUE_REPORT_URLS = { branchReference: ADMIN_FINANCE_REVENUE_REPORT_BRANCH_REFERENCE_URL, base: ADMIN_FINANCE_REVENUE_REPORT_BASE_URL, revenue: ADMIN_FINANCE_REVENUE_REPORT_REVENUE_URL, export: ADMIN_FINANCE_REVENUE_REPORT_EXPORT_URL } as const;
export const ADMIN_FINANCE_REVENUE_REPORT_API = ADMIN_FINANCE_REVENUE_REPORT_URLS;
