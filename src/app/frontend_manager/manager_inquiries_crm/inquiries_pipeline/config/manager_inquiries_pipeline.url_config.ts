// RESPONSIBILITY: Owns every route path used by the Manager inquiries module.
/**
 * @description Canonical Manager inquiries URL/path registry. All URL literals are declared once as named constants and composed into the two canonical typed contracts below.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
const MANAGER_INQUIRIES_PIPELINE_UI_PAGE_HOME_URL = '/frontend_manager/manager_inquiries_crm/inquiries_pipeline';
const MANAGER_INQUIRIES_PIPELINE_BACKEND_API_BASE_URL = '/api/v1/manager/inquiries';
const MANAGER_INQUIRIES_PIPELINE_BACKEND_API_STATS_URL = '/api/v1/manager/inquiries/stats';
const MANAGER_INQUIRIES_PIPELINE_BACKEND_API_PLANS_URL = '/api/v1/manager/inquiries/plans';
const MANAGER_INQUIRIES_PIPELINE_BACKEND_API_PLANS_SNAPSHOT_URL = '/api/v1/manager/inquiries/plans-snapshot';
const MANAGER_INQUIRIES_PIPELINE_BACKEND_API_GET_ONE_URL = (id: string) => `/api/v1/manager/inquiries/${encodeURIComponent(id)}`;
const MANAGER_INQUIRIES_PIPELINE_BACKEND_API_CONVERT_URL = (id: string) => `/api/v1/manager/inquiries/${encodeURIComponent(id)}/convert`;
const MANAGER_INQUIRIES_PIPELINE_INTEGRATIONS_WHATSAPP_WEB_BASE_URL = 'https://wa.me';

export const MANAGER_INQUIRIES_PIPELINE_ROUTES = {
  UI: {
    HOME: MANAGER_INQUIRIES_PIPELINE_UI_PAGE_HOME_URL
  },
  PATHS: { ROOT_COMPATIBILITY: '/frontend_manager/manager_inquiries_crm' as const, LEAF: '/frontend_manager/manager_inquiries_crm/inquiries_pipeline' as const }
} as const;

export const MANAGER_INQUIRIES_PIPELINE_API = {
  BASE: MANAGER_INQUIRIES_PIPELINE_BACKEND_API_BASE_URL,
    STATS: MANAGER_INQUIRIES_PIPELINE_BACKEND_API_STATS_URL,
    PLANS: MANAGER_INQUIRIES_PIPELINE_BACKEND_API_PLANS_URL,
    PLANS_SNAPSHOT: MANAGER_INQUIRIES_PIPELINE_BACKEND_API_PLANS_SNAPSHOT_URL,
    GET_ONE: MANAGER_INQUIRIES_PIPELINE_BACKEND_API_GET_ONE_URL,
    CONVERT: MANAGER_INQUIRIES_PIPELINE_BACKEND_API_CONVERT_URL,
  INTEGRATIONS: {
    WHATSAPP_WEB_BASE: MANAGER_INQUIRIES_PIPELINE_INTEGRATIONS_WHATSAPP_WEB_BASE_URL
  }
} as const;
