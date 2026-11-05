import { describe, expect, it } from 'vitest';
import { normalizeAdminMembersBlacklistManagementUrlPage } from '@/app/frontend_admin/admin_members/members_blacklist_management/utils/AdminMembersBlacklistManagementUrlPage';

describe('AdminMembersBlacklistManagement URL-sync pagination', () => {
  it('accepts only canonical positive safe integer pages', () => {
    expect(normalizeAdminMembersBlacklistManagementUrlPage('9')).toBe(9);
    expect(normalizeAdminMembersBlacklistManagementUrlPage(2)).toBe(2);
    for (const raw of [undefined, null, '', '0', '1.5', '1e5', '-3', 'Infinity', 'NaN', '9007199254740992', ' 2 ', Number.POSITIVE_INFINITY]) {
      expect(normalizeAdminMembersBlacklistManagementUrlPage(raw)).toBe(1);
    }
  });
});
