"use client";
// RESPONSIBILITY: Renders the sortable-direction icon for one Finance P&L table header.
// DATA FLOW: feature data/state and user input → AdminFinanceBranchProfitAndLossTableSortIcon → accessible UI/events routed to owning hooks (admin_finance/finance_branch_profit_and_loss/components/table/AdminFinanceBranchProfitAndLossTableSortIcon.tsx)

import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import type { PnlSortDirection, PnlSortKey } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/types/AdminFinanceBranchProfitAndLossTypes';

import type { AdminFinancePnlTableSortIconProps } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/types/AdminFinanceBranchProfitAndLossTableSortIconPropsTypes';


/**
 * AdminFinanceBranchProfitAndLossTableSortIcon renders the admin finance pnl table sort icon UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinanceBranchProfitAndLossTableSortIcon: Renders the sortable-direction icon for one Finance P&L table header.
 * @dependencies Consumes AdminFinanceTypes, AdminFinancePnlTableSortIconPropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinanceBranchProfitAndLossTableSortIcon({ column, sortKey, sortDir }: AdminFinancePnlTableSortIconProps) {
  if (column !== sortKey) return <ChevronsUpDown size={18} className="text-disabled"  strokeWidth={2}/>;
  return sortDir === 'asc' ? <ChevronUp size={18} className="text-primary"  strokeWidth={2}/> : <ChevronDown size={18} className="text-primary"  strokeWidth={2}/>;
}
