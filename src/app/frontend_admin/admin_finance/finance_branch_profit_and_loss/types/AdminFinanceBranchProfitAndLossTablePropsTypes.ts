// RESPONSIBILITY: Defines feature-local TypeScript contracts for finance_branch_profit_and_loss; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_branch_profit_and_loss/types/AdminFinanceBranchProfitAndLossTablePropsTypes.ts)

import type { BranchPnlRecord, PnlSortKey, PnlSortDirection, PnlStatusFilter } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/types/AdminFinanceBranchProfitAndLossTypes';
export interface AdminFinancePnlTableProps {
  data: BranchPnlRecord[];
  sortKey: PnlSortKey;
  sortDir: PnlSortDirection;
  onSort: (key: PnlSortKey) => void;
  expandedBranchId: string | null;
  onToggleExpand: (branchId: string) => void;
  statusFilter: PnlStatusFilter;
  onResetFilter: () => void;
}
