// RESPONSIBILITY: Regression checks for HR Staff's module-owned mock pagination and employee-ID fallback.
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { adminFeatureMockServer, resetAdminFeatureMockServer } from '@/app/frontend_admin/admin_hr/hr_staff_management/tests/harness/bootstrap';
import { adminHrStaffMockPositiveInteger } from '@/app/frontend_admin/admin_hr/hr_staff_management/utils/AdminHrStaffManagementMockPagination';

describe('HR Staff mock pagination', () => {
  it.each([null, '', '0', '-1', '1.5', 'NaN', 'Infinity', '9007199254740992', ' 3 '])('rejects malformed page/limit %s', (raw) => {
    expect(adminHrStaffMockPositiveInteger(raw, 10)).toBe(10);
  });
  it.each([['1', 1], ['20', 20], ['0003', 3]])('preserves valid safe values %s', (raw, value) => {
    expect(adminHrStaffMockPositiveInteger(raw, 10)).toBe(value);
  });
});

const staffUrl = 'https://admin-hr-mock.test/admin/hr/staff';
const validStaff = { name: 'Test User', email: 'test@example.test', phone: '1234567890', role: 'Trainer', salary: 100, branch: 'Downtown Main', gender: 'MALE', joinDate: '2026-11-01', isActive: true };

describe('HR Staff MSW list/create behavior', () => {
  beforeAll(() => adminFeatureMockServer.listen({ onUnhandledRequest: 'error' }));
  afterEach(() => resetAdminFeatureMockServer());
  afterAll(() => adminFeatureMockServer.close());
  it('normalizes list page/limit and generates unique fallback employee IDs', async () => {
    const list = await (await fetch(`${staffUrl}?page=Infinity&limit=2.5`)).json() as { meta: { page: number; limit: number } };
    expect(list.meta.page).toBe(1);
    expect(list.meta.limit).toBe(10);
    const create = () => fetch(staffUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(validStaff) });
    const first = await (await create()).json() as { data: { employeeId: string } };
    const second = await (await create()).json() as { data: { employeeId: string } };
    expect(first.data.employeeId).toMatch(/^EMP-DEMO-[0-9a-f-]{36}$/);
    expect(first.data.employeeId).not.toBe(second.data.employeeId);
  });
});
