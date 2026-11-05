import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useTrainerNotificationsLogic } from '@/app/frontend_trainer/trainer_account/account_notifications/hooks/useTrainerAccountNotificationsNotificationsLogic';

const harness = vi.hoisted(() => ({
  queryClientInvalidate: vi.fn().mockResolvedValue(undefined),
  fetchNextPage: vi.fn().mockResolvedValue(undefined),
  refetch: vi.fn().mockResolvedValue(undefined),
  markAsRead: vi.fn().mockResolvedValue({ message: 'Marked as read' }),
  markAllAsRead: vi.fn().mockResolvedValue({ message: 'All marked as read' }),
  begin: vi.fn(() => 'notification-test-key'),
  clear: vi.fn(),
  showSuccess: vi.fn(),
  showError: vi.fn(),
  query: {
    data: { pages: [{ notifications: [
      { id: 'n1', text: 'New booking', time: '2026-10-15T10:00:00Z', unread: true },
      { id: 'n2', text: 'Profile updated', time: '2026-10-14T10:00:00Z', unread: false },
    ] }] },
    isPending: false,
    isError: false,
    isSuccess: true,
    hasNextPage: true,
    isFetchingNextPage: false,
    isRefetching: false,
    fetchNextPage: vi.fn(),
    refetch: vi.fn(),
  },
}));

vi.mock('@tanstack/react-query', () => ({
  useInfiniteQuery: () => harness.query,
  useQueryClient: () => ({ invalidateQueries: harness.queryClientInvalidate }),
}));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_trainer/trainer_account/account_notifications/hooks/TrainerAccountNotificationsuseTrainerInfrastructureFeedback', () => ({
  useTrainerInfrastructureFeedback: () => ({ showSuccess: harness.showSuccess, showError: harness.showError }),
}));
vi.mock('@/app/frontend_trainer/trainer_account/account_notifications/hooks/TrainerAccountNotificationsuseTrainerInfrastructureIdempotencyKey', () => ({
  useTrainerInfrastructureIdempotencyKey: () => ({ begin: harness.begin, clear: harness.clear }),
}));
vi.mock('@/app/frontend_trainer/trainer_account/account_notifications/hooks/TrainerAccountNotificationsuseTrainerInfrastructureSocketEvent', () => ({
  useTrainerInfrastructureSocketEvent: vi.fn(),
}));
vi.mock('@/app/frontend_trainer/trainer_account/account_notifications/api/TrainerAccountNotificationsNotificationsApi', () => ({
  fetchTrainerNotifications: vi.fn(),
}));
vi.mock('@/app/frontend_trainer/trainer_account/account_notifications/hooks/useTrainerAccountNotificationsNotificationsMutations', () => ({
  useTrainerNotificationsMutations: () => ({
    markAsRead: harness.markAsRead,
    markAllAsRead: harness.markAllAsRead,
    markAllAsReadPending: false,
  }),
}));

describe('useTrainerNotificationsLogic', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    harness.query.data = { pages: [{ notifications: [
      { id: 'n1', text: 'New booking', time: '2026-10-15T10:00:00Z', unread: true },
      { id: 'n2', text: 'Profile updated', time: '2026-10-14T10:00:00Z', unread: false },
    ] }] };
    harness.query.isPending = false;
    harness.query.isError = false;
    harness.query.isSuccess = true;
    harness.query.hasNextPage = true;
    harness.query.isFetchingNextPage = false;
    harness.query.isRefetching = false;
    harness.query.fetchNextPage = harness.fetchNextPage;
    harness.query.refetch = harness.refetch;
    Object.defineProperty(navigator, 'onLine', { configurable: true, value: true });
  });

  it('derives unread count and pagination from the query result', () => {
    const { result } = renderHook(() => useTrainerNotificationsLogic());
    expect(result.current.notifications).toHaveLength(2);
    expect(result.current.unreadCount).toBe(1);
    expect(result.current.hasMore).toBe(true);
    expect(result.current.isPending).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it('wires retry and load-more actions to the query', () => {
    const { result } = renderHook(() => useTrainerNotificationsLogic());
    act(() => result.current.retry());
    act(() => result.current.loadMore());
    expect(harness.refetch).toHaveBeenCalledTimes(1);
    expect(harness.fetchNextPage).toHaveBeenCalledTimes(1);
  });

  it('reports successful mark-read feedback and clears the idempotency key', async () => {
    const { result } = renderHook(() => useTrainerNotificationsLogic());
    await act(async () => result.current.markAsRead('n1'));
    expect(harness.markAsRead).toHaveBeenCalledWith({ id: 'n1', idempotencyKey: 'notification-test-key' });
    expect(harness.showSuccess).toHaveBeenCalledWith('Marked as read', 'mark-notification-read-n1');
    expect(harness.clear).toHaveBeenCalledWith('mark-notification-read-n1');
  });

  it('reports a failed mark-read action without leaking the error into UI state', async () => {
    harness.markAsRead.mockRejectedValueOnce(new Error('network failure'));
    const { result } = renderHook(() => useTrainerNotificationsLogic());
    await act(async () => result.current.markAsRead('n1'));
    expect(harness.showError).toHaveBeenCalledWith(expect.any(Error), 'mark-notification-read-n1-error');
    expect(harness.clear).toHaveBeenCalledWith('mark-notification-read-n1');
  });
});
