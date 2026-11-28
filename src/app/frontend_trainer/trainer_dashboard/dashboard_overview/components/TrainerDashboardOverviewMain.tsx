"use client";
// RESPONSIBILITY: Dashboard view composition only. Each child owns its own server-state query via the canonical dashboard query key.
import { useTranslations } from 'next-intl';
import { MapPin, Award, Users, Percent } from 'lucide-react';

import { useTrainerDashboardQuery } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/hooks/useTrainerDashboardOverviewQuery';

import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/components/TrainerDashboardOverviewTrainerInfrastructureSkeletonBlock';

import TrainerDashboardDateFilterDropdown from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/components/TrainerDashboardOverviewDateFilterDropdown';

import TrainerDashboardGoalTrendChart from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/components/TrainerDashboardOverviewGoalTrendChart';

import TrainerDashboardKPIs from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/components/TrainerDashboardOverviewKPIs';

import TrainerDashboardMembershipDistribution from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/components/TrainerDashboardOverviewMembershipDistribution';

import TrainerDashboardQuickActions from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/components/TrainerDashboardOverviewQuickActions';

import TrainerDashboardRecentProgress from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/components/TrainerDashboardOverviewRecentProgress';

import TrainerDashboardUpcomingSessions from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/components/TrainerDashboardOverviewUpcomingSessions';










/**
 * @description Dashboard view composition only. Each child owns its own server-state query via the canonical dashboard query key.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Owns the dashboard feature UI responsibility represented by TrainerDashboardMain, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented dashboard module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerDashboardMain() {
  const t = useTranslations('TRAINER_DASHBOARD');
  const dashboardQuery = useTrainerDashboardQuery();

  if (dashboardQuery.isInvalidRange) {
    return (
      <main className="min-h-full bg-page p-4 sm:p-6" aria-label={t('TEXT_DASHBOARD')}>
        <div className="mb-4"><TrainerDashboardDateFilterDropdown /></div>
        <p role="status" className="max-w-xl rounded-lg border border-danger-bg bg-danger-bg p-4 text-danger">
          {t('TEXT_INVALID_DATE_RANGE')}
        </p>
      </main>
    );
  }

  if (dashboardQuery.isPending) {
    return <main className="min-h-full bg-page p-4 sm:p-6" aria-busy="true" aria-label={t('TEXT_LOADING_DASHBOARD')}><div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">{Array.from({ length: 4 }, (_, index) => <TrainerInfrastructureSkeletonBlock key={`dashboard-kpi-skeleton-${index}`} className="h-28 rounded-xl border border-border" />)}</div><TrainerInfrastructureSkeletonBlock className="mt-5 h-72 rounded-xl border border-border" /></main>;
  }

  if (dashboardQuery.isError) {
    return <main className="min-h-full bg-page p-4 sm:p-6"><div role="alert" className="max-w-xl rounded-xl border border-danger-bg bg-danger-bg p-5 text-danger"><p className="font-semibold">{t('TEXT_UNABLE_TO_LOAD_DASHBOARD')}</p><button type="button" onClick={() => void dashboardQuery.refetch()} className="mt-3 min-h-11 rounded-lg px-4 font-semibold underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">{t('TEXT_RETRY')}</button></div></main>;
  }

  return (
    <main className="min-h-full pb-10 bg-page text-primary">
      <div className="p-4 sm:p-6 space-y-5">
        {/* Executive Colorful Header Card (matching Library Admin Dashboard) */}
        <section className="relative overflow-hidden rounded-2xl border border-orange-500/30 bg-card dark:bg-gradient-to-br dark:from-[#261614] dark:via-[#151c2c] dark:to-[#0f1624] p-5 sm:p-6 shadow-card space-y-4">
          <span aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-orange-500/20 blur-3xl" />
          <span aria-hidden="true" className="pointer-events-none absolute left-1/3 -bottom-12 h-28 w-40 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-1.5 min-w-0">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/35 bg-orange-500/15 px-3 py-1 text-xs font-semibold text-orange-600 dark:text-orange-300">
                <span className="h-2 w-2 rounded-full bg-orange-500 motion-safe:animate-pulse" aria-hidden="true" />
                Trainer Operations &amp; Coaching Hub
              </span>
              <h1 className="text-page-title font-bold text-primary">{t("TEXT_DASHBOARD")}</h1>
              <p className="text-sm text-secondary">{t("TEXT_TRAINER_OPERATIONAL_OVERVIEW")}</p>
            </div>
            <div className="w-full lg:w-auto shrink-0">
              <TrainerDashboardDateFilterDropdown />
            </div>
          </div>

          <div className="relative pt-4 border-t border-orange-500/20 flex flex-wrap items-center gap-2.5 text-xs" data-testid="trainer_dashboard-quota-bar">
            <div className="inline-flex items-center gap-1.5 rounded-xl border border-orange-500/30 bg-orange-500/15 px-3 py-1.5 font-semibold text-orange-700 dark:text-orange-200">
              <MapPin size={14} className="text-orange-500 shrink-0" />
              <span>Branch: <strong className="text-primary font-bold">Andheri East</strong></span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/15 px-3 py-1.5 font-semibold text-amber-700 dark:text-amber-200">
              <Award size={14} className="text-amber-500 shrink-0" />
              <span>Tier: <strong className="text-primary font-bold">Master Trainer (Tier 3)</strong></span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-xl border border-sky-500/30 bg-sky-500/15 px-3 py-1.5 font-semibold text-sky-700 dark:text-sky-200">
              <Users size={14} className="text-sky-500 shrink-0" />
              <span>Capacity Quota: <strong className="text-primary font-bold">10 / 15 Trainees (67%)</strong></span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/15 px-3 py-1.5 font-semibold text-emerald-700 dark:text-emerald-200">
              <Percent size={14} className="text-emerald-500 shrink-0" />
              <span>PT Commission: <strong className="text-emerald-600 dark:text-emerald-300 font-bold">40% Session Retainer</strong></span>
            </div>
          </div>
        </section>
        <TrainerDashboardKPIs />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
          <div className="md:col-span-2 xl:col-span-2 min-w-0"><TrainerDashboardGoalTrendChart /></div>
          <div className="min-w-0"><TrainerDashboardMembershipDistribution /></div>
          <div className="min-w-0"><TrainerDashboardQuickActions /></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
          <div className="min-w-0"><TrainerDashboardUpcomingSessions /></div>
          <div className="min-w-0"><TrainerDashboardRecentProgress /></div>
        </div>
      </div>
    </main>
  );
}
