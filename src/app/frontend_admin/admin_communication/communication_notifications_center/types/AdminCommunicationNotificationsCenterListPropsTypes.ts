// RESPONSIBILITY: Defines feature-local TypeScript contracts for communication_notifications_center; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_communication/communication_notifications_center/types/AdminCommunicationNotificationsCenterListPropsTypes.ts)

import type { NotificationItem } from '@/app/frontend_admin/admin_communication/communication_notifications_center/types/AdminCommunicationNotificationsCenterTypes';
export interface AdminNotificationsListProps {
  notifications: NotificationItem[];
  onMarkAsRead: (id: string) => void;
}
