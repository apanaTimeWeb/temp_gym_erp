// RESPONSIBILITY: Canonical internal route and the one verified backend endpoint owned by this leaf.
export const ADMIN_SALES_ROUTES = {
  root: '/frontend_admin/admin_sales/sales_membership_report',
  dashboard: '/frontend_admin/admin_dashboard',
} as const;

export const ADMIN_SALES_MEMBERSHIP_REPORT_URL = '/admin/sales/membership-report' as const;
export const ADMIN_SALES_API = {
  membershipReport: ADMIN_SALES_MEMBERSHIP_REPORT_URL,
} as const;

// Canonical local fallback destination for this autonomous feature.
export const ADMIN_DASHBOARD_URL = '/frontend_admin/admin_dashboard/dashboard_overview' as const;
