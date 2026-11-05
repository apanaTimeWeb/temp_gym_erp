import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';

import ManagerDashboardOverviewEmptyState from '@/app/frontend_manager/manager_dashboard/dashboard_overview/components/ManagerDashboardOverviewEmptyState';
import { ManagerDashboardOverviewSkeleton } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/components/ManagerDashboardOverviewSkeleton';
import { renderManagerDashboardOverview } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/tests/harness/bootstrap';

describe('Manager Dashboard WCAG automated checks', () => {
  it('has no axe violations in the loading skeleton state', async () => {
    const { container } = renderManagerDashboardOverview(<main><ManagerDashboardOverviewSkeleton /></main>);
    expect((await axe(container)).violations).toEqual([]);
  });

  it('has no axe violations in the chart empty state', async () => {
    const { container } = renderManagerDashboardOverview(
      <main><ManagerDashboardOverviewEmptyState
        title="Revenue trends"
        message="No revenue data available."
        actionLabel="Show this month"
        onAction={vi.fn()}
      /></main>,
    );
    expect((await axe(container)).violations).toEqual([]);
  });
});
