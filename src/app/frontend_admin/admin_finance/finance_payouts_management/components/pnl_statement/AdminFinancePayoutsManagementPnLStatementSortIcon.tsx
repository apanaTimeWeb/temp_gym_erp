"use client";
// RESPONSIBILITY: Renders the sortable-direction icon for one payouts P&L table header.
// DATA FLOW: feature data/state and user input → AdminFinancePayoutsManagementPnLStatementSortIcon → accessible UI/events routed to owning hooks (admin_finance/finance_payouts_management/components/pnl_statement/AdminFinancePayoutsManagementPnLStatementSortIcon.tsx)

import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import type { PnlSortDirection, PnlSortKey } from '@/app/frontend_admin/admin_finance/finance_payouts_management/types/AdminFinancePayoutsManagementTypes';

import type { AdminPayoutsPnLStatementSortIconProps } from '@/app/frontend_admin/admin_finance/finance_payouts_management/types/AdminFinancePayoutsManagementPnLStatementSortIconPropsTypes';


/**
 * AdminFinancePayoutsManagementPnLStatementSortIcon renders the admin payouts pn lstatement sort icon UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinancePayoutsManagementPnLStatementSortIcon: Renders the sortable-direction icon for one payouts P&L table header.
 * @dependencies Consumes AdminPayoutsTypes, AdminPayoutsPnLStatementSortIconPropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinancePayoutsManagementPnLStatementSortIcon({ column, sortKey, sortDir }: AdminPayoutsPnLStatementSortIconProps) {
  if (column !== sortKey) return <ChevronsUpDown size={18} className="text-disabled"  strokeWidth={2}/>;
  return sortDir === 'asc' ? <ChevronUp size={18} className="text-primary"  strokeWidth={2}/> : <ChevronDown size={18} className="text-primary"  strokeWidth={2}/>;
}
