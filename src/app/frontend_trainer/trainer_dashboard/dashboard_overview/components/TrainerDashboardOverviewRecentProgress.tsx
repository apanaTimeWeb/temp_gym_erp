"use client";
// RESPONSIBILITY: Renders the TrainerDashboardRecentProgress route/UI for the owning Trainer feature.
import { Activity, ArrowRight } from 'lucide-react';

import { useTranslations } from 'next-intl';

import Link from 'next/link';

import { useTrainerDashboardQuery } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/hooks/useTrainerDashboardOverviewQuery';

import { TRAINER_DASHBOARD_URLS } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/config/trainer_dashboard_overview.url_config';







/**
 * @description Renders the TrainerDashboardRecentProgress route/UI for the owning Trainer feature.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Owns the dashboard feature UI responsibility represented by TrainerDashboardRecentProgress, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented dashboard module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerDashboardRecentProgress() {
  const t = useTranslations('TRAINER_DASHBOARD');
  const { data: stats } = useTrainerDashboardQuery();
  if (!stats?.recentMemberProgress) return null;

  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-primary text-lg flex items-center gap-2">
          <Activity className="text-info" size={18}  strokeWidth={2}/>
          {t("TEXT_RECENT_PROGRESS")}</h3>
      </div>

      <div className="space-y-4">
        {stats.recentMemberProgress.length === 0 ? (
          <p className="text-secondary text-sm">{t("TEXT_NO_RECENT_MEMBER_PROGRESS")}</p>
        ) : (
          stats.recentMemberProgress.map((item) => (
            <div key={item.id} className="flex flex-col gap-1 border-b border-border pb-3 last:border-0 last:pb-0">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-primary">{item.name}</span>
                <span className="text-xs text-secondary">{item.time}</span>
              </div>
              <p className="text-sm text-secondary line-clamp-2">{item.detail}</p>
            </div>
          ))
        )}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <Link href={TRAINER_DASHBOARD_URLS.ROUTES.PROGRESS_TRACKING} className="motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page text-sm text-primary font-medium hover:underline flex items-center justify-center gap-1" data-testid="trainer_dashboard-dashboard-recent_progress_view">
          {t("TEXT_VIEW_ALL_PROGRESS")}<ArrowRight size={18}  strokeWidth={2}/>
        </Link>
      </div>
    </div>
  );
}
