import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useTrainerProgressTrackingMutations } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/hooks/useTrainerCoachingIndividualProgressProgressTrackingMutations';

const { invalidateQueries, createEntryApi, updateEntryApi, deleteEntryApi } = vi.hoisted(() => ({
  invalidateQueries: vi.fn().mockResolvedValue(undefined),
  createEntryApi: vi.fn().mockResolvedValue({ message: 'created' }),
  updateEntryApi: vi.fn().mockResolvedValue({ message: 'updated' }),
  deleteEntryApi: vi.fn().mockResolvedValue({ message: 'deleted' }),
}));

vi.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({ invalidateQueries }),
  useMutation: (options: { mutationFn: (variables: unknown) => Promise<unknown>; onSuccess?: (data: unknown, variables: unknown) => void }) => ({
    mutateAsync: vi.fn(async (variables: unknown) => {
      const data = await options.mutationFn(variables);
      options.onSuccess?.(data, variables);
      return data;
    }),
    isPending: false,
  }),
}));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/api/TrainerCoachingIndividualProgressProgressTrackingApi', () => ({
  createTrainerProgressTrackingProgressEntry: createEntryApi,
  updateTrainerProgressTrackingProgressEntry: updateEntryApi,
  deleteTrainerProgressTrackingProgressEntry: deleteEntryApi,
}));

describe('useTrainerProgressTrackingMutations', () => {
  beforeEach(() => vi.clearAllMocks());

  it('passes the supplied idempotency key and invalidates the affected member caches after delete', async () => {
    const { result } = renderHook(() => useTrainerProgressTrackingMutations());
    await act(async () => { await result.current.deleteEntry({ memberId: 'member-1', entryId: 'entry-7', idempotencyKey: 'delete-key-7' }); });
    expect(deleteEntryApi).toHaveBeenCalledWith('member-1', 'entry-7', 'delete-key-7');
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['trainer_progress_tracking', 'entries'] });
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['trainer_progress_tracking', 'summary', 'member-1'] });
  });

  it('keeps the idempotency key on create', async () => {
    const { result } = renderHook(() => useTrainerProgressTrackingMutations());
    const dto = { date: '2026-10-01', weightKg: 80 } as never;
    await act(async () => { await result.current.createEntry({ memberId: 'member-2', dto, idempotencyKey: 'create-key-2' }); });
    expect(createEntryApi).toHaveBeenCalledWith('member-2', dto, 'create-key-2');
  });
});
