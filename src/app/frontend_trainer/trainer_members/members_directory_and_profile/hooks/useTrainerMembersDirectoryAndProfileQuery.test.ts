import { renderHook } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import { useTrainerMembersQuery } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileQuery';




const capturedQueries: Array<{ queryKey: readonly unknown[]; queryFn: () => Promise<unknown> }> = [];
const api = {
  fetchMembers: vi.fn().mockResolvedValue({ success: true, data: [{ id: 'member-1' }] }),
  fetchMemberStats: vi.fn(),
  fetchMemberAttendance: vi.fn(),
  fetchDietPlans: vi.fn(),
  fetchWorkoutPlans: vi.fn(),
  fetchMemberProgressEntries: vi.fn(),
};

vi.mock('@tanstack/react-query', () => ({
  useQuery: (options: { queryKey: readonly unknown[]; queryFn: () => Promise<unknown> }) => { capturedQueries.push(options); return { data: undefined }; },
}));
vi.mock('@/app/frontend_trainer/trainer_members/members_directory_and_profile/api/TrainerMembersDirectoryAndProfileApi', () => ({ TrainerMembersApi: api }));



describe('useTrainerMembersQuery', () => {
  it('creates the canonical list key and executes the validated Members API query', async () => {
    capturedQueries.length = 0;
    const params: any = { search: 'prahlad', status: 'ACTIVE' };
    renderHook(() => useTrainerMembersQuery(params));

    expect(capturedQueries[0]?.queryKey).toEqual(['trainer_members', 'list', params]);
    await expect(capturedQueries[0]!.queryFn()).resolves.toEqual([{ id: 'member-1' }]);
    expect(api.fetchMembers).toHaveBeenCalledWith(params);
  });
});
