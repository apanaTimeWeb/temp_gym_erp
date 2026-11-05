// RESPONSIBILITY: Defines feature-local TypeScript contracts for finance_branch_profit_and_loss; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_branch_profit_and_loss/types/AdminFinanceBranchProfitAndLossPeriodSelectorPropsTypes.ts)

import type { PnlPeriod } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/types/AdminFinanceBranchProfitAndLossTypes';
export interface AdminFinancePnlPeriodSelectorProps {
  period: PnlPeriod;
  onPeriodChange: (p: PnlPeriod) => void;
  onExport: () => void;
  canExport: boolean;
}
