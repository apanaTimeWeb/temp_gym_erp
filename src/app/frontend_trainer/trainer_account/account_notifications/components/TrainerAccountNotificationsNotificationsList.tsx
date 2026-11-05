"use client";
// RESPONSIBILITY: Renders the notification list with keyboard/touch-accessible per-item mark-as-read actions.
// DATA FLOW: TrainerNotificationsMain → TrainerNotificationsList → TrainerNotificationsEmptyState
// ROLE BOUNDARY: Deleting notifications is FORBIDDEN for trainer role. See notifications_forbidden.md.
import { Check, Loader2 } from 'lucide-react';

import { useTranslations } from 'next-intl';

import TrainerNotificationsEmptyState from '@/app/frontend_trainer/trainer_account/account_notifications/components/TrainerAccountNotificationsNotificationsEmptyState';

import type { TrainerNotificationsListProps } from '@/app/frontend_trainer/trainer_account/account_notifications/types/TrainerAccountNotificationsNotificationsListProps';








/**
 * @description Renders the notification list with keyboard/touch-accessible per-item mark-as-read actions.
 * @dependencies TrainerNotificationsMain → TrainerNotificationsList → TrainerNotificationsEmptyState
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Owns the notifications feature UI responsibility represented by TrainerNotificationsList, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented notifications module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerNotificationsList({
  notifications,
  onMarkAsRead,
  pendingNotificationId,
}: TrainerNotificationsListProps) {
  const t = useTranslations('TRAINER_NOTIFICATIONS');
  if (notifications.length === 0) {
    return <TrainerNotificationsEmptyState />;
  }

  return (
    <div className="divide-y divide-border">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`p-4 md:px-6 flex items-start justify-between group motion-safe:transition-colors ${
            n.unread ? 'bg-primary-subtle hover:bg-surface-hover' : 'bg-card hover:bg-input'
          }`}
        >
          <div className="flex min-w-0 flex-1 items-start gap-4">
            <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${n.unread ? 'bg-primary-subtle' : 'bg-transparent'}`} />
            <div>
              <p className={`text-sm md:text-base ${n.unread ? 'text-primary font-medium' : 'text-secondary'}`}>
                {n.text}
              </p>
              <span className="text-xs text-secondary mt-1 block">{n.time}</span>
            </div>
            </div>
          {n.unread && (
            <button
              type="button"
              onClick={() => onMarkAsRead(n.id)}
              disabled={pendingNotificationId != null}
              aria-label={t("TEXT_MARK_NOTIFICATION_AS_READ")}
              title={t("TEXT_MARK_AS_READ")}
              className="min-w-11 min-h-11 ms-4 shrink-0 rounded-lg p-2 text-secondary hover:bg-input hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-colors motion-safe:duration-base motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95"
             data-testid={`trainer_notifications-notifications_list-mark_notification_as_read_${n.id}`}>
              {pendingNotificationId === n.id ? <Loader2 size={18} className="motion-safe:animate-spin" strokeWidth={2} aria-hidden="true" /> : <Check size={18} strokeWidth={2} aria-hidden="true" />}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
