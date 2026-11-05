// RESPONSIBILITY: Server component page for Admin Members. Passes no initial data (client-side fetch via hook).
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_members/members_directory/page.tsx)

import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AdminMembersMain from '@/app/frontend_admin/admin_members/members_directory/components/main_view/AdminMembersDirectoryMain';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('members.metadata');
  return { title: t('title'), description: t('description') };
}

/**
 * AdminMembersPage renders the admin members page UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminMembersPage() {
  return (
      <AdminMembersMain />
  );
}
