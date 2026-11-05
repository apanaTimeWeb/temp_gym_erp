// RESPONSIBILITY: Renders the SuperadminSystemOpsInfrastructureUptimeChart.test UI for the system ops feature. Business/data orchestration is delegated to module-owned hooks.
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import SuperadminSystemOpsInfrastructureUptimeChart from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/components/SuperadminSystemOpsInfrastructureUptimeChart';
import { useSuperadminSystemOpsInfrastructureUptime } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/hooks/useSuperadminSystemOpsInfrastructureUptime';



vi.mock('next/dynamic', () => ({ default: () => () => <div data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-uptime-chart-superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-uptime-chart-superadmin_system_ops_infrastructure-uptime-chart-mock" /> }));
vi.mock('@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/hooks/useSuperadminSystemOpsInfrastructureTheme', () => ({ useSuperadminSystemOpsInfrastructureTheme: () => ({ theme: 'light' }) }));
vi.mock('next-intl', () => ({
  useLocale: () => 'en-IN',
  useTranslations: () => (key: string) => key,
}));
vi.mock("@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/hooks/useSuperadminSystemOpsInfrastructureUptime", () => ({
  useSuperadminSystemOpsInfrastructureUptime: vi.fn(),
}));

describe('SuperadminSystemOpsInfrastructureUptimeChart', () => {
  beforeEach(() => vi.clearAllMocks());

  it('renders the loading state from the query contract', () => {
    vi.mocked(useSuperadminSystemOpsInfrastructureUptime).mockReturnValue({ isPending: true, isError: false, data: undefined } as never);
    render(<SuperadminSystemOpsInfrastructureUptimeChart />);
    expect(screen.getByTestId('superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-uptime-chart-superadmin_system_ops_infrastructure-uptime-loading')).toBeInTheDocument();
  });

  it('renders an actionable error and retries after a failed query', () => {
    const refetch = vi.fn();
    vi.mocked(useSuperadminSystemOpsInfrastructureUptime).mockReturnValue({ isPending: false, isError: true, data: undefined, refetch } as never);
    render(<SuperadminSystemOpsInfrastructureUptimeChart />);
    fireEvent.click(screen.getByRole('button', { name: 'ui.retry' }));
    expect(refetch).toHaveBeenCalledTimes(1);
  });

  it('renders the chart when validated points are present', () => {
    vi.mocked(useSuperadminSystemOpsInfrastructureUptime).mockReturnValue({ isPending: false, isError: false, data: { data: [{ timestamp: '2026-01-01T00:00:00Z', uptimePercent: 99.9 }] } } as never);
    render(<SuperadminSystemOpsInfrastructureUptimeChart />);
    expect(screen.getByTestId('superadmin_system_ops_infrastructure-uptime-chart')).toBeInTheDocument();
  });

  it('renders the empty state when the API returns no points', () => {
    vi.mocked(useSuperadminSystemOpsInfrastructureUptime).mockReturnValue({ isPending: false, isError: false, data: { data: [] } } as never);
    render(<SuperadminSystemOpsInfrastructureUptimeChart />);
    expect(screen.getByTestId('superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-uptime-chart-superadmin_system_ops_infrastructure-uptime-empty')).toBeInTheDocument();
  });
});
