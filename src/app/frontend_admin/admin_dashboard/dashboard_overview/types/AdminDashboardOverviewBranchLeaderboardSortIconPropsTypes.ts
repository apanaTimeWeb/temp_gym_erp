// RESPONSIBILITY: Defines feature-local TypeScript contracts for dashboard_overview; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_dashboard/dashboard_overview/types/AdminDashboardOverviewBranchLeaderboardSortIconPropsTypes.ts)

import type { LeaderboardSortDirection, LeaderboardSortKey } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/types/AdminDashboardOverviewBranchLeaderboardTypes';

export interface AdminDashboardBranchLeaderboardSortIconProps {
  column: LeaderboardSortKey;
  sortKey: LeaderboardSortKey;
  sortDir: LeaderboardSortDirection;
}
