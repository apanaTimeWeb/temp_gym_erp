"use client";
// RESPONSIBILITY: Composes the Attendance shell and selects a URL-backed screen view. Data and mutation orchestration stays in the module hook.
import { useTranslations } from 'next-intl';

import TrainerAttendanceKPIs from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/components/TrainerOperationsMemberAttendanceAttendanceKPIs';
import TrainerAttendanceModal from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/components/TrainerOperationsMemberAttendanceAttendanceModal';
import TrainerAttendanceToolbar from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/components/TrainerOperationsMemberAttendanceAttendanceToolbar';
import TrainerAttendanceMembersView from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/components/TrainerOperationsMemberAttendanceAttendanceMembersView';
import TrainerAttendanceMyAttendanceSummaryView from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/components/TrainerOperationsMemberAttendanceAttendanceMyAttendanceSummaryView';
import TrainerAttendanceMyAttendanceView from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/components/TrainerOperationsMemberAttendanceAttendanceMyAttendanceView';
import { useTrainerAttendanceMain } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/hooks/useTrainerOperationsMemberAttendanceAttendanceMain';

export default function TrainerAttendanceMain() {
  const t = useTranslations('TRAINER_ATTENDANCE');
  const model = useTrainerAttendanceMain();

  const handleExportCsv = () => {
    const header = ['ID', 'Type', 'Name', 'Date', 'Check In', 'Check Out', 'Duration (min)', 'Method'];
    const csvRows = [
      header.join(','),
      ...model.records.map((r) =>
        [
          r.id,
          r.type,
          `"${String(r.member?.name ?? r.staff?.name ?? '').replace(/"/g, '""')}"`,
          r.date,
          r.checkIn ?? '',
          r.checkOut ?? '',
          r.durationMinutes ?? '',
          r.checkInMethod ?? '',
        ].join(',')
      ),
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'trainer_attendance_report.csv';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-full pb-10 attendance-module bg-page text-text-primary">
      <div className="p-4 sm:p-6 space-y-5">
        <TrainerAttendanceKPIs stats={model.stats} isPending={model.statsQuery.isPending} isError={model.statsQuery.isError} onRetry={() => void model.statsQuery.refetch()} />
        {model.tab === 'MY_ATTENDANCE' && <TrainerAttendanceMyAttendanceSummaryView model={model} />}
        <div className="bg-card rounded-xl shadow-card border border-border">
          <TrainerAttendanceToolbar
            tab={model.filters.tab}
            setTab={model.filters.setTab}
            viewMode={model.viewMode}
            setViewMode={model.setViewMode}
            search={model.search}
            setSearch={model.filters.setSearch}
            filterDate={model.filterDate}
            setFilterDate={model.filters.setFilterDate}
            onAddRecord={model.openModal}
            onRefresh={model.handleRefresh}
            onExportCsv={handleExportCsv}
            onSelfCheckIn={model.handleSelfCheckIn}
            onSelfCheckOut={model.handleSelfCheckOut}
            selfCheckInPending={model.selfCheckInPending}
            selfCheckOutPending={model.selfCheckOutPending}
            isRefreshing={model.isRefreshing}
          />
          {model.tab === 'MY_ATTENDANCE'
            ? <TrainerAttendanceMyAttendanceView model={model} />
            : <TrainerAttendanceMembersView model={model} />}
        </div>
      </div>
      <TrainerAttendanceModal isOpen={model.showModal} onClose={model.closeModal} members={model.members} membersLoading={model.membersQuery.isPending || model.membersQuery.isFetching} membersError={model.membersQuery.isError} onRetryMembers={() => void model.membersQuery.refetch()} saving={model.markAttendancePending} onSubmit={model.handleMarkAttendance} testId="trainer-attendance-attendance-main-modal" />
    </div>
  );
}
