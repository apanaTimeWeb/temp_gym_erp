// RESPONSIBILITY: Renders ManagerReportsOverviewKpiCard's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
import Link from 'next/link';
import type { ManagerReportsOverviewKpiCardProps } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/types/manager_reports_overview_kpi_card.types';

/** @description Renders the ManagerReportsOverviewKpiCard sub-view extracted from ManagerReportsOverviewKPIs; owns only this presentation responsibility. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export function ManagerReportsOverviewKpiCard({ label, value, icon: Icon, iconBg, iconColor, sub, subColor, href }: ManagerReportsOverviewKpiCardProps) {
  const card = (
    <div className={`relative overflow-hidden bg-card dark:bg-gradient-to-br dark:from-[#0E1629] dark:via-[#141B2D] dark:to-[#0C1220] border border-indigo-500/30 dark:border-indigo-500/35 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-card motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:-translate-y-1 ${href ? 'hover:border-primary cursor-pointer' : ''}`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 opacity-80" />
      <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl border border-white/10 flex items-center justify-center shrink-0 ${iconBg} ${iconColor}`}>
        <Icon size={18} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-text-secondary uppercase tracking-wider truncate">{label}</p>
        <p className="text-xl sm:text-2xl font-extrabold tabular-nums text-text-primary mt-0.5 truncate">{value}</p>
        {sub && <p className={`text-xs mt-0.5 truncate ${subColor ?? 'text-text-secondary'}`}>{sub}</p>}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block no-underline rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">
        {card}
      </Link>
    );
  }

  return card;
}
