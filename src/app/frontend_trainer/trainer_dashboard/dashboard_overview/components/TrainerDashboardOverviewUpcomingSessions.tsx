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
    <div className="bg-card border border-border rounded-2xl p-5 shadow-card xl:col-span-2">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-primary text-lg flex items-center gap-2">
          <Calendar className="text-primary" size={18}  strokeWidth={2}/>
          {t("TEXT_UPCOMING_SESSIONS")}</h3>
        <Link href={TRAINER_DASHBOARD_URLS.ROUTES.SCHEDULE} className="motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page text-sm text-primary font-medium hover:underline" data-testid="trainer_dashboard-dashboard-upcoming_sessions_view">{t("TEXT_VIEW_SCHEDULE")}</Link>
      </div>

      <div className="space-y-3">
        {stats.upcomingSessions.length === 0 ? (
          <p className="text-secondary text-sm">{t("TEXT_NO_UPCOMING_SESSIONS_TODAY")}</p>
        ) : (
          stats.upcomingSessions.map(session => (
            <div key={session.id} className="flex items-center justify-between p-3 rounded-xl border border-border bg-page hover:bg-page motion-safe:transition-colors motion-safe:duration-base">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-subtle text-primary flex items-center justify-center font-bold">
                  {session.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-primary text-sm">{session.name}</p>
                  <p className="text-xs text-secondary">{session.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-medium text-primary bg-input px-3 py-1.5 rounded-lg">
                <Clock size={18} className="text-secondary"  strokeWidth={2}/>
                {session.time}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
