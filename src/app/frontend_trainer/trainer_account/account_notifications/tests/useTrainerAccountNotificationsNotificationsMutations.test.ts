import { act, renderHook } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import { useTrainerNotificationsMutations } from '@/app/frontend_trainer/trainer_account/account_notifications/hooks/useTrainerAccountNotificationsNotificationsMutations';




const { invalidateQueries, api } = vi.hoisted(() => ({
  invalidateQueries: vi.fn().mockResolvedValue(undefined),
  api: {
    markRead: vi.fn().mockResolvedValue({ success: true }),
    markAll: vi.fn().mockResolvedValue({ success: true }),
  },
}));

vi.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({ invalidateQueries }),
  useMutation: (options: { mutationFn: (variables: never) => Promise<unknown>; onSuccess?: () => unknown }) => ({
    mutateAsync: vi.fn(async (variables: never) => {
      const data = await options.mutationFn(variables);
      await options.onSuccess?.();
      return data;
    }),
    isPending: false,
  }),
}));
vi.mock('@/app/frontend_trainer/trainer_account/account_notifications/api/TrainerAccountNotificationsNotificationsApi', () => ({
  markTrainerNotificationsTrainerNotificationRead: api.markRead,
  markTrainerNotificationsAllTrainerNotificationsRead: api.markAll,
}));



describe('useTrainerNotificationsMutations', () => {
  it('marks one notification read and invalidates the notification list', async () => {
    const { result } = renderHook(() => useTrainerNotificationsMutations());

    await act(async () => {
      await result.current.markAsRead({ id: 'n1', idempotencyKey: 'read-1' });
    });

    expect(api.markRead).toHaveBeenCalledWith('n1', 'read-1');
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['trainer_notifications', 'list'] });
  });

  it('marks all notifications read with the supplied idempotency key', async () => {
    const { result } = renderHook(() => useTrainerNotificationsMutations());

    await act(async () => {
      await result.current.markAllAsRead('read-all-1');
    });

    expect(api.markAll).toHaveBeenCalledWith('read-all-1');
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['trainer_notifications', 'list'] });
  });
});
