// RESPONSIBILITY: Defines regression tests for AdminDashboardOverviewMockFixtures.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_dashboard/dashboard_overview/tests/mocks/fixtures/AdminDashboardOverviewMockFixtures.test.ts)

import { describe, expect, it } from 'vitest';
import { getAdminDashboardFixture } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/mocks/fixtures/AdminDashboardOverviewMockFixtures';

describe('Admin dashboard mock fixture scope', () => {
  it('returns different scoped data for distinct branches', () => {
    const branchA = getAdminDashboardFixture('b1', 'this_month');
    const branchB = getAdminDashboardFixture('b2', 'this_month');

    expect(branchA).not.toBeNull();
    expect(branchB).not.toBeNull();
    if (!branchA || !branchB) throw new Error('Expected branch fixtures');
    expect(branchA.activeMembers).not.toBe(branchB.activeMembers);
    expect(branchA.totalRevenue).not.toBe(branchB.totalRevenue);
    expect(branchA.branchLeaderboard).toHaveLength(1);
    expect(branchB.branchLeaderboard).toHaveLength(1);
    expect(branchA.branchLeaderboard[0]?.id).toBe('b1');
    expect(branchB.branchLeaderboard[0]?.id).toBe('b2');
  });

  it('keeps aggregate data when no branch is selected', () => {
    const aggregate = getAdminDashboardFixture(undefined, 'this_month');
    expect(aggregate?.activeMembers).toBe(12500);
    expect(aggregate?.totalRevenue).toBe(24500000);
    expect(aggregate?.branchLeaderboard).toHaveLength(4);
  });

  it('changes trend length from the selected range', () => {
    const month = getAdminDashboardFixture(undefined, 'this_month');
    const year = getAdminDashboardFixture(undefined, 'this_year');

    expect(month?.revenueTrend).toHaveLength(1);
    expect(year?.revenueTrend).toHaveLength(6);
  });
});
