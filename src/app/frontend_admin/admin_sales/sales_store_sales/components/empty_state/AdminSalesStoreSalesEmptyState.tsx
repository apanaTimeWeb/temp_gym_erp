"use client";
// RESPONSIBILITY: Renders the empty state UI for Sales module lists. Receives a message and optional subtext via props. No API calls.
// DATA FLOW: feature data/state and user input → AdminSalesAnalyticsEmptyState → accessible UI/events routed to owning hooks (admin_sales/sales_store_sales/components/empty_state/AdminSalesAnalyticsEmptyState.tsx)

import { IndianRupee } from 'lucide-react';

import type { AdminSalesEmptyStateProps } from '@/app/frontend_admin/admin_sales/sales_store_sales/types/AdminSalesStoreSalesEmptyStatePropsTypes';


/**
 * AdminSalesAnalyticsEmptyState renders the admin sales empty state UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSalesAnalyticsEmptyState: Renders the empty state UI for Sales module lists. Receives a message and optional subtext via props. No API calls.
 * @dependencies Consumes AdminSalesEmptyStatePropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminSalesAnalyticsEmptyState({ message, subtext }: AdminSalesEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center border border-border rounded-xl bg-card" data-testid="admin_sales-admin_sales-empty-state-state">
      <div className="w-12 h-12 rounded-full bg-primary-subtle flex items-center justify-center mb-3">
        <IndianRupee size={18} className="text-primary"  strokeWidth={2}/>
      </div>
      <p className="text-base font-medium text-secondary">{message}</p>
      {subtext && <p className="text-sm text-secondary mt-1 opacity-70">{subtext}</p>}
    </div>
  );
}
