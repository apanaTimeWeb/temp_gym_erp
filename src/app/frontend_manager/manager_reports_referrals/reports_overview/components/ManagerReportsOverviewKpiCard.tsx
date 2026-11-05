// RESPONSIBILITY: Renders ManagerReportsOverviewKpiCard's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
import type { ManagerReportsOverviewKpiCardProps } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/types/manager_reports_overview_kpi_card.types';

/** @description Renders the ManagerReportsOverviewKpiCard sub-view extracted from ManagerReportsOverviewKPIs; owns only this presentation responsibility. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export function ManagerReportsOverviewKpiCard({ label, value, icon: Icon, iconBg, iconColor, sub, subColor }: ManagerReportsOverviewKpiCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4 motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:-translate-y-1 hover:shadow-card">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconBg} ${iconColor}`}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs font-medium text-text-secondary uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-text-primary mt-0.5">{value}</p>
        {sub && <p className={`text-xs mt-0.5 ${subColor ?? 'text-text-secondary'}`}>{sub}</p>}
      </div>
    </div>
  );
}
