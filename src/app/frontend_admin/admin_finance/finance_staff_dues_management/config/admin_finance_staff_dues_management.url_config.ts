// RESPONSIBILITY: Declares verified routes and only the API endpoints owned by finance_staff_dues_management.
// DATA FLOW: feature route/API client → this local URL contract → canonical internal route or source-verified backend endpoint.
export const ADMIN_FINANCE_STAFF_DUES_ROUTES = {
  root: '/frontend_admin/admin_finance/finance_staff_dues_management' as const,
  dashboard: '/frontend_admin/admin_dashboard/dashboard_overview' as const,
} as const;

export const ADMIN_FINANCE_STAFF_DUES_API = {
  staffBase: '/admin/hr/staff',
  summary: '/admin/hr/summary',
  duesPay: '/admin/hr/dues/pay',
} as const;

// Canonical local fallback destination for this autonomous feature.
export const ADMIN_DASHBOARD_URL = '/frontend_admin/admin_dashboard/dashboard_overview' as const;
