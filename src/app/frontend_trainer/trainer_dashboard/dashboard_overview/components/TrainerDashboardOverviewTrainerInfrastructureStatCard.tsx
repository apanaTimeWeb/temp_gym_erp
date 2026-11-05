// AUTONOMOUS COPY: Module-local, WET-isolated copy of original trainer-infrastructure primitive.
// RESPONSIBILITY: Renders a single KPI stat card (icon, label, big number, trend). Used in dashboard and module KPI rows.
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
export default function TrainerInfrastructureStatCard({ title, value, change, changeType = 'neutral', icon: Icon, iconBg, iconColor }: TrainerInfrastructureStatCardProps) {
 return (
 <div className="bg-card rounded-xl p-5 shadow-card border border-border hover:border-focus motion-safe:transition-colors motion-safe:duration-base">
 <div className="flex items-center justify-between">
 <div>
 <p className="text-xs font-medium text-secondary uppercase tracking-wider">{title}</p>
 <p className="text-kpi font-bold text-primary mt-1">{value}</p>
 {change && (
 <p className={`text-xs mt-1 font-medium ${
 changeType === 'up' ? 'text-success' :
 changeType === 'down' ? 'text-danger' : 'text-secondary'
 }`}>
 {changeType === 'up' ? '↑' : changeType === 'down' ? '↓' : ''} {change}
 </p>
 )}
 </div>
 <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}>
 <Icon size={18} strokeWidth={2} className={iconColor} />
 </div>
 </div>
 </div>
 );
}

