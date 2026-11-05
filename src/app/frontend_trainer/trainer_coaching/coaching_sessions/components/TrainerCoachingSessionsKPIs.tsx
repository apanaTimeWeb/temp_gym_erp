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

  return (
    <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4">
      {TRAINER_SESSIONS_KPI_CARD_CONFIG.map(({ key, labelKey, icon: Icon, iconClass, bgClass }) => (
        <article
          key={key}
          className="bg-card rounded-xl p-5 border border-border flex items-start gap-4 shadow-card motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-1"
          data-testid={`trainer_sessions-kpis-card${key}`}
        >
          <div className={`p-3 rounded-xl ${bgClass} ${iconClass}`}>
            <Icon size={18} strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-secondary mb-1 truncate">{t(labelKey)}</p>
            <p className="text-kpi font-bold text-primary" aria-label={isPending ? t('TEXT_LOADING') : isError ? t('TEXT_UNABLE_TO_LOAD_SESSIONS_RIGHT_NOW_PLEASE_RETRY') : String(valuesByKey[key])} data-state={isPending ? 'loading' : isError ? 'error' : 'ready'}>{isPending || isError ? '—' : valuesByKey[key]}</p>
          </div>
        </article>
      ))}
      {isError && <div className="col-span-full flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-3" role="alert">
        <span className="text-sm text-secondary">{t('TEXT_UNABLE_TO_LOAD_SESSIONS_RIGHT_NOW_PLEASE_RETRY')}</span>
        <button type="button" onClick={() => void refetch()} className="min-h-11 px-4 rounded-lg border border-border text-primary hover:bg-primary-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">{t('TEXT_RETRY')}</button>
      </div>}
    </div>
  );
}
