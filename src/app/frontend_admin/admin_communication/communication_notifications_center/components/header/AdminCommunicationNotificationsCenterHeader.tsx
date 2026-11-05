"use client";
// RESPONSIBILITY: Renders/orchestrates AdminNotificationsHeader for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
// DATA FLOW: feature data/state and user input → AdminCommunicationNotificationsCenterHeader → accessible UI/events routed to owning hooks (admin_communication/communication_notifications_center/components/header/AdminCommunicationNotificationsCenterHeader.tsx)

import { useTranslations } from 'next-intl';
import { Bell, X } from 'lucide-react';
import { useRef } from 'react';
import Link from 'next/link';
import { useAdminNotificationsPage } from '@/app/frontend_admin/admin_communication/communication_notifications_center/hooks/useAdminCommunicationNotificationsCenterPage';
import { ADMIN_NOTIFICATIONS_ROUTES } from '@/app/frontend_admin/admin_communication/communication_notifications_center/config/admin_communication_notifications_center.url_config';
import { useAdminNotificationsHeader } from '@/app/frontend_admin/admin_communication/communication_notifications_center/hooks/useAdminCommunicationNotificationsCenterHeader';

/**
 * AdminCommunicationNotificationsCenterHeader renders the admin notifications header UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminCommunicationNotificationsCenterHeader: Renders/orchestrates AdminNotificationsHeader for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
 * @dependencies Consumes useAdminNotificationsPage, admin_notifications_url_config.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export function AdminCommunicationNotificationsCenterHeader() {
  const t = useTranslations();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const { showNotifications, setShowNotifications, notifRef } = useAdminNotificationsHeader();
  const { notifications, markAsRead } = useAdminNotificationsPage();



  return (
    <div className="relative" ref={notifRef} onKeyDown={(event) => { if (event.key === 'Escape' && showNotifications) { event.preventDefault(); setShowNotifications(false); triggerRef.current?.focus(); } }}>
      <button type="button"
        ref={triggerRef}
        onClick={() => setShowNotifications(!showNotifications)}
        className="min-h-11 min-w-11 relative p-2 text-secondary hover:text-primary hover:bg-input rounded-lg motion-safe:transition-colors border border-transparent hover:border-border motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95"
        aria-label={t('notifications.admin_notifications_header.text_753a22b2eb')}
        aria-expanded={showNotifications} aria-controls="admin-notifications-popover"
       data-testid="admin_notifications-admin_notifications-header-control">
        <Bell size={18} strokeWidth={2} />
        {notifications.some((n) => n.unread) && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary text-on-primary"  data-testid="notifications-center-notifications-center-header-status-badge"/>
        )}
      </button>
      {showNotifications && (
        <div id="admin-notifications-popover" role="region" aria-label={t('notifications.admin_notifications_header.text_753a22b2eb')} className="absolute right-0 mt-2 w-80 bg-popover rounded-xl shadow-popover border border-border overflow-hidden z-30">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h3 className="font-semibold text-primary text-sm">{t('notifications.admin_notifications_header.text_753a22b2eb')}</h3>
            <button type="button" onClick={() => { setShowNotifications(false); triggerRef.current?.focus(); }} className="min-h-11 min-w-11 motion-safe:transition-all motion-safe:duration-base ease-in-out text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" aria-label={t('notifications.admin_notifications_header.text_f0252bf7d6')} data-testid="admin_notifications-admin_notifications-header-control-2"><X size={18}  strokeWidth={2}/></button>
          </div>
          <div className="max-h-72 overflow-y-auto" aria-live="polite" data-testid="notifications-center-notifications-center-header-live-region-2">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-sm text-secondary">{t('notifications.admin_notifications_header.text_6631dc85a2')}</div>
            ) : notifications.map((n , __testIdIndex55) => (
              <button type="button" key={n.id} onClick={() => n.unread && markAsRead(n.id)} className={`motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page w-full text-left px-4 py-3 border-b border-border hover:bg-input motion-safe:transition-colors cursor-pointer relative group ${n.unread ? 'bg-primary-subtle' : ''}`} data-testid={`admin_notifications-admin_notifications-header-control-3-map55-${__testIdIndex55}-1`}>
                <p className={`text-sm pr-6 ${n.unread ? 'text-primary font-medium' : 'text-secondary'}`}>{n.text}</p><span className="sr-only">{n.unread ? t('notifications.AdminRepair.unread') : t('notifications.AdminRepair.read')}</span>
                <span className="text-xs text-secondary mt-1 block">{n.time}</span>
              </button>
            ))}
          </div>
          <div className="p-3 text-center border-t border-border">
            <Link href={ADMIN_NOTIFICATIONS_ROUTES.root} onClick={() => setShowNotifications(false)} className="inline-flex min-h-11 min-w-11 items-center justify-center text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="admin_notifications-admin_notifications-header-control-4">
              {t('notifications.admin_notifications_header.text_382194f7b8')}</Link>
          </div>
        </div>
      )}
    </div>
  );
}
