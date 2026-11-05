// RESPONSIBILITY: Renders/orchestrates page for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_communication/communication_notices_and_announcements/page.tsx)

import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AdminAnnouncementsMain from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/components/main_view/AdminCommunicationNoticesAndAnnouncementsMain';
import { AdminNavigationLayoutConfirmProvider as AdminAnnouncementsConfirmProvider } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/components/feedback/AdminCommunicationNoticesAndAnnouncementsConfirmProvider';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('announcements.metadata');
  return { title: t('title'), description: t('description') };
}

/**
 * AdminAnnouncementsPage renders the admin announcements page UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminAnnouncementsPage() {
  return (
      <AdminAnnouncementsConfirmProvider><AdminAnnouncementsMain /></AdminAnnouncementsConfirmProvider>
  );
}
