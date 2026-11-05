// RESPONSIBILITY: Centralizes route and endpoint constants for communication_notices_and_announcements; URL literals are evidence-derived and API endpoints remain unchanged.
// DATA FLOW: leaf route/components → admin_communication_notices_and_announcements.url_config.ts → internal route constants or existing backend API URLs.

// admin_announcements_url_config.ts
// Owned by: frontend_admin/admin_communication/communication_notices_and_announcements
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
/** Fail closed for empty/reserved path IDs: browsers normalize dot segments before fetch. */
function encodeAdminCommunicationNoticesAndAnnouncementsPathSegment(id: string): string {
  if (!id || !id.trim() || id === '.' || id === '..') throw new TypeError('Invalid path identifier');
  return encodeURIComponent(id);
}

export const ADMIN_ANNOUNCEMENTS_ROUTES = {
  root: '/frontend_admin/admin_communication/communication_notices_and_announcements' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_ANNOUNCEMENTS_BASE_URL = '/admin/announcements' as const;
export const ADMIN_ANNOUNCEMENTS_KPIS_URL = '/admin/announcements/kpis' as const;
export const ADMIN_ANNOUNCEMENTS_DETAIL_URL = (id: string) => `/admin/announcements/${encodeAdminCommunicationNoticesAndAnnouncementsPathSegment(id)}` as const;
export const ADMIN_ANNOUNCEMENTS_PIN_URL = (id: string) => `/admin/announcements/${encodeAdminCommunicationNoticesAndAnnouncementsPathSegment(id)}/pin` as const;

export const ADMIN_ANNOUNCEMENTS_URLS = {
  base: ADMIN_ANNOUNCEMENTS_BASE_URL,
  kpis: ADMIN_ANNOUNCEMENTS_KPIS_URL,
  detail: ADMIN_ANNOUNCEMENTS_DETAIL_URL,
  pin: ADMIN_ANNOUNCEMENTS_PIN_URL,
} as const;

export const ADMIN_ANNOUNCEMENTS_API = ADMIN_ANNOUNCEMENTS_URLS;

// Canonical local fallback destination for this autonomous feature.
export const ADMIN_DASHBOARD_URL = '/frontend_admin/admin_dashboard/dashboard_overview' as const;
