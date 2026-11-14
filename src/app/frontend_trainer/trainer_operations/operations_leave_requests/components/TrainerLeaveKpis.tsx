"use client";

import { Calendar, CheckCircle2, Clock, FileText, Award } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface TrainerLeaveKpisProps {
  totalRequests: number;
  approvedLeaves: number;
  pendingLeaves: number;
  leaveBalance: number;
}

export function TrainerLeaveKpis({
  totalRequests,
  approvedLeaves,
  pendingLeaves,
  leaveBalance,
}: TrainerLeaveKpisProps) {
  const t = useTranslations('TRAINER_SCHEDULE');
  const maxAllowance = 15;
  const usedPercentage = Math.min(100, Math.round((approvedLeaves / maxAllowance) * 100));

  return (
    <div className="space-y-4">
      {/* 4 Leave KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-2xl border border-border p-5 shadow-card hover:shadow-md motion-safe:transition-all flex items-center gap-4 border-l-4 border-l-primary">
          <div className="p-3.5 rounded-xl bg-primary/10 text-primary shrink-0">
            <FileText size={22} strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs text-secondary font-semibold uppercase tracking-wider">{t('TEXT_TOTAL_REQUESTS')}</p>
            <p className="text-2xl font-bold text-primary mt-0.5">{totalRequests}</p>
            <p className="text-2xs text-secondary mt-0.5">All-time submissions</p>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-5 shadow-card hover:shadow-md motion-safe:transition-all flex items-center gap-4 border-l-4 border-l-success">
          <div className="p-3.5 rounded-xl bg-success/10 text-success shrink-0">
            <CheckCircle2 size={22} strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs text-secondary font-semibold uppercase tracking-wider">{t('TEXT_APPROVED_LEAVES')}</p>
            <p className="text-2xl font-bold text-success mt-0.5">{approvedLeaves}</p>
            <p className="text-2xs text-secondary mt-0.5">{usedPercentage}% of annual quota</p>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-5 shadow-card hover:shadow-md motion-safe:transition-all flex items-center gap-4 border-l-4 border-l-warning">
          <div className="p-3.5 rounded-xl bg-warning/10 text-warning shrink-0">
            <Clock size={22} strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs text-secondary font-semibold uppercase tracking-wider">{t('TEXT_PENDING_REQUESTS')}</p>
            <p className="text-2xl font-bold text-warning mt-0.5">{pendingLeaves}</p>
            <p className="text-2xs text-secondary mt-0.5">Awaiting manager review</p>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-5 shadow-card hover:shadow-md motion-safe:transition-all flex items-center gap-4 border-l-4 border-l-info">
          <div className="p-3.5 rounded-xl bg-info/10 text-info shrink-0">
            <Award size={22} strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs text-secondary font-semibold uppercase tracking-wider">{t('TEXT_LEAVE_BALANCE')}</p>
            <p className="text-2xl font-bold text-primary mt-0.5">
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
          <div className="flex-1 h-2.5 rounded-full bg-surface-highlight overflow-hidden border border-border/50">
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
