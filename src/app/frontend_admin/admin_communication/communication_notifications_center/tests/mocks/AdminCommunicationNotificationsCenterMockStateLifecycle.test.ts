// RESPONSIBILITY: Regression for notification mock read-state isolation and reset with real handlers.
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { setupServer } from 'msw/node';
import { adminNotificationsMockHandlers } from '@/app/frontend_admin/admin_communication/communication_notifications_center/mocks/handlers/AdminCommunicationNotificationsCenterMockHandlers';
import { resetAdminNotificationsMockState } from '@/app/frontend_admin/admin_communication/communication_notifications_center/mocks/fixtures/AdminCommunicationNotificationsCenterMockState';
import { MOCK_ADMIN_NOTIFICATIONS } from '@/app/frontend_admin/admin_communication/communication_notifications_center/mocks/fixtures/AdminCommunicationNotificationsCenterMockFixtures';

const server = setupServer(...adminNotificationsMockHandlers);
const base = 'https://mock.example/admin/notifications';
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => { server.resetHandlers(); resetAdminNotificationsMockState(); });
afterAll(() => server.close());
describe('notification mock state lifecycle', () => {
  it('updates one notification and preserves immutable seed fixtures', async () => {
    const response = await fetch(`${base}/n1/read`, { method: 'PATCH' });
    expect(response.ok).toBe(true);
    const body = await response.json();
    expect(body.data.id).toBe('n1');
    expect(body.data.read).toBe(true);
    const list = await (await fetch(base)).json();
    expect(list.data.find((item: { id: string }) => item.id === 'n1').read).toBe(true);
    expect(MOCK_ADMIN_NOTIFICATIONS.find(item => item.id === 'n1')?.read).toBe(false);
  });
  it('marks all as read and reset restores unread data', async () => {
    await fetch(`${base}/read-all`, { method: 'PATCH' });
    const after = await (await fetch(`${base}?read=false`)).json();
    expect(after.data).toEqual([]);
    resetAdminNotificationsMockState();
    const before = await (await fetch(`${base}?read=false`)).json();
    expect(before.data.map((item: { id: string }) => item.id)).toEqual(['n1','n2']);
  });
});
