"use client";
// RESPONSIBILITY: Main entry point for Admin Members module. Composes KPIs, toolbar, table, and profile drawer.
// DATA FLOW: feature data/state and user input → AdminMembersDirectoryMain → accessible UI/events routed to owning hooks (admin_members/members_directory/components/main_view/AdminMembersDirectoryMain.tsx)

import AdminMembersKPIs from '@/app/frontend_admin/admin_members/members_directory/components/kpis/AdminMembersDirectoryKPIs';
import AdminMembersToolbar from '@/app/frontend_admin/admin_members/members_directory/components/toolbar/AdminMembersDirectoryToolbar';
import AdminMembersTable from '@/app/frontend_admin/admin_members/members_directory/components/table/AdminMembersDirectoryTable';
import AdminMembersProfileDrawer from '@/app/frontend_admin/admin_members/members_directory/components/profile_drawer/AdminMembersDirectoryProfileDrawer';
import { useAdminMembersLogic } from '@/app/frontend_admin/admin_members/members_directory/hooks/useAdminMembersDirectoryLogic';
import { useRouter, useSearchParams } from 'next/navigation';
import { ADMIN_MEMBERS_ROUTES } from '@/app/frontend_admin/admin_members/members_directory/config/admin_members_directory.url_config';

/**
 * AdminMembersDirectoryMain renders the admin members main UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminMembersDirectoryMain: Main entry point for Admin Members module. Composes KPIs, toolbar, table, and profile drawer.
 * @dependencies Consumes AdminMembersKPIs, AdminMembersToolbar, AdminMembersTable, AdminMembersProfileDrawer, useAdminMembersLogic.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminMembersDirectoryMain() {
  const { selectedMember, memberId, selectedMemberStatus, selectedMemberError, retrySelectedMember, setSelectedMember } = useAdminMembersLogic();
  const router = useRouter();
  const searchParams = useSearchParams();
  const closeMember = () => {
    const next = new URLSearchParams(searchParams.toString());
    next.delete('memberId');
    router.replace(`${ADMIN_MEMBERS_ROUTES.root}${next.toString() ? `?${next.toString()}` : ''}`, { scroll: false });
    setSelectedMember(null);
  };

  return (
    <div className="min-h-full pb-10 bg-page text-primary">
      <div className="p-6 space-y-5">
        <AdminMembersKPIs />
        <div className="bg-card rounded-xl border border-border p-4 space-y-4">
          <AdminMembersToolbar />
          <AdminMembersTable />
        </div>
      </div>

      {memberId && (
        <AdminMembersProfileDrawer
          member={selectedMember}
          status={selectedMemberStatus}
          error={selectedMemberError}
          onRetry={() => void retrySelectedMember()}
          onClose={closeMember}
        />
      )}
    </div>
  );
}
