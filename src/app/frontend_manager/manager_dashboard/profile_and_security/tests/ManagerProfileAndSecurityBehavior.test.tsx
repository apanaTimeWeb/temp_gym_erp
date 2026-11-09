// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
import { MANAGER_PROFILE_AND_SECURITY_API } from '@/app/frontend_manager/manager_dashboard/profile_and_security/config/manager_profile_and_security.url_config';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';

import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';
import { ManagerMocksTestProviders } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksTestProviders';
import { managerMswServer } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksMswTestServer';



import { ManagerProfileAndSecurityApi } from '@/app/frontend_manager/manager_dashboard/profile_and_security/api/manager_profile_and_security.api';
import ManagerProfileAndSecurityMain from '@/app/frontend_manager/manager_dashboard/profile_and_security/components/ManagerProfileAndSecurityMain';


beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Profile user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerMocksTestProviders><ManagerProfileAndSecurityMain /></ManagerMocksTestProviders>);
    expect(await screen.findByText('My Profile')).toBeInTheDocument();
  });
  it('loads profile data and submits the RHF profile form through MSW', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ManagerMocksTestProviders><ManagerProfileAndSecurityMain /></ManagerMocksTestProviders>);
    const name = await screen.findByLabelText('Full Name *');
    await user.clear(name);
    await user.type(name, 'Updated Manager');
    await user.click(screen.getByRole('button', { name: 'Save Changes' }));
    expect(await screen.findByText('Updated Manager')).toBeInTheDocument();
  });


  it('proves module MSW supplies non-placeholder API data', async () => {
    const response = await ManagerProfileAndSecurityApi.fetchProfile();
    expect(response.success).toBe(true);
    expect(response.data?.name).toBeTruthy();
  });

  it('renders the module error state from an MSW failure', async () => {
    const { http, HttpResponse } = await import('msw');
    managerMswServer.use(
      http.get(ManagerInfrastructureMockApiUrl(MANAGER_PROFILE_AND_SECURITY_API.BASE), () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: MANAGER_HTTP_STATUS.SERVER_ERROR }))
    );
    render(<ManagerMocksTestProviders><ManagerProfileAndSecurityMain /></ManagerMocksTestProviders>);
    expect(await screen.findByRole('alert')).toHaveTextContent('Simulated failure');
  });

});
