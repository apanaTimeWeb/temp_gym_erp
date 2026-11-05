// RESPONSIBILITY: Renders reusable empty states for Admin plans data sections.
// DATA FLOW: feature data/state and user input → AdminBillingPlansCatalogEmptyState → accessible UI/events routed to owning hooks (admin_plans/plans_catalog/components/empty_state/AdminBillingPlansCatalogEmptyState.tsx)

import { CreditCard } from 'lucide-react';

import type { AdminPlansEmptyStateProps } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/types/AdminBillingPlansCatalogEmptyStatePropsTypes';


/**
 * AdminBillingPlansCatalogEmptyState renders the admin plans empty state UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminBillingPlansCatalogEmptyState: Renders reusable empty states for Admin plans data sections.
 * @dependencies Consumes AdminPlansEmptyStatePropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminBillingPlansCatalogEmptyState({ title, description }: AdminPlansEmptyStateProps) {
  return <div className="flex flex-col items-center justify-center gap-2 py-12 text-center" data-testid="admin_plans-admin_plans-empty-state-state">
    <CreditCard size={18} aria-hidden="true" className="text-secondary"  strokeWidth={2}/>
    <h3 className="text-base font-semibold text-primary">{title}</h3>
    <p className="text-sm text-secondary">{description}</p>
  </div>;
}
