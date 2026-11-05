// RBG124: payroll mock query boundaries must respect the existing sort allowlist.
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { setupServer } from 'msw/node';
import { adminFinancePayrollManagementMockHandlers } from '@/app/frontend_admin/admin_finance/finance_payroll_management/mocks/handlers/AdminFinancePayrollManagementMockHandlers';
const server = setupServer(...adminFinancePayrollManagementMockHandlers);
const origin = 'https://mock-payroll-rbg124.test';
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
beforeEach(async () => { expect((await fetch(`${origin}/admin/hr/__mock-reset`, { method: 'HEAD' })).status).toBe(204); });
const read = async (query: string) => (await fetch(`${origin}/admin/hr/payrolls?${query}`)).json();
describe('Finance payroll collection RBG124', () => {
  it('preserves default sort when query attempts an arbitrary field', async () => {
    const normal = await read('sortKey=month&sortDir=desc');
    const tampered = await read('sortKey=constructor&sortDir=unrecognized');
    expect(tampered.data.payrolls.map((p: { id: string }) => p.id)).toEqual(normal.data.payrolls.map((p: { id: string }) => p.id));
  });
  it('normalizes blank search and invalid limit, recovers obsolete page', async () => {
    const response = await read('search=%20%20&limit=101');
    expect(response.meta.limit).toBe(10);
    expect(response.data.total).toBeGreaterThan(0);
    const obsolete = await read('page=99&limit=1');
    expect(obsolete.meta.page).toBe(obsolete.meta.totalPages);
    expect(obsolete.meta.hasNextPage).toBe(false);
    expect(obsolete.data.payrolls).toHaveLength(1);
  });
});
