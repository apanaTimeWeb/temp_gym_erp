// RESPONSIBILITY: Proves mock-only financial mutation rejection leaves state intact.
import { beforeAll, afterAll, beforeEach, describe, expect, it } from 'vitest';
import { setupServer } from 'msw/node';
import { isAdminFinanceStaffDuesMockAmountValid } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/utils/AdminFinanceStaffDuesManagementMockMoneyValidation';
import { adminFinanceStaffDuesManagementMockHandlers } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/mocks/handlers/AdminFinanceStaffDuesManagementMockHandlers';
const origin = 'https://mock-admin.test';
const server = setupServer(...adminFinanceStaffDuesManagementMockHandlers);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
beforeEach(async () => {
  const response = await fetch(`${origin}/admin/hr/__mock-reset`, { method: 'HEAD' });
  expect(response.status).toBe(204);
});
const send = (path: string, payload: unknown, method = 'POST') => fetch(`${origin}${path}`, {
  method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
});
describe('Staff Dues MSW mutation money safety', () => {
  it('accepts only positive finite numeric amounts', () => {
    for (const value of ['500', true, null, undefined, Infinity, NaN, 0, -20]) {
      expect(isAdminFinanceStaffDuesMockAmountValid(value)).toBe(false);
    }
    expect(isAdminFinanceStaffDuesMockAmountValid(250)).toBe(true);
  });
  it('rejects coercion and overpayment without altering due balance', async () => {
    const list = async () => (await (await fetch(`${origin}/admin/hr/staff?limit=100`)).json()).data.staff;
    const initial = (await list()).find((s: { id: string }) => s.id === 's2').currentDue;
    expect(initial).toBeGreaterThan(0);
    for (const amount of ['200', true, null, -1, initial + 1]) {
      expect((await send('/admin/hr/dues/pay', { staffId: 's2', amount })).status).toBe(400);
    }
    expect((await list()).find((s: { id: string }) => s.id === 's2').currentDue).toBe(initial);
    expect((await send('/admin/hr/dues/pay', { staffId: 's2', amount: 200 })).status).toBe(200);
    expect((await list()).find((s: { id: string }) => s.id === 's2').currentDue).toBe(initial - 200);
  });
});
