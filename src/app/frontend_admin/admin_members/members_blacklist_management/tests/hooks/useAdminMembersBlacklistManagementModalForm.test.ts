// RESPONSIBILITY: Defines regression tests for useAdminMembersBlacklistManagementModalForm.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_blacklist/blacklist_management/tests/hooks/useAdminMembersBlacklistManagementModalForm.test.ts)

import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAdminBlacklistModalForm } from '@/app/frontend_admin/admin_members/members_blacklist_management/hooks/useAdminMembersBlacklistManagementModalForm';

const setShowModal = vi.fn();
const saveBlacklist = vi.fn();
const store = { showModal: true, setShowModal, form: { memberId: '', memberName: '', memberPhone: '', memberEmail: '', reason: '', scope: 'global' as const, assignedGyms: ['all'] }, saveBlacklist, saving: false };
vi.mock('@/app/frontend_admin/admin_members/members_blacklist_management/hooks/useAdminMembersBlacklistManagementLogic', () => ({ useAdminBlacklistLogic: () => store }));
vi.mock('@/app/frontend_admin/admin_members/members_blacklist_management/hooks/useAdminMembersBlacklistManagementUnsavedChangesGuard', () => ({ useAdminBlacklistUnsavedChangesGuard: () => ({ confirmDiscardIfDirty: vi.fn().mockResolvedValue(true) }) }));

describe('useAdminBlacklistModalForm', () => {
  beforeEach(() => setShowModal.mockReset());

  it('keeps global and specific scope state consistent while toggling gyms', () => {
    const { result } = renderHook(() => useAdminBlacklistModalForm());
    expect(result.current.scope).toBe('global');
    expect(result.current.selectedGyms).toEqual(['all']);
    act(() => result.current.setScope('specific'));
    expect(result.current.selectedGyms).toEqual([]);
    act(() => result.current.toggleGym('g2'));
    expect(result.current.selectedGyms).toEqual(['g2']);
    act(() => result.current.toggleGym('g2'));
    expect(result.current.selectedGyms).toEqual([]);
    act(() => result.current.setScope('global'));
    expect(result.current.selectedGyms).toEqual(['all']);
  });
});
