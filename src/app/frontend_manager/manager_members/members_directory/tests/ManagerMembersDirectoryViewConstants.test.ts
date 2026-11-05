import { describe, expect, it } from 'vitest';

import { resolveManagerMembersDirectoryView } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryResolveView';
import { MANAGER_MEMBERS_DIRECTORY_LIST_VIEW, MANAGER_MEMBERS_DIRECTORY_PROFILE_VIEW, MANAGER_MEMBERS_DIRECTORY_VIEW_IDS } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory_view.constants';

describe('Manager Members detail URL contract', () => {
  it('exposes only canonical module-owned view IDs', () => {
    expect(MANAGER_MEMBERS_DIRECTORY_VIEW_IDS).toEqual(['list', 'member-profile']);
    expect(new Set(MANAGER_MEMBERS_DIRECTORY_VIEW_IDS).size).toBe(MANAGER_MEMBERS_DIRECTORY_VIEW_IDS.length);
  });
  it.each([['member-profile', 'member-42', MANAGER_MEMBERS_DIRECTORY_PROFILE_VIEW], ['unknown', 'member-42', MANAGER_MEMBERS_DIRECTORY_LIST_VIEW], ['member-profile', null, MANAGER_MEMBERS_DIRECTORY_LIST_VIEW], [null, null, MANAGER_MEMBERS_DIRECTORY_LIST_VIEW]] as const)('validates view=%s id=%s', (view, id, expected) => {
    expect(resolveManagerMembersDirectoryView(view, id)).toBe(expected);
  });

  it('keeps member details inside the members feature using a view and record ID', () => {
    const params = new URLSearchParams('search=alex&page=2');
    params.set('view', 'member-profile');
    params.set('id', 'member-42');
    expect(params.get('view')).toBe('member-profile');
    expect(params.get('id')).toBe('member-42');
    expect(params.get('search')).toBe('alex');
    expect(params.get('page')).toBe('2');
  });

  it('removes only detail identity when returning to the list', () => {
    const params = new URLSearchParams('view=member-profile&id=member-42&search=alex');
    params.delete('view'); params.delete('id');
    expect(params.has('view')).toBe(false);
    expect(params.has('id')).toBe(false);
    expect(params.get('search')).toBe('alex');
  });
});
