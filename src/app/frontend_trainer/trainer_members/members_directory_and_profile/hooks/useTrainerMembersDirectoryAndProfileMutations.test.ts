import { act, renderHook } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import { useTrainerMembersMutations } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileMutations';




const invalidateQueries = vi.fn();
const api = {
  addMemberNote: vi.fn().mockResolvedValue({ success: true, data: null }),
  updateMember: vi.fn().mockResolvedValue({ success: true, data: null }),
  assignDiet: vi.fn().mockResolvedValue({ success: true, data: null }),
  assignWorkout: vi.fn().mockResolvedValue({ success: true, data: null }),
  updateMemberAssessment: vi.fn().mockResolvedValue({ success: true, data: null }),
};

vi.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({ invalidateQueries }),
  useMutation: (options: { mutationFn: (variables: never) => Promise<unknown>; onSuccess?: (data: unknown, variables: never) => void }) => ({
    mutateAsync: vi.fn(async (variables: never) => {
      const data = await options.mutationFn(variables);
      options.onSuccess?.(data, variables);
      return data;
    }),
    isPending: false,
    error: null,
    isError: false,
  }),
}));

vi.mock('@/app/frontend_trainer/trainer_members/members_directory_and_profile/api/TrainerMembersDirectoryAndProfileApi', () => ({ TrainerMembersApi: api }));



describe('useTrainerMembersMutations', () => {
  it('passes mutation identity to the API and invalidates the affected detail and list caches', async () => {
    const { result } = renderHook(() => useTrainerMembersMutations());

    await act(async () => {
      await result.current.updateMember({ id: 'member-42', data: { name: 'Updated' }, idempotencyKey: 'idem-42' });
    });

    expect(api.updateMember).toHaveBeenCalledWith('member-42', { name: 'Updated' }, 'idem-42');
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['trainer_members', 'detail', 'member-42'] });
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['trainer_members', 'list'] });
  });

  it('uses the command-specific note API and preserves the idempotency key', async () => {
    const { result } = renderHook(() => useTrainerMembersMutations());

    await act(async () => {
      await result.current.addNote({ memberId: 'member-7', text: 'Call member', idempotencyKey: 'note-7' });
    });

    expect(api.addMemberNote).toHaveBeenCalledWith('member-7', { text: 'Call member' }, 'note-7');
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['trainer_members', 'detail', 'member-7'] });
  });
});
