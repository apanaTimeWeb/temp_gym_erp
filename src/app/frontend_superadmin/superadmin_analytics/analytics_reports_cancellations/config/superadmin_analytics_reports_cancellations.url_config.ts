
/** Feature-owned navigation and frozen wire endpoints. Only these two contracts are exported. */
export const SUPERADMIN_ANALYTICS_REPORTS_CANCELLATIONS_ROUTES = {
  ...({ MAIN: '/frontend_superadmin/superadmin_analytics/analytics_reports_cancellations', LEGACY: '/frontend_superadmin/superadmin_analytics/analytics_reports_center' } as const),
  SUPERADMIN_ANALYTICS_REPORTS_CENTER_ROUTES: ({ DESTINATION_1: "/frontend_superadmin/superadmin_analytics/analytics_reports_center",  MAIN: "/frontend_superadmin/superadmin_analytics/analytics_reports_center" } as const),
} as const;
export const SUPERADMIN_ANALYTICS_REPORTS_CANCELLATIONS_API = {
  ...({
  BASE: "/superadmin/reports",
  EXPORT: { BACKEND_API: { EXPORT: '/export-data' } },
} as const),
  SUPERADMIN_ANALYTICS_REPORTS_CANCELLATIONS_EXISTING_ENDPOINTS: ({
  "REPORT": "/superadmin/reports/cancellations"
} as const),
} as const;
