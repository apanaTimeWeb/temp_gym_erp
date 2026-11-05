// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for dashboard_overview; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_dashboard/dashboard_overview/utils/AdminDashboardOverviewSortBranchPerformanceRows.ts)

/**
 * @description AdminDashboardSortBranchPerformanceRows: Owns the AdminDashboardSortBranchPerformanceRows responsibility for the admin_dashboard feature.
 * @dependencies Uses only the owning feature's typed inputs, constants, and approved global infrastructure.
 * @edge-case Preserves null/empty/error inputs according to the feature contract and does not own server state.
 */
import type { BranchPerformance } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/types/AdminDashboardOverviewTypes';
import type { LeaderboardSortDirection, LeaderboardSortKey } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/types/AdminDashboardOverviewBranchLeaderboardTypes';

/** Sorts dashboard branch-performance rows by the selected leaderboard field. @description Implements sortAdminBranchPerformanceRows for the owning feature’s explicitly typed data. @param data - Input used by this utility as declared by the signature. @param key - Input used by this utility as declared by the signature. @param direction - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function sortAdminBranchPerformanceRows(data: BranchPerformance[], key: LeaderboardSortKey, direction: LeaderboardSortDirection): BranchPerformance[] {
  return [...data].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];
    const result = typeof aValue === 'number' && typeof bValue === 'number'
      ? aValue - bValue
      : String(aValue).localeCompare(String(bValue), undefined, { numeric: true });
    return direction === 'asc' ? result : -result;
  });
}
