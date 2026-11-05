// RESPONSIBILITY: Server Component entry point for /admin/branches. Rule 8 compliant — no , no AdminNavigationLayoutHeader import.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_branches/branches_directory/page.tsx)

import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AdminBranchesMain from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/components/main_view/AdminGymsBranchesDirectoryMain';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('branches.metadata');
  return { title: t('title'), description: t('description') };
}

/**
 * AdminBranchesPage renders the admin branches page UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminBranchesPage() {
  return (
      <AdminBranchesMain />
  );
}
