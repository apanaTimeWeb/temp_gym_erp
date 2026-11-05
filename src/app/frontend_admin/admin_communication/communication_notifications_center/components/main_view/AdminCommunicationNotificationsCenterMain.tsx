"use client";
// RESPONSIBILITY: Route-level orchestrator for the Admin Notifications feature.
// DATA FLOW: feature data/state and user input → AdminCommunicationNotificationsCenterMain → accessible UI/events routed to owning hooks (admin_communication/communication_notifications_center/components/main_view/AdminCommunicationNotificationsCenterMain.tsx)

import AdminNotificationsClient from '@/app/frontend_admin/admin_communication/communication_notifications_center/components/client/AdminCommunicationNotificationsCenterClient';

/**
 * @description Composes the Notifications page surface without owning feature business state or API behavior.
 * @dependencies Depends only on the module-owned Notifications client view.
 * @edge-case Keeps route entry rendering stable while all interactive behavior stays in module hooks/components.
 */
export default function AdminCommunicationNotificationsCenterMain() {
  return (
    <div className="min-h-full pb-10">
      <div className="mx-auto max-w-4xl p-6">
        <AdminNotificationsClient />
      </div>
    </div>
  );
}
