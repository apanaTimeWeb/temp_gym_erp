// RESPONSIBILITY: TypeScript types for the Trainer Notifications module.

import { TRAINER_NOTIFICATIONS_TYPE_IDS } from '@/app/frontend_trainer/trainer_account/account_notifications/utils/TrainerAccountNotificationsNotificationsConstants';

export type TrainerNotificationsTrainerNotificationType = (typeof TRAINER_NOTIFICATIONS_TYPE_IDS)[number];

export interface TrainerNotificationsTrainerNotificationItem {
  id: string;
  text: string;
  time: string;
  unread: boolean;
  type?: TrainerNotificationsTrainerNotificationType;
  actionUrl?: string;
  relatedEntityId?: string;
  relatedEntityType?: string;
  metadata?: Record<string, unknown>;
}

export interface TrainerNotificationsApiResponse {
  notifications: TrainerNotificationsTrainerNotificationItem[];
}

export interface TrainerNotificationsNotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  sessionReminders: boolean;
  memberUpdates: boolean;
}
