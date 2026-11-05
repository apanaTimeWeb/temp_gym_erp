// RESPONSIBILITY: Notifications are a deep-linkable workflow with local query/mutation state.
"use client";
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { SuperadminCommunicationNotificationsList } from '@/app/frontend_superadmin/superadmin_communication/communication_notifications/components/SuperadminCommunicationNotificationsList';
import { useSuperadminCommunicationNotifications } from '@/app/frontend_superadmin/superadmin_communication/communication_notifications/hooks/useSuperadminCommunicationNotifications';


/** Notifications are a deep-linkable workflow with local query/mutation state. */
export default function SuperadminCommunicationNotificationsMain() {
 const t=useTranslations('superadmin_communication_notifications');
 const data=useSuperadminCommunicationNotifications();
 const handleMarkRead=async(id:string)=>{ try { await data.markRead(id); toast.success(t('ui.notification_marked_read'),{id:`notification-read-${id}`}); } catch { toast.error(t('ui.action_failed_retry'),{id:`notification-read-failed-${id}`}); } };
 const handleMarkAllRead=async()=>{ try { await data.markAllRead(); toast.success(t('ui.notifications_marked_read'),{id:'notifications-read-all'}); } catch { toast.error(t('ui.action_failed_retry'),{id:'notifications-read-all-failed'}); }};
 return <section className="space-y-6" data-testid="superadmin-communication-notifications-page">
   <header className="flex flex-wrap items-center justify-between gap-4"><div><h1 className="superadmin-page-title text-primary">{t('ui.notifications')}</h1><p className="text-sm text-secondary">{t('ui.notifications')}</p></div>
   {data.unreadCount>0 && <button type="button" onClick={()=>{void handleMarkAllRead();}} disabled={data.isMarkingAllRead} className="min-h-11 rounded-lg bg-primary px-4 py-2 font-semibold text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60">{data.isMarkingAllRead?t('ui.marking'):t('ui.mark_all_read_fcd6b91')}</button>}</header>
   {(() => { if (data.isPending) { return (<div role="status" aria-busy="true" className="min-h-32 rounded-xl border border-border bg-card p-6 motion-safe:animate-pulse">{t('ui.loading_notifications')}</div>); } if (data.isError) { return (<div role="alert" className="rounded-xl border border-border bg-danger-bg p-6 text-danger"><p>{t('ui.notifications_could_not_be_loaded')}</p><button type="button" className="mt-3 min-h-11 rounded-md bg-primary px-4 py-2 text-on-primary" onClick={()=>void data.refetch()}>{t('ui.retry_88c6aec')}</button></div>); } return (<SuperadminCommunicationNotificationsList notifications={data.notifications} handleMarkRead={handleMarkRead} isMarkingRead={data.isMarkingRead}/>); })()}
 </section>;
}
