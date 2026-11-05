"use client";
// RESPONSIBILITY: Screen-level Members attendance view, isolated from the My Attendance screen.
import { Loader2, RefreshCw } from 'lucide-react';
import { useTranslations } from 'next-intl';

import TrainerAttendanceTable from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/components/TrainerOperationsMemberAttendanceAttendanceTable';
import type { useTrainerAttendanceMain } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/hooks/useTrainerOperationsMemberAttendanceAttendanceMain';

export default function TrainerAttendanceMembersView({ model }: { model: ReturnType<typeof useTrainerAttendanceMain> }) {
  const t = useTranslations('TRAINER_ATTENDANCE');
  if (model.recordsQuery.isError) {
    return (
      <div className="p-8 text-center border-t border-border" role="alert" data-testid="trainer_attendance-attendance-main_unable_to_load_attendance_records">
        <p className="text-sm font-semibold text-danger" data-testid="trainer_attendance-main-error_state">{t('TEXT_UNABLE_TO_LOAD_ATTENDANCE_RECORDS')}</p>
        <p className="text-sm text-secondary mt-1">{t('TEXT_USE_REFRESH_TO_RETRY_THIS_SECTION')}</p>
        <button type="button" onClick={() => void model.recordsQuery.refetch()} disabled={model.recordsQuery.isFetching} className="min-h-11 mt-4 min-w-28 px-4 py-2 bg-primary text-on-primary rounded-lg font-semibold motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_attendance-trainerattendancemain-button_2">
          {model.recordsQuery.isFetching ? <><Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin" aria-hidden="true" />{t('TEXT_REFRESHING')}</> : <><RefreshCw size={18} strokeWidth={2} aria-hidden="true" />{t('TEXT_REFRESH')}</>}
        </button>
      </div>
    );
  }
  return (
    <TrainerAttendanceTable records={model.records} totalRecords={model.totalRecords} isPending={model.recordsQuery.isPending || model.recordsQuery.isFetching} search={model.search} filterDate={model.filterDate} currentPage={model.currentPage} sortBy={model.sortBy} sortDirection={model.sortDirection} onPageChange={model.filters.setCurrentPage} onSort={model.filters.setSort} />
  );
}
