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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* KPI 1 */}
      <div className="bg-card border border-border rounded-xl p-5 motion-safe:hover:-translate-y-1 motion-safe:transition-all motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-primary-subtle rounded-lg">
            <Users size={18} strokeWidth={2} className="text-primary"/>
          </div>
          <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">
            {t('TEXT_KPI_ACTIVE_PT_MEMBERS', { suffix: dateSuffix })}
          </span>
        </div>
        <div className="text-2xl font-bold text-text-primary">
          {kpis.totalActiveAssignments}
        </div>
      </div>

      {/* KPI 2 */}
      <div className="bg-card border border-border rounded-xl p-5 motion-safe:hover:-translate-y-1 motion-safe:transition-all motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
        <div className="flex items-center gap-3 mb-3">
          <div data-testid="manager_pt-manager-pt-main-status-1" className="p-2 bg-success-bg rounded-lg">
            <CalendarCheck size={18} strokeWidth={2} className="text-success-text" data-testid="manager_pt-managerptkpis-interactive"/>
          </div>
          <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">
            {t('TEXT_KPI_SESSIONS_TODAY', { suffix: dateSuffix })}
          </span>
        </div>
        <div className="text-2xl font-bold text-text-primary">
          {kpis.sessionsScheduledToday}
        </div>
      </div>

      {/* KPI 3 */}
      <div className="bg-card border border-border rounded-xl p-5 motion-safe:hover:-translate-y-1 motion-safe:transition-all motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
        <div className="flex items-center gap-3 mb-3">
          <div data-testid="manager_pt-manager-pt-main-status-2" className="p-2 bg-warning-bg rounded-lg">
            <AlertCircle size={18} strokeWidth={2} className="text-warning-text"/>
          </div>
          <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">
            {t('TEXT_KPI_EXPIRING_PACKAGES', { suffix: dateSuffix })}
          </span>
        </div>
        <div className="text-2xl font-bold text-text-primary">
          {kpis.packagesExpiringSoon}
        </div>
      </div>

      {/* KPI 4 */}
      <div className="bg-card border border-border rounded-xl p-5 motion-safe:hover:-translate-y-1 motion-safe:transition-all motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
        <div className="flex items-center gap-3 mb-3">
          <div data-testid="manager_pt-manager-pt-main-status-3" className="p-2 bg-info-bg rounded-lg">
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
