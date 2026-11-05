/** Standalone Notification entity contract; wire values preserved. */
export type NotificationType = 'INFO' | 'WARNING' | 'CRITICAL';
export interface SuperadminNotification {
  id: string;
  title: string;
  body: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
}
