// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
import { MANAGER_NOTIFICATIONS_INBOX_API } from '@/app/frontend_manager/manager_communications/notifications_inbox/config/manager_notifications_inbox.url_config';
import { screen } from '@testing-library/react';
import { renderManagerNotificationsInbox } from '@/app/frontend_manager/manager_communications/notifications_inbox/tests/harness/bootstrap';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';

import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';
import { managerMswServer } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksMswTestServer';



import { ManagerNotificationsInboxApi } from '@/app/frontend_manager/manager_communications/notifications_inbox/api/manager_notifications_inbox.api';
import ManagerNotificationsInboxMain from '@/app/frontend_manager/manager_communications/notifications_inbox/components/ManagerNotificationsInboxMain';

beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Notifications user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    renderManagerNotificationsInbox(<ManagerNotificationsInboxMain />);
    expect(await screen.findByText('Notifications')).toBeInTheDocument();
    expect((await screen.findAllByText('Membership Expiring Soon')).length).toBeGreaterThan(0);
  });

  it('proves module MSW supplies non-placeholder API data', async () => {
    const response = await ManagerNotificationsInboxApi.fetchManagerNotificationsInbox({ page: '1', limit: '10' });
    expect(response.success).toBe(true);
    expect(response.data?.notifications?.length ?? 0).toBeGreaterThan(0);
  });
it('renders the notifications empty state from an MSW response', async () => {
    managerMswServer.use(
      http.get(ManagerInfrastructureMockApiUrl(MANAGER_NOTIFICATIONS_INBOX_API.BASE), () => HttpResponse.json({ success: true, message: 'Empty result', data: { notifications: [], total: 0 } }))
    );
    renderManagerNotificationsInbox(<ManagerNotificationsInboxMain />);
    expect(await screen.findByText('No notifications found')).toBeInTheDocument();
  });

  it('renders the notifications error state from an MSW failure', async () => {
    managerMswServer.use(
      http.get(ManagerInfrastructureMockApiUrl(MANAGER_NOTIFICATIONS_INBOX_API.BASE), () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: MANAGER_HTTP_STATUS.SERVER_ERROR }))
    );
    renderManagerNotificationsInbox(<ManagerNotificationsInboxMain />);
    expect(await screen.findByText('Failed to load notifications')).toBeInTheDocument();
  });

  it('proves notification search changes the rendered dataset', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    renderManagerNotificationsInbox(<ManagerNotificationsInboxMain />);
    expect((await screen.findAllByText('Membership Expiring Soon')).length).toBeGreaterThan(0);
    const search = await screen.findByPlaceholderText('Search notifications...');
    await user.clear(search);
    await user.type(search, 'ZZZ-No-Such-Notification');
    expect(await screen.findByText('No notifications found')).toBeInTheDocument();
  });

});
