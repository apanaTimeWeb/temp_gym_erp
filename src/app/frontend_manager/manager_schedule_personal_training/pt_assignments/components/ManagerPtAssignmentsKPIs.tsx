// RESPONSIBILITY: Renders ManagerPtAssignmentsKPIs's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Users, CalendarCheck, TrendingUp, AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useDateRangeSuffix } from '@/lib/useDateRangeSuffix';

import { ManagerPtAssignmentsFormatCurrency } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/utils/ManagerPtAssignmentsFormatters';
import type { ManagerPtAssignmentsKPIsProps } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/types/manager_pt_assignments_kpis.types';




/** @description Renders the top-level KPI stat cards for the PT Dashboard. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerPtAssignmentsKPIs({ kpis }: ManagerPtAssignmentsKPIsProps) {
  const t = useTranslations('MANAGER_PT_ASSIGNMENTS');
  const dateSuffix = useDateRangeSuffix();
  if (!kpis) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* KPI 1 */}
      <div className="relative overflow-hidden bg-card dark:bg-gradient-to-br dark:from-[#0E1629] dark:via-[#141B2D] dark:to-[#0C1220] border border-indigo-500/30 rounded-2xl p-5 shadow-card motion-safe:hover:-translate-y-1 motion-safe:transition-all motion-safe:duration-200 ease-in-out">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-indigo-500 to-sky-400 opacity-85" />
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-primary-subtle rounded-xl border border-indigo-500/25 shrink-0">
            <Users size={18} strokeWidth={2} className="text-primary"/>
          </div>
          <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">
            {t('TEXT_KPI_ACTIVE_PT_MEMBERS', { suffix: dateSuffix })}
          </span>
        </div>
        <div className="text-2xl font-extrabold tabular-nums text-text-primary">
          {kpis.totalActiveAssignments}
        </div>
      </div>

      {/* KPI 2 */}
      <div className="relative overflow-hidden bg-card dark:bg-gradient-to-br dark:from-[#0E1629] dark:via-[#141B2D] dark:to-[#0C1220] border border-emerald-500/30 rounded-2xl p-5 shadow-card motion-safe:hover:-translate-y-1 motion-safe:transition-all motion-safe:duration-200 ease-in-out">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-500 to-teal-400 opacity-85" />
        <div className="flex items-center gap-3 mb-3">
          <div data-testid="manager_pt-manager-pt-main-status-1" className="p-2 bg-success-bg rounded-xl border border-emerald-500/25 shrink-0">
            <CalendarCheck size={18} strokeWidth={2} className="text-success-text" data-testid="manager_pt-managerptkpis-interactive"/>
          </div>
          <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">
            {t('TEXT_KPI_SESSIONS_TODAY', { suffix: dateSuffix })}
          </span>
        </div>
        <div className="text-2xl font-extrabold tabular-nums text-text-primary">
          {kpis.sessionsScheduledToday}
        </div>
      </div>

      {/* KPI 3 */}
      <div className="relative overflow-hidden bg-card dark:bg-gradient-to-br dark:from-[#0E1629] dark:via-[#141B2D] dark:to-[#0C1220] border border-amber-500/30 rounded-2xl p-5 shadow-card motion-safe:hover:-translate-y-1 motion-safe:transition-all motion-safe:duration-200 ease-in-out">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-amber-500 to-orange-400 opacity-85" />
        <div className="flex items-center gap-3 mb-3">
          <div data-testid="manager_pt-manager-pt-main-status-2" className="p-2 bg-warning-bg rounded-xl border border-amber-500/25 shrink-0">
            <AlertCircle size={18} strokeWidth={2} className="text-warning-text"/>
          </div>
          <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">
            {t('TEXT_KPI_EXPIRING_PACKAGES', { suffix: dateSuffix })}
          </span>
        </div>
        <div className="text-2xl font-extrabold tabular-nums text-text-primary">
          {kpis.packagesExpiringSoon}
        </div>
      </div>

      {/* KPI 4 */}
      <div className="relative overflow-hidden bg-card dark:bg-gradient-to-br dark:from-[#0E1629] dark:via-[#141B2D] dark:to-[#0C1220] border border-sky-500/30 rounded-2xl p-5 shadow-card motion-safe:hover:-translate-y-1 motion-safe:transition-all motion-safe:duration-200 ease-in-out">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-sky-500 to-cyan-400 opacity-85" />
        <div className="flex items-center gap-3 mb-3">
          <div data-testid="manager_pt-manager-pt-main-status-3" className="p-2 bg-info-bg rounded-xl border border-sky-500/25 shrink-0">
            <TrendingUp size={18} strokeWidth={2} className="text-info-text"/>
          </div>
          <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">
            {t('TEXT_KPI_MONTHLY_PT_REVENUE', { suffix: dateSuffix })}
          </span>
        </div>
        <div className="text-2xl font-bold text-text-primary">
          {ManagerPtAssignmentsFormatCurrency(kpis.monthlyPtRevenue, 'INR', 'en-IN')}
        </div>
      </div>
    </div>
  );
}
