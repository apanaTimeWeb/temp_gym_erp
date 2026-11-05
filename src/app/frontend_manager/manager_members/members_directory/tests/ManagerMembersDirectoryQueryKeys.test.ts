import { describe, expect, it } from 'vitest';

import { ManagerMembersDirectoryQueryKeys } from '@/app/frontend_manager/manager_members/members_directory/api/manager_members_directory.query_keys';

describe('manager_members query-key namespace', () => {
  it('uses a stable, feature-specific root for every cache entry', () => {
    expect(ManagerMembersDirectoryQueryKeys.all).toEqual(['manager_members']);
  });

  it('requires the owning member identity for member-scoped resources', () => {
    expect(ManagerMembersDirectoryQueryKeys.payments('member-42')).toEqual(['manager_members', 'payments', 'member-42']);
    expect(ManagerMembersDirectoryQueryKeys.attendance('member-42')).toEqual(['manager_members', 'attendance', 'member-42']);
    expect(ManagerMembersDirectoryQueryKeys.detail('member-42')).toEqual(['manager_members', 'detail', 'member-42']);
    expect(() => ManagerMembersDirectoryQueryKeys.payments('')).toThrow('member ID is required');
    expect(() => ManagerMembersDirectoryQueryKeys.attendance('   ')).toThrow('member ID is required');
    expect(() => ManagerMembersDirectoryQueryKeys.detail('')).toThrow('member ID is required');
  });

  it('uses isolated disabled keys while no member is selected', () => {
    expect(ManagerMembersDirectoryQueryKeys.paymentsDisabled()).toEqual(['manager_members', 'payments', 'disabled']);
    expect(ManagerMembersDirectoryQueryKeys.attendanceDisabled()).toEqual(['manager_members', 'attendance', 'disabled']);
    expect(ManagerMembersDirectoryQueryKeys.detailDisabled()).toEqual(['manager_members', 'detail', 'disabled']);
  });
});
