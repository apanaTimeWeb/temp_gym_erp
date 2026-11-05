"use client";
// RESPONSIBILITY: Renders the sortable-direction icon for one HR performance table header.
// DATA FLOW: feature data/state and user input → AdminHrPerformanceAnalyticsTableSortIcon → accessible UI/events routed to owning hooks (admin_hr/hr_performance_analytics/components/table/AdminHrPerformanceAnalyticsTableSortIcon.tsx)

import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';

import type { AdminHrPerformanceTableSortIconProps } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/types/AdminHrPerformanceAnalyticsTableSortIconPropsTypes';


/**
 * AdminHrPerformanceAnalyticsTableSortIcon renders the admin hr performance table sort icon UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminHrPerformanceAnalyticsTableSortIcon: Renders the sortable-direction icon for one HR performance table header.
 * @dependencies Consumes AdminHrPerformanceTableSortIconPropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminHrPerformanceAnalyticsTableSortIcon({ column, sortKey, sortDir }: AdminHrPerformanceTableSortIconProps) {
  if (column !== sortKey) return <ChevronsUpDown size={18} className="text-disabled"  strokeWidth={2}/>;
  return sortDir === 'asc' ? <ChevronUp size={18} className="text-primary"  strokeWidth={2}/> : <ChevronDown size={18} className="text-primary"  strokeWidth={2}/>;
}
