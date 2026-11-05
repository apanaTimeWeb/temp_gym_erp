// RESPONSIBILITY: Server Component entry point for the scope-blocked Admin Data Export route.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_data_export/data_export_requests/page.tsx)

import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AdminDataExportMain from '@/app/frontend_admin/admin_data_export/data_export_requests/components/main_view/AdminDataExportRequestsMain';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('data-export.metadata');
  return { title: t('title'), description: t('description') };
}

/** AdminDataExportPage owns route metadata and module layout assembly only. */
export default function AdminDataExportPage() {
  return <AdminDataExportMain />;
}
