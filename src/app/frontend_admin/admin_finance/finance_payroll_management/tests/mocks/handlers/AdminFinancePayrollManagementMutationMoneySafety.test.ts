// RESPONSIBILITY: Proves mock-only financial mutation rejection leaves state intact.
import { beforeAll, afterAll, beforeEach, describe, expect, it } from 'vitest';
import { setupServer } from 'msw/node';
import { isAdminFinancePayrollMockAmountValid } from '@/app/frontend_admin/admin_finance/finance_payroll_management/utils/AdminFinancePayrollManagementMockMoneyValidation';
import { adminFinancePayrollManagementMockHandlers } from '@/app/frontend_admin/admin_finance/finance_payroll_management/mocks/handlers/AdminFinancePayrollManagementMockHandlers';
const origin = 'https://mock-admin.test';
const server = setupServer(...adminFinancePayrollManagementMockHandlers);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
beforeEach(async () => {
  const response = await fetch(`${origin}/admin/hr/__mock-reset`, { method: 'HEAD' });
  expect(response.status).toBe(204);
});
const send = (path: string, payload: unknown, method = 'POST') => fetch(`${origin}${path}`, {
  method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
});
describe('Payroll MSW mutation money safety', () => {
  it('rejects invalid and coercible amounts', () => {
    for (const amount of ['1000', true, null, undefined, NaN, Infinity, -1, 0]) {
      expect(isAdminFinancePayrollMockAmountValid(amount, 0)).toBe(false);
    }
    expect(isAdminFinancePayrollMockAmountValid(1000, 1200)).toBe(false);
    expect(isAdminFinancePayrollMockAmountValid(1000, -1)).toBe(false);
    expect(isAdminFinancePayrollMockAmountValid(1000, 0)).toBe(true);
    expect(isAdminFinancePayrollMockAmountValid(1000, 1000)).toBe(true);
  });
  it('rejects invalid create and unknown staff without adding records', async () => {
    const initial = await (await fetch(`${origin}/admin/hr/payrolls?limit=100`)).json();
    for (const body of [
      { staffId: 's1', amount: 1000, paidAmount: 1001 },
      { staffId: 's1', amount: 1000, paidAmount: null },
      { staffId: 's1', amount: '1000', paidAmount: 0 },
      { staffId: 'unknown', amount: 1000, paidAmount: 0 },
      { staffId: 's1', amount: -10, paidAmount: 0 },
    ]) expect((await send('/admin/hr/payrolls', body)).status).toBe(400);
    const after = await (await fetch(`${origin}/admin/hr/payrolls?limit=100`)).json();
    expect(after.data.total).toBe(initial.data.total);
  });
  it('does not mutate payroll on invalid PATCH, but accepts an in-range payment', async () => {
    const createdResponse = await send('/admin/hr/payrolls', { staffId: 's1', amount: 1000, paidAmount: 0, month: '2026-11' });
    expect(createdResponse.status).toBe(200);
    const created = (await createdResponse.json()).data;
    expect((await send(`/admin/hr/payrolls/${created.id}`, { paidAmount: 1001 }, 'PATCH')).status).toBe(400);
    expect((await send(`/admin/hr/payrolls/${created.id}`, { staffId: 's2' }, 'PATCH')).status).toBe(400);
    let record = (await (await fetch(`${origin}/admin/hr/payrolls?limit=100`)).json()).data.payrolls.find((item: { id: string }) => item.id === created.id);
    expect(record.paidAmount).toBe(0);
    expect(record.staffId).toBe('s1');
    expect((await send(`/admin/hr/payrolls/${created.id}`, { paidAmount: 250 }, 'PATCH')).status).toBe(200);
    record = (await (await fetch(`${origin}/admin/hr/payrolls?limit=100`)).json()).data.payrolls.find((item: { id: string }) => item.id === created.id);
    expect(record.pendingAmount).toBe(750);
    expect(record.paidAmount).toBe(250);
  });
});
