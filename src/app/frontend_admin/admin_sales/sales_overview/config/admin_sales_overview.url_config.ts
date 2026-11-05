// RESPONSIBILITY: Canonical routes and backend endpoints owned by Sales Overview.
export const ADMIN_SALES_ROUTES = { root: '/frontend_admin/admin_sales/sales_overview', dashboard: '/frontend_admin/admin_dashboard' } as const;
export const ADMIN_SALES_OVERVIEW_URL = '/admin/sales/overview' as const;
export const ADMIN_SALES_REFERRAL_SOURCES_URL = '/admin/sales/referral-sources' as const;
export const ADMIN_SALES_API = { overview: ADMIN_SALES_OVERVIEW_URL, referralSources: ADMIN_SALES_REFERRAL_SOURCES_URL } as const;

/** Source-declared Sales summary endpoint retained under Sales ownership. No new caller is inferred from this constant alone. */
export const ADMIN_SALES_SUMMARY_URL = '/admin/sales/summary' as const;

// Canonical local fallback destination for this autonomous feature.
export const ADMIN_DASHBOARD_URL = '/frontend_admin/admin_dashboard/dashboard_overview' as const;
