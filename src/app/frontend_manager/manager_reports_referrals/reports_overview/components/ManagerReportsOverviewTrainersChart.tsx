// RESPONSIBILITY: Renders the Trainer Performance summary card for Reports Overview; state remains in module-owned logic hook.
'use client';

import { Users, Award, DollarSign, CalendarCheck } from 'lucide-react';
import { useLocale } from 'next-intl';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';
import { useManagerReportsOverviewLogic } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/hooks/useManagerReportsOverviewLogic';
import { ManagerReportsOverviewFormatCurrency } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/utils/ManagerReportsOverviewFormatters';

export function ManagerReportsOverviewTrainersChart() {
  const locale = useLocale();
  const formatReportCurrency = (value: number) => ManagerReportsOverviewFormatCurrency(value, ManagerEnvConfig.currencyCode, locale);
  const { summary } = useManagerReportsOverviewLogic();
  const trainers = summary?.trainerPerformance ?? [];

  const totalSessions = trainers.reduce((acc, t) => acc + t.sessionsCompleted, 0);
  const totalRevenue = trainers.reduce((acc, t) => acc + t.revenueGenerated, 0);
  const avgCompletion = trainers.length ? Math.round(trainers.reduce((acc, t) => acc + t.completionRate, 0) / trainers.length) : 0;
  const totalClients = trainers.reduce((acc, t) => acc + t.activeClients, 0);

  return (
    <div className="space-y-6" data-testid="manager_reports-trainers-chart-region">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h2 className="text-lg font-bold text-text-primary">Trainer Performance & Productivity</h2>
          <p className="text-xs text-text-secondary mt-0.5">Key trainer KPIs, session completion velocity, and personal training revenue.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative overflow-hidden p-4 rounded-2xl bg-card dark:bg-gradient-to-br dark:from-[#0E1629] dark:via-[#141B2D] dark:to-[#0C1220] border border-indigo-500/30 flex items-center gap-3 shadow-card">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-indigo-500 to-sky-400 opacity-85" />
          <div className="w-10 h-10 rounded-xl bg-primary-subtle text-primary border border-indigo-500/25 flex items-center justify-center shrink-0">
            <Users size={20} strokeWidth={2} aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-text-secondary font-medium">Active PT Clients</p>
            <p className="text-xl font-extrabold tabular-nums text-text-primary">{totalClients}</p>
          </div>
        </div>

        <div className="relative overflow-hidden p-4 rounded-2xl bg-card dark:bg-gradient-to-br dark:from-[#0E1629] dark:via-[#141B2D] dark:to-[#0C1220] border border-sky-500/30 flex items-center gap-3 shadow-card">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-sky-500 to-cyan-400 opacity-85" />
          <div className="w-10 h-10 rounded-xl bg-info-bg text-info border border-sky-500/25 flex items-center justify-center shrink-0">
            <CalendarCheck size={20} strokeWidth={2} aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-text-secondary font-medium">Sessions Conducted</p>
            <p className="text-xl font-extrabold tabular-nums text-text-primary">{totalSessions}</p>
          </div>
        </div>

        <div className="relative overflow-hidden p-4 rounded-2xl bg-card dark:bg-gradient-to-br dark:from-[#0E1629] dark:via-[#141B2D] dark:to-[#0C1220] border border-emerald-500/30 flex items-center gap-3 shadow-card">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-500 to-teal-400 opacity-85" />
          <div className="w-10 h-10 rounded-xl bg-success-bg text-success-text border border-emerald-500/25 flex items-center justify-center shrink-0">
            <Award size={20} strokeWidth={2} aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-text-secondary font-medium">Avg Completion Rate</p>
            <p className="text-xl font-extrabold tabular-nums text-text-primary">{avgCompletion}%</p>
          </div>
        </div>

        <div className="relative overflow-hidden p-4 rounded-2xl bg-card dark:bg-gradient-to-br dark:from-[#0E1629] dark:via-[#141B2D] dark:to-[#0C1220] border border-amber-500/30 flex items-center gap-3 shadow-card">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-amber-500 to-orange-400 opacity-85" />
          <div className="w-10 h-10 rounded-xl bg-warning-bg text-warning-text border border-amber-500/25 flex items-center justify-center shrink-0">
            <DollarSign size={20} strokeWidth={2} aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-text-secondary font-medium">PT Revenue Generated</p>
            <p className="text-xl font-extrabold tabular-nums text-success-text">{formatReportCurrency(totalRevenue)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

