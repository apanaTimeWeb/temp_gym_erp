// RESPONSIBILITY: Centralizes route and endpoint constants for communication_notifications_center; URL literals are evidence-derived and API endpoints remain unchanged.
// DATA FLOW: leaf route/components → admin_communication_notifications_center.url_config.ts → internal route constants or existing backend API URLs.

// admin_notifications_url_config.ts
// Owned by: frontend_admin/admin_communication/communication_notifications_center
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
/** Fail closed for empty/reserved path IDs: browsers normalize dot segments before fetch. */
function encodeAdminCommunicationNotificationsCenterPathSegment(id: string): string {
  if (!id || !id.trim() || id === '.' || id === '..') throw new TypeError('Invalid path identifier');
  return encodeURIComponent(id);
}

export const ADMIN_NOTIFICATIONS_ROUTES = {
  root: '/frontend_admin/admin_communication/communication_notifications_center' as const,
  dashboard: '/frontend_admin/admin_dashboard' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_NOTIFICATIONS_BASE_URL = '/admin/notifications' as const;
export const ADMIN_NOTIFICATIONS_MARK_READ_URL = (id: string) => `/admin/notifications/${encodeAdminCommunicationNotificationsCenterPathSegment(id)}/read` as const;
export const ADMIN_NOTIFICATIONS_MARK_ALL_READ_URL = '/admin/notifications/read-all' as const;

export const ADMIN_NOTIFICATIONS_URLS = {
  base: ADMIN_NOTIFICATIONS_BASE_URL,
  markRead: ADMIN_NOTIFICATIONS_MARK_READ_URL,
  markAllRead: ADMIN_NOTIFICATIONS_MARK_ALL_READ_URL,
} as const;

export const ADMIN_NOTIFICATIONS_API = ADMIN_NOTIFICATIONS_URLS;

// Canonical local fallback destination for this autonomous feature.
export const ADMIN_DASHBOARD_URL = '/frontend_admin/admin_dashboard/dashboard_overview' as const;
