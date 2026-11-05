// RESPONSIBILITY: Server Component entry point for /admin/notifications.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_communication/communication_notifications_center/page.tsx)

import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AdminNotificationsMain from '@/app/frontend_admin/admin_communication/communication_notifications_center/components/main_view/AdminCommunicationNotificationsCenterMain';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('notifications.metadata');
  return { title: t('title'), description: t('description') };
}

/**
 * AdminNotificationsPage owns only route metadata and module layout assembly.
 */
export default function AdminNotificationsPage() {
  return <AdminNotificationsMain />;
}
