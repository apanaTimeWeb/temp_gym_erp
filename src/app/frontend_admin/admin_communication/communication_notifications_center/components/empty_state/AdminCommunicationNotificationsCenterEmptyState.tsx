"use client";
// RESPONSIBILITY: Presents the feature-owned no-notification terminal state for the Admin Notifications module.
// DATA FLOW: feature data/state and user input → AdminCommunicationNotificationsCenterEmptyState → accessible UI/events routed to owning hooks (admin_communication/communication_notifications_center/components/empty_state/AdminCommunicationNotificationsCenterEmptyState.tsx)

import { useTranslations } from 'next-intl';
import { Bell } from 'lucide-react';
/**
 * AdminCommunicationNotificationsCenterEmptyState renders the admin notifications empty state UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminCommunicationNotificationsCenterEmptyState: Presents the feature-owned no-notification terminal state for the Admin Notifications module.
 * @dependencies Consumes the owning feature contract.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminCommunicationNotificationsCenterEmptyState() {
  const t = useTranslations();
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center" role="status" data-testid="admin_notifications-admin_notifications-empty-state-state">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-input">
        <Bell size={18} className="text-secondary" aria-hidden="true"  strokeWidth={2}/>
      </div>
      <h3 className="text-lg font-medium text-primary">{t('notifications.admin_notifications_empty_state.remaining_caughtUp')}</h3>
      <p className="mt-1 text-sm text-secondary">{t('notifications.admin_notifications_empty_state.text_none')}</p>
    </div>
  );
}
