"use client";

import { Calendar, CheckCircle2, Clock, FileText, Award } from 'lucide-react';
import { useTranslations } from 'next-intl';

export interface TrainerOperationsLeaveRequestsLeaveKpisProps {
  totalRequests: number;
  approvedLeaves: number;
  pendingLeaves: number;
  leaveBalance: number;
}

export function TrainerOperationsLeaveRequestsLeaveKpis({
  totalRequests,
  approvedLeaves,
  pendingLeaves,
  leaveBalance,
}: TrainerOperationsLeaveRequestsLeaveKpisProps) {
  const t = useTranslations('TRAINER_SCHEDULE');
  const maxAllowance = 15;
  const usedPercentage = Math.min(100, Math.round((approvedLeaves / maxAllowance) * 100));

  return (
    <div className="space-y-4">
      {/* 4 Leave KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative overflow-hidden min-w-0 bg-card dark:bg-gradient-to-br dark:from-[#261914] dark:via-[#202020] dark:to-[#181818] rounded-2xl border border-orange-500/30 p-5 shadow-card hover:shadow-md motion-safe:transition-all flex items-center gap-4 border-l-4 border-l-primary">
          <span aria-hidden="true" className="pointer-events-none absolute -right-6 -bottom-6 h-20 w-20 rounded-full blur-2xl opacity-15 bg-orange-500" />
          <div className="relative p-3.5 rounded-xl bg-primary-subtle border border-orange-500/30 text-primary shrink-0">
            <FileText size={22} strokeWidth={2} />
          </div>
          <div className="relative min-w-0">
            <p className="text-xs text-secondary font-semibold uppercase tracking-wider">{t('TEXT_TOTAL_REQUESTS')}</p>
            <p className="text-2xl font-bold text-primary tabular-nums mt-0.5">{totalRequests}</p>
            <p className="text-2xs text-secondary mt-0.5">All-time submissions</p>
          </div>
        </div>

        <div className="relative overflow-hidden min-w-0 bg-card dark:bg-gradient-to-br dark:from-[#122620] dark:via-[#202020] dark:to-[#181818] rounded-2xl border border-emerald-500/30 p-5 shadow-card hover:shadow-md motion-safe:transition-all flex items-center gap-4 border-l-4 border-l-success">
          <span aria-hidden="true" className="pointer-events-none absolute -right-6 -bottom-6 h-20 w-20 rounded-full blur-2xl opacity-15 bg-emerald-500" />
          <div className="relative p-3.5 rounded-xl bg-success-bg border border-emerald-500/30 text-success shrink-0">
            <CheckCircle2 size={22} strokeWidth={2} />
          </div>
          <div className="relative min-w-0">
            <p className="text-xs text-secondary font-semibold uppercase tracking-wider">{t('TEXT_APPROVED_LEAVES')}</p>
            <p className="text-2xl font-bold text-success tabular-nums mt-0.5">{approvedLeaves}</p>
            <p className="text-2xs text-secondary mt-0.5">{usedPercentage}% of annual quota</p>
          </div>
        </div>

        <div className="relative overflow-hidden min-w-0 bg-card dark:bg-gradient-to-br dark:from-[#262012] dark:via-[#202020] dark:to-[#181818] rounded-2xl border border-amber-500/30 p-5 shadow-card hover:shadow-md motion-safe:transition-all flex items-center gap-4 border-l-4 border-l-warning">
          <span aria-hidden="true" className="pointer-events-none absolute -right-6 -bottom-6 h-20 w-20 rounded-full blur-2xl opacity-15 bg-amber-500" />
          <div className="relative p-3.5 rounded-xl bg-warning-bg border border-amber-500/30 text-warning shrink-0">
            <Clock size={22} strokeWidth={2} />
          </div>
          <div className="relative min-w-0">
            <p className="text-xs text-secondary font-semibold uppercase tracking-wider">{t('TEXT_PENDING_REQUESTS')}</p>
            <p className="text-2xl font-bold text-warning tabular-nums mt-0.5">{pendingLeaves}</p>
            <p className="text-2xs text-secondary mt-0.5">Awaiting manager review</p>
          </div>
        </div>

        <div className="relative overflow-hidden min-w-0 bg-card dark:bg-gradient-to-br dark:from-[#13222d] dark:via-[#202020] dark:to-[#181818] rounded-2xl border border-sky-500/30 p-5 shadow-card hover:shadow-md motion-safe:transition-all flex items-center gap-4 border-l-4 border-l-info">
          <span aria-hidden="true" className="pointer-events-none absolute -right-6 -bottom-6 h-20 w-20 rounded-full blur-2xl opacity-15 bg-sky-500" />
          <div className="relative p-3.5 rounded-xl bg-info-bg border border-sky-500/30 text-info shrink-0">
            <Award size={22} strokeWidth={2} />
          </div>
          <div className="relative min-w-0">
            <p className="text-xs text-secondary font-semibold uppercase tracking-wider">{t('TEXT_LEAVE_BALANCE')}</p>
            <p className="text-2xl font-bold text-primary tabular-nums mt-0.5">
              {leaveBalance} <span className="text-xs font-normal text-secondary">{t('TEXT_DAYS_AVAILABLE')}</span>
            </p>
            <p className="text-2xs text-secondary mt-0.5">Annual paid allowance (15d)</p>
          </div>
        </div>
      </div>

      {/* Allowance Visual Progress Bar */}
      <div className="bg-card rounded-2xl border border-border p-4 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-surface-highlight text-primary border border-border">
            <Calendar size={16} />
          </span>
          <div>
            <span className="font-bold text-primary">Annual Leave Quota Tracker: </span>
            <span className="text-secondary">{approvedLeaves} used of {maxAllowance} total days allowance ({leaveBalance} days remaining)</span>
          </div>
        </div>
        <div className="w-full sm:w-64 flex items-center gap-2">
          <div className="flex-1 h-2.5 rounded-full bg-surface-highlight overflow-hidden border border-border">
            <div
              className={`h-full rounded-full motion-safe:transition-all ${
                usedPercentage > 80 ? 'bg-danger' : usedPercentage > 50 ? 'bg-warning' : 'bg-primary'
              }`}
              style={{ width: `${usedPercentage}%` }}
            />
          </div>
          <span className="font-bold text-primary">{usedPercentage}%</span>
        </div>
      </div>
    </div>
  );
}

export const TrainerLeaveKpis = TrainerOperationsLeaveRequestsLeaveKpis;
export type TrainerLeaveKpisProps = TrainerOperationsLeaveRequestsLeaveKpisProps;
