// RESPONSIBILITY: Defines regression tests for AdminDashboardOverviewSortBranchPerformanceRows.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_dashboard/dashboard_overview/tests/utils/AdminDashboardOverviewSortBranchPerformanceRows.test.ts)

import { describe, expect, it } from 'vitest';
import { sortAdminBranchPerformanceRows } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/utils/AdminDashboardOverviewSortBranchPerformanceRows';
import type { BranchPerformance } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/types/AdminDashboardOverviewTypes';

describe('sortAdminBranchPerformanceRows', () => {
  const rows: BranchPerformance[] = [
    { id: 'b2', name: 'Beta', revenue: 200, activeMembers: 20, trend: 'up' },
    { id: 'b1', name: 'Alpha', revenue: 100, activeMembers: 40, trend: 'down' },
  ];

  it('sorts numeric fields in the requested direction without mutating the input', () => {
    const sorted = sortAdminBranchPerformanceRows(rows, 'revenue', 'asc');
    expect(sorted.map((row) => row.id)).toEqual(['b1', 'b2']);
    expect(rows.map((row) => row.id)).toEqual(['b2', 'b1']);
  });

  it('sorts text fields in descending order', () => {
    expect(sortAdminBranchPerformanceRows(rows, 'name', 'desc').map((row) => row.name)).toEqual(['Beta', 'Alpha']);
  });
});
