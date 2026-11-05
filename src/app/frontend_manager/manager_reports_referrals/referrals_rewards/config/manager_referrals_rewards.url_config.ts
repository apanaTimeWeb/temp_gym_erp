// RESPONSIBILITY: Owns every route path used by the Manager referrals module.
/**
 * @description Canonical Manager referrals URL/path registry. All URL literals are declared once as named constants and composed into the two canonical typed contracts below.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
const MANAGER_REFERRALS_REWARDS_UI_PAGE_HOME_URL = '/frontend_manager/manager_reports_referrals/referrals_rewards';
const MANAGER_REFERRALS_REWARDS_BACKEND_API_BASE_URL = '/api/v1/manager/referrals';
const MANAGER_REFERRALS_REWARDS_BACKEND_API_KPIS_URL = '/api/v1/manager/referrals/kpis';
const MANAGER_REFERRALS_REWARDS_BACKEND_API_CLAIM_URL = (id: string) => `/api/v1/manager/referrals/${id}/claim`;

export const MANAGER_REFERRALS_REWARDS_ROUTES = {
  UI: {
    HOME: MANAGER_REFERRALS_REWARDS_UI_PAGE_HOME_URL
  },
  PATHS: { ROOT_COMPATIBILITY: '/frontend_manager/manager_reports_referrals' as const, LEAF: '/frontend_manager/manager_reports_referrals/referrals_rewards' as const }
} as const;

export const MANAGER_REFERRALS_REWARDS_API = {
  BASE: MANAGER_REFERRALS_REWARDS_BACKEND_API_BASE_URL,
    KPIS: MANAGER_REFERRALS_REWARDS_BACKEND_API_KPIS_URL,
    CLAIM: MANAGER_REFERRALS_REWARDS_BACKEND_API_CLAIM_URL
} as const;
