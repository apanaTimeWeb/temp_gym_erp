// RESPONSIBILITY: Owns every route path used by the Manager pt module.
/**
 * @description Canonical Manager pt URL/path registry. All URL literals are declared once as named constants and composed into the two canonical typed contracts below.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
const MANAGER_PT_ASSIGNMENTS_UI_PAGE_HOME_URL = '/frontend_manager/manager_schedule_personal_training/pt_assignments';
const MANAGER_PT_ASSIGNMENTS_BACKEND_API_BASE_URL = '/api/v1/manager/pt';
const MANAGER_PT_ASSIGNMENTS_BACKEND_API_KPIS_URL = '/api/v1/manager/pt/kpis';
const MANAGER_PT_ASSIGNMENTS_BACKEND_API_WORKLOAD_URL = '/api/v1/manager/pt/workload';
const MANAGER_PT_ASSIGNMENTS_BACKEND_API_PACKAGES_URL = '/api/v1/manager/pt/packages';
const MANAGER_PT_ASSIGNMENTS_BACKEND_API_ASSIGNMENTS_URL = '/api/v1/manager/pt/assignments';
const MANAGER_PT_ASSIGNMENTS_BACKEND_API_COMPLETE_SESSION_URL = (id: string) => `/api/v1/manager/pt/assignments/${id}/complete-session`;

export const MANAGER_PT_ASSIGNMENTS_ROUTES = {
  UI: {
    HOME: MANAGER_PT_ASSIGNMENTS_UI_PAGE_HOME_URL
  },
  PATHS: { ROOT_COMPATIBILITY: '/frontend_manager/manager_schedule_personal_training' as const, LEAF: '/frontend_manager/manager_schedule_personal_training/pt_assignments' as const }
} as const;

export const MANAGER_PT_ASSIGNMENTS_API = {
  BASE: MANAGER_PT_ASSIGNMENTS_BACKEND_API_BASE_URL,
    KPIS: MANAGER_PT_ASSIGNMENTS_BACKEND_API_KPIS_URL,
    WORKLOAD: MANAGER_PT_ASSIGNMENTS_BACKEND_API_WORKLOAD_URL,
    PACKAGES: MANAGER_PT_ASSIGNMENTS_BACKEND_API_PACKAGES_URL,
    ASSIGNMENTS: MANAGER_PT_ASSIGNMENTS_BACKEND_API_ASSIGNMENTS_URL,
    COMPLETE_SESSION: MANAGER_PT_ASSIGNMENTS_BACKEND_API_COMPLETE_SESSION_URL
} as const;
