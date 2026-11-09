import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import ManagerDashboardOverviewEmptyState from '@/app/frontend_manager/manager_dashboard/dashboard_overview/components/ManagerDashboardOverviewEmptyState';
import { ManagerDashboardOverviewSkeleton } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/components/ManagerDashboardOverviewSkeleton';
import { renderManagerDashboardOverview } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/tests/harness/bootstrap';

describe('Manager Dashboard state and responsive contracts', () => {
  it('announces dashboard loading and hides decorative skeleton blocks', () => {
    renderManagerDashboardOverview(<ManagerDashboardOverviewSkeleton />, {
      messages: { MANAGER_DASHBOARD: { COPY_LOADING_DASHBOARD: 'Loading dashboard data' } },
    });
    expect(screen.getByRole('status', { name: 'Loading dashboard data' })).toHaveAttribute('aria-busy', 'true');
    expect(document.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(0);
  });

  it('renders an empty chart state with a keyboard-operable monthly-range action', () => {
    const onAction = vi.fn();
    renderManagerDashboardOverview(
      <ManagerDashboardOverviewEmptyState title="Revenue trends" message="No revenue data available." actionLabel="Show this month" onAction={onAction} />,
    );
    expect(screen.getByRole('heading', { name: 'Revenue trends' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Show this month' }));
    expect(onAction).toHaveBeenCalledOnce();
  });

  it('keeps the empty-state layout shrinkable at narrow viewports by contract', () => {
    const onAction = vi.fn();
    renderManagerDashboardOverview(
      <ManagerDashboardOverviewEmptyState title="Revenue trends" message="No revenue data available." actionLabel="Show this month" onAction={onAction} />,
    );
    expect(screen.getByTestId('manager-dashboard-chart-empty-state').className).toContain('min-w-0');
    expect(screen.getByTestId('manager-dashboard-chart-empty-state').className).toContain('min-h-72');
  });
});
