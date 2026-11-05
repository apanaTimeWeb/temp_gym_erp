// RESPONSIBILITY: Centralizes route and endpoint constants for audit_logs_explorer; URL literals are evidence-derived and API endpoints remain unchanged.
// DATA FLOW: leaf route/components → admin_security_audit_logs_explorer.url_config.ts → internal route constants or existing backend API URLs.

// admin_audit_logs_url_config.ts
// Owned by: frontend_admin/admin_audit_logs feature module
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
/** Fail closed for empty/reserved path IDs: browsers normalize dot segments before fetch. */
function encodeAdminSecurityAuditLogsExplorerPathSegment(id: string): string {
  if (!id || !id.trim() || id === '.' || id === '..') throw new TypeError('Invalid path identifier');
  return encodeURIComponent(id);
}

export const ADMIN_AUDIT_LOGS_ROUTES = {
  root: '/frontend_admin/admin_security/security_audit_logs_explorer' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_AUDIT_LOGS_BASE_URL = '/admin/audit-logs' as const;
export const ADMIN_AUDIT_LOGS_DETAIL_URL = (id: string) => `/admin/audit-logs/${encodeAdminSecurityAuditLogsExplorerPathSegment(id)}` as const;
export const ADMIN_AUDIT_LOGS_KPIS_URL = '/admin/audit-logs/kpis' as const;
export const ADMIN_AUDIT_LOGS_ACTORS_URL = '/admin/audit-logs/actors' as const;
export const ADMIN_AUDIT_LOGS_EXPORT_URL = '/admin/audit-logs/export' as const;

export const ADMIN_AUDIT_LOGS_URLS = {
  base: ADMIN_AUDIT_LOGS_BASE_URL,
  detail: ADMIN_AUDIT_LOGS_DETAIL_URL,
  kpis: ADMIN_AUDIT_LOGS_KPIS_URL,
  actors: ADMIN_AUDIT_LOGS_ACTORS_URL,
  export: ADMIN_AUDIT_LOGS_EXPORT_URL,
} as const;

export const ADMIN_AUDIT_LOGS_API = ADMIN_AUDIT_LOGS_URLS;

// Canonical local fallback destination for this autonomous feature.
export const ADMIN_DASHBOARD_URL = '/frontend_admin/admin_dashboard/dashboard_overview' as const;
