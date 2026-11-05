// RESPONSIBILITY: Proves finite safe mock pagination without changing backend contracts.
import { describe, expect, it } from 'vitest';
import { readMockPositiveInteger } from '@/app/frontend_admin/admin_members/members_blacklist_management/mocks/handlers/AdminMembersBlacklistManagementMockHandlers';
describe('blacklist mock query pagination', () => {
  it('accepts positive safe integers and replaces invalid values', () => {
    for (const invalid of [null, '', '0', '-1', '2.5', 'NaN', 'Infinity', '9007199254740992']) {
      expect(readMockPositiveInteger(invalid, 10)).toBe(10);
    }
    expect(readMockPositiveInteger('2', 10)).toBe(2);
    expect(readMockPositiveInteger('999', 10)).toBe(999);
  });
});
