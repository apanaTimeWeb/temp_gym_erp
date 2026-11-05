/** Canonical URL contracts for the autonomous Superadmin Reports Center sub-module. */
export const SUPERADMIN_ANALYTICS_REPORTS_CENTER_ROUTES = {
  CANCELLATIONS: '/frontend_superadmin/superadmin_analytics/analytics_reports_cancellations',
  HEALTH: '/frontend_superadmin/superadmin_analytics/analytics_reports_health',
  REPORT: (tab: 'health' | 'cancellations') => `/frontend_superadmin/superadmin_analytics/analytics_reports_${tab}` as const,
 DESTINATION_1: "/frontend_superadmin/superadmin_analytics/analytics_reports_center",  MAIN: "/frontend_superadmin/superadmin_analytics/analytics_reports_center" } as const;

export const SUPERADMIN_ANALYTICS_REPORTS_CENTER_API = {
  BASE: "/superadmin/reports",
  EXPORT: { BACKEND_API: { EXPORT: '/export-data' } },
} as const;

