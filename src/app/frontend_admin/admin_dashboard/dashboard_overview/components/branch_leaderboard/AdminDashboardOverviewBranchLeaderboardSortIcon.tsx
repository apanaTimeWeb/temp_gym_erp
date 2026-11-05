"use client";
// RESPONSIBILITY: Renders the sortable-direction icon for a dashboard leaderboard header.
// DATA FLOW: feature data/state and user input → AdminDashboardOverviewBranchLeaderboardSortIcon → accessible UI/events routed to owning hooks (admin_dashboard/dashboard_overview/components/branch_leaderboard/AdminDashboardOverviewBranchLeaderboardSortIcon.tsx)

import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import type { LeaderboardSortDirection, LeaderboardSortKey } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/types/AdminDashboardOverviewBranchLeaderboardTypes';

import type { AdminDashboardBranchLeaderboardSortIconProps } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/types/AdminDashboardOverviewBranchLeaderboardSortIconPropsTypes';


/**
 * AdminDashboardOverviewBranchLeaderboardSortIcon renders the admin dashboard branch leaderboard sort icon UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminDashboardOverviewBranchLeaderboardSortIcon: Renders the sortable-direction icon for a dashboard leaderboard header.
 * @dependencies Consumes AdminDashboardBranchLeaderboardTypes, AdminDashboardBranchLeaderboardSortIconPropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminDashboardOverviewBranchLeaderboardSortIcon({ column, sortKey, sortDir }: AdminDashboardBranchLeaderboardSortIconProps) {
  if (column !== sortKey) return <ChevronsUpDown size={18} className="text-disabled"  strokeWidth={2}/>;
  return sortDir === 'asc' ? <ChevronUp size={18} className="text-primary"  strokeWidth={2}/> : <ChevronDown size={18} className="text-primary"  strokeWidth={2}/>;
}
