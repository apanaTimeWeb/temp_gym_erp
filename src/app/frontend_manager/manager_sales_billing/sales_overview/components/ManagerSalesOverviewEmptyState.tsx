// RESPONSIBILITY: Renders ManagerSalesOverviewEmptyState's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
import { IndianRupee } from 'lucide-react';

import type { ManagerSalesOverviewEmptyStateProps } from '@/app/frontend_manager/manager_sales_billing/sales_overview/types/manager_sales_overview_empty_state.types';




/** @description Renders the empty state UI for Sales module lists. Receives a message and optional subtext via props. No API calls. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves empty state. */
export default function ManagerSalesOverviewEmptyState({ message, subtext }: ManagerSalesOverviewEmptyStateProps) {
  return (
    <div data-testid="manager_sales-sales-empty-state" className="flex flex-col items-center justify-center py-12 text-center border border-border rounded-xl bg-card motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
      <div className="w-12 h-12 rounded-full bg-primary-subtle flex items-center justify-center mb-3">
        <IndianRupee size={18} strokeWidth={2} className="text-primary"/>
      </div>
      <p className="text-base font-medium text-text-secondary">{message}</p>
      {subtext && <p className="text-sm text-text-secondary mt-1 opacity-70">{subtext}</p>}
    </div>
  );
}
