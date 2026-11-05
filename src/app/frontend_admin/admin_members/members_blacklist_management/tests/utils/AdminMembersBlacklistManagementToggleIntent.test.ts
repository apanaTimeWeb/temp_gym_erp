import { describe, expect, it } from 'vitest';
import { adminBlacklistToggleIntent } from '@/app/frontend_admin/admin_members/members_blacklist_management/utils/AdminMembersBlacklistManagementToggleIntent';
describe('blacklist toggle retry intent', () => {
  it('reuses the same intent for a failed same-action retry', () => {
    expect(adminBlacklistToggleIntent('m1', 'restore')).toBe(adminBlacklistToggleIntent('m1', 'restore'));
    expect(adminBlacklistToggleIntent('m1', 'blacklist')).toBe(adminBlacklistToggleIntent('m1', 'blacklist'));
  });
  it('does not collide across opposite actions or separator IDs', () => {
    expect(adminBlacklistToggleIntent('m1', 'restore')).not.toBe(adminBlacklistToggleIntent('m1', 'blacklist'));
    expect(adminBlacklistToggleIntent('x:y', 'restore')).not.toBe(adminBlacklistToggleIntent('x', 'restore'));
  });
});
