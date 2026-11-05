// RESPONSIBILITY: Owns every route path used by the Manager reports module.
/**
 * @description Canonical Manager reports URL/path registry. All URL literals are declared once as named constants and composed into the two canonical typed contracts below.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
const MANAGER_REPORTS_OVERVIEW_PAGES_LIST_URL = '/frontend_manager/manager_reports_referrals/reports_overview';
const MANAGER_REPORTS_OVERVIEW_BACKEND_API_BASE_URL = '/api/v1/manager/reports';
const MANAGER_REPORTS_OVERVIEW_BACKEND_API_SUMMARY_URL = '/api/v1/manager/reports/summary';

export const MANAGER_REPORTS_OVERVIEW_ROUTES = {
  PAGES: {
    LIST: MANAGER_REPORTS_OVERVIEW_PAGES_LIST_URL
  },
  PATHS: { ROOT_COMPATIBILITY: '/frontend_manager/manager_reports_referrals' as const, LEAF: '/frontend_manager/manager_reports_referrals/reports_overview' as const }
} as const;

export const MANAGER_REPORTS_OVERVIEW_API = {
  BASE: MANAGER_REPORTS_OVERVIEW_BACKEND_API_BASE_URL,
    SUMMARY: MANAGER_REPORTS_OVERVIEW_BACKEND_API_SUMMARY_URL,
} as const;
