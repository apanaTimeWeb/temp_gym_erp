import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SuperadminDashboardOverviewCharts } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/components/dashboard_overview_main/SuperadminDashboardOverviewCharts';
import { SuperadminDashboardOverviewRecentOnboards } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/components/dashboard_overview_main/SuperadminDashboardOverviewRecentOnboards';
import { MOCK_SUPERADMIN_DASHBOARD_DATA } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/mocks/fixtures/SuperadminDashboardOverviewMockFixtures';

const push = vi.fn();
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key, useLocale: () => 'en' }));
vi.mock('next/navigation', () => ({ useRouter: () => ({ push }) }));
vi.mock('next/dynamic', () => ({ default: () => () => null }));

describe('Superadmin dashboard rendered states', () => {
  beforeEach(() => push.mockClear());

  it('renders each empty chart state when chart data is empty', () => {
    render(<SuperadminDashboardOverviewCharts metrics={MOCK_SUPERADMIN_DASHBOARD_DATA.metrics} revenueChartData={[]} growthChartData={[]} timeMultiplier={1} mrrLabel="MRR" />);
    expect(screen.getAllByRole('status')).toHaveLength(2);
    expect(screen.getAllByText('ui.dashboard_chart_empty')).toHaveLength(2);
  });

  it('shows an explicit empty recent-onboard state', () => {
    render(<SuperadminDashboardOverviewRecentOnboards recentOnboards={[]} />);
    expect(screen.getByTestId('superadmin-dashboard-recent-onboards-empty')).toHaveTextContent('ui.no_recent_onboards');
  });

  it('navigates to the selected recent tenant using its stable ID', () => {
    const tenant = MOCK_SUPERADMIN_DASHBOARD_DATA.metrics.recentOnboards[0]!;
    render(<SuperadminDashboardOverviewRecentOnboards recentOnboards={[tenant]} />);
    fireEvent.click(screen.getByTestId(`superadmin_dashboard-recent-onboards-${tenant.id}-open`));
    expect(push).toHaveBeenCalledWith(`/frontend_superadmin/superadmin_gyms/gyms_detail/${tenant.id}`);
  });
});
