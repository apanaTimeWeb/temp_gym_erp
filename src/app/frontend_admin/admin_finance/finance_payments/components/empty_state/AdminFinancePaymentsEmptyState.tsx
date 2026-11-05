// RESPONSIBILITY: Renders a reusable empty state for Admin finance data tables.
// DATA FLOW: feature data/state and user input → AdminFinanceOverviewEmptyState → accessible UI/events routed to owning hooks (admin_finance/finance_payments/components/empty_state/AdminFinanceOverviewEmptyState.tsx)

import { ReceiptText } from 'lucide-react';

import type { AdminFinanceEmptyStateProps } from '@/app/frontend_admin/admin_finance/finance_payments/types/AdminFinancePaymentsEmptyStatePropsTypes';


/**
 * AdminFinanceOverviewEmptyState renders the admin finance empty state UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinanceOverviewEmptyState: Renders a reusable empty state for Admin finance data tables.
 * @dependencies Consumes AdminFinanceEmptyStatePropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinanceOverviewEmptyState({ title, description }: AdminFinanceEmptyStateProps) {
  return <div className="flex flex-col items-center justify-center gap-2 py-12 text-center" data-testid="admin_finance-admin_finance-empty-state-state">
    <ReceiptText size={18} aria-hidden="true" className="text-secondary"  strokeWidth={2}/>
    <h3 className="text-base font-semibold text-primary">{title}</h3>
    <p className="text-sm text-secondary">{description}</p>
  </div>;
}
