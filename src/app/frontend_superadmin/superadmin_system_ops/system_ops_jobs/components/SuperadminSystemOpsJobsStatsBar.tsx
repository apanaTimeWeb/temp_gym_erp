// RESPONSIBILITY: Renders/orchestrates SuperadminSystemOpsJobsStatsBar within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the 4 KPI metric cards at the top of the Jobs page.
// Pure view component — no state, no API calls. Receives all data via props (Rule 34).


import { Play, Activity, XCircle, AlertTriangle } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SUPERADMIN_JOBS_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/constants/superadmin_system_ops_jobs.constants';

import type { SuperadminSystemOpsJobsStatsBarProps } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/types/superadmin_system_ops_jobs_stats_bar.types';

/**
 * @description Renders four clickable Jobs KPI cards for active, completed, failed, and delayed states.
 * @dependencies Consumes feature-local metrics and the typed optional filter-selection callback.
 * @edge-case A missing filter callback leaves the KPI cards readable while preventing an invalid mutation path.
 */
export default function SuperadminSystemOpsJobsStatsBar({ metrics, selectedStatus, onFilterSelect }: SuperadminSystemOpsJobsStatsBarProps) {
  const t = useTranslations('superadmin_system_ops_jobs');
    const stats = [
        { label: t('ui.active_jobs'), value: metrics.activeJobs, icon: Play, color: 'text-primary', iconBg: "bg-primary-subtle", filter: SUPERADMIN_JOBS_STATUS_CODES.ACTIVE },
        { label: t('ui.completed_24h'), value: metrics.completed24h, icon: Activity, color: 'text-success', iconBg: "bg-success-bg", filter: SUPERADMIN_JOBS_STATUS_CODES.COMPLETED },
        { label: t('ui.failed_24h'), value: metrics.failed24h, icon: XCircle, color: 'text-danger', iconBg: 'bg-danger-bg', filter: SUPERADMIN_JOBS_STATUS_CODES.FAILED },
        { label: t('ui.delayed'), value: metrics.delayed, icon: AlertTriangle, color: 'text-warning', iconBg: "bg-warning-bg", filter: SUPERADMIN_JOBS_STATUS_CODES.DELAYED },
    ];
    return (<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (<button  type="button" key={stat.label} onClick={() => onFilterSelect?.(stat.filter)} aria-pressed={selectedStatus === stat.filter} className={`min-h-11 rounded-xl border p-5 flex items-center gap-4 motion-safe:transition-colors cursor-pointer text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:active:scale-95 ${selectedStatus === stat.filter ? 'border-focus bg-primary-subtle' : 'border-border bg-card'}`} data-testid={`superadmin_system_ops_jobs-jobs-stats-bar-action1-${index}`}>
            <div className={`w-10 h-10 rounded-lg ${stat.iconBg} flex items-center justify-center shrink-0`}>
              <Icon size={18} className={stat.color}/>
            </div>
            <div>
              <p className="text-xs text-secondary font-medium uppercase tracking-wider">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color} mt-0.5`}>{stat.value}</p>
            </div>
          </button>);
        })}
    </div>);
}
