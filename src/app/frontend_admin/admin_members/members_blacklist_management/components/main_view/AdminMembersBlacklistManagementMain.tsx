"use client";
// RESPONSIBILITY: Main entry point for the Blacklist module.
// DATA FLOW: feature data/state and user input → AdminMembersBlacklistManagementMain → accessible UI/events routed to owning hooks (admin_blacklist/blacklist_management/components/main_view/AdminMembersBlacklistManagementMain.tsx)

import AdminBlacklistKPIs from '@/app/frontend_admin/admin_members/members_blacklist_management/components/kpis/AdminMembersBlacklistManagementKPIs';
import AdminBlacklistToolbar from '@/app/frontend_admin/admin_members/members_blacklist_management/components/toolbar/AdminMembersBlacklistManagementToolbar';
import AdminBlacklistTable from '@/app/frontend_admin/admin_members/members_blacklist_management/components/table/AdminMembersBlacklistManagementTable';
import AdminBlacklistModal from '@/app/frontend_admin/admin_members/members_blacklist_management/components/modal/AdminMembersBlacklistManagementModal';
import AdminBlacklistTabs from '@/app/frontend_admin/admin_members/members_blacklist_management/components/tabs/AdminMembersBlacklistManagementTabs';
import AdminBlacklistCrossGymView from '@/app/frontend_admin/admin_members/members_blacklist_management/components/cross_gym_view/AdminMembersBlacklistManagementCrossGymView';
import { useAdminBlacklistLogic } from '@/app/frontend_admin/admin_members/members_blacklist_management/hooks/useAdminMembersBlacklistManagementLogic';

/**
 * AdminMembersBlacklistManagementMain renders the admin blacklist main UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminMembersBlacklistManagementMain: Main entry point for the Blacklist module.
 * @dependencies Consumes AdminBlacklistKPIs, AdminBlacklistToolbar, AdminBlacklistTable, AdminBlacklistModal, AdminBlacklistTabs.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminMembersBlacklistManagementMain() {
  const { activeTab } = useAdminBlacklistLogic();

  return (
    <div className="min-h-full pb-10">
      <div className="p-6 space-y-5">
        <AdminBlacklistKPIs />
        <AdminBlacklistTabs />
        {activeTab === 'all' ? (
          <>
            <AdminBlacklistToolbar />
            <AdminBlacklistTable />
          </>
        ) : (
          <AdminBlacklistCrossGymView />
        )}
      </div>
      <AdminBlacklistModal />
    </div>
  );
}
