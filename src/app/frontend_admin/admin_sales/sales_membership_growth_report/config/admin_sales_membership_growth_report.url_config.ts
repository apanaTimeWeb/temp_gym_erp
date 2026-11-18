// RESPONSIBILITY: Owns internal routes and only the membership report backend contract for this leaf.
export const ADMIN_DASHBOARD_URL = '/frontend_admin/admin_dashboard/dashboard_overview' as const;
// Existing backend endpoint literals are retained exactly; export remains contract-gated.
export const ADMIN_SALES_MEMBERSHIP_GROWTH_REPORT_ROUTES = { root: '/frontend_admin/admin_sales/sales_membership_growth_report' as const } as const;
export const ADMIN_SALES_MEMBERSHIP_GROWTH_REPORT_BRANCH_REFERENCE_URL = '/admin/branches/fetchBranches' as const;
export const ADMIN_SALES_MEMBERSHIP_GROWTH_REPORT_BASE_URL = '/frontend_admin/admin_sales' as const;
export const ADMIN_SALES_MEMBERSHIP_GROWTH_REPORT_MEMBERS_URL = '/admin/reports/members' as const;
export const ADMIN_SALES_MEMBERSHIP_GROWTH_REPORT_EXPORT_URL = '/admin/reports/export' as const;
export const ADMIN_SALES_MEMBERSHIP_GROWTH_REPORT_URLS = { branchReference: ADMIN_SALES_MEMBERSHIP_GROWTH_REPORT_BRANCH_REFERENCE_URL, base: ADMIN_SALES_MEMBERSHIP_GROWTH_REPORT_BASE_URL, membership: ADMIN_SALES_MEMBERSHIP_GROWTH_REPORT_MEMBERS_URL, export: ADMIN_SALES_MEMBERSHIP_GROWTH_REPORT_EXPORT_URL } as const;
export const ADMIN_SALES_MEMBERSHIP_GROWTH_REPORT_API = ADMIN_SALES_MEMBERSHIP_GROWTH_REPORT_URLS;
