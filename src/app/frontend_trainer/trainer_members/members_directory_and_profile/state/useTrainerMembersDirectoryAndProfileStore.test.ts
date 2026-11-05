import { act, renderHook } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import { useTrainerMembersStore } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/state/useTrainerMembersDirectoryAndProfileStore';





describe('useTrainerMembersStore', () => {
  it('tracks selected member and profile tab as UI-only state', () => {
    const { result } = renderHook(() => useTrainerMembersStore());

    act(() => {
      result.current.setSelectedMemberId('member-42');
      result.current.setProfileTab('progress');
    });

    expect(result.current.selectedMemberId).toBe('member-42');
    expect(result.current.profileTab).toBe('progress');
  });

  it('opens and clears the message modal payload', () => {
    const { result } = renderHook(() => useTrainerMembersStore());

    act(() => result.current.openMsg('Member 42', 'whatsapp', 'Hello'));
    expect(result.current.msgModal).toMatchObject({
      open: true,
      recipient: 'Member 42',
      type: 'whatsapp',
      message: 'Hello',
    });

    act(() => result.current.closeMsg());
    expect(result.current.msgModal).toBeNull();
  });
});
