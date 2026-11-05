// RESPONSIBILITY: Renders reusable empty states for Admin payouts data tables.
// DATA FLOW: feature data/state and user input → AdminFinancePayoutsManagementEmptyState → accessible UI/events routed to owning hooks (admin_finance/finance_payouts_management/components/empty_state/AdminFinancePayoutsManagementEmptyState.tsx)

import { WalletCards } from 'lucide-react';

import type { AdminPayoutsEmptyStateProps } from '@/app/frontend_admin/admin_finance/finance_payouts_management/types/AdminFinancePayoutsManagementEmptyStatePropsTypes';


/**
 * AdminFinancePayoutsManagementEmptyState renders the admin payouts empty state UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinancePayoutsManagementEmptyState: Renders reusable empty states for Admin payouts data tables.
 * @dependencies Consumes AdminPayoutsEmptyStatePropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinancePayoutsManagementEmptyState({ title, description }: AdminPayoutsEmptyStateProps) {
  return <div className="flex flex-col items-center justify-center gap-2 py-12 text-center" data-testid="admin_payouts-admin_payouts-empty-state-state">
    <WalletCards size={18} aria-hidden="true" className="text-secondary"  strokeWidth={2}/>
    <h3 className="text-base font-semibold text-primary">{title}</h3>
    <p className="text-sm text-secondary">{description}</p>
  </div>;
}
