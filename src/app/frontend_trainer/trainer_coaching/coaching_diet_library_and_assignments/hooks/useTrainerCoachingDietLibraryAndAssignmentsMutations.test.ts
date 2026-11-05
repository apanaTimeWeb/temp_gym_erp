import { act, renderHook } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import { useTrainerLibraryMutations } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/hooks/useTrainerCoachingDietLibraryAndAssignmentsMutations';




const invalidateQueries = vi.fn().mockResolvedValue(undefined);
const api = { assignDietPlan: vi.fn().mockResolvedValue({ success: true, message: 'Assigned', data: null }) };

vi.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({ invalidateQueries }),
  useMutation: (options: { mutationFn: (variables: never) => Promise<unknown>; onSuccess?: () => unknown }) => ({
    mutateAsync: vi.fn(async (variables: never) => {
      const data = await options.mutationFn(variables);
      await options.onSuccess?.();
      return data;
    }),
    isPending: false,
    error: null,
    isError: false,
  }),
}));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/api/TrainerCoachingDietLibraryAndAssignmentsApi', () => ({ TrainerLibraryApi: api }));



describe('useTrainerLibraryMutations', () => {
  it('forwards the mutation envelope and invalidates assignment/list queries', async () => {
    const { result } = renderHook(() => useTrainerLibraryMutations());

    await act(async () => {
      await result.current.assignDietPlan({ memberId: 'member-7', dietPlanId: 'diet-4', idempotencyKey: 'idem-4' });
    });

    expect(api.assignDietPlan).toHaveBeenCalledWith('member-7', 'diet-4', 'idem-4');
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['trainer_library', 'assigned-members'] });
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['trainer_library', 'diet-plans'] });
  });
});
