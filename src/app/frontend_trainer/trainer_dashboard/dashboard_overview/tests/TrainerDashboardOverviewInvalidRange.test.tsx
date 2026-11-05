import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import TrainerDashboardMain from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/components/TrainerDashboardOverviewMain';

vi.mock('@/app/frontend_trainer/trainer_dashboard/dashboard_overview/hooks/useTrainerDashboardOverviewQuery', () => ({
  useTrainerDashboardQuery: () => ({ isPending: true, isInvalidRange: true, isError: false }),
}));
vi.mock('@/app/frontend_trainer/trainer_dashboard/dashboard_overview/components/TrainerDashboardOverviewDateFilterDropdown', () => ({ default: () => <div data-testid="range-selector" /> }));

describe('Dashboard overview invalid custom range', () => {
  it('keeps the date control available rather than showing a perpetual spinner', () => {
    render(<TrainerDashboardMain />);
    expect(screen.getByTestId('range-selector')).toBeTruthy();
    expect(screen.getByRole('status')).toBeTruthy();
  });
});
