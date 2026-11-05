// RESPONSIBILITY: Owns every route path used by the Manager grievance module.
/**
 * @description Canonical Manager grievance URL/path registry. All URL literals are declared once as named constants and composed into the two canonical typed contracts below.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths encode resource identifiers as individual URL path segments.
 */
const MANAGER_GRIEVANCE_RESOLUTION_PAGES_HOME_URL = '/frontend_manager/manager_grievances/grievance_resolution';
const MANAGER_GRIEVANCE_RESOLUTION_BACKEND_API_BASE_URL = '/manager/grievance';
const MANAGER_GRIEVANCE_RESOLUTION_BACKEND_API_RESOLVE_URL = (id: string) => `/manager/grievance/${encodeURIComponent(id)}/resolve`;

export const MANAGER_GRIEVANCE_RESOLUTION_ROUTES = {
  PAGES: {
    HOME: MANAGER_GRIEVANCE_RESOLUTION_PAGES_HOME_URL
  },
  PATHS: { ROOT_COMPATIBILITY: '/frontend_manager/manager_grievances' as const, LEAF: '/frontend_manager/manager_grievances/grievance_resolution' as const }
} as const;

export const MANAGER_GRIEVANCE_RESOLUTION_API = {
  BASE: MANAGER_GRIEVANCE_RESOLUTION_BACKEND_API_BASE_URL,
    RESOLVE: MANAGER_GRIEVANCE_RESOLUTION_BACKEND_API_RESOLVE_URL
} as const;
