'use client';
// RESPONSIBILITY: Canonical Members attendance route with no self-attendance workflow UI.
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import TrainerAttendanceKPIs from './TrainerOperationsMemberAttendanceAttendanceKPIs';
import TrainerAttendanceMembersView from './TrainerOperationsMemberAttendanceAttendanceMembersView';
import TrainerAttendanceModal from './TrainerOperationsMemberAttendanceAttendanceModal';
import TrainerOperationsMemberAttendanceQuickMark from './TrainerOperationsMemberAttendanceQuickMark';
import TrainerOperationsMemberAttendanceMembersToolbar from './TrainerOperationsMemberAttendanceMembersToolbar';
import { useTrainerAttendanceMain } from '../hooks/useTrainerOperationsMemberAttendanceAttendanceMain';

export default function TrainerOperationsMemberAttendanceMembersMain() {
  const t = useTranslations('TRAINER_ATTENDANCE');
  const model = useTrainerAttendanceMain({ forcedTab: 'MEMBERS' });
  const { tab, setTab } = model.filters;
  useEffect(() => { if (tab !== 'MEMBERS') setTab('MEMBERS'); }, [tab, setTab]);

  const handleExportCsv = () => {
    const header = ['ID', 'Member', 'Date', 'Check In', 'Check Out', 'Duration (min)', 'Method'];
    const csvRows = [
      header.join(','),
      ...model.records.map((r) =>
        [
          r.id,
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
    link.download = 'member_attendance_records.csv';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <main data-testid="trainer-canonical-operations_member_attendance" className="min-h-full space-y-5 bg-page p-4 text-text-primary sm:p-6">
      <h1 className="text-section-title font-bold text-text-primary">{t('TEXT_MEMBERS_TAB')}</h1>
      <TrainerAttendanceKPIs stats={model.stats} isPending={model.statsQuery.isPending}
        isError={model.statsQuery.isError} onRetry={() => void model.statsQuery.refetch()} />
      <TrainerOperationsMemberAttendanceQuickMark
        members={model.members}
        records={model.records}
        onQuickMark={model.handleQuickMark}
        onCheckOut={model.handleCheckOutRecord}
        onOpenModalWithMember={model.openModalForMember}
        onOpenModal={model.openModal}
        isPending={model.markAttendancePending}
      />
      <section className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
        <TrainerOperationsMemberAttendanceMembersToolbar model={model} onExportCsv={handleExportCsv} />
        <TrainerAttendanceMembersView model={model} />
      </section>
      <TrainerAttendanceModal isOpen={model.showModal} onClose={model.closeModal}
        initialMemberId={model.selectedMemberId}
        members={model.members} membersLoading={model.membersQuery.isPending || model.membersQuery.isFetching}
        membersError={model.membersQuery.isError} onRetryMembers={() => void model.membersQuery.refetch()}
        saving={model.markAttendancePending} onSubmit={model.handleMarkAttendance}
        testId="trainer-member-attendance-modal" />
    </main>
  );
}
