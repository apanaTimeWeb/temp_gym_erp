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
    <div className="h-full bg-card border border-border rounded-2xl p-5 shadow-card flex flex-col">
      <div className="flex items-center justify-between gap-2 mb-5">
        <h3 className="font-bold text-primary text-lg flex items-center gap-2 min-w-0">
          <span className="p-1.5 rounded-lg border border-sky-500/30 bg-sky-500/15 text-sky-500 shrink-0">
            <Activity size={16} strokeWidth={2} />
          </span>
          <span className="truncate">{t("TEXT_RECENT_PROGRESS")}</span></h3>
      </div>

      <div className="space-y-3.5 flex-1">
        {stats.recentMemberProgress.length === 0 ? (
          <p className="text-secondary text-sm">{t("TEXT_NO_RECENT_MEMBER_PROGRESS")}</p>
        ) : (
          stats.recentMemberProgress.map((item) => (
            <div key={item.id} className="flex flex-col gap-1.5 p-3 rounded-xl border border-border bg-page hover:border-sky-500/30 motion-safe:transition-colors">
              <div className="flex items-center justify-between gap-2">
                <Link href={`${TRAINER_DASHBOARD_URLS.ROUTES.MEMBERS}?search=${encodeURIComponent(item.name)}`} className="font-semibold text-sm text-primary hover:underline truncate min-w-0">
                  {item.name}
                </Link>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-md border border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 shrink-0">{item.time}</span>
              </div>
              <p className="text-xs sm:text-sm text-secondary line-clamp-2">{item.detail}</p>
            </div>
          ))
        )}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <Link href={TRAINER_DASHBOARD_URLS.ROUTES.PROGRESS_TRACKING} className="min-h-10 rounded-xl border border-orange-500/25 bg-orange-500/10 hover:bg-orange-500/20 px-4 py-2 motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page text-sm text-orange-600 dark:text-orange-300 font-semibold flex items-center justify-center gap-1.5" data-testid="trainer_dashboard-dashboard-recent_progress_view">
          {t("TEXT_VIEW_ALL_PROGRESS")}<ArrowRight size={16} strokeWidth={2} />
        </Link>
      </div>
    </div>
  );
}
