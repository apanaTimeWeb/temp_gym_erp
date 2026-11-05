// RESPONSIBILITY: Renders the Campaigns module not-found state and routes recovery through the shared admin shell.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_communication/communication_whatsapp_campaigns/not-found.tsx)

import AdminNavigationLayoutNotFound from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/components/shell/AdminCommunicationWhatsappCampaignsNotFound';

/**
 * AdminCampaignsNotFound renders the admin campaigns not found UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminCampaignsNotFound() {
  return <AdminNavigationLayoutNotFound />;
}
