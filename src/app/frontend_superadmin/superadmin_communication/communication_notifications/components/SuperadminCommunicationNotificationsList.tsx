// RESPONSIBILITY: Renders/orchestrates SuperadminCommunicationNotificationsList within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders notification state and delegates read mutations to the Superadmin Messaging hook.
import { AlertTriangle, Info, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SUPERADMIN_COMMUNICATION_NOTIFICATIONS_TYPE_CODES } from '@/app/frontend_superadmin/superadmin_communication/communication_notifications/constants/superadmin_communication_notifications.constants';
import { formatDateTime } from '@/app/frontend_superadmin/superadmin_communication/communication_notifications/utils/SuperadminCommunicationNotificationsFormatters';

import type { SuperadminCommunicationMessagingNotificationsTabProps } from '@/app/frontend_superadmin/superadmin_communication/communication_notifications/types/superadmin_communication_notifications_list.types';



/**
 * @description Renders notification state and delegates read mutations to the Superadmin Messaging hook.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export function SuperadminCommunicationNotificationsList({ notifications, handleMarkRead, isMarkingRead }: SuperadminCommunicationMessagingNotificationsTabProps) {
  const t = useTranslations('superadmin_communication_notifications');
  return (
    <div className="space-y-3">
      {notifications.map((notification, index) => (
        <div key={notification.id} className={`flex items-start gap-3 rounded-xl border border-border bg-card p-4 motion-safe:transition-colors ${notification.read ? 'opacity-60' : 'shadow-card'}`}>
          <div className="mt-0.5">{notification.type === SUPERADMIN_COMMUNICATION_NOTIFICATIONS_TYPE_CODES.INFO ? <Info size={18} className="shrink-0 text-info" strokeWidth={2} aria-hidden="true"/> : <AlertTriangle size={18} className={`h-5 shrink-0 ${notification.type === SUPERADMIN_COMMUNICATION_NOTIFICATIONS_TYPE_CODES.WARNING ? 'text-warning' : 'text-danger'}`} strokeWidth={2} aria-hidden="true"/>}</div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className={`text-sm font-semibold ${notification.read ? 'text-secondary' : 'text-primary'}`}>{notification.title}</p>
              {!notification.read && <span className="h-2 w-2 shrink-0 rounded-full bg-primary text-on-primary" aria-label={t('ui.unread_6df89c2')} />}
            </div>
            <p className="mt-0.5 text-xs text-secondary">{notification.body}</p>
            <p className="mt-1 text-xs text-disabled">{formatDateTime(notification.createdAt)}</p>
          </div>
          {!notification.read && (
            <button  type="button" onClick={() => { void handleMarkRead(notification.id); }} disabled={isMarkingRead} aria-label={t('ui.a11y_mark_notification_read', { title: notification.title })} title={t('ui.mark_as_read_28a5dba')} className="min-w-11 min-h-11 shrink-0 rounded-lg p-1.5 text-secondary motion-safe:transition-colors hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 motion-safe:active:scale-95" data-testid={`superadmin_communication_messaging-messaging-messaging-notifications-tab-control-${index}`}>
              <X size={18} strokeWidth={2}/>
            </button>
          )}
        </div>
      ))}
      {notifications.length === 0 && <div className="py-16 text-center text-secondary">{t('ui.no_notifications_acc1043')}</div>}
    </div>
  );
}
