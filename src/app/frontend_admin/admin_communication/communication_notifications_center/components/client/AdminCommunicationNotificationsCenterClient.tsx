"use client";
// RESPONSIBILITY: Orchestrates the notifications list and actions (mark all read, clear all).
// DATA FLOW: feature data/state and user input → AdminCommunicationNotificationsCenterClient → accessible UI/events routed to owning hooks (admin_communication/communication_notifications_center/components/client/AdminCommunicationNotificationsCenterClient.tsx)

import { useTranslations } from 'next-intl';
import { useAdminNotificationsPage } from '@/app/frontend_admin/admin_communication/communication_notifications_center/hooks/useAdminCommunicationNotificationsCenterPage';
import AdminNotificationsList from '@/app/frontend_admin/admin_communication/communication_notifications_center/components/list/AdminCommunicationNotificationsCenterList';
import AdminNotificationsListSkeleton from '@/app/frontend_admin/admin_communication/communication_notifications_center/components/list_skeleton/AdminCommunicationNotificationsCenterListSkeleton';
import { CheckCheck } from 'lucide-react';

/**
 * AdminCommunicationNotificationsCenterClient renders the admin notifications client UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminCommunicationNotificationsCenterClient: Orchestrates the notifications list and actions (mark all read, clear all).
 * @dependencies Consumes useAdminNotificationsPage, AdminNotificationsList, AdminNotificationsListSkeleton.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminCommunicationNotificationsCenterClient() {
  const t = useTranslations();

  const { notifications, status, isError, retry, markAllAsRead, isMarkAllPending, markAsRead } = useAdminNotificationsPage();
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border bg-header">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-primary">{t('notifications.admin_notifications_client.text_215ed57ea0')}</span>
          {unreadCount > 0 && (
            <span className="bg-primary text-on-primary text-xs font-bold px-2 py-0.5 rounded-full" data-testid="notifications-center-notifications-center-client-status-badge">
              {unreadCount} {t('notifications.admin_notifications_client.text_6403f2b7eb')}</span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" 
            onClick={() => void markAllAsRead()}
            disabled={unreadCount === 0 || isMarkAllPending}
            aria-busy={isMarkAllPending}
            className="flex items-center gap-2 text-sm text-secondary hover:text-primary motion-safe:transition-colors motion-safe:duration-base disabled:cursor-not-allowed disabled:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
           data-testid="admin_notifications-admin_notifications-client-control">
            <CheckCheck size={18} aria-hidden="true"  strokeWidth={2}/> {t('notifications.admin_notifications_client.text_8958e22c23')}</button>

        </div>
      </div>
      
      <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {status === 'success' ? t('notifications.AdminRepair.unreadCount', { count: unreadCount }) : ''}
        {isMarkAllPending ? ` ${t('notifications.AdminRepair.markingAll')}` : ''}
      </p>
      {status === 'pending' && <AdminNotificationsListSkeleton />}
      {isError && <div className="flex items-center justify-between gap-4 border-b border-border bg-danger-bg p-6 text-sm text-danger"><span>{t('notifications.admin_notifications_client.text_b75e7880cd')}</span><button type="button" onClick={() => void retry()} className="motion-safe:transition-all motion-safe:duration-base ease-in-out rounded-lg px-3 py-2 font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11 motion-safe:active:scale-95" data-testid="admin_notifications-admin_notifications-client-control-2">{t('notifications.admin_notifications_client.text_9f5cd8a2e8')}</button></div>}
      {status === 'success' && <AdminNotificationsList 
        notifications={notifications} 
        onMarkAsRead={markAsRead}
      />}
    </div>
  );
}
