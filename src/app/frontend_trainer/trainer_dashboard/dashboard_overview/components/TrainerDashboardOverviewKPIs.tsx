"use client";
// RESPONSIBILITY: Renders the two rows of KPI metric stat cards on the dashboard using live data from the Dashboard TanStack Query response.
import { Users, CalendarCheck, Clock, Dumbbell } from 'lucide-react';

import { useLocale, useTranslations } from 'next-intl';

import { useTrainerDashboardQuery } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/hooks/useTrainerDashboardOverviewQuery';

import { TrainerDashboardFormatNumber } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/utils/TrainerDashboardOverviewFormatNumber';

import TrainerInfrastructureStatCard from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/components/TrainerDashboardOverviewTrainerInfrastructureStatCard';







/**
 * @description Renders the two rows of KPI metric stat cards on the dashboard using live data from the Dashboard TanStack Query response.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders read-only KPI summaries for the dashboard feature using module-owned derived data and semantic design tokens.
 * @dependencies Uses only documented dashboard module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerDashboardKPIs() {
  const locale = useLocale();
  const t = useTranslations('TRAINER_DASHBOARD');
  const { data: stats } = useTrainerDashboardQuery();
if (!stats) return null;
  const s = stats;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
        <TrainerInfrastructureStatCard
          title={t("TEXT_TODAYS_SESSIONS")}
          value={TrainerDashboardFormatNumber(s.todaysSessions, locale)}
          change={t("TEXT_COMPLETED_OF", { completed: s.completedSessions, total: s.todaysSessions })}
          changeType="neutral"
          icon={Clock}
          iconBg="bg-primary-subtle"
          iconColor="text-primary"
        />
        <TrainerInfrastructureStatCard
          title={t("TEXT_MY_MEMBERS")}
          value={TrainerDashboardFormatNumber(s.myMembersCount, locale)}
          change={t("TEXT_ASSIGNED_TO_YOU")}
          changeType="neutral"
          icon={Users}
          iconBg="bg-info-bg"
          iconColor="text-info"
        />
        <TrainerInfrastructureStatCard
          title={t("TEXT_TODAYS_ATTENDANCE")}
          value={TrainerDashboardFormatNumber(s.todaysAttendance, locale)}
          change={t("TEXT_MEMBERS_PRESENT_TODAY")}
          changeType="neutral"
          icon={CalendarCheck}
          iconBg="bg-success-bg"
          iconColor="text-success"
        />
        <TrainerInfrastructureStatCard
          title={t("TEXT_PENDING_PLANS")}
          value={TrainerDashboardFormatNumber(s.pendingWorkoutPlans, locale)}
          change={t("TEXT_WORKOUT_PLANS_TO_CREATE")}
          changeType="down"
          icon={Dumbbell}
          iconBg="bg-warning-bg"
          iconColor="text-warning"
        />
      </div>
    </>
  );
}

