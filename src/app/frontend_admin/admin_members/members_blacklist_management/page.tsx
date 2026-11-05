// RESPONSIBILITY: Renders/orchestrates page for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_blacklist/blacklist_management/page.tsx)

import AdminBlacklistMain from '@/app/frontend_admin/admin_members/members_blacklist_management/components/main_view/AdminMembersBlacklistManagementMain';
/**
 * BlacklistPage is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export default function BlacklistPage() { return (
      <AdminBlacklistMain />
  ); }
