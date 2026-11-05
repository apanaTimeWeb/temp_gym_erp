"use client";
// RESPONSIBILITY: Renders one proportional bar for a P&L breakdown metric.
// DATA FLOW: feature data/state and user input → AdminFinanceBranchProfitAndLossBreakdownBar → accessible UI/events routed to owning hooks (admin_finance/finance_branch_profit_and_loss/components/breakdown/AdminFinanceBranchProfitAndLossBreakdownBar.tsx)

import { useTranslations } from 'next-intl';

import AdminNavigationLayoutProgressBar from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/components/progress_bar/AdminFinanceBranchProfitAndLossProgressBar';
import type { AdminFinancePnlBreakdownBarProps } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/types/AdminFinanceBranchProfitAndLossBreakdownBarPropsTypes';


/**
 * AdminFinanceBranchProfitAndLossBreakdownBar renders the admin finance pnl breakdown bar UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinanceBranchProfitAndLossBreakdownBar: Renders one proportional bar for a P&L breakdown metric.
 * @dependencies Consumes AdminNavigationLayoutProgressBar, AdminFinancePnlBreakdownBarPropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinanceBranchProfitAndLossBreakdownBar({ value, max, colorClass }: AdminFinancePnlBreakdownBarProps) {
  const t = useTranslations();
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <AdminNavigationLayoutProgressBar
      value={pct}
      variant={colorClass}
      label={t('AdminFinancePnlBreakdownBar.auto_breakdown')}
    />
  );
}
