"use client";
// RESPONSIBILITY: Empty state shown when the status filter returns zero branches.
// DATA FLOW: feature data/state and user input → AdminFinanceBranchProfitAndLossEmptyState → accessible UI/events routed to owning hooks (admin_finance/finance_branch_profit_and_loss/components/empty_state/AdminFinanceBranchProfitAndLossEmptyState.tsx)

import { FINANCE_PNL_STATUS_FILTERS } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/constants/AdminFinanceBranchProfitAndLossConstants';
import { useTranslations } from 'next-intl';

import { BarChart3 } from 'lucide-react';
import type { PnlStatusFilter } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/types/AdminFinanceBranchProfitAndLossTypes';

import type { AdminFinancePnlEmptyStateProps } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/types/AdminFinanceBranchProfitAndLossEmptyStatePropsTypes';


const EMPTY_MESSAGE_KEYS: Record<string, string> = {
  ALL: 'finance.static.no_pnl_data',
  PROFITABLE: 'finance.static.no_profitable',
  BREAKEVEN: 'finance.static.no_breakeven',
  LOSS: 'finance.static.no_loss',
};

/**
 * AdminFinanceBranchProfitAndLossEmptyState renders the admin finance pnl empty state UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinanceBranchProfitAndLossEmptyState: Empty state shown when the status filter returns zero branches.
 * @dependencies Consumes AdminFinanceTypes, AdminFinancePnlEmptyStatePropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinanceBranchProfitAndLossEmptyState({ statusFilter, onReset }: AdminFinancePnlEmptyStateProps) {
  const t = useTranslations();

  return (
    <tr>
      <td colSpan={8} className="py-16 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-input flex items-center justify-center border border-border">
            <BarChart3 size={18} strokeWidth={2} className="text-secondary" />
          </div>
          <p className="text-sm font-semibold text-primary">{t((EMPTY_MESSAGE_KEYS[statusFilter] ?? EMPTY_MESSAGE_KEYS.ALL) as string)}</p>
          <p className="text-xs text-secondary">{t('finance.AdminFinancePnlEmptyState.text_2ccc4a6f8d')}</p>
          {statusFilter !== FINANCE_PNL_STATUS_FILTERS.ALL && (
            <button type="button"
              onClick={onReset}
              className="mt-1 px-4 py-2 text-xs font-semibold bg-primary text-on-primary rounded-lg hover:bg-primary-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11 motion-safe:active:scale-95"
             data-testid="admin_finance-admin_finance-pnl-empty-state-state">
              {t('finance.AdminFinancePnlEmptyState.text_f641dcde74')}</button>
          )}
        </div>
      </td>
    </tr>
  );
}
