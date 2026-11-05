import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useTrainerMembersViewState } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileViewState';

const harness = vi.hoisted(() => {
  const storeState = { selectedMemberId: null as string | null, profileTab: 'overview' as string };
  return {
    storeState,
    search: '' as string,
    pathname: '/frontend_trainer/trainer_members/members_directory_and_profile',
    push: vi.fn(),
    replace: vi.fn(),
    setSelectedMember: vi.fn((id: string | null) => { storeState.selectedMemberId = id; }),
    setProfileTab: vi.fn((view: string) => { storeState.profileTab = view; }),
  };
});

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: harness.push, replace: harness.replace }),
  usePathname: () => harness.pathname,
  useSearchParams: () => new URLSearchParams(harness.search),
}));

vi.mock('@/app/frontend_trainer/trainer_members/members_directory_and_profile/state/useTrainerMembersDirectoryAndProfileStore', () => ({
  useTrainerMembersStore: (selector: (state: typeof harness.storeState & { setSelectedMember: typeof harness.setSelectedMember; setProfileTab: typeof harness.setProfileTab }) => unknown) => selector({
    ...harness.storeState,
    setSelectedMember: harness.setSelectedMember,
    setProfileTab: harness.setProfileTab,
  }),
}));

describe('useTrainerMembersViewState', () => {
  beforeEach(() => {
    harness.search = '';
    harness.pathname = '/frontend_trainer/trainer_members/members_directory_and_profile';
    harness.storeState.selectedMemberId = null;
    harness.storeState.profileTab = 'overview';
    harness.push.mockReset();
    harness.replace.mockReset();
    harness.setSelectedMember.mockClear();
    harness.setProfileTab.mockClear();
  });

  it('hydrates selected identity and view from a direct profile URL', () => {
    harness.search = 'view=progress&id=MEM-002&search=Asha';
    const { result } = renderHook(() => useTrainerMembersViewState());

    expect(result.current.isProfileView).toBe(true);
    expect(result.current.memberId).toBe('MEM-002');
    expect(result.current.view).toBe('progress');
    expect(harness.setSelectedMember).toHaveBeenCalledWith('MEM-002');
    expect(harness.setProfileTab).toHaveBeenCalledWith('progress');
  });

  it('removes an obsolete tab URL parameter without dropping unrelated parameters', () => {
    harness.search = 'view=notes&tab=obsolete&id=MEM-003&search=Ravi&page=2';
    renderHook(() => useTrainerMembersViewState());

    expect(harness.replace).toHaveBeenCalledWith(
      '/frontend_trainer/trainer_members/members_directory_and_profile?id=MEM-003&search=Ravi&page=2&view=notes',
      { scroll: false },
    );
  });

  it('opens a profile with URL-backed record identity while retaining list filters', () => {
    harness.search = 'search=Asha&status=ACTIVE&page=2';
    const { result } = renderHook(() => useTrainerMembersViewState());

    act(() => result.current.openMember('MEM-004'));
    expect(harness.push).toHaveBeenCalledWith(
      '/frontend_trainer/trainer_members/members_directory_and_profile?search=Asha&status=ACTIVE&page=2&id=MEM-004&view=overview',
      { scroll: false },
    );
  });

  it('changes the profile view with the same member ID and preserves query state', () => {
    harness.search = 'search=Asha&id=MEM-005&view=overview&page=2';
    const { result } = renderHook(() => useTrainerMembersViewState());

    act(() => result.current.setProfileView('attendance'));
    expect(harness.push).toHaveBeenCalledWith(
      '/frontend_trainer/trainer_members/members_directory_and_profile?search=Asha&id=MEM-005&view=attendance&page=2',
      { scroll: false },
    );
  });

  it('returns to list state without dropping unrelated parameters', () => {
    harness.search = 'search=Asha&id=MEM-006&view=notes&page=3&sortBy=name';
    const { result } = renderHook(() => useTrainerMembersViewState());

    act(() => result.current.backToList());
    expect(harness.push).toHaveBeenCalledWith(
      '/frontend_trainer/trainer_members/members_directory_and_profile?search=Asha&page=3&sortBy=name',
      { scroll: false },
    );
  });
});
