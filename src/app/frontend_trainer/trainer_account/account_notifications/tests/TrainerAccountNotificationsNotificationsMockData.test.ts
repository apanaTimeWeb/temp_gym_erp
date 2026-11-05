import { describe, expect, it } from 'vitest';

import { TRAINER_NOTIFICATIONS_PAGE_LIMIT } from '@/app/frontend_trainer/trainer_account/account_notifications/utils/TrainerAccountNotificationsNotificationsConstants';
import { TRAINER_NOTIFICATIONS_MOCK_TRAINER_NOTIFICATIONS } from '@/app/frontend_trainer/trainer_account/account_notifications/mocks/fixtures/TrainerAccountNotificationsNotificationsMockData';

describe('Trainer notification pagination fixtures', () => {
  it('contains a full first page and records for a non-empty next page', () => {
    expect(TRAINER_NOTIFICATIONS_MOCK_TRAINER_NOTIFICATIONS).toHaveLength(25);
    expect(TRAINER_NOTIFICATIONS_MOCK_TRAINER_NOTIFICATIONS.slice(0, TRAINER_NOTIFICATIONS_PAGE_LIMIT)).toHaveLength(TRAINER_NOTIFICATIONS_PAGE_LIMIT);
    expect(TRAINER_NOTIFICATIONS_MOCK_TRAINER_NOTIFICATIONS.slice(TRAINER_NOTIFICATIONS_PAGE_LIMIT)).toHaveLength(5);
  });
});
