import { describe, expect, it } from 'vitest';
import { resolveAdminUrlQueryValue } from '@/app/frontend_admin/admin_members/members_directory/hooks/useAdminMembersDirectoryUrlQuerySync';

describe('RBG137 member-directory URL history contract', () => {
  it('rehydrates removed filter keys to documented defaults', () => {
    const p = new URLSearchParams('memberId=member-1&search=Jane');
    expect(resolveAdminUrlQueryValue(p, 'status', 'all')).toBe('all');
    expect(resolveAdminUrlQueryValue(p, 'search', '')).toBe('Jane');
    expect(resolveAdminUrlQueryValue(p, 'page', 1)).toBe('1');
  });
  it('preserves explicitly supplied URL values even when they are not defaults', () => {
    expect(resolveAdminUrlQueryValue(new URLSearchParams('status=frozen&page=3'), 'status', 'all')).toBe('frozen');
  });
});
