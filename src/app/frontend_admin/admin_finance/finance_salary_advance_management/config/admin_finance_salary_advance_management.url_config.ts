// RESPONSIBILITY: Declares verified routes and only the API endpoints owned by finance_salary_advance_management.
// DATA FLOW: feature route/API client → this local URL contract → canonical internal route or source-verified backend endpoint.
export const ADMIN_FINANCE_SALARY_ADVANCE_ROUTES = {
  root: '/frontend_admin/admin_finance/finance_salary_advance_management' as const,
  dashboard: '/frontend_admin/admin_dashboard/dashboard_overview' as const,
} as const;

export const ADMIN_FINANCE_SALARY_ADVANCE_API = {
  staffBase: '/admin/hr/staff',
  summary: '/admin/hr/summary',
  advances: '/admin/hr/advances',
} as const;

// Canonical local fallback destination for this autonomous feature.
export const ADMIN_DASHBOARD_URL = '/frontend_admin/admin_dashboard/dashboard_overview' as const;
