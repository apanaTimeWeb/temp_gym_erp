import { describe, expect, it, vi } from 'vitest';

import { fetchTrainerNotifications, markTrainerNotificationsTrainerNotificationRead, markTrainerNotificationsAllTrainerNotificationsRead } from '@/app/frontend_trainer/trainer_account/account_notifications/api/TrainerAccountNotificationsNotificationsApi';

import { TRAINER_NOTIFICATIONS_TYPE_IDS } from '@/app/frontend_trainer/trainer_account/account_notifications/utils/TrainerAccountNotificationsNotificationsConstants';
import { TrainerNotificationsTrainerNotificationMutationResponseSchema } from '@/app/frontend_trainer/trainer_account/account_notifications/schemas/TrainerAccountNotificationsNotificationsApiSchema';




const apiFetch = vi.hoisted(() => vi.fn());
vi.mock('@/lib/api', () => ({ apiFetch }));

describe('Trainer notifications API behavior', () => {
  it('forwards pagination and returns server notifications', async () => {
    const notification = { id: 'n1', text: 'New member', time: '2m ago', unread: true, type: TRAINER_NOTIFICATIONS_TYPE_IDS[0] };
    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'notifications-list-test-request', message: 'OK', data: { notifications: [notification], total: 1 } });
    const result = await fetchTrainerNotifications(2, 20);
    expect(apiFetch.mock.calls[0][0]).toContain('page=2');
    expect(apiFetch.mock.calls[0][0]).toContain('limit=20');
    expect(result.notifications[0]?.text).toBe('New member');
  });
  it('uses PATCH for marking a notification read', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'notifications-read-test-request', message: 'Marked read', data: null });
    await markTrainerNotificationsTrainerNotificationRead('n1', 'notifications-read-test-key');
    expect(apiFetch.mock.calls[0][1]).toMatchObject({ method: 'PATCH' });
  });

  it('rejects a valid failure envelope for marking one notification read', async () => {
    apiFetch.mockResolvedValueOnce({ success: false, requestId: 'notifications-read-failure-request', message: 'Could not mark as read', data: null, errorCode: 'NOTIFICATION_UPDATE_FAILED', statusCode: 409 });
    await expect(markTrainerNotificationsTrainerNotificationRead('n1', 'notifications-read-failure-key')).rejects.toThrow('Could not mark as read');
  });

  it('rejects a valid failure envelope for mark-all-read', async () => {
    apiFetch.mockResolvedValueOnce({ success: false, requestId: 'notifications-all-failure-request', message: 'Could not mark all as read', data: null, errorCode: 'NOTIFICATION_UPDATE_FAILED', statusCode: 503 });
    await expect(markTrainerNotificationsAllTrainerNotificationsRead('notifications-all-failure-key')).rejects.toThrow('Could not mark all as read');
  });


  it('accepts a complete canonical failure envelope fixture', () => {
    const failureEnvelope = {
      success: false,
      requestId: 'notifications-read-failure-request',
      message: 'Could not mark as read',
      data: null,
      errorCode: 'NOTIFICATION_UPDATE_FAILED',
      statusCode: 409,
    };

    expect(TrainerNotificationsTrainerNotificationMutationResponseSchema.safeParse(failureEnvelope).success).toBe(true);
  });
});
