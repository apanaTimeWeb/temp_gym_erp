// RESPONSIBILITY: All TypeScript types for the Notifications module.

export type NotificationType = 'SYSTEM' | 'PAYMENT' | 'EXPIRY' | 'ATTENDANCE' | 'INQUIRY' | 'ANNOUNCEMENT';
import type { NOTIFICATION_STATUS_VALUES, NOTIFICATION_PRIORITY_VALUES } from '@/app/frontend_manager/manager_communications/notifications_inbox/constants/manager_notifications_inbox_shared.constants';
export type NotificationStatus = typeof NOTIFICATION_STATUS_VALUES[number];
export type NotificationPriority = typeof NOTIFICATION_PRIORITY_VALUES[number];

export interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  status: NotificationStatus;
  title: string;
  message: string;
  memberId?: string;
  memberName?: string | null;
  createdAt: string;
  readAt?: string;
}

export interface NotificationKPIData {
  total: number;
  unread: number;
  highPriority: number;
  todayCount: number;
}
