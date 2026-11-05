// RESPONSIBILITY: Owns notification presentation formatting without mutating server data.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_communication/communication_notifications_center/utils/AdminCommunicationNotificationsCenterFormatters.ts)

import { format, isValid, parseISO } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';
import type { AdminNotification, NotificationItem } from '@/app/frontend_admin/admin_communication/communication_notifications_center/types/AdminCommunicationNotificationsCenterTypes';

/** Invalid timestamps fall back to an em dash while preserving notification text and unread state. @description Implements mapAdminNotificationToItem for the owning feature’s explicitly typed data. @param notification - Input used by this utility as declared by the signature. @param locale - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function mapAdminNotificationToItem(notification: AdminNotification, locale: string): NotificationItem {
  const parsed = parseISO(notification.createdAt);
  const time = isValid(parsed) ? format(parsed, 'PP p', { locale: locale.toLowerCase().startsWith('hi') ? hi : enUS }) : '—';
  return { id: notification.id, text: notification.title, time, unread: !notification.read };
}
