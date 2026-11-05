// RESPONSIBILITY: Owns every route path used by the Manager communications module.
/**
 * @description Canonical Manager communications URL/path registry. All URL literals are declared once as named constants and composed into the two canonical typed contracts below.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
const MANAGER_COMMUNICATIONS_CAMPAIGNS_UI_PAGE_HOME_URL = '/frontend_manager/manager_communications/communications_churn_recovery';
const MANAGER_COMMUNICATIONS_CAMPAIGNS_BACKEND_API_BASE_URL = '/api/v1/manager/communications';
const MANAGER_COMMUNICATIONS_CAMPAIGNS_BACKEND_API_CAMPAIGNS_URL = '/api/v1/manager/communications/campaigns';
const MANAGER_COMMUNICATIONS_CAMPAIGNS_BACKEND_API_KPIS_URL = '/api/v1/manager/communications/kpis';
const MANAGER_COMMUNICATIONS_CAMPAIGNS_BACKEND_API_SEGMENT_URL = (segment: string) => `/api/v1/manager/communications/segments/${segment}`;
const MANAGER_COMMUNICATIONS_CAMPAIGNS_BACKEND_API_AUTOMATIONS_URL = '/api/v1/manager/communications/automations';
const MANAGER_COMMUNICATIONS_CAMPAIGNS_BACKEND_API_AUTOMATION_URL = (id: string) => `/api/v1/manager/communications/automations/${id}`;
const MANAGER_COMMUNICATIONS_CAMPAIGNS_BACKEND_API_CHURNED_MEMBERS_URL = '/api/v1/manager/communications/churned-members';
const MANAGER_COMMUNICATIONS_CAMPAIGNS_BACKEND_API_CHURN_KPIS_URL = '/api/v1/manager/communications/churn-kpis';
const MANAGER_COMMUNICATIONS_CAMPAIGNS_BACKEND_API_WIN_BACK_URL = '/api/v1/manager/communications/win-back';
const MANAGER_COMMUNICATIONS_CAMPAIGNS_INTEGRATIONS_WHATSAPP_WEB_BASE_URL = 'https://wa.me';

export const MANAGER_COMMUNICATIONS_CAMPAIGNS_ROUTES = {
  UI: {
    HOME: MANAGER_COMMUNICATIONS_CAMPAIGNS_UI_PAGE_HOME_URL
  },
  PATHS: { ROOT_COMPATIBILITY: '/frontend_manager/manager_communications' as const, LEAF: '/frontend_manager/manager_communications/communications_churn_recovery' as const }
} as const;

export const MANAGER_COMMUNICATIONS_CAMPAIGNS_API = {
  BASE: MANAGER_COMMUNICATIONS_CAMPAIGNS_BACKEND_API_BASE_URL,
    CAMPAIGNS: MANAGER_COMMUNICATIONS_CAMPAIGNS_BACKEND_API_CAMPAIGNS_URL,
    KPIS: MANAGER_COMMUNICATIONS_CAMPAIGNS_BACKEND_API_KPIS_URL,
    SEGMENT: MANAGER_COMMUNICATIONS_CAMPAIGNS_BACKEND_API_SEGMENT_URL,
    AUTOMATIONS: MANAGER_COMMUNICATIONS_CAMPAIGNS_BACKEND_API_AUTOMATIONS_URL,
    AUTOMATION: MANAGER_COMMUNICATIONS_CAMPAIGNS_BACKEND_API_AUTOMATION_URL,
    CHURNED_MEMBERS: MANAGER_COMMUNICATIONS_CAMPAIGNS_BACKEND_API_CHURNED_MEMBERS_URL,
    CHURN_KPIS: MANAGER_COMMUNICATIONS_CAMPAIGNS_BACKEND_API_CHURN_KPIS_URL,
    WIN_BACK: MANAGER_COMMUNICATIONS_CAMPAIGNS_BACKEND_API_WIN_BACK_URL,
  INTEGRATIONS: {
    WHATSAPP_WEB_BASE: MANAGER_COMMUNICATIONS_CAMPAIGNS_INTEGRATIONS_WHATSAPP_WEB_BASE_URL
  }
} as const;
