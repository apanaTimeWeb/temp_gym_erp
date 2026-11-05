// RESPONSIBILITY: Centralizes route and endpoint constants for finance_branch_profit_and_loss; URL literals are evidence-derived and API endpoints remain unchanged.
// DATA FLOW: leaf route/components → admin_finance_branch_profit_and_loss.url_config.ts → internal route constants or existing backend API URLs.

/** Canonical public UI routes and preserved source API endpoint contract for Branch P&L. */
export const ADMIN_FINANCE_PNL_ROUTES = { root: '/frontend_admin/admin_finance/finance_branch_profit_and_loss' as const, dashboardFallback: '/frontend_admin/admin_dashboard/dashboard_overview' as const } as const;
// Preserved exactly from AdminFinanceApi's existing url-config contract; see INTEGRATION_GUIDE SOURCE_CONFLICT note.
export const ADMIN_FINANCE_PNL_API_URL = '/frontend_admin/admin_finance_performance/admin_finance/admin_finance_pnl' as const;
