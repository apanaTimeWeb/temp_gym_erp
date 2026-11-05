import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { describe, expect, it, vi } from 'vitest';

import TrainerDashboardMain from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/components/TrainerDashboardOverviewMain';






const refetch = vi.fn();
vi.mock('@/app/frontend_trainer/trainer_dashboard/dashboard_overview/hooks/useTrainerDashboardOverviewQuery', () => ({ useTrainerDashboardQuery: () => ({ isPending: false, isError: true, refetch }) }));
vi.mock('@/lib/usePermissions', () => ({ usePermissions: () => ({ can: () => true }) }));
vi.mock('@/app/frontend_trainer/trainer_dashboard/dashboard_overview/components/TrainerDashboardOverviewKPIs', () => ({ default: () => <div /> }));
vi.mock('@/app/frontend_trainer/trainer_dashboard/dashboard_overview/components/TrainerDashboardOverviewUpcomingSessions', () => ({ default: () => <div /> }));
vi.mock('@/app/frontend_trainer/trainer_dashboard/dashboard_overview/components/TrainerDashboardOverviewRecentProgress', () => ({ default: () => <div /> }));
vi.mock('@/app/frontend_trainer/trainer_dashboard/dashboard_overview/components/TrainerDashboardOverviewQuickActions', () => ({ default: () => <div /> }));
vi.mock('@/app/frontend_trainer/trainer_dashboard/dashboard_overview/components/TrainerDashboardOverviewGoalTrendChart', () => ({ default: () => <div /> }));
vi.mock('@/app/frontend_trainer/trainer_dashboard/dashboard_overview/components/TrainerDashboardOverviewMembershipDistribution', () => ({ default: () => <div /> }));
vi.mock('@/app/frontend_trainer/trainer_dashboard/dashboard_overview/components/TrainerDashboardOverviewDateFilterDropdown', () => ({ default: () => <div /> }));
describe('TrainerDashboardMain behavior', () => {
  it('exposes a retry action when the dashboard query fails', async () => {
    const user = userEvent.setup();
    render(<TrainerDashboardMain />);
    await user.click(screen.getByRole('button', { name: 'Retry' }));
    expect(refetch).toHaveBeenCalledTimes(1);
  });
});
