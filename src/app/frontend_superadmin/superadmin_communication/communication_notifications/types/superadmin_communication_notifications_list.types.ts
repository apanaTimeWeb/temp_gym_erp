// RESPONSIBILITY: Prop contract for the Superadmin tenant notification tab view.
import type { SuperadminNotification } from '@/app/frontend_superadmin/superadmin_communication/communication_notifications/types/superadmin_communication_notifications.types';

export interface SuperadminCommunicationMessagingNotificationsTabProps {
  notifications: SuperadminNotification[];
  handleMarkRead: (id: string) => Promise<void>;
  isMarkingRead: boolean;
}
