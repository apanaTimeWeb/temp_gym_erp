// RESPONSIBILITY: Sort-key contracts for the Admin Dashboard branch leaderboard.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_dashboard/dashboard_overview/types/AdminDashboardOverviewBranchLeaderboardTypes.ts)

export type LeaderboardSortKey = 'name' | 'revenue' | 'activeMembers';
export type LeaderboardSortDirection = 'asc' | 'desc';
