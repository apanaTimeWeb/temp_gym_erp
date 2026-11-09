// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { ManagerMocksTestProviders } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksTestProviders';
import { managerMswServer } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksMswTestServer';

import ManagerMaintenanceRequestsMain from '@/app/frontend_manager/manager_maintenance/maintenance_requests/components/ManagerMaintenanceRequestsMain';
import { MANAGER_MAINTENANCE_REQUESTS_STATUS_VALUES } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/constants/manager_maintenance_requests.constants';
import { resetManagerMaintenanceRequestsMockState } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/mocks/handlers/ManagerMaintenanceRequestsMockHandlers';

beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
beforeEach(() => resetManagerMaintenanceRequestsMockState());
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('ManagerMaintenanceRequestsMain behavior', () => {
  it('creates an issue and exposes the resulting record', async () => {
    const user = userEvent.setup();
    render(<ManagerMocksTestProviders><ManagerMaintenanceRequestsMain /></ManagerMocksTestProviders>);

    await waitFor(() => expect(screen.getByText('Treadmill wire broken')).toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: 'Log Issue' }));
    await user.type(screen.getByLabelText('Issue Title'), 'Behavior Maintenance Issue');
    await user.type(screen.getByLabelText('Equipment / Area'), 'Behavior Test Area');
    const submitButtons = screen.getAllByRole('button', { name: 'Log Issue' });
    await user.click(submitButtons[submitButtons.length - 1]!);

    await waitFor(() => expect(screen.getByText('Behavior Maintenance Issue')).toBeInTheDocument());
  });

  it('resolves an open issue and updates the visible status', async () => {
    const user = userEvent.setup();
    render(<ManagerMocksTestProviders><ManagerMaintenanceRequestsMain /></ManagerMocksTestProviders>);

    await waitFor(() => expect(screen.getAllByRole('button', { name: /Mark as Resolved/i })[0]!).toBeInTheDocument());
    await user.click(screen.getAllByRole('button', { name: /Mark as Resolved/i })[0]!);

    await waitFor(() => expect(screen.getAllByText(MANAGER_MAINTENANCE_REQUESTS_STATUS_VALUES.RESOLVED).length).toBeGreaterThan(0));
  });
});
