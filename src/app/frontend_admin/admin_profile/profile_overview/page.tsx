// RESPONSIBILITY: Server Component entry point for /admin/profile. Rule 8 compliant — no .
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_profile/profile_overview/page.tsx)

import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AdminProfileMain from '@/app/frontend_admin/admin_profile/profile_overview/components/main_view/AdminProfileOverviewMain';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('profile.metadata');
  return { title: t('title'), description: t('description') };
}

/**
 * AdminProfilePage renders the admin profile page UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminProfilePage() {
  return (
      <AdminProfileMain />
  );
}
