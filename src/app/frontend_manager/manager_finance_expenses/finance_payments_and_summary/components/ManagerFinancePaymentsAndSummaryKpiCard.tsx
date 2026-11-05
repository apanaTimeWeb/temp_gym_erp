// RESPONSIBILITY: Renders ManagerFinancePaymentsAndSummaryKpiCard's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
import type { ManagerFinancePaymentsAndSummaryKpiCardProps } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/types/manager_finance_payments_and_summary_component_props.types';

/** @description Renders the ManagerFinancePaymentsAndSummaryKpiCard sub-view extracted from ManagerFinancePaymentsAndSummaryKpiCards; owns only this presentation responsibility. @dependencies Local dependencies are owned by this feature module (0 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export function ManagerFinancePaymentsAndSummaryKpiCard({ label, value, icon, color }: ManagerFinancePaymentsAndSummaryKpiCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4 motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:-translate-y-1 hover:shadow-card">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>{icon}</div>
      <div>
        <p className="text-xs font-medium text-text-secondary uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-text-primary mt-0.5">{value}</p>
      </div>
    </div>
  );
}
