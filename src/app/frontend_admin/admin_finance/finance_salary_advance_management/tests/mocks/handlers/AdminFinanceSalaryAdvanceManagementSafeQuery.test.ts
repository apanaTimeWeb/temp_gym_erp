import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { setupServer } from 'msw/node';
import { adminFinanceSalaryAdvanceManagementMockHandlers, readAdminFinanceMockPageParam } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/mocks/handlers/AdminFinanceSalaryAdvanceManagementMockHandlers';
const origin = 'https://salary-advance-mock.test';
const server = setupServer(...adminFinanceSalaryAdvanceManagementMockHandlers);
beforeAll(() => server.listen({onUnhandledRequest:'error'}));
afterAll(() => server.close());
beforeEach(async () => { expect((await fetch(`${origin}/admin/hr/__mock-reset`, { method: 'HEAD' })).status).toBe(204); });
const getStaff = async (query: string) => (await (await fetch(`${origin}/admin/hr/staff?${query}`)).json()).data;

describe('salary advance mock staff query safety', () => {
  it('bounds URL input including huge, fraction and whitespace forms', () => {
    for (const raw of ['', '0', '101', '9007199254740991', ' 2 ', '2.5', '2e2']) expect(readAdminFinanceMockPageParam(raw, 10)).toBe(10);
    expect(readAdminFinanceMockPageParam('100', 10)).toBe(100);
  });
  it('does not sort by user-selected arbitrary Staff properties', async () => {
    const safe = await getStaff('sortKey=name&sortDir=asc&limit=100');
    const unsafe = await getStaff('sortKey=__proto__&sortDir=asc&limit=100');
    expect(unsafe.staff.map((s: {id:string}) => s.id)).toEqual(safe.staff.map((s: {id:string}) => s.id));
  });
  it('normalizes whitespace search and obsolete page metadata', async () => {
    const all = await getStaff('limit=100');
    const padded = await getStaff('search=%20%20%20&limit=100');
    expect(padded.total).toBe(all.total);
    const obsolete = await (await fetch(`${origin}/admin/hr/staff?limit=10&page=99`)).json();
    expect(obsolete.data.staff.length).toBeGreaterThan(0);
    expect(obsolete.meta.page).toBeLessThanOrEqual(obsolete.meta.totalPages);
  });
});
