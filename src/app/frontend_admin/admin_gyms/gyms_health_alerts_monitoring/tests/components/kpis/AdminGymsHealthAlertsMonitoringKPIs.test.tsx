// RESPONSIBILITY: Defines regression tests for AdminGymsHealthAlertsMonitoringKPIs.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_gym_health_alerts/gym_health_alerts_monitoring/tests/components/kpis/AdminGymsHealthAlertsMonitoringKPIs.test.tsx)

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import AdminGymHealthAlertsKPIs from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/components/kpis/AdminGymsHealthAlertsMonitoringKPIs';

const { mockUseAdminGymHealthAlertsLogic, mockRetrySummary } = vi.hoisted(() => ({
  mockUseAdminGymHealthAlertsLogic: vi.fn(),
  mockRetrySummary: vi.fn(),
}));

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/hooks/useAdminGymsHealthAlertsMonitoringLogic', () => ({ useAdminGymHealthAlertsLogic: () => mockUseAdminGymHealthAlertsLogic() }));
vi.mock('@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/components/AdminGymsHealthAlertsMonitoringStatCard', () => ({
  default: ({ title, value }: { title: string; value: number }) => <div>{title}: {value}</div>,
}));

describe('AdminGymHealthAlertsKPIs', () => {
  beforeEach(() => {
    mockUseAdminGymHealthAlertsLogic.mockReset();
    mockRetrySummary.mockReset();
  });

  it('shows a loading state while the independent summary query is pending', () => {
    mockUseAdminGymHealthAlertsLogic.mockReturnValue({ summaryStatus: 'pending', retrySummary: mockRetrySummary });
    const { container } = render(<AdminGymHealthAlertsKPIs />);
    expect(container.querySelector('[aria-busy="true"]')).not.toBeNull();
  });

  it('shows a retry control when summary query fails', () => {
    mockUseAdminGymHealthAlertsLogic.mockReturnValue({ summaryStatus: 'error', retrySummary: mockRetrySummary });
    render(<AdminGymHealthAlertsKPIs />);
    fireEvent.click(screen.getByRole('button', { name: 'gym-health-alerts.GymHealthAlertsError.text_cef2fe093b' }));
    expect(mockRetrySummary).toHaveBeenCalledTimes(1);
  });

  it('renders the four KPI values from the declared summary contract', () => {
    mockUseAdminGymHealthAlertsLogic.mockReturnValue({
      summaryStatus: 'success',
      kpis: { totalAlerts: 4, criticalAlerts: 1, warningAlerts: 2, infoAlerts: 1 },
      severityFilter: 'all',
      setSeverityFilter: vi.fn(),
      retrySummary: mockRetrySummary,
    });
    render(<AdminGymHealthAlertsKPIs />);
    expect(screen.getByText(/totalActiveAlerts: 4/)).toBeTruthy();
    expect(screen.getByText(/criticalAlerts: 1/)).toBeTruthy();
    expect(screen.getByText(/warningAlerts: 2/)).toBeTruthy();
    expect(screen.getByText(/infoAlerts: 1/)).toBeTruthy();
  });
});
