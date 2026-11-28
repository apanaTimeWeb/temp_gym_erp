"use client";
// RESPONSIBILITY: Renders the TrainerDashboardUpcomingSessions route/UI for the owning Trainer feature.
import { Clock, Calendar } from 'lucide-react';

import { useTranslations } from 'next-intl';

import Link from 'next/link';

import { useTrainerDashboardQuery } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/hooks/useTrainerDashboardOverviewQuery';

import { TRAINER_DASHBOARD_URLS } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/config/trainer_dashboard_overview.url_config';








/**
 * @description Renders the TrainerDashboardUpcomingSessions route/UI for the owning Trainer feature.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Owns the dashboard feature UI responsibility represented by TrainerDashboardUpcomingSessions, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented dashboard module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerDashboardUpcomingSessions() {
  const t = useTranslations('TRAINER_DASHBOARD');
  const { data: stats } = useTrainerDashboardQuery();
  if (!stats?.upcomingSessions) return null;

  const avatarThemes = [
    'border-orange-500/35 bg-orange-500/15 text-orange-500',
    'border-sky-500/35 bg-sky-500/15 text-sky-500',
    'border-emerald-500/35 bg-emerald-500/15 text-emerald-500',
    'border-purple-500/35 bg-purple-500/15 text-purple-500',
  ];

  return (
    <div className="relative overflow-hidden h-full rounded-2xl border border-sky-500/30 bg-card dark:bg-gradient-to-br dark:from-[#102235] dark:via-[#151c2c] dark:to-[#0f1624] p-5 shadow-card flex flex-col">
      <span aria-hidden="true" className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="relative flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-sky-500/15">
        <h3 className="font-bold text-primary text-lg flex items-center gap-2.5 min-w-0">
          <span className="p-2 rounded-xl border border-sky-500/30 bg-sky-500/15 text-sky-500 shrink-0">
            <Calendar size={16} strokeWidth={2.2} />
          </span>
          <span className="truncate">{t("TEXT_UPCOMING_SESSIONS")}</span></h3>
        <Link href={TRAINER_DASHBOARD_URLS.ROUTES.SCHEDULE} className="motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page text-xs px-3 py-1.5 rounded-xl border border-orange-500/30 bg-orange-500/15 text-orange-600 dark:text-orange-300 font-bold hover:bg-orange-500/25 shrink-0" data-testid="trainer_dashboard-dashboard-upcoming_sessions_view">{t("TEXT_VIEW_SCHEDULE")}</Link>
      </div>

      <div className="relative space-y-3 flex-1">
        {stats.upcomingSessions.length === 0 ? (
          <p className="text-secondary text-sm">{t("TEXT_NO_UPCOMING_SESSIONS_TODAY")}</p>
        ) : (
          stats.upcomingSessions.map((session, idx) => (
            <div key={session.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-xl border border-border/80 bg-page/80 hover:border-sky-500/35 motion-safe:transition-colors motion-safe:duration-base">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold shrink-0 ${avatarThemes[idx % avatarThemes.length]}`}>
                  {session.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <Link href={`${TRAINER_DASHBOARD_URLS.ROUTES.MEMBERS}?search=${encodeURIComponent(session.name)}`} className="font-semibold text-primary text-sm hover:underline truncate block">
                    {session.name}
                  </Link>
                  <p className="text-xs text-secondary truncate">{session.type}</p>
                </div>
              </div>
              <div className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-sky-600 dark:text-sky-300 border border-sky-500/30 bg-sky-500/15 px-3 py-1.5 rounded-xl shrink-0 tabular-nums">
                <Clock size={15} className="text-sky-500" strokeWidth={2} />
                {session.time}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
