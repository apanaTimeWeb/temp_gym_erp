// RESPONSIBILITY: Defines feature-local constants and query-key contracts for finance_branch_profit_and_loss; it does not contain mutable server data.
// DATA FLOW: feature hook/API/component → stable feature constants → requests, cache keys, and UI behavior (admin_finance/finance_branch_profit_and_loss/constants/AdminFinanceBranchProfitAndLossConstants.ts)

import type { BranchPnlStatus, PnlPeriod } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/types/AdminFinanceBranchProfitAndLossTypes';
export const PNL_PERIOD_OPTIONS: { value: PnlPeriod; labelKey: string }[] = [
  { value: 'THIS_MONTH', labelKey: 'finance.static.this_month' }, { value: 'LAST_MONTH', labelKey: 'finance.static.last_month' },
  { value: 'Q1', labelKey: 'finance.static.q1_jan_mar' }, { value: 'Q2', labelKey: 'finance.static.q2_apr_jun' },
  { value: 'Q3', labelKey: 'finance.static.q3_jul_sep' }, { value: 'Q4', labelKey: 'finance.static.q4_oct_dec' },
  { value: 'THIS_YEAR', labelKey: 'finance.static.this_year_fy' },
];
export const FINANCE_PNL_STATUS_FILTERS = { ALL: 'ALL', PROFITABLE: 'PROFITABLE', BREAKEVEN: 'BREAKEVEN', LOSS: 'LOSS' } as const;
export const FINANCE_BRANCH_PNL_STATUSES = { PROFITABLE: 'PROFITABLE', BREAKEVEN: 'BREAKEVEN', LOSS: 'LOSS' } as const;
export const PNL_STATUS_CONFIG: Record<BranchPnlStatus, { labelKey: string; textClass: string; bgClass: string }> = {
  PROFITABLE: { labelKey: 'finance.static.profitable', textClass: 'text-success', bgClass: 'bg-success-bg' },
  BREAKEVEN: { labelKey: 'finance.static.break_even', textClass: 'text-warning', bgClass: 'bg-warning-bg' },
  LOSS: { labelKey: 'finance.static.loss_making', textClass: 'text-danger', bgClass: 'bg-danger-bg' },
};
export const PNL_TABLE_HEADERS = [
  { key: 'branchName', labelKey: 'finance.static.branch', sortable: true }, { key: 'revenue', labelKey: 'finance.static.revenue', sortable: true },
  { key: 'expenses', labelKey: 'finance.static.expenses', sortable: true }, { key: 'netProfit', labelKey: 'finance.static.net_profit', sortable: true },
  { key: 'marginPct', labelKey: 'finance.static.margin', sortable: true }, { key: 'momDelta', labelKey: 'finance.static.mom', sortable: false },
  { key: 'status', labelKey: 'finance.static.status', sortable: false }, { key: 'expand', labelKey: 'finance.static.empty', sortable: false },
] as const;
export const FINANCE_REVENUE_BREAKDOWN_ITEMS = [
  { key: 'memberships', labelKey: 'finance.AdminAuditRepair.memberships' }, { key: 'ptSessions', labelKey: 'finance.AdminAuditRepair.ptSessions' },
  { key: 'products', labelKey: 'finance.AdminAuditRepair.products' }, { key: 'other', labelKey: 'finance.AdminAuditRepair.other' },
] as const;
export const FINANCE_EXPENSE_BREAKDOWN_ITEMS = [
  { key: 'rent', labelKey: 'finance.AdminAuditRepair.rent' }, { key: 'salaries', labelKey: 'finance.AdminAuditRepair.salaries' },
  { key: 'utilities', labelKey: 'finance.AdminAuditRepair.utilities' }, { key: 'maintenance', labelKey: 'finance.AdminAuditRepair.maintenance' },
  { key: 'marketing', labelKey: 'finance.AdminAuditRepair.marketing' },
] as const;
