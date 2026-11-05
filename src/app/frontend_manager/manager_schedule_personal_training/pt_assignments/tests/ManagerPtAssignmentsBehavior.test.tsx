// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
import { MANAGER_PT_ASSIGNMENTS_API } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/config/manager_pt_assignments.url_config';
import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';

import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';
import { ManagerMocksTestProviders } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksTestProviders';
import { managerMswServer } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksMswTestServer';



import { ManagerPtAssignmentsApi } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/api/manager_pt_assignments.api';
import ManagerPTMain from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/components/ManagerPtAssignmentsMain';

beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager PT user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerMocksTestProviders><ManagerPTMain /></ManagerMocksTestProviders>);
    expect(await screen.findByText('Personal Training')).toBeInTheDocument();
    expect(await screen.findByText('Kickstarter PT')).toBeInTheDocument();
  });

  it('proves module MSW supplies non-placeholder API data', async () => {
    const response = await ManagerPtAssignmentsApi.fetchPackages();
    expect(response.success).toBe(true);
    expect(response.data?.length ?? 0).toBeGreaterThan(0);
  });
it('renders the PT package empty state from an MSW response', async () => {
    managerMswServer.use(
      http.get(ManagerInfrastructureMockApiUrl(MANAGER_PT_ASSIGNMENTS_API.PACKAGES), () => HttpResponse.json({ success: true, message: 'Empty result', data: [] }))
    );
    render(<ManagerMocksTestProviders><ManagerPTMain /></ManagerMocksTestProviders>);
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: 'Packages' }));
    expect(await screen.findByText('No PT packages configured yet.')).toBeInTheDocument();
  });

  it('renders the PT error state from an MSW failure', async () => {
    managerMswServer.use(
      http.get(ManagerInfrastructureMockApiUrl(MANAGER_PT_ASSIGNMENTS_API.KPIS), () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: MANAGER_HTTP_STATUS.SERVER_ERROR }))
    );
    render(<ManagerMocksTestProviders><ManagerPTMain /></ManagerMocksTestProviders>);
    expect(await screen.findByText('Unable to load PT data. Retry by refreshing this route.')).toBeInTheDocument();
  });

  it('proves PT assignment search changes the rendered dataset', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ManagerMocksTestProviders><ManagerPTMain /></ManagerMocksTestProviders>);
    await user.click(await screen.findByRole('button', { name: 'Active Assignments' }));
    const search = await screen.findByPlaceholderText('Search...');
    await user.clear(search);
    await user.type(search, 'ZZZ-No-Such-Assignment');
    expect(await screen.findByText('No active assignments')).toBeInTheDocument();
  });

});
