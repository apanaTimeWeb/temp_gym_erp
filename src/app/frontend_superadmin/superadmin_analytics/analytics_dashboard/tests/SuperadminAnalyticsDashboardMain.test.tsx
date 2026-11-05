import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import SuperadminAnalyticsMain from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/components/analytics_dashboard_main/SuperadminAnalyticsDashboardMain';
import { useSuperadminAnalyticsDashboardPage } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/hooks/useSuperadminAnalyticsDashboardPage';


vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/hooks/useSuperadminAnalyticsDashboardPage', () => ({
  useSuperadminAnalyticsDashboardPage: vi.fn(),
}));
vi.mock('@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/hooks/useSuperadminAnalyticsDashboardViewModel', () => ({
  useSuperadminAnalyticsDashboardViewModel: vi.fn(() => ({ kpiCards: [{ label: 'MRR' }], charts: {}, secondaryMetrics: [] })),
}));
vi.mock('@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/components/analytics_dashboard_dashboard_widgets/SuperadminAnalyticsDashboardPageHeader', () => ({
  SuperadminAnalyticsDashboardPageHeader: () => <div data-testid="analytics-header" />,
}));
vi.mock('@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/components/analytics_dashboard_states_and_feedback/SuperadminAnalyticsDashboardMainLoadingState', () => ({
  SuperadminAnalyticsDashboardMainLoadingState: () => <div data-testid="analytics-loading" aria-busy="true" />,
}));
vi.mock('@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/components/analytics_dashboard_states_and_feedback/SuperadminAnalyticsDashboardMainErrorState', () => ({
  SuperadminAnalyticsDashboardMainErrorState: ({ message, onRetry }: { message: string; onRetry: () => void }) => (
    <section role="alert"><p>{message}</p><button type="button" onClick={onRetry} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">Retry analytics</button></section>
  ),
}));
vi.mock('@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/components/analytics_dashboard_dashboard_widgets/SuperadminAnalyticsDashboardKpiGrid', () => ({
  SuperadminAnalyticsDashboardKpiGrid: ({ cards }: { cards: unknown[] }) => <div data-testid="analytics-kpis">{cards.length}</div>,
}));
vi.mock('@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/components/SuperadminAnalyticsDashboardPrimaryCharts', () => ({
  SuperadminAnalyticsDashboardPrimaryCharts: () => <div data-testid="analytics-charts" />,
}));
vi.mock('@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/components/analytics_dashboard_dashboard_widgets/SuperadminAnalyticsDashboardSecondaryMetrics', () => ({
  SuperadminAnalyticsDashboardSecondaryMetrics: () => <div data-testid="analytics-secondary-metrics" />,
}));


const metrics = {
  mrr: 15000000,
  arr: 180000000,
  cancellationRate: 2.5,
  ltv: 50000,
  cac: 2000,
  currency: 'INR',
  activeTenants: 125,
  arpu: 1200,
  mrrDeltaPercent: 5.2,
  arrDeltaPercent: 12.5,
  cancellationDeltaPercent: -0.5,
};
const monthlyData = [{ month: 'Jan', mrr: 10000000, tenantCount: 100, cancelledCount: 2 }];
const refetch = vi.fn();

function setPageState(overrides: Partial<ReturnType<typeof makePageState>> = {}) {
  vi.mocked(useSuperadminAnalyticsDashboardPage).mockReturnValue({ ...makePageState(), ...overrides } as never);
}

function makePageState() {
  return {
    metrics,
    monthlyData,
    isPending: false,
    isError: false,
    error: null,
    timeRange: 'this_month' as const,
    customStart: '',
    customEnd: '',
    refetch,
  };
}

describe('SuperadminAnalyticsMain rendered states', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setPageState();
  });

  it('renders the structural loading skeleton and keeps date controls available', () => {
    setPageState({ isPending: true, metrics: null, monthlyData: [] });
    render(<SuperadminAnalyticsMain />);
    expect(screen.getByTestId('analytics-header')).toBeInTheDocument();
    expect(screen.getByTestId('analytics-loading')).toHaveAttribute('aria-busy', 'true');
    expect(screen.queryByTestId('analytics-kpis')).not.toBeInTheDocument();
  });

  it('shows a recoverable error and retries the owning query', () => {
    setPageState({ isError: true, metrics: null, monthlyData: [], error: 'Analytics unavailable' });
    render(<SuperadminAnalyticsMain />);
    expect(screen.getByRole('alert')).toHaveTextContent('Analytics unavailable');
    fireEvent.click(screen.getByRole('button', { name: 'Retry analytics' }));
    expect(refetch).toHaveBeenCalledTimes(1);
  });

  it('renders KPI, chart and secondary metric surfaces for a successful API result', () => {
    render(<SuperadminAnalyticsMain />);
    expect(screen.getByTestId('superadmin_analytics-superadmin-analytics-main-page-ready')).toBeInTheDocument();
    expect(screen.getByTestId('analytics-kpis')).toHaveTextContent('1');
    expect(screen.getByTestId('analytics-charts')).toBeInTheDocument();
    expect(screen.getByTestId('analytics-secondary-metrics')).toBeInTheDocument();
  });

  it('does not leave a blank screen when metrics are absent without an API error flag', () => {
    setPageState({ metrics: null, monthlyData: [] });
    render(<SuperadminAnalyticsMain />);
    expect(screen.getByRole('alert')).toHaveTextContent('ui.action_failed_retry');
  });
});
