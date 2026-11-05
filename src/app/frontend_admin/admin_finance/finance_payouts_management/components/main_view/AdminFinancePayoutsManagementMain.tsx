"use client";
// RESPONSIBILITY: Main entry point for the Payouts module.
// DATA FLOW: feature data/state and user input → AdminFinancePayoutsManagementMain → accessible UI/events routed to owning hooks (admin_finance/finance_payouts_management/components/main_view/AdminFinancePayoutsManagementMain.tsx)

import AdminPayoutsKPIs from '@/app/frontend_admin/admin_finance/finance_payouts_management/components/kpis/AdminFinancePayoutsManagementKPIs';
import AdminPayoutsTabs from '@/app/frontend_admin/admin_finance/finance_payouts_management/components/tabs/AdminFinancePayoutsManagementTabs';
import AdminPayoutsSummaryTable from '@/app/frontend_admin/admin_finance/finance_payouts_management/components/summary_table/AdminFinancePayoutsManagementSummaryTable';
import AdminPayoutsPnLStatement from '@/app/frontend_admin/admin_finance/finance_payouts_management/components/pnl_statement/AdminFinancePayoutsManagementPnLStatement';
import { PAYOUT_TAB_OPTIONS } from '@/app/frontend_admin/admin_finance/finance_payouts_management/constants/AdminFinancePayoutsManagementConstants';
import { useAdminPayoutsLogic } from '@/app/frontend_admin/admin_finance/finance_payouts_management/hooks/useAdminFinancePayoutsManagementLogic';

/**
 * AdminFinancePayoutsManagementMain renders the admin payouts main UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinancePayoutsManagementMain: Main entry point for the Payouts module.
 * @dependencies Consumes AdminPayoutsKPIs, AdminPayoutsTabs, AdminPayoutsSummaryTable, AdminPayoutsPnLStatement, useAdminPayoutsLogic.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinancePayoutsManagementMain() {
  const { activeTab } = useAdminPayoutsLogic();
  return (
    <div className="min-h-full pb-10">
      <div className="p-6 space-y-5">
        <AdminPayoutsKPIs />
        <AdminPayoutsTabs />
        {activeTab === PAYOUT_TAB_OPTIONS[0].id ? <AdminPayoutsSummaryTable /> : <AdminPayoutsPnLStatement />}
      </div>
    </div>
  );
}
