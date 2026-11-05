// RESPONSIBILITY: Owns every route path used by the Manager plans module.
/**
 * @description Canonical Manager plans URL/path registry. All URL literals are declared once as named constants and composed into the two canonical typed contracts below.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths encode dynamic identifiers as individual URL path segments.
 */
const MANAGER_MEMBERSHIP_LIFECYCLE_PAGES_LIST_URL = '/frontend_manager/manager_membership_plans/membership_lifecycle';
const MANAGER_MEMBERSHIP_LIFECYCLE_BACKEND_API_BASE_URL = '/api/v1/manager/plans';
const MANAGER_MEMBERSHIP_LIFECYCLE_BACKEND_API_MEMBERSHIP_OVERVIEW_URL = '/api/v1/manager/plans/membership-overview';
const MANAGER_MEMBERSHIP_LIFECYCLE_BACKEND_API_MEMBERSHIP_ACTIVATE_URL = '/api/v1/manager/plans/membership-activate';
const MANAGER_MEMBERSHIP_LIFECYCLE_BACKEND_API_MEMBERSHIP_RENEW_URL = '/api/v1/manager/plans/membership-renew';
const MANAGER_MEMBERSHIP_LIFECYCLE_BACKEND_API_MEMBERSHIP_FREEZE_URL = '/api/v1/manager/plans/membership-freeze';
const MANAGER_MEMBERSHIP_LIFECYCLE_BACKEND_API_CHANGE_REQUESTS_URL = '/api/v1/manager/plans/change-requests';
const MANAGER_MEMBERSHIP_LIFECYCLE_BACKEND_API_GET_ONE_URL = (id: string) => `/api/v1/manager/plans/${encodeURIComponent(id)}`;

export const MANAGER_MEMBERSHIP_LIFECYCLE_ROUTES = {
  PAGES: {
    LIST: MANAGER_MEMBERSHIP_LIFECYCLE_PAGES_LIST_URL
  },
  PATHS: { ROOT_COMPATIBILITY: '/frontend_manager/manager_membership_plans' as const, LEAF: '/frontend_manager/manager_membership_plans/membership_lifecycle' as const }
} as const;

export const MANAGER_MEMBERSHIP_LIFECYCLE_API = {
  BASE: MANAGER_MEMBERSHIP_LIFECYCLE_BACKEND_API_BASE_URL,
    MEMBERSHIP_OVERVIEW: MANAGER_MEMBERSHIP_LIFECYCLE_BACKEND_API_MEMBERSHIP_OVERVIEW_URL,
    MEMBERSHIP_ACTIVATE: MANAGER_MEMBERSHIP_LIFECYCLE_BACKEND_API_MEMBERSHIP_ACTIVATE_URL,
    MEMBERSHIP_RENEW: MANAGER_MEMBERSHIP_LIFECYCLE_BACKEND_API_MEMBERSHIP_RENEW_URL,
    MEMBERSHIP_FREEZE: MANAGER_MEMBERSHIP_LIFECYCLE_BACKEND_API_MEMBERSHIP_FREEZE_URL,
    CHANGE_REQUESTS: MANAGER_MEMBERSHIP_LIFECYCLE_BACKEND_API_CHANGE_REQUESTS_URL,
    GET_ONE: MANAGER_MEMBERSHIP_LIFECYCLE_BACKEND_API_GET_ONE_URL,
} as const;
