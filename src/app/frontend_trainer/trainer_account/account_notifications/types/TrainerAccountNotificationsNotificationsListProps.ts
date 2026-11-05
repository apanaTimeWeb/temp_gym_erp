// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerNotificationsTrainerNotificationItem } from '@/app/frontend_trainer/trainer_account/account_notifications/types/TrainerAccountNotificationsNotificationsTypes';

export interface TrainerNotificationsListProps {
  notifications: TrainerNotificationsTrainerNotificationItem[];
  onMarkAsRead: (id: string) => void;
  pendingNotificationId?: string | null;
}
