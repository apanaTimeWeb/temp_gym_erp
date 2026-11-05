// RESPONSIBILITY: Owns every route path used by the Manager maintenance module.
/**
 * @description Canonical Manager maintenance URL/path registry. All URL literals are declared once as named constants and composed into the two canonical typed contracts below.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
const MANAGER_MAINTENANCE_REQUESTS_PAGES_HOME_URL = '/frontend_manager/manager_maintenance/maintenance_requests';
const MANAGER_MAINTENANCE_REQUESTS_BACKEND_API_BASE_URL = '/manager/maintenance';
const MANAGER_MAINTENANCE_REQUESTS_BACKEND_API_RESOLVE_URL = (id: string) => `/manager/maintenance/${id}/resolve`;

export const MANAGER_MAINTENANCE_REQUESTS_ROUTES = {
  PAGES: {
    HOME: MANAGER_MAINTENANCE_REQUESTS_PAGES_HOME_URL
  },
  PATHS: { ROOT_COMPATIBILITY: '/frontend_manager/manager_maintenance' as const, LEAF: '/frontend_manager/manager_maintenance/maintenance_requests' as const }
} as const;

export const MANAGER_MAINTENANCE_REQUESTS_API = {
  BASE: MANAGER_MAINTENANCE_REQUESTS_BACKEND_API_BASE_URL,
    RESOLVE: MANAGER_MAINTENANCE_REQUESTS_BACKEND_API_RESOLVE_URL
} as const;
