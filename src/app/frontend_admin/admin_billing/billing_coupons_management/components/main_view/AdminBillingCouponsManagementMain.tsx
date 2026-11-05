"use client";
// RESPONSIBILITY: Main entry point for the Coupons module. Composes KPIs, toolbar, table, and modal.
// DATA FLOW: feature data/state and user input → AdminBillingCouponsManagementMain → accessible UI/events routed to owning hooks (admin_coupons/coupons_management/components/main_view/AdminBillingCouponsManagementMain.tsx)

import AdminCouponsKPIs from '@/app/frontend_admin/admin_billing/billing_coupons_management/components/kpis/AdminBillingCouponsManagementKPIs';
import AdminCouponsToolbar from '@/app/frontend_admin/admin_billing/billing_coupons_management/components/toolbar/AdminBillingCouponsManagementToolbar';
import AdminCouponsTable from '@/app/frontend_admin/admin_billing/billing_coupons_management/components/table/AdminBillingCouponsManagementTable';
import AdminCouponsModal from '@/app/frontend_admin/admin_billing/billing_coupons_management/components/modal/AdminBillingCouponsManagementModal';

/**
 * AdminBillingCouponsManagementMain renders the admin coupons main UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminBillingCouponsManagementMain: Main entry point for the Coupons module. Composes KPIs, toolbar, table, and modal.
 * @dependencies Consumes AdminCouponsKPIs, AdminCouponsToolbar, AdminCouponsTable, AdminCouponsModal.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminBillingCouponsManagementMain() {
  return (
    <div className="min-h-full pb-10">
      <div className="p-6 space-y-5">
        <AdminCouponsKPIs />
        <AdminCouponsToolbar />
        <AdminCouponsTable />
      </div>
      <AdminCouponsModal />
    </div>
  );
}
