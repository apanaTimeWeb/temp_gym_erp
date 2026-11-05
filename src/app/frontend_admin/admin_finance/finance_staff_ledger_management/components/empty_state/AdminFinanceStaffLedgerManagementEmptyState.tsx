// RESPONSIBILITY: Renders reusable empty states for Admin Finance data sections.
// DATA FLOW: feature data/state and user input → AdminFinanceStaffLedgerManagementEmptyState → accessible UI/events routed to owning hooks (admin_finance/finance_staff_ledger_management/components/empty_state/AdminFinanceStaffLedgerManagementEmptyState.tsx)

import { Users } from 'lucide-react';

import type { AdminFinanceStaffLedgerManagementEmptyStateProps } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/types/AdminFinanceStaffLedgerManagementEmptyStatePropsTypes';


/**
 * AdminFinanceStaffLedgerManagementEmptyState renders the Finance StaffLedgerManagement empty state UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinanceStaffLedgerManagementEmptyState: Renders reusable empty states for Admin Finance data sections.
 * @dependencies Consumes AdminFinanceStaffLedgerManagementEmptyStatePropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinanceStaffLedgerManagementEmptyState({ title, description }: AdminFinanceStaffLedgerManagementEmptyStateProps) {
  return <div className="flex flex-col items-center justify-center gap-2 py-12 text-center" data-testid="admin_hr-admin_hr-empty-state-state">
    <Users size={18} aria-hidden="true" className="text-secondary"  strokeWidth={2}/>
    <h3 className="text-base font-semibold text-primary">{title}</h3>
    <p className="text-sm text-secondary">{description}</p>
  </div>;
}
