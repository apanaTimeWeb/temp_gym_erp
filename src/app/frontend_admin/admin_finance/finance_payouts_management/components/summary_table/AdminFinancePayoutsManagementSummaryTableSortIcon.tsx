"use client";
// RESPONSIBILITY: Renders the sortable-direction icon for one payouts summary table header.
// DATA FLOW: feature data/state and user input → AdminFinancePayoutsManagementSummaryTableSortIcon → accessible UI/events routed to owning hooks (admin_finance/finance_payouts_management/components/summary_table/AdminFinancePayoutsManagementSummaryTableSortIcon.tsx)

import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import type { PayoutSortDirection, PayoutSortKey } from '@/app/frontend_admin/admin_finance/finance_payouts_management/types/AdminFinancePayoutsManagementTypes';

import type { AdminPayoutsSummaryTableSortIconProps } from '@/app/frontend_admin/admin_finance/finance_payouts_management/types/AdminFinancePayoutsManagementSummaryTableSortIconPropsTypes';


/**
 * AdminFinancePayoutsManagementSummaryTableSortIcon renders the admin payouts summary table sort icon UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinancePayoutsManagementSummaryTableSortIcon: Renders the sortable-direction icon for one payouts summary table header.
 * @dependencies Consumes AdminPayoutsTypes, AdminPayoutsSummaryTableSortIconPropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinancePayoutsManagementSummaryTableSortIcon({ column, sortKey, sortDir }: AdminPayoutsSummaryTableSortIconProps) {
  if (column !== sortKey) return <ChevronsUpDown size={18} className="text-disabled"  strokeWidth={2}/>;
  return sortDir === 'asc' ? <ChevronUp size={18} className="text-primary"  strokeWidth={2}/> : <ChevronDown size={18} className="text-primary"  strokeWidth={2}/>;
}
