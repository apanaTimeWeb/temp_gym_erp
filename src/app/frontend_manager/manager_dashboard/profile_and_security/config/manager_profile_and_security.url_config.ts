// RESPONSIBILITY: Owns every route path used by the Manager profile module.
/**
 * @description Canonical Manager profile URL/path registry. All URL literals are declared once as named constants and composed into the two canonical typed contracts below.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
const MANAGER_PROFILE_AND_SECURITY_UI_PAGE_HOME_URL = '/frontend_manager/manager_dashboard/profile_and_security';
const MANAGER_PROFILE_AND_SECURITY_BACKEND_API_BASE_URL = '/api/v1/manager/profile';
const MANAGER_PROFILE_AND_SECURITY_BACKEND_API_PASSWORD_URL = '/api/v1/manager/profile/password';

export const MANAGER_PROFILE_AND_SECURITY_ROUTES = {
  UI: {
    HOME: MANAGER_PROFILE_AND_SECURITY_UI_PAGE_HOME_URL
  },
  PATHS: { ROOT_COMPATIBILITY: '/frontend_manager/manager_dashboard' as const, LEAF: '/frontend_manager/manager_dashboard/profile_and_security' as const }
} as const;

export const MANAGER_PROFILE_AND_SECURITY_API = {
  BASE: MANAGER_PROFILE_AND_SECURITY_BACKEND_API_BASE_URL,
    PASSWORD: MANAGER_PROFILE_AND_SECURITY_BACKEND_API_PASSWORD_URL,
} as const;
