// RESPONSIBILITY: Renders metadata for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_communication/communication_whatsapp_campaigns/page.tsx)

import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AdminCampaignsMain from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/components/main_view/AdminCommunicationWhatsAppCampaignsManagementMain';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('campaigns.metadata');
  return { title: t('title'), description: t('description') };
}

/**
 * AdminCampaignsPage renders the admin campaigns page UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminCampaignsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <AdminCampaignsMain />
    </div>
  );
}
