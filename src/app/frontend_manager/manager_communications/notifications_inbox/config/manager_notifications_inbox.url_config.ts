// RESPONSIBILITY: Owns every route path used by the Manager notifications module.
/**
 * @description Canonical Manager notifications URL/path registry. All URL literals are declared once as named constants and composed into the two canonical typed contracts below.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource identifiers are encoded as individual URL path segments.
 */
const MANAGER_NOTIFICATIONS_INBOX_UI_PAGE_HOME_URL = '/frontend_manager/manager_communications/notifications_inbox';
const MANAGER_NOTIFICATIONS_INBOX_BACKEND_API_BASE_URL = '/api/v1/manager/notifications';
const MANAGER_NOTIFICATIONS_INBOX_BACKEND_API_KPIS_URL = '/api/v1/manager/notifications/kpis';
const MANAGER_NOTIFICATIONS_INBOX_BACKEND_API_MARK_READ_URL = (id: string) => `/api/v1/manager/notifications/${encodeURIComponent(id)}/read`;
const MANAGER_NOTIFICATIONS_INBOX_BACKEND_API_MARK_ALL_READ_URL = '/api/v1/manager/notifications/read-all';
const MANAGER_NOTIFICATIONS_INBOX_BACKEND_API_DELETE_URL = (id: string) => `/api/v1/manager/notifications/${encodeURIComponent(id)}`;

export const MANAGER_NOTIFICATIONS_INBOX_ROUTES = {
  UI: {
    HOME: MANAGER_NOTIFICATIONS_INBOX_UI_PAGE_HOME_URL
  },
  PATHS: { ROOT_COMPATIBILITY: '/frontend_manager/manager_communications' as const, LEAF: '/frontend_manager/manager_communications/notifications_inbox' as const }
} as const;

export const MANAGER_NOTIFICATIONS_INBOX_API = {
  BASE: MANAGER_NOTIFICATIONS_INBOX_BACKEND_API_BASE_URL,
    KPIS: MANAGER_NOTIFICATIONS_INBOX_BACKEND_API_KPIS_URL,
    MARK_READ: MANAGER_NOTIFICATIONS_INBOX_BACKEND_API_MARK_READ_URL,
    MARK_ALL_READ: MANAGER_NOTIFICATIONS_INBOX_BACKEND_API_MARK_ALL_READ_URL,
    DELETE: MANAGER_NOTIFICATIONS_INBOX_BACKEND_API_DELETE_URL
} as const;
