// RESPONSIBILITY: Renders the loading fallback for the notifications module.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_communication/communication_notifications_center/loading.tsx)

import AdminNavigationLayoutTableSkeleton from '@/app/frontend_admin/admin_communication/communication_notifications_center/components/AdminCommunicationNotificationsCenterTableSkeleton';

/**
 * AdminNotificationsLoading renders the admin notifications loading UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminNotificationsLoading() {
  return (
    <div className="p-6 space-y-6" data-testid="admin_notifications-loading-state">
      <div className="h-10 w-48 bg-skeleton-base rounded-lg border border-border motion-safe:animate-pulse motion-safe:duration-base" />
      <div className="h-10 w-1/3 bg-skeleton-base rounded-lg border border-border motion-safe:animate-pulse motion-safe:duration-base" />
      <AdminNavigationLayoutTableSkeleton rows={8} />
    </div>
  );
}
