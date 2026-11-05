"use client";
// RESPONSIBILITY: Renders the empty state for an Admin subscriptions data section.
// DATA FLOW: feature data/state and user input → AdminSubscriptionsManagementEmptyState → accessible UI/events routed to owning hooks (admin_subscriptions/subscriptions_overview/components/empty_state/AdminSubscriptionsManagementEmptyState.tsx)

import { FileText } from 'lucide-react';

import type { AdminSubscriptionsEmptyStateProps } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/types/AdminBillingSubscriptionsOverviewEmptyStatePropsTypes';


/**
 * AdminSubscriptionsManagementEmptyState renders the admin subscriptions empty state UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSubscriptionsManagementEmptyState: Renders the empty state for an Admin subscriptions data section.
 * @dependencies Consumes AdminSubscriptionsEmptyStatePropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export function AdminSubscriptionsManagementEmptyState({ title, description }: AdminSubscriptionsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-12 text-center" data-testid="admin_subscriptions-admin_subscriptions-empty-state-state">
      <FileText size={18} aria-hidden="true" className="text-secondary"  strokeWidth={2}/>
      <h3 className="text-base font-semibold text-primary">{title}</h3>
      <p className="text-sm text-secondary">{description}</p>
    </div>
  );
}
