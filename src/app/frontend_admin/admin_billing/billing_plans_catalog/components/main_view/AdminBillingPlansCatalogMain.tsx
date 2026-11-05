"use client";
// RESPONSIBILITY: Client entry point for Plans; owns the single query/hook instance and passes its controlled view state to children.
// DATA FLOW: feature data/state and user input → AdminBillingPlansCatalogMain → accessible UI/events routed to owning hooks (admin_plans/plans_catalog/components/main_view/AdminBillingPlansCatalogMain.tsx)

import { useAdminPlansLogic } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/hooks/useAdminBillingPlansCatalogLogic';
import AdminPlansToolbar from '@/app/frontend_admin/admin_billing/billing_plans_catalog/components/toolbar/AdminBillingPlansCatalogToolbar';
import AdminPlansGrid from '@/app/frontend_admin/admin_billing/billing_plans_catalog/components/grid/AdminBillingPlansCatalogGrid';
import AdminPlansModal from '@/app/frontend_admin/admin_billing/billing_plans_catalog/components/modal/AdminBillingPlansCatalogModal';

/**
 * AdminBillingPlansCatalogMain renders the admin plans main UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminBillingPlansCatalogMain: Client entry point for Plans; owns the single query/hook instance and passes its controlled view state to children.
 * @dependencies Consumes useAdminPlansLogic, AdminPlansToolbar, AdminPlansGrid, AdminPlansModal.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminBillingPlansCatalogMain() {
  const logic = useAdminPlansLogic();
  return (
    <div className="min-h-full pb-10">
      <div className="space-y-5 p-6">
        <AdminPlansToolbar logic={logic} />
        <AdminPlansGrid logic={logic} />
      </div>
      <AdminPlansModal logic={logic} />
    </div>
  );
}

