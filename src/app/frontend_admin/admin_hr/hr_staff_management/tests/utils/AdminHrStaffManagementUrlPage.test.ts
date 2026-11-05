import { describe, expect, it } from 'vitest';
import { normalizeAdminHrStaffManagementUrlPage } from '@/app/frontend_admin/admin_hr/hr_staff_management/utils/AdminHrStaffManagementUrlPage';

describe('AdminHrStaffManagement URL pagination', () => {
  it('preserves valid page values and bounds huge requests', () => {
    expect(normalizeAdminHrStaffManagementUrlPage('2')).toBe(2);
    expect(normalizeAdminHrStaffManagementUrlPage(3)).toBe(3);
    expect(normalizeAdminHrStaffManagementUrlPage('100001')).toBe(100000);
  });
  it('rejects malformed inbound page strings and outgoing actions', () => {
    for (const raw of [null, '', '0', '-1', '1.5', '2abc', '1e4', 'Infinity', ' 2 ', '9007199254740992']) expect(normalizeAdminHrStaffManagementUrlPage(raw)).toBe(1);
    expect(normalizeAdminHrStaffManagementUrlPage(1.25)).toBe(1);
    expect(normalizeAdminHrStaffManagementUrlPage(Infinity)).toBe(1);
  });
});
