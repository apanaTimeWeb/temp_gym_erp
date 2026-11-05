"use client";
// RESPONSIBILITY: Owns the notifications page interaction surface: mark-read, mark-all-read, pagination, and error presentation.
import { Loader2 } from 'lucide-react';

import { useTranslations } from 'next-intl';

import TrainerNotificationsList from '@/app/frontend_trainer/trainer_account/account_notifications/components/TrainerAccountNotificationsNotificationsList';

import { useTrainerNotificationsLogic } from '@/app/frontend_trainer/trainer_account/account_notifications/hooks/useTrainerAccountNotificationsNotificationsLogic';






/**
 * @description Owns the notifications page interaction surface: mark-read, mark-all-read, pagination, and error presentation.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Owns the notifications feature UI responsibility represented by TrainerNotificationsContent, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented notifications module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerNotificationsContent() {
  const t = useTranslations('TRAINER_NOTIFICATIONS');
  const {
    notifications,
    unreadCount,
    isPending,
    isError,
    hasMore,
    loadingMore,
    loadMore,
    retry,
    retryPending,
    markAllAsRead,
    markAsRead,
    isOnline,
    offlineMessage,
    markAsReadPendingId,
    markAllAsReadPending,
  } = useTrainerNotificationsLogic();

  return (
    <div className="min-h-full pb-10">
      <div className="p-4 sm:p-6 max-w-4xl mx-auto w-full">
        <div className="flex items-center justify-between mb-4 mt-2 gap-4">
          <div>
            <h2 className="text-section-title font-bold text-primary" data-testid="trainer_notifications-notifications-content_recent_activity">{t("TEXT_RECENT_ACTIVITY")}</h2>
            <p className="text-sm text-secondary mt-0.5">
              {isPending
                ? t("TEXT_LOADING_NOTIFICATIONS")
                : unreadCount > 0
                  ? t(unreadCount === 1 ? 'TEXT_UNREAD_COUNT_ONE' : 'TEXT_UNREAD_COUNT_MANY', { count: unreadCount })
                  : t("TEXT_ALL_CAUGHT_UP")}
            </p>
          </div>
          {notifications.length > 0 && (
            <button
              type="button"
              onClick={markAllAsRead}
              disabled={markAllAsReadPending}
              className="min-h-11 min-w-36 inline-flex items-center justify-center gap-2 px-3 text-sm font-medium text-primary hover:underline motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded-md motion-safe:ease-in-out motion-safe:active:scale-95"
             data-testid="trainer_notifications-notifications-content_mark_all_as_read">
              {markAllAsReadPending ? <><Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" strokeWidth={2} /> {t("TEXT_MARKING_ALL_AS_READ")}</> : t("TEXT_MARK_ALL_AS_READ")}
            </button>
          )}
        </div>

        {!isOnline && (
          <div role="status" className="bg-warning-bg text-warning text-sm rounded-xl px-4 py-3 mb-4" data-testid="trainer_notifications-notifications-content_offline">
            {offlineMessage}
          </div>
        )}

        {isError && (
          <div role="alert" className="bg-danger-bg text-danger text-sm rounded-xl px-4 py-3 mb-4" data-testid="trainer_notifications-notifications-content_error">
            <p>{t('TEXT_FAILED_TO_LOAD_NOTIFICATIONS_PLEASE_REFRESH')}</p>
            <button type="button" onClick={retry} disabled={retryPending} className="mt-3 min-h-11 min-w-24 inline-flex items-center justify-center gap-2 px-4 rounded-lg bg-danger text-on-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_notifications-trainernotificationscontent-button_2">
              {retryPending ? <><Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" strokeWidth={2} /> {t('TEXT_RETRYING')}</> : t('TEXT_RETRY')}
            </button>
          </div>
        )}

        {isPending ? (
          <div className="bg-card border border-border rounded-xl shadow-card p-8 flex items-center justify-center gap-3 text-secondary" role="status" aria-live="polite" aria-busy="true" data-testid="trainer_notifications-notifications-content_loading">
            <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" />
            {t('TEXT_LOADING_NOTIFICATIONS')}
          </div>
        ) : (!isError || notifications.length > 0) ? (
          <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
            <TrainerNotificationsList notifications={notifications} onMarkAsRead={markAsRead} pendingNotificationId={markAsReadPendingId}/>
          </div>
        ) : null}

        {hasMore && notifications.length > 0 && (
          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={loadMore}
              disabled={loadingMore}
              className="min-h-11 flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-primary bg-card border border-border rounded-xl hover:bg-input motion-safe:transition-colors disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
             data-testid="trainer_notifications-trainernotificationscontent-button_4">
              {loadingMore ? (
                <><Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true"  strokeWidth={2}/> {t("TEXT_LOADING")}</>
              ) : (
                t('TEXT_LOAD_MORE')
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
