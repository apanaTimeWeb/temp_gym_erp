// RESPONSIBILITY: Renders/orchestrates SuperadminAnalyticsDashboardKpiGrid within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the read-only analytics KPI cards from the feature view-model matching Trainer Obsidian StatCard UI.
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { SuperadminAnalyticsKpiGridProps } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/types/superadmin_analytics_dashboard_kpi_grid.types';

const ANALYTICS_ACCENTS = [
  {
    border: 'border-border dark:border-orange-500/35 hover:border-orange-400/75',
    surface: 'bg-card dark:bg-gradient-to-br dark:from-[#2B1513] dark:via-[#141B2D] dark:to-[#0C1220]',
    topBar: 'from-[#FF5A1F] via-[#FB923C] to-transparent',
    stroke: '#FF5A1F',
  },
  {
    border: 'border-border dark:border-sky-500/35 hover:border-sky-400/75',
    surface: 'bg-card dark:bg-gradient-to-br dark:from-[#0E2438] dark:via-[#131D2E] dark:to-[#0C1220]',
    topBar: 'from-[#38BDF8] via-[#22D3EE] to-transparent',
    stroke: '#38BDF8',
  },
  {
    border: 'border-border dark:border-emerald-500/35 hover:border-emerald-400/75',
    surface: 'bg-card dark:bg-gradient-to-br dark:from-[#0C2722] dark:via-[#121E2D] dark:to-[#0C1220]',
    topBar: 'from-[#10B981] via-[#34D399] to-transparent',
    stroke: '#34D399',
  },
  {
    border: 'border-border dark:border-amber-500/35 hover:border-amber-400/75',
    surface: 'bg-card dark:bg-gradient-to-br dark:from-[#281E10] dark:via-[#151B2C] dark:to-[#0C1220]',
    topBar: 'from-[#F59E0B] via-[#FACC15] to-transparent',
    stroke: '#FBBF24',
  },
  {
    border: 'border-border dark:border-purple-500/35 hover:border-purple-400/75',
    surface: 'bg-card dark:bg-gradient-to-br dark:from-[#1E132F] dark:via-[#141B2D] dark:to-[#0C1220]',
    topBar: 'from-[#A855F7] via-[#EC4899] to-transparent',
    stroke: '#C084FC',
  },
] as const;

export function SuperadminAnalyticsDashboardKpiGrid({ cards }: SuperadminAnalyticsKpiGridProps) {
  const t = useTranslations('superadmin_analytics');
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5" aria-label={t('ui.analytics_key_performance_indicators')}>
      {cards.map((card, idx) => {
        const Icon = card.icon;
        const accent = ANALYTICS_ACCENTS[idx % ANALYTICS_ACCENTS.length]!;
        const DeltaIcon = (() => {
          if (card.deltaDirection === 'up') return ArrowUp;
          if (card.deltaDirection === 'down') return ArrowDown;
          return null;
        })();
        const deltaColor = (() => {
          if (card.deltaTone === 'success') return 'text-success-text';
          if (card.deltaTone === 'danger') return 'text-danger-text';
          return 'text-secondary';
        })();
        return (
          <article key={card.label} className={`relative overflow-hidden rounded-2xl border p-5 shadow-card flex flex-col justify-between ${accent.surface} ${accent.border} motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-0.5`}>
            <span aria-hidden="true" className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${accent.topBar}`} />
            <svg aria-hidden="true" viewBox="0 0 150 45" className="pointer-events-none absolute bottom-0 right-0 h-14 w-32 opacity-20">
              <path d="M0 38 Q25 32 45 26 T90 18 T130 12 T150 6" fill="none" stroke={accent.stroke} strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <div className="relative flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <span className="block text-xs font-semibold uppercase tracking-wider text-secondary truncate">{card.label}</span>
                <p className="mt-2 text-2xl sm:text-[26px] font-extrabold text-primary tabular-nums truncate">{card.value}</p>
              </div>
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 ${card.iconBgClass}`} aria-hidden="true">
                <Icon size={17} className={card.iconColorClass} strokeWidth={2.2} />
              </div>
            </div>
            {card.delta ? (
              <p className={`relative mt-3 pt-2.5 border-t border-border/60 dark:border-white/10 flex items-center gap-1 text-xs font-medium ${deltaColor}`}>
                {DeltaIcon ? <DeltaIcon size={14} strokeWidth={2.2} aria-hidden="true" /> : null}
                <span>{card.delta}</span>
              </p>
            ) : null}
          </article>
        );
      })}
    </section>
  );
}
