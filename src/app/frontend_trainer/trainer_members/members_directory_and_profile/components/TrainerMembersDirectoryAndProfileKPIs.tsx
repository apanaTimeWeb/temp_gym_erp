"use client";
// RESPONSIBILITY: Renders member summary KPIs from the Trainer Members server-state query.
import { useTranslations } from 'next-intl';

import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileTrainerInfrastructureSkeletonBlock';

import { TRAINER_MEMBERS_MEMBER_KPI_FILTERS, TRAINER_MEMBERS_MEMBER_KPI_PRESENTATION } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/TrainerMembersDirectoryAndProfileConstants';

import { useTrainerMembersFilters } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileFilters';

import { useTrainerMembersMemberStatsQuery } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileQuery';


// DATA FLOW: TanStack Query → TrainerMembersKPIs → translated semantic KPI cards.






/**
 * @description Owns TrainerMembersKPIs behavior in the Trainer module.
 * @dependencies TanStack Query → TrainerMembersKPIs → translated semantic KPI cards.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Renders read-only KPI summaries for the members feature using module-owned derived data and semantic design tokens.
 * @dependencies Uses only documented members module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerMembersKPIs() {
  const t = useTranslations('TRAINER_MEMBERS');
  const statsQuery = useTrainerMembersMemberStatsQuery();
  const { data: stats, isPending, isError, refetch } = statsQuery;
  const { statusFilter, setStatusFilter } = useTrainerMembersFilters();

  const valuesByKey = { total: stats?.total ?? 0, active: stats?.active ?? 0, pending: stats?.pending ?? 0, expired: stats?.expired ?? 0 } as const;
  const cards = TRAINER_MEMBERS_MEMBER_KPI_FILTERS.map((filter) => ({
    ...filter,
    ...TRAINER_MEMBERS_MEMBER_KPI_PRESENTATION[filter.key],
    value: valuesByKey[filter.key],
  }));

  if (isError) {
    return <div role="alert" className="mb-6 rounded-xl border border-danger-bg bg-danger-bg p-4 text-sm text-danger" data-testid="trainer_members-kpis-error"><p>{t('TEXT_UNABLE_TO_LOAD_MEMBER_STATISTICS')}</p><button type="button" onClick={() => void refetch()} className="mt-2 min-h-11 rounded-lg px-3 font-semibold underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">{t('TEXT_RETRY')}</button></div>;
  }

  if (isPending || !stats) {
    return (
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4" aria-busy="true" aria-label={t('TEXT_LOADING_MEMBER_STATISTICS')} data-testid="trainer_members-kpis-loading">
        {cards.map(({ key }) => (
          <TrainerInfrastructureSkeletonBlock key={key} className="h-28 rounded-2xl border border-border" testId={`trainer-members-kpis-loading-card-${key}`} />
        ))}
      </div>
    );
  }

  const memberAccents: Record<string, { border: string; surface: string; glow: string; stroke: string; badge: string }> = {
    total: {
      border: 'border-orange-500/30',
      surface: 'bg-card dark:bg-gradient-to-br dark:from-[#261914] dark:via-[#202020] dark:to-[#181818]',
      glow: 'bg-orange-500',
      stroke: '#FF5A1F',
      badge: 'border-orange-500/30',
    },
    active: {
      border: 'border-emerald-500/30',
      surface: 'bg-card dark:bg-gradient-to-br dark:from-[#122620] dark:via-[#202020] dark:to-[#181818]',
      glow: 'bg-emerald-500',
      stroke: '#34D399',
      badge: 'border-emerald-500/30',
    },
    pending: {
      border: 'border-amber-500/30',
      surface: 'bg-card dark:bg-gradient-to-br dark:from-[#262012] dark:via-[#202020] dark:to-[#181818]',
      glow: 'bg-amber-500',
      stroke: '#FBBF24',
      badge: 'border-amber-500/30',
    },
    expired: {
      border: 'border-rose-500/30',
      surface: 'bg-card dark:bg-gradient-to-br dark:from-[#28141a] dark:via-[#202020] dark:to-[#181818]',
      glow: 'bg-rose-500',
      stroke: '#FB7185',
      badge: 'border-rose-500/30',
    },
  };

  return (
    <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4" role="group" aria-label={t('TEXT_MEMBER_STATUS_FILTERS')}>
      {cards.map(({ key, filterValue, labelKey, value, icon: Icon, color, bg }) => {
        const isActive = statusFilter === filterValue;
        const accent = memberAccents[key] ?? memberAccents.total;
        return (
          <button
            key={key}
            type="button"
            aria-pressed={isActive}
            aria-label={t('TEXT_FILTER_MEMBERS_BY_STATUS', { status: t(labelKey as never) })}
            onClick={() => setStatusFilter(filterValue)}
            data-testid={`trainer_members-kpi-${key}-filter`}
            className={`relative overflow-hidden min-w-0 text-start ${accent.surface} rounded-2xl p-5 border shadow-card motion-safe:transition-all motion-safe:duration-base motion-safe:hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${isActive ? 'border-primary ring-2 ring-primary' : accent.border}`}
          >
            <span aria-hidden="true" className={`pointer-events-none absolute -right-6 -bottom-6 h-24 w-24 rounded-full blur-2xl opacity-15 ${accent.glow}`} />
            <svg aria-hidden="true" viewBox="0 0 150 45" className="pointer-events-none absolute bottom-0 right-0 h-14 w-32 opacity-20">
              <path d="M0 36 Q28 30 56 24 T106 16 T150 8" fill="none" stroke={accent.stroke} strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <div className="relative flex items-start justify-between gap-2">
              <p className="text-xs font-semibold text-secondary uppercase tracking-wider line-clamp-2">{t(labelKey as never)}</p>
              <div className={`p-2.5 rounded-xl border ${accent.badge} shrink-0 flex items-center justify-center ${bg} ${color}`}>
                <Icon size={18} strokeWidth={2.2} aria-hidden="true" />
              </div>
            </div>
            <p className="relative text-kpi font-bold text-primary tabular-nums mt-2">{value}</p>
          </button>
        );
      })}
    </div>
  );
}
