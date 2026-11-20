// RESPONSIBILITY: Centralizes route and endpoint constants for gyms_comparison.
// DATA FLOW: leaf route/components → admin_gyms_comparison.url_config.ts → internal route constants.

export const ADMIN_GYMS_COMPARISON_ROUTES = {
  root: '/frontend_admin/admin_gyms/gyms_comparison' as const,
  branchesDirectory: '/frontend_admin/admin_gyms/gyms_branches_directory' as const,
  dashboard: '/frontend_admin/admin_dashboard' as const,
} as const;

export const ADMIN_GYMS_COMPARISON_API = {
  base: '/admin/gyms/comparison' as const,
} as const;
