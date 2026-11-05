/**
 * Canonical module-owned URL configuration.
 * Each route/endpoint group has a descriptive, module-prefixed export.
 * Cross-leaf imports are forbidden, including sibling URL-config imports. Role navigation owns its separate public destination registry and duplicates only verified navigation href values; feature route/API contracts remain leaf-local.
 */

export const SUPERADMIN_DASHBOARD_OVERVIEW_ROUTES = {
          MAIN: "/frontend_superadmin/superadmin_dashboard/dashboard_overview",
          GYMS: "/frontend_superadmin/superadmin_gyms",
      } as const;

export const SUPERADMIN_DASHBOARD_OVERVIEW_API = { BASE: '/superadmin/dashboard', METRICS: '/superadmin/dashboard/metrics' } as const;


