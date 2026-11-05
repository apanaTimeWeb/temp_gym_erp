// RESPONSIBILITY: Defines feature-local TypeScript contracts for finance_branch_profit_and_loss; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_branch_profit_and_loss/types/AdminFinanceBranchProfitAndLossTypes.ts)

// Self-contained domain contracts for the Branch P&L feature.
export type PnlPeriod = 'THIS_MONTH' | 'LAST_MONTH' | 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'THIS_YEAR';
export type BranchPnlStatus = 'PROFITABLE' | 'BREAKEVEN' | 'LOSS';
export type PnlStatusFilter = 'ALL' | BranchPnlStatus;
export type PnlSortKey = 'branchName' | 'revenue' | 'expenses' | 'netProfit' | 'marginPct';
export type PnlSortDirection = 'asc' | 'desc';
export interface BranchRevenueBreakdown { memberships: number; ptSessions: number; products: number; other: number; }
export interface BranchExpenseBreakdown { rent: number; salaries: number; utilities: number; maintenance: number; marketing: number; }
export interface BranchPnlRecord {
  branchId: string; branchName: string; location: string; revenue: number; expenses: number; netProfit: number; marginPct: number;
  status: BranchPnlStatus; momDelta: number; revenueBreakdown: BranchRevenueBreakdown; expenseBreakdown: BranchExpenseBreakdown;
}
export interface BranchPnlAggregates {
  totalRevenue: number; totalExpenses: number; totalNetProfit: number; overallMarginPct: number; profitableBranches: number; lossMakingBranches: number;
}
