// RESPONSIBILITY: Declares verified routes and only the API endpoints owned by finance_staff_ledger_management.
// DATA FLOW: feature route/API client → this local URL contract → canonical internal route or source-verified backend endpoint.
/** Fail closed for empty/reserved path IDs: browsers normalize dot segments before fetch. */
function encodeAdminFinanceStaffLedgerManagementPathSegment(id: string): string {
  if (!id || !id.trim() || id === '.' || id === '..') throw new TypeError('Invalid path identifier');
  return encodeURIComponent(id);
}

export const ADMIN_FINANCE_STAFF_LEDGER_ROUTES = {
  root: '/frontend_admin/admin_finance/finance_staff_ledger_management' as const,
  dashboard: '/frontend_admin/admin_dashboard/dashboard_overview' as const,
} as const;

export const ADMIN_FINANCE_STAFF_LEDGER_API = {
  staffBase: '/admin/hr/staff',
  summary: '/admin/hr/summary',
  ledger: (id: string) => `/admin/hr/staff/${encodeAdminFinanceStaffLedgerManagementPathSegment(id)}/ledger`,
} as const;

// Canonical local fallback destination for this autonomous feature.
export const ADMIN_DASHBOARD_URL = '/frontend_admin/admin_dashboard/dashboard_overview' as const;
