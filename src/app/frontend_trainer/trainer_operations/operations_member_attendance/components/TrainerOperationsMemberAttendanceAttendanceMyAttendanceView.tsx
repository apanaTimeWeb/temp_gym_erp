"use client";
// RESPONSIBILITY: Screen-level My Attendance content view; calendar/table mode remains a presentation preference.
import { useTranslations } from 'next-intl';

import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/components/TrainerOperationsMemberAttendanceTrainerInfrastructureSkeletonBlock';
import TrainerAttendanceMyAttendanceCalendar from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/components/TrainerOperationsMemberAttendanceAttendanceMyAttendanceCalendar';
import TrainerAttendanceTable from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/components/TrainerOperationsMemberAttendanceAttendanceTable';
import type { useTrainerAttendanceMain } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/hooks/useTrainerOperationsMemberAttendanceAttendanceMain';

export default function TrainerAttendanceMyAttendanceView({ model }: { model: ReturnType<typeof useTrainerAttendanceMain> }) {
  const t = useTranslations('TRAINER_ATTENDANCE');
  if (model.viewMode === 'calendar') {
    if (model.myAttendanceHistoryQuery.isPending) {
      return (
        <div className="p-6 space-y-5" aria-busy="true" aria-label={t('TEXT_LOADING_ATTENDANCE_RECORDS')} data-testid="trainer_attendance-calendar-loading">
          <div className="flex flex-wrap items-center justify-between gap-4"><TrainerInfrastructureSkeletonBlock className="h-8 w-56 rounded-lg" /><TrainerInfrastructureSkeletonBlock className="h-11 w-48 rounded-lg" /></div>
          <TrainerInfrastructureSkeletonBlock className="h-80 w-full rounded-xl" />
        </div>
      );
    }
    if (model.myAttendanceHistoryQuery.isError) {
      return (
        <div className="p-8 text-center border-t border-border" role="alert" data-testid="trainer_attendance-calendar-error">
          <p className="text-sm font-semibold text-danger">{t('TEXT_UNABLE_TO_LOAD_ATTENDANCE_RECORDS')}</p>
          <button type="button" onClick={() => void model.myAttendanceHistoryQuery.refetch()} className="min-h-11 mt-4 min-w-28 px-4 py-2 rounded-lg font-semibold underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">{t('TEXT_REFRESH')}</button>
        </div>
      );
    }
    return <TrainerAttendanceMyAttendanceCalendar records={model.myAttendanceRecords} />;
  }

  if (model.recordsQuery.isError) {
    return (
      <div className="p-8 text-center border-t border-border" role="alert" data-testid="trainer_attendance-attendance-main_unable_to_load_attendance_records">
        <p className="text-sm font-semibold text-danger">{t('TEXT_UNABLE_TO_LOAD_ATTENDANCE_RECORDS')}</p>
        <p className="text-sm text-secondary mt-1">{t('TEXT_USE_REFRESH_TO_RETRY_THIS_SECTION')}</p>
        <button type="button" onClick={() => void model.handleRefresh()} disabled={model.isRefreshing} className="min-h-11 mt-4 min-w-28 px-4 py-2 bg-primary text-on-primary rounded-lg font-semibold motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_attendance-trainerattendancemain-button_2">
          {model.isRefreshing ? t('TEXT_REFRESHING') : t('TEXT_REFRESH')}
        </button>
      </div>
    );
  }

  return (
    <TrainerAttendanceTable records={model.records} totalRecords={model.totalRecords} isPending={model.recordsQuery.isPending || model.recordsQuery.isFetching} search={model.search} filterDate={model.filterDate} currentPage={model.currentPage} sortBy={model.sortBy} sortDirection={model.sortDirection} onPageChange={model.filters.setCurrentPage} onSort={model.filters.setSort} />
  );
}
