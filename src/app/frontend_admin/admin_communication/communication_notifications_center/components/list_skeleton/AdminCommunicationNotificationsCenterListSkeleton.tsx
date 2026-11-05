"use client";
// RESPONSIBILITY: Renders the structural loading state for the Admin notification feed.
// DATA FLOW: feature data/state and user input → AdminCommunicationNotificationsCenterListSkeleton → accessible UI/events routed to owning hooks (admin_communication/communication_notifications_center/components/list_skeleton/AdminCommunicationNotificationsCenterListSkeleton.tsx)

import { useTranslations } from 'next-intl';

/**
 * AdminCommunicationNotificationsCenterListSkeleton renders the admin notifications list skeleton UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminCommunicationNotificationsCenterListSkeleton: Renders the structural loading state for the Admin notification feed.
 * @dependencies Consumes the owning feature contract.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminCommunicationNotificationsCenterListSkeleton() {
  const t = useTranslations();

  return (
    <div className="divide-y divide-border" aria-busy="true" aria-label={t('notifications.admin_notifications_list_skeleton.text_dc258532ad')}>
      {[1, 2, 3, 4, 5, 6].map((row) => (
        <div key={`notifications-skeleton-${row}`} className="flex items-start gap-4 p-4 md:px-6">
          <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-skeleton-base motion-safe:animate-pulse motion-safe:duration-base" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded bg-skeleton-base motion-safe:animate-pulse motion-safe:duration-base" />
            <div className="h-3 w-24 rounded bg-skeleton-base motion-safe:animate-pulse motion-safe:duration-base" />
          </div>
        </div>
      ))}
    </div>
  );
}
