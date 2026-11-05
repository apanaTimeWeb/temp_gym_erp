
/** Feature-owned navigation and frozen wire endpoints. Only these two contracts are exported. */
export const SUPERADMIN_ANALYTICS_REPORTS_HEALTH_ROUTES = {
  ...({ MAIN: '/frontend_superadmin/superadmin_analytics/analytics_reports_health', LEGACY: '/frontend_superadmin/superadmin_analytics/analytics_reports_center' } as const),
  SUPERADMIN_ANALYTICS_REPORTS_CENTER_ROUTES: ({ DESTINATION_1: "/frontend_superadmin/superadmin_analytics/analytics_reports_center",  MAIN: "/frontend_superadmin/superadmin_analytics/analytics_reports_center" } as const),
} as const;
export const SUPERADMIN_ANALYTICS_REPORTS_HEALTH_API = {
  ...({
  BASE: "/superadmin/reports",
  EXPORT: { BACKEND_API: { EXPORT: '/export-data' } },
} as const),
  SUPERADMIN_ANALYTICS_REPORTS_HEALTH_EXISTING_ENDPOINTS: ({
  "REPORT": "/superadmin/reports/health"
} as const),
} as const;
