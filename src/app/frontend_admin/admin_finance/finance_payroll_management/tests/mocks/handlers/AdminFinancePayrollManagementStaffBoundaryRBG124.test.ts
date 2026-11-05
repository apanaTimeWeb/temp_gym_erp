// RBG124: real MSW staff collection routes exercise untrusted query bounds.
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { setupServer } from 'msw/node';
import { adminFinancePayrollManagementMockHandlers, readAdminFinanceMockPageParam } from '@/app/frontend_admin/admin_finance/finance_payroll_management/mocks/handlers/AdminFinancePayrollManagementMockHandlers';
const server = setupServer(...adminFinancePayrollManagementMockHandlers);
const origin = 'https://mock-payroll-rbg124.test';
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
beforeEach(async () => { expect((await fetch(`${origin}/admin/hr/__mock-reset`, { method: 'HEAD' })).status).toBe(204); });
const read = async (query: string) => (await fetch(`${origin}/admin/hr/staff?${query}`)).json();
describe('Finance payroll staff mock RBG124', () => {
  it('rejects overlarge and non-decimal pagination input', () => {
    for (const raw of ['101', '999999', '2.5', 'Infinity', '-1']) expect(readAdminFinanceMockPageParam(raw, 10)).toBe(10);
    expect(readAdminFinanceMockPageParam('100', 10)).toBe(100);
    const response = await read('limit=10000&search=%20%20');
    expect(response.meta.limit).toBe(10);
    expect(response.data.total).toBeGreaterThan(0);
  });
  it('clamps out-of-range pages and rejects unsupported sorting', async () => {
    const baseline = await read('sortKey=name&sortDir=asc&limit=1');
    const invalidSort = await read('sortKey=__proto__&sortDir=garbage&limit=1');
    expect(invalidSort.data.staff[0]?.id).toBe(baseline.data.staff[0]?.id);
    const obsolete = await read('page=99&limit=1');
    expect(obsolete.meta.page).toBe(obsolete.meta.totalPages);
    expect(obsolete.meta.hasNextPage).toBe(false);
    expect(obsolete.data.staff).toHaveLength(1);
  });
});
