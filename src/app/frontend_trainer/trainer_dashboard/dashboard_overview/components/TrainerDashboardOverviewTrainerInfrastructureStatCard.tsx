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
const CARD_ACCENTS = {
  orange: {
    border: 'border-orange-500/40 hover:border-orange-400/75',
    surface: 'bg-card dark:bg-gradient-to-br dark:from-[#2B1513] dark:via-[#141B2D] dark:to-[#0C1220]',
    topBar: 'from-[#FF5A1F] via-[#FB923C] to-transparent',
    glow: 'bg-orange-500',
    stroke: '#FF5A1F',
    badge: 'bg-orange-500/20 border-orange-500/40 text-orange-500 dark:text-orange-400',
    shadow: 'hover:shadow-[0_12px_32px_rgba(255,90,31,0.18)]',
  },
  sky: {
    border: 'border-sky-500/40 hover:border-sky-400/75',
    surface: 'bg-card dark:bg-gradient-to-br dark:from-[#0E2438] dark:via-[#131D2E] dark:to-[#0C1220]',
    topBar: 'from-[#38BDF8] via-[#22D3EE] to-transparent',
    glow: 'bg-sky-400',
    stroke: '#38BDF8',
    badge: 'bg-sky-500/20 border-sky-500/40 text-sky-500 dark:text-sky-400',
    shadow: 'hover:shadow-[0_12px_32px_rgba(56,189,248,0.18)]',
  },
  emerald: {
    border: 'border-emerald-500/40 hover:border-emerald-400/75',
    surface: 'bg-card dark:bg-gradient-to-br dark:from-[#0C2722] dark:via-[#121E2D] dark:to-[#0C1220]',
    topBar: 'from-[#10B981] via-[#34D399] to-transparent',
    glow: 'bg-emerald-400',
    stroke: '#34D399',
    badge: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-500 dark:text-emerald-400',
    shadow: 'hover:shadow-[0_12px_32px_rgba(16,185,129,0.18)]',
  },
  amber: {
    border: 'border-amber-500/40 hover:border-amber-400/75',
    surface: 'bg-card dark:bg-gradient-to-br dark:from-[#281E10] dark:via-[#151B2C] dark:to-[#0C1220]',
    topBar: 'from-[#F59E0B] via-[#FACC15] to-transparent',
    glow: 'bg-amber-400',
    stroke: '#FBBF24',
    badge: 'bg-amber-500/20 border-amber-500/40 text-amber-500 dark:text-amber-400',
    shadow: 'hover:shadow-[0_12px_32px_rgba(245,158,11,0.18)]',
  },
} as const;

function resolveAccent(iconColor?: string) {
  if (iconColor?.includes('info')) return CARD_ACCENTS.sky;
  if (iconColor?.includes('success')) return CARD_ACCENTS.emerald;
  if (iconColor?.includes('warning')) return CARD_ACCENTS.amber;
  return CARD_ACCENTS.orange;
}

export default function TrainerInfrastructureStatCard({ title, value, change, changeType = 'neutral', icon: Icon, iconBg, iconColor, href }: TrainerInfrastructureStatCardProps) {
 const accent = resolveAccent(iconColor);
 const card = (
 <div className={`relative overflow-hidden h-full min-w-0 rounded-2xl p-5 shadow-card border flex flex-col justify-between ${accent.surface} ${accent.border} ${accent.shadow} motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-0.5 ${href ? 'cursor-pointer' : ''}`}>
 <span aria-hidden="true" className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${accent.topBar}`} />
 <span aria-hidden="true" className={`pointer-events-none absolute -right-6 -bottom-6 h-24 w-24 rounded-full blur-2xl opacity-20 ${accent.glow}`} />
 <svg aria-hidden="true" viewBox="0 0 150 45" className="pointer-events-none absolute bottom-0 right-0 h-14 w-32 opacity-25">
 <path d="M0 38 Q25 32 45 26 T90 18 T130 12 T150 6" fill="none" stroke={accent.stroke} strokeWidth="2.5" strokeLinecap="round" />
 </svg>
 <div className="relative flex items-start justify-between gap-3">
 <div className="min-w-0 flex-1">
 <p className="text-xs font-semibold text-secondary uppercase tracking-wider truncate">{title}</p>
 <p className="text-kpi font-extrabold text-text-primary tabular-nums mt-2">{value}</p>
 </div>
 <div className={`p-2.5 rounded-xl border flex items-center justify-center shrink-0 shadow-sm ${iconBg ?? ''} ${accent.badge}`}>
 <Icon size={18} strokeWidth={2.2} className={iconColor} />
 </div>
 </div>
 {change && (
 <p className={`relative text-xs mt-3 pt-2.5 border-t border-border/70 font-medium ${
 changeType === 'up' ? 'text-success-text' :
 changeType === 'down' ? 'text-danger-text' : 'text-secondary'
 }`}>
 {changeType === 'up' ? '↑' : changeType === 'down' ? '↓' : ''} {change}
 </p>
 )}
 </div>
 );

 if (href) {
  return (
   <Link href={href} className="block h-full min-w-0 no-underline rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">
    {card}
   </Link>
  );
 }

 return card;
}

