// RESPONSIBILITY: Real MSW mock route regression for membership expiry calendar safety.
// RBG 106 — Invalid civil expiry values must not be rolled forward by Date.parse.
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { setupServer } from 'msw/node';
import { adminSalesMockHandlers } from '@/app/frontend_admin/admin_sales/sales_memberships/mocks/handlers/AdminSalesMembershipsMockHandlers';
import { MOCK_ADMIN_ALL_MEMBERSHIPS } from '@/app/frontend_admin/admin_sales/sales_memberships/mocks/fixtures/AdminSalesMembershipsMockFixtures';

const server = setupServer(...adminSalesMockHandlers);
const fixtureSnapshot = [...MOCK_ADMIN_ALL_MEMBERSHIPS];
const url = 'https://mock.example/admin/sales/all-memberships?range=monthly&limit=100';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => {
  MOCK_ADMIN_ALL_MEMBERSHIPS.splice(0, MOCK_ADMIN_ALL_MEMBERSHIPS.length, ...fixtureSnapshot);
  vi.restoreAllMocks();
  server.resetHandlers();
});
afterAll(() => server.close());

describe('Sales Memberships mock invalid civil expiry', () => {
  it('keeps impossible calendar expiry unknown, not expired or expiring soon', async () => {
    vi.spyOn(Date, 'now').mockReturnValue(Date.parse('2026-11-02T12:00:00Z'));
    const sample = MOCK_ADMIN_ALL_MEMBERSHIPS[0];
    MOCK_ADMIN_ALL_MEMBERSHIPS.push({
      ...sample, id: 'rbg106-invalid-civil', status: 'active',
      expiryDate: '2026-02-30', createdAt: '2026-10-15T10:00:00Z',
    });
    const all = await (await fetch(url)).json();
    expect(all.success).toBe(true);
    expect(all.data.members.find((member: { id: string }) => member.id === 'rbg106-invalid-civil')?.status).toBe('active');
    for (const filter of ['expired', 'expiring_soon', 'active']) {
      const body = await (await fetch(`${url}&membershipFilter=${filter}`)).json();
      expect(body.data.members.some((member: { id: string }) => member.id === 'rbg106-invalid-civil')).toBe(false);
    }
  });

  it('still classifies valid past dates and preserves paginated response envelopes', async () => {
    vi.spyOn(Date, 'now').mockReturnValue(Date.parse('2026-11-02T12:00:00Z'));
    const sample = MOCK_ADMIN_ALL_MEMBERSHIPS[0];
    MOCK_ADMIN_ALL_MEMBERSHIPS.push({
      ...sample, id: 'rbg106-valid-past', status: 'active',
      expiryDate: '2026-10-31', createdAt: '2026-10-15T10:00:00Z',
    });
    const expired = await (await fetch(`${url}&membershipFilter=expired`)).json();
    expect(expired.data.members.find((member: { id: string }) => member.id === 'rbg106-valid-past')?.status).toBe('expired');
    const page = await (await fetch('https://mock.example/admin/sales/all-memberships?range=monthly&page=1&limit=1')).json();
    expect(page.success).toBe(true);
    expect(page.data.members).toHaveLength(1);
    expect(page.data.total).toBe(fixtureSnapshot.length + 1);
    expect(MOCK_ADMIN_ALL_MEMBERSHIPS.find(member => member.id === 'rbg106-valid-past')?.status).toBe('active');
  });
});
