import { z } from 'zod';

import { TRAINER_NOTIFICATIONS_TYPE_IDS } from '@/app/frontend_trainer/trainer_account/account_notifications/utils/TrainerAccountNotificationsNotificationsConstants';



export const TrainerNotificationsTrainerNotificationItemSchema = z.object({
  id: z.string(), text: z.string(), time: z.string(), unread: z.boolean(),
  type: z.enum(TRAINER_NOTIFICATIONS_TYPE_IDS).optional(),
  actionUrl: z.string().optional(), relatedEntityId: z.string().optional(), relatedEntityType: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});
