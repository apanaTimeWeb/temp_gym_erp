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

  return (
    <div className="h-full bg-card border border-border rounded-2xl p-5 shadow-card flex flex-col">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
        <h3 className="font-bold text-primary text-lg flex items-center gap-2 min-w-0">
          <span className="p-1.5 rounded-lg border border-orange-500/30 bg-orange-500/15 text-orange-500 shrink-0">
            <Calendar size={16} strokeWidth={2} />
          </span>
          <span className="truncate">{t("TEXT_UPCOMING_SESSIONS")}</span></h3>
        <Link href={TRAINER_DASHBOARD_URLS.ROUTES.SCHEDULE} className="motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page text-xs px-2.5 py-1 rounded-lg border border-orange-500/25 bg-orange-500/10 text-orange-600 dark:text-orange-300 font-semibold hover:bg-orange-500/20 shrink-0" data-testid="trainer_dashboard-dashboard-upcoming_sessions_view">{t("TEXT_VIEW_SCHEDULE")}</Link>
      </div>

      <div className="space-y-3 flex-1">
        {stats.upcomingSessions.length === 0 ? (
          <p className="text-secondary text-sm">{t("TEXT_NO_UPCOMING_SESSIONS_TODAY")}</p>
        ) : (
          stats.upcomingSessions.map(session => (
            <div key={session.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-xl border border-border bg-page hover:border-orange-500/30 motion-safe:transition-colors motion-safe:duration-base">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full border border-orange-500/30 bg-orange-500/15 text-orange-500 flex items-center justify-center font-bold shrink-0">
                  {session.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <Link href={`${TRAINER_DASHBOARD_URLS.ROUTES.MEMBERS}?search=${encodeURIComponent(session.name)}`} className="font-medium text-primary text-sm hover:underline truncate block">
                    {session.name}
                  </Link>
                  <p className="text-xs text-secondary truncate">{session.type}</p>
                </div>
              </div>
              <div className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-sky-600 dark:text-sky-300 border border-sky-500/25 bg-sky-500/10 px-3 py-1.5 rounded-lg shrink-0 tabular-nums">
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
