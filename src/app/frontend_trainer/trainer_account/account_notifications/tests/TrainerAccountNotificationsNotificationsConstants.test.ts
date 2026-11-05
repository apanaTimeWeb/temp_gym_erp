import { describe, expect, it } from 'vitest';

import { TRAINER_NOTIFICATIONS_PAGE_LIMIT, TRAINER_NOTIFICATIONS_TYPE_IDS } from '@/app/frontend_trainer/trainer_account/account_notifications/utils/TrainerAccountNotificationsNotificationsConstants';




describe('TrainerNotificationsConstants', () => {
  it('exposes the documented notification type registry and page limit', () => {
    expect(TRAINER_NOTIFICATIONS_TYPE_IDS).toEqual(['MEMBER', 'WORKOUT', 'SYSTEM', 'ATTENDANCE']);
    expect(TRAINER_NOTIFICATIONS_PAGE_LIMIT).toBe(20);
  });
});
