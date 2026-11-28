"use client";
// RESPONSIBILITY: Renders the top KPI stat cards for the Attendance module (total, member, staff check-ins).
// DATA FLOW: props (from useTrainerAttendanceStatsQuery via TrainerAttendanceMain) → display only
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/components/TrainerOperationsMemberAttendanceTrainerInfrastructureSkeletonBlock';

import { TRAINER_ATTENDANCE_KPI_PRESENTATION } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/utils/TrainerOperationsMemberAttendanceAttendanceConstants';

import type { TrainerAttendanceKPIsProps } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/types/TrainerOperationsMemberAttendanceAttendanceKPIsProps';







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
  const dateFilter = searchParams.get('date') ?? 'ALL_TIME';

  const getKpiTitle = (key: string, defaultLabelKey: string) => {
    if (key === 'totalCheckIns') {
      if (dateFilter === 'YESTERDAY') return t('TEXT_CHECK_INS_YESTERDAY');
      if (dateFilter === 'LAST_7_DAYS') return t('TEXT_CHECK_INS_LAST_7_DAYS');
      if (dateFilter === 'THIS_MONTH') return t('TEXT_CHECK_INS_THIS_MONTH');
      if (dateFilter === 'ALL_TIME') return t('TEXT_CHECK_INS_ALL_TIME');
      return t('TEXT_TODAYS_CHECK_INS');
    }
    return t(defaultLabelKey);
  };

  if (isPending) return <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" aria-busy="true" aria-label={t('TEXT_TODAY_ATTENDANCE_KPIS')}>{[0, 1, 2].map((index) => <TrainerInfrastructureSkeletonBlock key={`attendance-kpi-skeleton-${index}`} className="h-24 rounded-xl border border-border" />)}</div>;
  if (isError || !stats) return <div role="alert" className="rounded-xl border border-danger-bg bg-danger-bg p-4 text-sm text-danger" data-testid="trainer_attendance-kpis-error"><p>{t('TEXT_UNABLE_TO_LOAD_ATTENDANCE_RECORDS')}</p><button type="button" onClick={onRetry} className="mt-2 min-h-11 rounded-lg px-3 font-semibold underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">{t('TEXT_REFRESH')}</button></div>;
  const valuesByKey = { totalCheckIns: stats.totalCheckIns, memberCheckIns: stats.memberCheckIns, staffCheckIns: stats.staffCheckIns } as const;

  const attendanceAccents: Record<string, { border: string; surface: string; topBar: string; glow: string; stroke: string; badge: string }> = {
    totalCheckIns: {
      border: 'border-amber-500/40 hover:border-amber-400/75',
      surface: 'bg-card dark:bg-gradient-to-br dark:from-[#281E10] dark:via-[#141B2D] dark:to-[#0C1220]',
      topBar: 'from-[#F59E0B] via-[#FACC15] to-transparent',
      glow: 'bg-amber-500',
      stroke: '#FBBF24',
      badge: 'border-amber-500/35',
    },
    memberCheckIns: {
      border: 'border-sky-500/40 hover:border-sky-400/75',
      surface: 'bg-card dark:bg-gradient-to-br dark:from-[#0E2438] dark:via-[#141B2D] dark:to-[#0C1220]',
      topBar: 'from-[#38BDF8] via-[#22D3EE] to-transparent',
      glow: 'bg-sky-500',
      stroke: '#38BDF8',
      badge: 'border-sky-500/35',
    },
    staffCheckIns: {
      border: 'border-emerald-500/40 hover:border-emerald-400/75',
      surface: 'bg-card dark:bg-gradient-to-br dark:from-[#0C2722] dark:via-[#141B2D] dark:to-[#0C1220]',
      topBar: 'from-[#10B981] via-[#34D399] to-transparent',
      glow: 'bg-emerald-500',
      stroke: '#34D399',
      badge: 'border-emerald-500/35',
    },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" aria-label={t("TEXT_TODAY_ATTENDANCE_KPIS")}>
      {TRAINER_ATTENDANCE_KPI_PRESENTATION.map((config) => {
        const accent = attendanceAccents[config.key] ?? attendanceAccents.totalCheckIns;
        return (
          <div key={t(config.labelKey)} className={`relative overflow-hidden ${accent.surface} rounded-2xl p-4 shadow-card border ${accent.border} flex items-center gap-3 motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-0.5`}>
            <span aria-hidden="true" className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${accent.topBar}`} />
            <span aria-hidden="true" className={`pointer-events-none absolute -right-6 -bottom-6 h-20 w-20 rounded-full blur-2xl opacity-20 ${accent.glow}`} />
            <svg aria-hidden="true" viewBox="0 0 150 45" className="pointer-events-none absolute bottom-0 right-0 h-12 w-28 opacity-25">
              <path d="M0 36 Q28 30 56 24 T106 16 T150 8" fill="none" stroke={accent.stroke} strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <div className={`relative w-10 h-10 rounded-xl border ${accent.badge} ${config.bg} flex items-center justify-center shrink-0`}>
              <config.icon size={18} strokeWidth={2} className={config.color} aria-hidden="true" />
            </div>
            <div className="relative min-w-0">
              <p className="text-xs text-secondary font-medium line-clamp-2">{getKpiTitle(config.key, config.labelKey)}</p>
              <p className="text-kpi font-extrabold text-text-primary tabular-nums">{valuesByKey[config.key]}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
