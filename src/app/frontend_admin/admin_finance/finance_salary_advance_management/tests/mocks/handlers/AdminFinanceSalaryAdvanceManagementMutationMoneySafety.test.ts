// RESPONSIBILITY: Proves mock-only financial mutation rejection leaves state intact.
import { beforeAll, afterAll, beforeEach, describe, expect, it } from 'vitest';
import { setupServer } from 'msw/node';
import { isAdminFinanceSalaryAdvanceMockAmountValid } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/utils/AdminFinanceSalaryAdvanceManagementMockMoneyValidation';
import { adminFinanceSalaryAdvanceManagementMockHandlers } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/mocks/handlers/AdminFinanceSalaryAdvanceManagementMockHandlers';
const origin = 'https://mock-admin.test';
const server = setupServer(...adminFinanceSalaryAdvanceManagementMockHandlers);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
beforeEach(async () => {
  const response = await fetch(`${origin}/admin/hr/__mock-reset`, { method: 'HEAD' });
  expect(response.status).toBe(204);
});
const send = (path: string, payload: unknown, method = 'POST') => fetch(`${origin}${path}`, {
  method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
});
describe('Salary Advance MSW mutation money safety', () => {
  it('rejects coercible, missing and nonpositive amounts', () => {
    for (const value of ['500', true, null, undefined, Infinity, NaN, 0, -20]) {
      expect(isAdminFinanceSalaryAdvanceMockAmountValid(value)).toBe(false);
    }
    expect(isAdminFinanceSalaryAdvanceMockAmountValid(250)).toBe(true);
  });
  it('does not change staff advance or ledger on invalid requests', async () => {
    const staffBefore = (await (await fetch(`${origin}/admin/hr/staff?limit=100`)).json()).data.staff;
    const beforeAdvance = staffBefore.find((s: { id: string }) => s.id === 's1').advanceSalary ?? 0;
    const beforeTotal = (await (await fetch(`${origin}/admin/hr/summary`)).json()).data.totalAdvanceGiven;
    for (const amount of ['500', true, null, -1, 0]) {
      expect((await send('/admin/hr/advances', { staffId: 's1', amount })).status).toBe(400);
    }
    const staffAfter = (await (await fetch(`${origin}/admin/hr/staff?limit=100`)).json()).data.staff;
    expect(staffAfter.find((s: { id: string }) => s.id === 's1').advanceSalary ?? 0).toBe(beforeAdvance);
    expect((await (await fetch(`${origin}/admin/hr/summary`)).json()).data.totalAdvanceGiven).toBe(beforeTotal);
    expect((await send('/admin/hr/advances', { staffId: 's1', amount: 150 })).status).toBe(200);
    const staffValid = (await (await fetch(`${origin}/admin/hr/staff?limit=100`)).json()).data.staff;
    expect(staffValid.find((s: { id: string }) => s.id === 's1').advanceSalary).toBe(beforeAdvance + 150);
  });
});
