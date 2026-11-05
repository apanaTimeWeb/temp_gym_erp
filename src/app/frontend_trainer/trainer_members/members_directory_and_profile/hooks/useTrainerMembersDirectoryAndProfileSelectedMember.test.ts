import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useTrainerMembersSelectedMember } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileSelectedMember';

const harness = vi.hoisted(() => ({
  selectedMemberId: null as string | null,
  queryResult: {
    data: undefined as { data: { id: string; name: string } } | undefined,
    isPending: false,
    isError: false,
    refetch: vi.fn(),
  },
  useQuery: vi.fn(),
  fetchMemberById: vi.fn(),
}));

vi.mock('@tanstack/react-query', () => ({ useQuery: harness.useQuery }));
vi.mock('@/app/frontend_trainer/trainer_members/members_directory_and_profile/api/TrainerMembersDirectoryAndProfileApi', () => ({
  TrainerMembersApi: { fetchMemberById: harness.fetchMemberById },
}));
vi.mock('@/app/frontend_trainer/trainer_members/members_directory_and_profile/state/useTrainerMembersDirectoryAndProfileStore', () => ({
  useTrainerMembersStore: (selector: (state: { selectedMemberId: string | null }) => unknown) =>
    selector({ selectedMemberId: harness.selectedMemberId }),
}));

describe('useTrainerMembersSelectedMember', () => {
  beforeEach(() => {
    harness.selectedMemberId = null;
    harness.queryResult.data = undefined;
    harness.queryResult.isPending = false;
    harness.queryResult.isError = false;
    harness.useQuery.mockReset().mockImplementation(() => harness.queryResult);
    harness.fetchMemberById.mockReset();
  });

  it('disables the detail query and exposes no member when no member is selected', () => {
    const { result } = renderHook(() => useTrainerMembersSelectedMember());

    expect(harness.useQuery).toHaveBeenCalledWith(expect.objectContaining({
      queryKey: ['trainer_members', 'detail', ''],
      enabled: false,
    }));
    expect(result.current.memberId).toBeNull();
    expect(result.current.member).toBeNull();
  });

  it('loads the selected member by its ID and exposes the validated response data', async () => {
    harness.selectedMemberId = 'member-42';
    harness.queryResult.data = { data: { id: 'member-42', name: 'Asha Patel' } };
    harness.fetchMemberById.mockResolvedValue({ success: true, data: { id: 'member-42', name: 'Asha Patel' } });

    const { result } = renderHook(() => useTrainerMembersSelectedMember());
    const queryOptions = harness.useQuery.mock.calls[0][0] as { queryKey: unknown[]; enabled: boolean; queryFn: () => Promise<unknown> };

    expect(queryOptions.queryKey).toEqual(['trainer_members', 'detail', 'member-42']);
    expect(queryOptions.enabled).toBe(true);
    expect(result.current.member).toEqual({ id: 'member-42', name: 'Asha Patel' });
    await queryOptions.queryFn();
    expect(harness.fetchMemberById).toHaveBeenCalledWith('member-42');
  });

  it('fails closed if a disabled query function is invoked without a selected identity', async () => {
    const { result } = renderHook(() => useTrainerMembersSelectedMember());
    const queryOptions = harness.useQuery.mock.calls[0][0] as { queryFn: () => Promise<unknown> };

    await expect(queryOptions.queryFn()).rejects.toThrow('A member must be selected before loading the profile.');
    expect(harness.fetchMemberById).not.toHaveBeenCalled();
    expect(result.current.member).toBeNull();
  });
});
