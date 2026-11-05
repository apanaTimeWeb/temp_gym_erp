// RESPONSIBILITY: Defines the single route and backend URL contracts for Manager Dashboard Overview.
// Owned by: manager/manager_dashboard/dashboard_overview.
// ROUTES may be consumed by this module and the role-level navigation configuration only.
// API may be consumed only by this module's API client and owned mock handlers.
export const MANAGER_DASHBOARD_OVERVIEW_ROUTES = {
  /** Compatibility URL retained for existing Manager Dashboard navigation. */
  PAGES: { HOME: '/frontend_manager/manager_dashboard/dashboard_overview' },
  PATHS: {
    ROOT_COMPATIBILITY: '/frontend_manager/manager_dashboard',
    LEAF: '/frontend_manager/manager_dashboard/dashboard_overview',
    OVERVIEW: '/frontend_manager/manager_dashboard/dashboard_overview',
  },
} as const;

export const MANAGER_DASHBOARD_OVERVIEW_API = {
  STATS: '/api/v1/manager/dashboard/stats',
} as const;
