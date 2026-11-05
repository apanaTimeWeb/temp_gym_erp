// RESPONSIBILITY: Declares verified routes and only the API endpoints owned by finance_payroll_management.
// DATA FLOW: feature route/API client → this local URL contract → canonical internal route or source-verified backend endpoint.
/** Keep server-provided IDs within one route segment; dot-only values are
 * reserved by URL normalization and must never become parent paths. */
function encodeFinancePayrollManagementPathSegment(id: string): string {
  if (id === '.' || id === '..') throw new TypeError('Invalid path identifier');
  return encodeURIComponent(id);
}

export const ADMIN_FINANCE_PAYROLL_ROUTES = {
  root: '/frontend_admin/admin_finance/finance_payroll_management' as const,
  dashboard: '/frontend_admin/admin_dashboard/dashboard_overview' as const,
} as const;

export const ADMIN_FINANCE_PAYROLL_API = {
  staffBase: '/admin/hr/staff',
  staffUpdate: (id: string) => `/admin/hr/staff/${encodeFinancePayrollManagementPathSegment(id)}`,
  payrollsBase: '/admin/hr/payrolls',
  payrollUpdate: (id: string) => `/admin/hr/payrolls/${encodeFinancePayrollManagementPathSegment(id)}`,
  summary: '/admin/hr/summary',
} as const;

// Canonical local fallback destination for this autonomous feature.
export const ADMIN_DASHBOARD_URL = '/frontend_admin/admin_dashboard/dashboard_overview' as const;
