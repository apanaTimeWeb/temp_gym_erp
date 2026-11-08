import { act, renderHook } from '@testing-library/react';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useTrainerProfileMutations } from '@/app/frontend_trainer/trainer_account/account_personal_profile/hooks/useTrainerAccountPersonalProfileProfileMutations';




const { invalidateQueries, setQueryData, api } = vi.hoisted(() => ({
  invalidateQueries: vi.fn().mockResolvedValue(undefined),
  setQueryData: vi.fn(),
  api: {
    updateProfile: vi.fn().mockResolvedValue({ success: true, data: { id: 'trainer-1', name: 'Updated' } }),
  },
}));

vi.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({ invalidateQueries, setQueryData }),
  useMutation: (options: { mutationFn: (variables: never) => Promise<unknown>; onSuccess?: (data: unknown) => unknown }) => ({
    mutateAsync: vi.fn(async (variables: never) => {
      const data = await options.mutationFn(variables);
      await options.onSuccess?.(data);
      return data;
    }),
    isPending: false,
  }),
}));
vi.mock('@/app/frontend_trainer/trainer_account/account_personal_profile/api/TrainerAccountPersonalProfileProfileApi', () => ({ TrainerProfileApi: api }));



describe('useTrainerProfileMutations', () => {
  beforeEach(() => { vi.clearAllMocks(); });
  it('writes the successful profile response into the canonical query and invalidates it', async () => {
    const { result } = renderHook(() => useTrainerProfileMutations());
    const values = { name: 'Updated' } as never;

    await act(async () => {
      await result.current.updateProfile({ values, idempotencyKey: 'profile-1' });
    });

    expect(api.updateProfile).toHaveBeenCalledWith(values, 'profile-1');
    expect(setQueryData).toHaveBeenCalledWith(['trainer_profile', 'profile'], { id: 'trainer-1', name: 'Updated' });
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['trainer_profile', 'profile'] });
  });

  it('does not update the profile cache when a profile mutation rejects', async () => {
    api.updateProfile.mockRejectedValueOnce(new Error('Profile update failed'));
    const { result } = renderHook(() => useTrainerProfileMutations());
    await expect(result.current.updateProfile({ values: { name: 'Updated' } as never, idempotencyKey: 'profile-fail-1' })).rejects.toThrow('Profile update failed');
    expect(setQueryData).not.toHaveBeenCalled();
  });



});
