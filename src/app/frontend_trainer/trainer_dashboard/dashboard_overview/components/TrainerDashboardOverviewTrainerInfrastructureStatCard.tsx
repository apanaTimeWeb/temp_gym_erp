// AUTONOMOUS COPY: Module-local, WET-isolated copy of original trainer-infrastructure primitive.
// RESPONSIBILITY: Renders a single KPI stat card (icon, label, big number, trend). Used in dashboard and module KPI rows.
import Link from 'next/link';
import type { TrainerInfrastructureStatCardProps } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/types/TrainerDashboardOverviewTrainerInfrastructureStatCardProps';



/**
 * @description Renders a single KPI stat card (icon, label, big number, trend). Used in dashboard and module KPI rows.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders a focused card representation for the infrastructure feature using semantic surfaces and responsive interaction patterns.
 * @dependencies Uses only documented infrastructure module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerInfrastructureStatCard({ title, value, change, changeType = 'neutral', icon: Icon, iconBg, iconColor, href }: TrainerInfrastructureStatCardProps) {
 const card = (
 <div className={`min-w-0 bg-card rounded-2xl p-5 shadow-card border border-border hover:border-focus motion-safe:transition-all motion-safe:duration-base motion-safe:hover:scale-[1.01] ${href ? 'hover:border-primary cursor-pointer' : ''}`}>
 <div className="flex items-start justify-between gap-3">
 <div className="min-w-0 flex-1">
 <p className="text-xs font-semibold text-secondary uppercase tracking-wider truncate">{title}</p>
 <p className="text-kpi font-bold text-primary tabular-nums mt-1.5">{value}</p>
 {change && (
 <p className={`text-xs mt-1.5 font-medium ${
 changeType === 'up' ? 'text-success' :
 changeType === 'down' ? 'text-danger' : 'text-secondary'
 }`}>
 {changeType === 'up' ? '↑' : changeType === 'down' ? '↓' : ''} {change}
 </p>
 )}
 </div>
 <div className={`p-2.5 rounded-xl border border-border flex items-center justify-center shrink-0 ${iconBg}`}>
 <Icon size={18} strokeWidth={2.2} className={iconColor} />
 </div>
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

