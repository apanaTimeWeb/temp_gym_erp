// RESPONSIBILITY: Canonical routes and the all-memberships endpoint owned by this leaf.
export const ADMIN_SALES_ROUTES = { root: '/frontend_admin/admin_sales/sales_memberships', dashboard: '/frontend_admin/admin_dashboard' } as const;
export const ADMIN_SALES_ALL_MEMBERSHIPS_URL = '/admin/sales/all-memberships' as const;
export const ADMIN_SALES_API = { allMemberships: ADMIN_SALES_ALL_MEMBERSHIPS_URL } as const;

// Canonical local fallback destination for this autonomous feature.
export const ADMIN_DASHBOARD_URL = '/frontend_admin/admin_dashboard/dashboard_overview' as const;
