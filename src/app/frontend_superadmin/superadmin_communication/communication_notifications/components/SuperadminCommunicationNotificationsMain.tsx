// RESPONSIBILITY: Notifications are a deep-linkable workflow with local query/mutation state.
"use client";
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { SuperadminCommunicationNotificationsList } from '@/app/frontend_superadmin/superadmin_communication/communication_notifications/components/SuperadminCommunicationNotificationsList';
import { useSuperadminCommunicationNotifications } from '@/app/frontend_superadmin/superadmin_communication/communication_notifications/hooks/useSuperadminCommunicationNotifications';

export default function SuperadminCommunicationNotificationsMain() {
  const t = useTranslations('superadmin_communication_notifications');
  const data = useSuperadminCommunicationNotifications();
  const handleMarkRead = async (id: string) => {
    try {
      await data.markRead(id);
      toast.success(t('ui.notification_marked_read'), { id: `notification-read-${id}` });
    } catch {
      toast.error(t('ui.action_failed_retry'), { id: `notification-read-failed-${id}` });
    }
  };
  const handleMarkAllRead = async () => {
    try {
      await data.markAllRead();
      toast.success(t('ui.notifications_marked_read'), { id: 'notifications-read-all' });
    } catch {
      toast.error(t('ui.action_failed_retry'), { id: 'notifications-read-all-failed' });
    }
  };

  return (
    <section className="space-y-5" data-testid="superadmin-communication-notifications-page">
      <header className="relative overflow-hidden rounded-2xl border border-sky-500/35 bg-card dark:bg-gradient-to-br dark:from-[#0E2438] dark:via-[#12192B] dark:to-[#0C1322] p-5 sm:p-6 shadow-card flex flex-wrap items-center justify-between gap-4">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#38BDF8] via-[#06B6D4] to-[#FF5A1F]" />
        <div className="min-w-0">
          <h1 className="superadmin-page-title text-primary">{t('ui.notifications')}</h1>
          <p className="text-sm text-secondary mt-1">{t('ui.notifications')}</p>
        </div>
        {data.unreadCount > 0 && (
          <button
            type="button"
            onClick={() => { void handleMarkAllRead(); }}
            disabled={data.isMarkingAllRead}
            className="min-h-10 rounded-xl bg-gradient-to-r from-[#FF5A1F] to-[#F97316] hover:brightness-110 px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(255,90,31,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60 cursor-pointer"
          >
            {data.isMarkingAllRead ? t('ui.marking') : t('ui.mark_all_read_fcd6b91')}
          </button>
        )}
      </header>
      {(() => {
        if (data.isPending) return <div role="status" aria-busy="true" className="min-h-32 rounded-2xl border border-border bg-card p-6 motion-safe:animate-pulse">{t('ui.loading_notifications')}</div>;
        if (data.isError) return <div role="alert" className="rounded-2xl border border-danger/35 bg-danger-bg p-6 text-danger"><p>{t('ui.notifications_could_not_be_loaded')}</p><button type="button" className="mt-3 min-h-10 rounded-xl bg-primary px-4 py-2 text-on-primary cursor-pointer" onClick={() => void data.refetch()}>{t('ui.retry_88c6aec')}</button></div>;
        return <SuperadminCommunicationNotificationsList notifications={data.notifications} handleMarkRead={handleMarkRead} isMarkingRead={data.isMarkingRead} />;
      })()}
    </section>
  );
}
