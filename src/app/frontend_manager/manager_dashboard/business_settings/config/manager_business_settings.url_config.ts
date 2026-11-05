// RESPONSIBILITY: Owns every route path used by the Manager settings module.
/**
 * @description Canonical Manager settings URL/path registry. All URL literals are declared once as named constants and composed into the two canonical typed contracts below.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
const MANAGER_BUSINESS_SETTINGS_PAGES_SETTINGS_URL = '/frontend_manager/manager_dashboard/business_settings';
const MANAGER_BUSINESS_SETTINGS_BACKEND_API_BASE_URL = '/api/v1/manager/settings';

export const MANAGER_BUSINESS_SETTINGS_ROUTES = {
  PAGES: {
    SETTINGS: MANAGER_BUSINESS_SETTINGS_PAGES_SETTINGS_URL
  },
  PATHS: { ROOT_COMPATIBILITY: '/frontend_manager/manager_dashboard' as const, LEAF: '/frontend_manager/manager_dashboard/business_settings' as const }
} as const;

export const MANAGER_BUSINESS_SETTINGS_API = {
  BASE: MANAGER_BUSINESS_SETTINGS_BACKEND_API_BASE_URL
} as const;
