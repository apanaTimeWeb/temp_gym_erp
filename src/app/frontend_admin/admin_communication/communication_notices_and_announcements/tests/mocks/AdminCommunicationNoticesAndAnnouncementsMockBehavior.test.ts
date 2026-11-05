// RESPONSIBILITY: Regression for mock pagination boundary and unique create IDs; not a production authorization test.
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { setupServer } from 'msw/node';
import { adminAnnouncementsMockHandlers } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/mocks/handlers/AdminCommunicationNoticesAndAnnouncementsMockHandlers';
import { resetAdminAnnouncementsMockState } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/mocks/fixtures/AdminCommunicationNoticesAndAnnouncementsMockState';

const server = setupServer(...adminAnnouncementsMockHandlers);
const base = 'https://mock.example/admin/announcements';
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => { server.resetHandlers(); resetAdminAnnouncementsMockState(); });
afterAll(() => server.close());
describe('announcements mock contract boundaries', () => {
  it.each(['NaN', 'Infinity', '-1', '1.5', '0', '1e3', '0x10', '2abc', '01'])('normalizes unsafe pagination %s', async (value) => {
    const body = await (await fetch(`${base}?page=${value}&limit=${value}`)).json();
    expect(body.meta.page).toBe(1);
    expect(body.meta.limit).toBe(10);
    expect(body.data.length).toBeLessThanOrEqual(10);
  });
  it('generates distinct IDs for successive valid creates', async () => {
    const payload = { title: 'Mock title', body: 'Mock body', priority: 'medium', audience: ['members'], gymIds: ['g1'], publishedAt: '2026-11-01T09:00:00Z', expiresAt: '2026-11-02T09:00:00Z', isPinned: false };
    const ids = [];
    for (let i = 0; i < 2; i += 1) {
      const response = await fetch(base, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      expect(response.ok).toBe(true);
      ids.push((await response.json()).data.id);
    }
    expect(new Set(ids).size).toBe(2);
  });
});
