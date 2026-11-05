/**
 * Canonical module-owned URL configuration.
 * Each route/endpoint group has a descriptive, module-prefixed export.
 * Cross-leaf imports are forbidden, including sibling URL-config imports. Role navigation owns its separate public destination registry and duplicates only verified navigation href values; feature route/API contracts remain leaf-local.
 */

export const SUPERADMIN_ANALYTICS_DASHBOARD_ROUTES = {
          MAIN: '/frontend_superadmin/superadmin_analytics/analytics_dashboard',
      } as const;

export const SUPERADMIN_ANALYTICS_DASHBOARD_API = {
          BASE: '/superadmin/analytics',
      } as const;


