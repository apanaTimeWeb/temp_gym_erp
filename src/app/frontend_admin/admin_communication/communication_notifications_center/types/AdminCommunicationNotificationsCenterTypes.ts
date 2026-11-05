// RESPONSIBILITY: TypeScript types for the Admin Notifications module.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_communication/communication_notifications_center/types/AdminCommunicationNotificationsCenterTypes.ts)

import { NOTIFICATION_SEVERITY } from '@/app/frontend_admin/admin_communication/communication_notifications_center/constants/AdminCommunicationNotificationsCenterConstants';

export type NotificationSeverity = typeof NOTIFICATION_SEVERITY[keyof typeof NOTIFICATION_SEVERITY];

export interface AdminNotification {
  id: string;
  title: string;
  body: string;
  severity: NotificationSeverity;
  read: boolean;
  createdAt: string;
  branchId?: string;
  branchName?: string;
}

/** Lightweight notification item used by the page-level hook and list component. */
export interface NotificationItem {
  id: string;
  text: string;
  time: string;
  unread: boolean;
}

