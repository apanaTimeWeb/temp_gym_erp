// RESPONSIBILITY: Owns internal routes and only the pnl report backend contract for this leaf.
export const ADMIN_DASHBOARD_URL = '/frontend_admin/admin_dashboard/dashboard_overview' as const;
// Existing backend endpoint literals are retained exactly; export remains contract-gated.
export const ADMIN_FINANCE_PROFIT_AND_LOSS_REPORT_ROUTES = { root: '/frontend_admin/admin_finance/finance_profit_and_loss_report' as const } as const;
export const ADMIN_FINANCE_PROFIT_AND_LOSS_REPORT_BRANCH_REFERENCE_URL = '/admin/branches/fetchBranches' as const;
export const ADMIN_FINANCE_PROFIT_AND_LOSS_REPORT_BASE_URL = '/frontend_admin/admin_finance' as const;
export const ADMIN_FINANCE_PROFIT_AND_LOSS_REPORT_PNL_URL = '/admin/reports/pnl' as const;
export const ADMIN_FINANCE_PROFIT_AND_LOSS_REPORT_EXPORT_URL = '/admin/reports/export' as const;
export const ADMIN_FINANCE_PROFIT_AND_LOSS_REPORT_URLS = { branchReference: ADMIN_FINANCE_PROFIT_AND_LOSS_REPORT_BRANCH_REFERENCE_URL, base: ADMIN_FINANCE_PROFIT_AND_LOSS_REPORT_BASE_URL, pnl: ADMIN_FINANCE_PROFIT_AND_LOSS_REPORT_PNL_URL, export: ADMIN_FINANCE_PROFIT_AND_LOSS_REPORT_EXPORT_URL } as const;
export const ADMIN_FINANCE_PROFIT_AND_LOSS_REPORT_API = ADMIN_FINANCE_PROFIT_AND_LOSS_REPORT_URLS;
