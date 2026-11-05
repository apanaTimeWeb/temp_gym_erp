"use client";
// RESPONSIBILITY: Renders the top KPI stat cards for the Attendance module (total, member, staff check-ins).
// DATA FLOW: props (from useTrainerAttendanceStatsQuery via TrainerAttendanceMain) → display only
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/components/TrainerOperationsTrainerAttendanceTrainerInfrastructureSkeletonBlock';

import { TRAINER_ATTENDANCE_KPI_PRESENTATION } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/utils/TrainerOperationsTrainerAttendanceAttendanceConstants';

import type { TrainerAttendanceKPIsProps } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/types/TrainerOperationsTrainerAttendanceAttendanceKPIsProps';







/**
 * @description Renders the top KPI stat cards for the Attendance module (total, member, staff check-ins).
 * @dependencies props (from useTrainerAttendanceStatsQuery via TrainerAttendanceMain) → display only
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders read-only KPI summaries for the attendance feature using module-owned derived data and semantic design tokens.
 * @dependencies Uses only documented attendance module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerAttendanceKPIs({ stats, isPending, isError, onRetry }: TrainerAttendanceKPIsProps) {
  const t = useTranslations('TRAINER_ATTENDANCE');
  const searchParams = useSearchParams();
  const range = searchParams.get('range') || 'this_month';

  const getKpiTitle = (configKey: string, defaultLabelKey: string) => {
    if (configKey === 'totalCheckIns') {
      if (range === 'last_month') return t('TEXT_CHECK_INS_LAST_MONTH');
      if (range === 'last_3_months') return t('TEXT_CHECK_INS_LAST_3_MONTHS');
      if (range === 'this_year') return t('TEXT_CHECK_INS_THIS_YEAR');
      if (range === 'custom') return t('TEXT_TOTAL_CHECK_INS_PERIOD');
      return t('TEXT_TODAYS_CHECK_INS');
    }
    return t(defaultLabelKey);
  };

  if (isPending) return <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" aria-busy="true" aria-label={t('TEXT_TODAY_ATTENDANCE_KPIS')}>{[0, 1, 2].map((index) => <TrainerInfrastructureSkeletonBlock key={`attendance-kpi-skeleton-${index}`} className="h-24 rounded-xl border border-border" />)}</div>;
  if (isError || !stats) return <div role="alert" className="rounded-xl border border-danger-bg bg-danger-bg p-4 text-sm text-danger" data-testid="trainer_attendance-kpis-error"><p>{t('TEXT_UNABLE_TO_LOAD_ATTENDANCE_RECORDS')}</p><button type="button" onClick={onRetry} className="mt-2 min-h-11 rounded-lg px-3 font-semibold underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">{t('TEXT_REFRESH')}</button></div>;
  const valuesByKey = { totalCheckIns: stats.totalCheckIns, memberCheckIns: stats.memberCheckIns, staffCheckIns: stats.staffCheckIns } as const;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" aria-label={t("TEXT_TODAY_ATTENDANCE_KPIS")}>
      {TRAINER_ATTENDANCE_KPI_PRESENTATION.map((config) => (
        <div key={t(config.labelKey)} className="bg-card rounded-xl p-4 shadow-card border border-border flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center`}>
            <config.icon size={18} strokeWidth={2} className={config.color} aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs text-secondary font-medium line-clamp-2">{getKpiTitle(config.key, config.labelKey)}</p>
            <p className="text-xl font-bold text-primary">{valuesByKey[config.key]}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
