// RESPONSIBILITY: Renders AdminCampaignsLoading for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_communication/communication_whatsapp_campaigns/loading.tsx)

import AdminNavigationLayoutTableSkeleton from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/components/AdminCommunicationWhatsappCampaignsTableSkeleton';

/**
 * AdminCampaignsLoading renders the admin campaigns loading UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminCampaignsLoading() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8" data-testid="admin_campaigns-loading-state">
      <div className="h-7 w-56 rounded bg-skeleton-base motion-safe:animate-pulse" />
      <div className="h-4 w-72 rounded bg-skeleton-base motion-safe:animate-pulse" />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="h-36 rounded-xl bg-skeleton-base motion-safe:animate-pulse" />
        <div className="h-36 rounded-xl bg-skeleton-base motion-safe:animate-pulse" />
        <div className="h-36 rounded-xl bg-skeleton-base motion-safe:animate-pulse" />
      </div>
      <AdminNavigationLayoutTableSkeleton />
    </div>
  );
}
