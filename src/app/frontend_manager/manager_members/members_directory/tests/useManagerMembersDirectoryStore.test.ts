import { describe, expect, it, beforeEach } from 'vitest';

import { MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory.constants';
import { MEMBER_ATTENDANCE_EMPTY_STATUS } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory.constants';
import { useManagerMembersDirectoryStore } from '@/app/frontend_manager/manager_members/members_directory/state/useManagerMembersDirectoryStore';

describe('useManagerMembersDirectoryStore attendance state transitions', () => {
  beforeEach(() => {
    useManagerMembersDirectoryStore.setState({ selectedMemberIds: [], attMap: {} });
  });

  it('creates the first attendance entry when toggled from an empty store', () => {
    useManagerMembersDirectoryStore.getState().toggleAtt('member-1', 3);

    expect(useManagerMembersDirectoryStore.getState().attMap['member-1']).toEqual([
      { day: 3, status: MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.P },
    ]);
  });

  it('cycles a day entry through present, absent, and empty statuses', () => {
    useManagerMembersDirectoryStore.getState().toggleAtt('member-1', 3);
    useManagerMembersDirectoryStore.getState().toggleAtt('member-1', 3);
    expect(useManagerMembersDirectoryStore.getState().attMap['member-1'][0]?.status).toBe('A');

    useManagerMembersDirectoryStore.getState().toggleAtt('member-1', 3);
    expect(useManagerMembersDirectoryStore.getState().attMap['member-1'][0]?.status).toBe(MEMBER_ATTENDANCE_EMPTY_STATUS);
  });

  it('does not modify another day when toggling a specific day', () => {
    useManagerMembersDirectoryStore.setState({ attMap: { 'member-1': [{ day: 2, status: 'A' }] } });
    useManagerMembersDirectoryStore.getState().toggleAtt('member-1', 3);

    expect(useManagerMembersDirectoryStore.getState().attMap['member-1']).toEqual([
      { day: 2, status: 'A' },
      { day: 3, status: MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.P },
    ]);
  });
});
