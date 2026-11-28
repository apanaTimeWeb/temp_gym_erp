"use client";
// RESPONSIBILITY: Renders Trainer Sessions KPI cards from the sessions data supplied by the owning feature.
// DATA FLOW: TrainerSessionsMain → TrainerSessionsKPIs → derived KPI presentation.
import { useTranslations } from 'next-intl';

import { TRAINER_SESSIONS_KPI_CARD_CONFIG } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/config/TrainerCoachingSessionsConstants';

import { useTrainerSessionsKpis } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/useTrainerCoachingSessionsKpis';

import { useTrainerSessionsKpisQuery } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/useTrainerCoachingSessionsKpisQuery';

import type { TrainerSessionsKPIsProps } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsKPIsProps';






/**
 * @description Owns TrainerSessionsKPIs behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Renders read-only KPI summaries for the sessions feature using module-owned derived data and semantic design tokens.
 * @dependencies Uses only documented sessions module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerSessionsKPIs(_props: TrainerSessionsKPIsProps = {}) {
  const t = useTranslations('TRAINER_SESSIONS');
  const { sessions, isPending, isError, refetch } = useTrainerSessionsKpisQuery();
  const { todayCount, completedThisWeek, noShowsThisMonth, avgAttendanceRate } = useTrainerSessionsKpis(sessions);

  const valuesByKey = { today: todayCount, completed: completedThisWeek, 'no-shows': noShowsThisMonth, attendance: `${avgAttendanceRate}%` } as const;

  const kpiAccents: Record<string, { border: string; surface: string; glow: string; stroke: string; badge: string; spark: string }> = {
    today: {
      border: 'border-orange-500/30',
      surface: 'bg-card dark:bg-gradient-to-br dark:from-[#261914] dark:via-[#202020] dark:to-[#181818]',
      glow: 'bg-orange-500',
      stroke: '#FF5A1F',
      badge: 'border-orange-500/30',
      spark: 'M0 36 Q28 28 52 24 T102 14 T150 8',
    },
    completed: {
      border: 'border-emerald-500/30',
      surface: 'bg-card dark:bg-gradient-to-br dark:from-[#122620] dark:via-[#202020] dark:to-[#181818]',
      glow: 'bg-emerald-500',
      stroke: '#34D399',
      badge: 'border-emerald-500/30',
      spark: 'M0 38 Q30 34 62 22 T110 12 T150 6',
    },
    'no-shows': {
      border: 'border-rose-500/30',
      surface: 'bg-card dark:bg-gradient-to-br dark:from-[#28141a] dark:via-[#202020] dark:to-[#181818]',
      glow: 'bg-rose-500',
      stroke: '#FB7185',
      badge: 'border-rose-500/30',
      spark: 'M0 24 Q35 20 65 28 T115 26 T150 32',
    },
    attendance: {
      border: 'border-sky-500/30',
      surface: 'bg-card dark:bg-gradient-to-br dark:from-[#13222d] dark:via-[#202020] dark:to-[#181818]',
      glow: 'bg-sky-500',
      stroke: '#38BDF8',
      badge: 'border-sky-500/30',
      spark: 'M0 36 Q32 30 68 20 T112 16 T150 8',
    },
  };

  return (
    <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4">
      {TRAINER_SESSIONS_KPI_CARD_CONFIG.map(({ key, labelKey, icon: Icon, iconClass, bgClass }) => {
        const accent = kpiAccents[key] ?? kpiAccents.today;
        return (
          <article
            key={key}
            className={`relative overflow-hidden min-w-0 rounded-2xl p-5 border ${accent.surface} ${accent.border} flex items-start justify-between gap-3 shadow-card motion-safe:transition-all motion-safe:duration-base motion-safe:hover:scale-[1.01]`}
            data-testid={`trainer_sessions-kpis-card${key}`}
          >
            <span aria-hidden="true" className={`pointer-events-none absolute -right-6 -bottom-6 h-24 w-24 rounded-full blur-2xl opacity-15 ${accent.glow}`} />
            <svg aria-hidden="true" viewBox="0 0 150 45" className="pointer-events-none absolute bottom-0 right-0 h-14 w-32 opacity-20">
              <path d={accent.spark} fill="none" stroke={accent.stroke} strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <div className="relative min-w-0 flex-1">
              <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-1 truncate">{t(labelKey)}</p>
              <p className="text-kpi font-bold text-primary tabular-nums" aria-label={isPending ? t('TEXT_LOADING') : isError ? t('TEXT_UNABLE_TO_LOAD_SESSIONS_RIGHT_NOW_PLEASE_RETRY') : String(valuesByKey[key])} data-state={isPending ? 'loading' : isError ? 'error' : 'ready'}>{isPending || isError ? '—' : valuesByKey[key]}</p>
            </div>
            <div className={`relative p-2.5 rounded-xl border ${accent.badge} shrink-0 ${bgClass} ${iconClass}`}>
              <Icon size={18} strokeWidth={2.2} />
            </div>
          </article>
        );
      })}
      {isError && <div className="col-span-full flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-3" role="alert">
        <span className="text-sm text-secondary">{t('TEXT_UNABLE_TO_LOAD_SESSIONS_RIGHT_NOW_PLEASE_RETRY')}</span>
        <button type="button" onClick={() => void refetch()} className="min-h-11 px-4 rounded-lg border border-border text-primary hover:bg-primary-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">{t('TEXT_RETRY')}</button>
      </div>}
    </div>
  );
}
