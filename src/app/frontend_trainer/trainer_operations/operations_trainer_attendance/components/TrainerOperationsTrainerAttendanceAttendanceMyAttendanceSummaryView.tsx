"use client";
// RESPONSIBILITY: Screen-level summary region for the My Attendance view.
import { useTranslations } from 'next-intl';

import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/components/TrainerOperationsTrainerAttendanceTrainerInfrastructureSkeletonBlock';
import TrainerAttendanceSummaryCard from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/components/TrainerOperationsTrainerAttendanceAttendanceSummaryCard';
import type { useTrainerAttendanceMain } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/hooks/useTrainerOperationsTrainerAttendanceAttendanceMain';

export default function TrainerAttendanceMyAttendanceSummaryView({ model }: { model: ReturnType<typeof useTrainerAttendanceMain> }) {
  const t = useTranslations('TRAINER_ATTENDANCE');
  if (model.myAttendanceHistoryQuery.isPending) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4" aria-busy="true" aria-label={t('TEXT_LOADING_ATTENDANCE_RECORDS')} data-testid="trainer_attendance-history-summary-loading">
        <TrainerInfrastructureSkeletonBlock className="h-24 rounded-xl border border-border" />
        <TrainerInfrastructureSkeletonBlock className="h-24 rounded-xl border border-border" />
        <TrainerInfrastructureSkeletonBlock className="h-24 rounded-xl border border-border" />
        <TrainerInfrastructureSkeletonBlock className="h-24 rounded-xl border border-border" />
      </div>
    );
  }
  if (model.myAttendanceHistoryQuery.isError) {
    if (model.viewMode === 'calendar') return null;
    return (
      <div role="alert" className="rounded-xl border border-danger-bg bg-danger-bg p-4 text-sm text-danger" data-testid="trainer_attendance-history-summary-error">
        <p>{t('TEXT_UNABLE_TO_LOAD_ATTENDANCE_RECORDS')}</p>
        <button type="button" onClick={() => void model.myAttendanceHistoryQuery.refetch()} className="mt-2 min-h-11 rounded-lg px-3 font-semibold underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">{t('TEXT_REFRESH')}</button>
      </div>
    );
  }
  return <TrainerAttendanceSummaryCard records={model.myAttendanceRecords} />;
}
