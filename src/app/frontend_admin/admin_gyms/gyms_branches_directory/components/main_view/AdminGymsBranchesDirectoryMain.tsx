"use client";
// RESPONSIBILITY: Client orchestrator for the branches module.
// DATA FLOW: feature data/state and user input → AdminGymsBranchesDirectoryMain → accessible UI/events routed to owning hooks (admin_branches/branches_directory/components/main_view/AdminGymsBranchesDirectoryMain.tsx)

import AdminBranchesToolbar from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/components/toolbar/AdminGymsBranchesDirectoryToolbar';
import AdminBranchesCard from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/components/card/AdminGymsBranchesDirectoryCard';
import AdminBranchesDetailDrawer from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/components/detail_drawer/AdminGymsBranchesDirectoryDetailDrawer';

/**
 * AdminGymsBranchesDirectoryMain renders the admin branches main UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminGymsBranchesDirectoryMain: Client orchestrator for the branches module.
 * @dependencies Consumes AdminBranchesToolbar, AdminBranchesCard, AdminBranchesDetailDrawer.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminGymsBranchesDirectoryMain() {
  return (
    <div className="min-h-full pb-10">
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        <AdminBranchesToolbar />
        <AdminBranchesCard />
      </div>
      <AdminBranchesDetailDrawer />
    </div>
  );
}
