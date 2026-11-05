import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

import ManagerMaintenanceRequestsEmptyState from '@/app/frontend_manager/manager_maintenance/maintenance_requests/components/ManagerMaintenanceRequestsEmptyState';

describe('ManagerMaintenanceRequestsEmptyState', () => {
  it('renders an accessible feature-local empty state', () => {
    render(<ManagerMaintenanceRequestsEmptyState />);
    expect(screen.getByRole('status')).toHaveAttribute('data-testid', 'manager_maintenance-manager-maintenance-content-status-empty');
    expect(screen.getByRole('status').textContent).toContain('COPY_NO_MAINTENANCE_ISSUES_FOUNDCOPY_LOG_ISSUE_WHEN_EQUIPMENT_FACILITY_NEEDS_ATTENTION');
  });
});
