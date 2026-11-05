/** Internal frontend links only. Backend API URL contracts remain in owning report leaves. */
export const ADMIN_REPORTS_CROSS_DOMAIN_OVERVIEW_URLS = {
  root: '/frontend_admin/admin_reports/reports_cross_domain_overview',
  attendance: '/frontend_admin/admin_attendance/attendance_reports',
  salesMembershipGrowth: '/frontend_admin/admin_sales/sales_membership_growth_report',
  salesMembership: '/frontend_admin/admin_sales/sales_membership_report',
  financeProfitLoss: '/frontend_admin/admin_finance/finance_profit_and_loss_report',
  financeRevenue: '/frontend_admin/admin_finance/finance_revenue_report',
  financePayroll: '/frontend_admin/admin_finance/finance_payroll_report',
} as const;
