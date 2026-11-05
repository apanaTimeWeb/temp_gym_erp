// RESPONSIBILITY: Defines regression tests for AdminGymsHealthAlertsMonitoringTable.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_gym_health_alerts/gym_health_alerts_monitoring/tests/components/table/AdminGymsHealthAlertsMonitoringTable.test.tsx)

import type { AnchorHTMLAttributes } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import AdminGymHealthAlertsTable from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/components/table/AdminGymsHealthAlertsMonitoringTable';

const { mockUseLogic, mockDismiss } = vi.hoisted(() => ({ mockUseLogic: vi.fn(), mockDismiss: vi.fn() }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string, values?: Record<string, unknown>) => values ? `${key} ${Object.values(values).join(' ')}` : key, useLocale: () => 'en' }));
vi.mock('next/link', () => ({ default: ({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => <a href={href} {...props}>{children}</a> }));
vi.mock('@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/hooks/useAdminGymsHealthAlertsMonitoringLogic', () => ({ useAdminGymHealthAlertsLogic: () => mockUseLogic() }));
vi.mock('@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/components/AdminGymsHealthAlertsMonitoringTableSkeleton', () => ({ default: () => <div role="status">loading</div> }));

const alerts = Array.from({ length: 12 }, (_, index) => ({
  id: `alert-${String(index + 1).padStart(2, '0')}`, gymId: 'gym-a', gymName: `Gym ${String(index + 1).padStart(2, '0')}`,
  alertType: 'occupancy', severity: 'warning' as const, title: `Alert ${String(index + 1).padStart(2, '0')}`,
  description: 'Example alert', metric: 'capacity', threshold: '90%', detectedAt: `2026-10-${String(index + 1).padStart(2, '0')}T10:00:00.000Z`, actionKey: 'members',
}));

function setup(inputAlerts = alerts) {
  mockUseLogic.mockReturnValue({ alerts: inputAlerts, status: 'success', dismissAlert: mockDismiss, retryAlerts: vi.fn(), hasActiveFilters: false });
  return render(<AdminGymHealthAlertsTable />);
}

describe('AdminGymHealthAlertsTable', () => {
  beforeEach(() => { mockUseLogic.mockReset(); mockDismiss.mockReset(); });

  it('paginates the fetched alert list and updates the range summary', () => {
    setup();
    expect(screen.getByText('gym-health-alerts.admin_gym_health_alerts_table.paginationSummary 1 10 12')).toBeTruthy();
    expect(screen.getByTestId('admin_gym_health_alerts-admin_gym_health_alerts-table-severity-alert-01')).toBeTruthy();
    expect(screen.queryByTestId('admin_gym_health_alerts-admin_gym_health_alerts-table-severity-alert-11')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'gym-health-alerts.admin_gym_health_alerts_table.nextPage' }));
    expect(screen.getByTestId('admin_gym_health_alerts-admin_gym_health_alerts-table-severity-alert-11')).toBeTruthy();
    expect(screen.getByText('gym-health-alerts.admin_gym_health_alerts_table.paginationSummary 11 12 12')).toBeTruthy();
  });

  it('exposes sortable native column headers and sorts by gym name', () => {
    setup([...alerts].reverse());
    const gymHeader = screen.getByRole('button', { name: 'gym-health-alerts.admin_gym_health_alerts_table.sortBy gym-health-alerts.admin_gym_health_alerts_table.text_bc4359231d' });
    fireEvent.click(gymHeader);
    const rows = screen.getAllByRole('row').slice(1);
    expect(within(rows[0]).getByText('Gym 01')).toBeTruthy();
    expect(screen.getByRole('columnheader', { name: /text_bc4359231d/ }).getAttribute('aria-sort')).toBe('ascending');
  });
});
