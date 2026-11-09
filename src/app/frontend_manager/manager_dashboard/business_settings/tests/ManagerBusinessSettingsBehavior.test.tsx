// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
import { MANAGER_BUSINESS_SETTINGS_API } from '@/app/frontend_manager/manager_dashboard/business_settings/config/manager_business_settings.url_config';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterAll, afterEach, beforeEach } from 'vitest';

import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';
import { ManagerMocksTestProviders } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksTestProviders';
import { managerMswServer } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksMswTestServer';



import { ManagerBusinessSettingsApi } from '@/app/frontend_manager/manager_dashboard/business_settings/api/manager_business_settings.api';
import ManagerBusinessSettingsMain from '@/app/frontend_manager/manager_dashboard/business_settings/components/ManagerBusinessSettingsMain';
import { resetManagerBusinessSettingsMockState } from '@/app/frontend_manager/manager_dashboard/business_settings/mocks/handlers/ManagerBusinessSettingsMockHandlers';


beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
beforeEach(() => resetManagerBusinessSettingsMockState());
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Settings user-visible behavior', () => {
  it('renders real feature data through module MSW', async () => {
    const user = userEvent.setup();
    render(<ManagerMocksTestProviders><ManagerBusinessSettingsMain /></ManagerMocksTestProviders>);
    expect(await screen.findByText('App Settings')).toBeInTheDocument();
    await user.click(screen.getByRole('tab', { name: /Gym Profile/i }));
    expect(await screen.findByDisplayValue('Smart Gym')).toBeInTheDocument();
  });

  it('saves an edited setting and keeps the authoritative server response in the visible form', async () => {
    const user = userEvent.setup();
    render(<ManagerMocksTestProviders><ManagerBusinessSettingsMain /></ManagerMocksTestProviders>);
    await user.click(await screen.findByRole('tab', { name: /Gym Profile/i }));
    const nameField = await screen.findByDisplayValue('Smart Gym');
    await user.clear(nameField);
    await user.type(nameField, 'Smart Gym Updated');
    await user.click(screen.getByRole('button', { name: /Save/i }));
    await waitFor(() => expect(screen.getByDisplayValue('Smart Gym Updated')).toBeInTheDocument());
    const response = await ManagerBusinessSettingsApi.fetchSettings();
    expect(response.data?.gymProfile.gymName).toBe('Smart Gym Updated');
  });

  it('renders the standardized query error and retry control', async () => {
    managerMswServer.use(http.get(MANAGER_BUSINESS_SETTINGS_API.BASE, () => HttpResponse.json({ success: false, message: 'Settings temporarily unavailable', data: null }, { status: MANAGER_HTTP_STATUS.SERVER_ERROR })));
    render(<ManagerMocksTestProviders><ManagerBusinessSettingsMain /></ManagerMocksTestProviders>);
    expect(await screen.findByRole('alert')).toHaveTextContent('Settings temporarily unavailable');
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });

  it('supports changing the active settings tab', async () => {
    const user = userEvent.setup();
    render(<ManagerMocksTestProviders><ManagerBusinessSettingsMain /></ManagerMocksTestProviders>);
    await user.click(await screen.findByRole('tab', { name: /Gym Profile/i }));
    expect(await screen.findByDisplayValue('Smart Gym')).toBeInTheDocument();
    await user.click(screen.getByRole('tab', { name: /Operating Hours/i }));
    expect(screen.getByRole('tabpanel')).toHaveTextContent(/Operating Hours|Monday/i);
  });
});
