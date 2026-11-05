// RESPONSIBILITY: Defines feature-local constants and query-key contracts for finance_branch_profit_and_loss; it does not contain mutable server data.
// DATA FLOW: feature hook/API/component → stable feature constants → requests, cache keys, and UI behavior (admin_finance/finance_branch_profit_and_loss/constants/AdminFinanceBranchProfitAndLossQueryKeys.ts)

/** Stable, resource-namespaced query keys for Branch P&L server state. */
export const ADMIN_FINANCE_PNL_QUERY_KEYS = {
  all: ['admin_finance_pnl'] as const,
  list: (filters?: unknown) => filters === undefined ? ['admin_finance_pnl', 'list'] as const : ['admin_finance_pnl', 'list', filters] as const,
  key: (...segments: readonly unknown[]) => ['admin_finance_pnl', ...segments] as const,
};
