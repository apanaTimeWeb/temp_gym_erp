"use client";
// RESPONSIBILITY: Renders the sortable-direction icon for one plan revenue table header.
// DATA FLOW: feature data/state and user input → AdminFinancePlanRevenueAnalyticsTableSortIcon → accessible UI/events routed to owning hooks (admin_finance/finance_plan_revenue_analytics/components/table/AdminFinancePlanRevenueAnalyticsTableSortIcon.tsx)

import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import type { RevenueSortDirection, RevenueSortKey } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/types/AdminFinancePlanRevenueAnalyticsTypes';

import type { AdminPlansRevenueTableSortIconProps } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/types/AdminFinancePlanRevenueAnalyticsTableSortIconPropsTypes';


/**
 * AdminFinancePlanRevenueAnalyticsTableSortIcon renders the admin plans revenue table sort icon UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinancePlanRevenueAnalyticsTableSortIcon: Renders the sortable-direction icon for one plan revenue table header.
 * @dependencies Consumes AdminPlansRevenueTypes, AdminPlansRevenueTableSortIconPropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinancePlanRevenueAnalyticsTableSortIcon({ column, sortKey, sortDir }: AdminPlansRevenueTableSortIconProps) {
  if (column !== sortKey) return <ChevronsUpDown size={18} className="text-disabled"  strokeWidth={2}/>;
  return sortDir === 'asc' ? <ChevronUp size={18} className="text-primary"  strokeWidth={2}/> : <ChevronDown size={18} className="text-primary"  strokeWidth={2}/>;
}
