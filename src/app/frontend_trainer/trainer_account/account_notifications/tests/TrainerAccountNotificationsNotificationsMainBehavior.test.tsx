import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { describe, expect, it, vi } from 'vitest';

import TrainerNotificationsMain from '@/app/frontend_trainer/trainer_account/account_notifications/components/TrainerAccountNotificationsNotificationsMain';

import { TRAINER_NOTIFICATIONS_TYPE_IDS } from '@/app/frontend_trainer/trainer_account/account_notifications/utils/TrainerAccountNotificationsNotificationsConstants';






const markAllAsRead = vi.fn();
vi.mock('@/app/frontend_trainer/trainer_account/account_notifications/hooks/useTrainerAccountNotificationsNotificationsLogic', () => ({ useTrainerNotificationsLogic: () => ({ notifications: [{ id: 'n1', text: 'New member', time: '2m ago', unread: true, type: TRAINER_NOTIFICATIONS_TYPE_IDS[0] }], unreadCount: 1, isPending: false, isError: false, hasMore: false, loadingMore: false, loadMore: vi.fn(), retryPending: false, markAllAsRead, markAsRead: vi.fn(), isOnline: true, offlineMessage: '', markAsReadPendingId: null, markAllAsReadPending: false }) }));
vi.mock('@/app/frontend_trainer/trainer_account/account_notifications/components/TrainerAccountNotificationsNotificationsList', () => ({ default: () => <div data-testid="trainer_notifications-main-behavior-test-notifications-list">New member</div> }));
describe('TrainerNotificationsMain behavior', () => {
  it('marks all visible notifications as read through the feature logic', async () => {
    const user = userEvent.setup();
    render(<TrainerNotificationsMain />);
    await user.click(screen.getByRole('button', { name: 'Mark all as read' }));
    expect(markAllAsRead).toHaveBeenCalledTimes(1);
  });
});
