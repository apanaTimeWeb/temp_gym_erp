// RESPONSIBILITY: Composes the trainer attendance screen from query-backed sections; attendance API logic stays in hooks.
"use client";
import { useTranslations } from 'next-intl';
import { Download } from 'lucide-react';
import { useTrainerAttendanceMain } from '../hooks/useTrainerOperationsTrainerAttendanceAttendanceMain';
import TrainerAttendanceKPIs from './TrainerOperationsTrainerAttendanceAttendanceKPIs';
import TrainerAttendanceMyAttendanceView from './TrainerOperationsTrainerAttendanceAttendanceMyAttendanceView';
import TrainerAttendanceMyAttendanceSummaryView from './TrainerOperationsTrainerAttendanceAttendanceMyAttendanceSummaryView';
import TrainerOperationsTrainerAttendanceDateFilterDropdown from './TrainerOperationsTrainerAttendanceDateFilterDropdown';

 export default function TrainerOperationsTrainerAttendanceMain() {
  const model = useTrainerAttendanceMain();
  const t = useTranslations('TRAINER_ATTENDANCE');

  const handleExportCsv = () => {
    const header = ['Record ID', 'Type', 'Name', 'Date', 'Check-In', 'Check-Out', 'Duration (mins)', 'Method'];
    const rows = [
      header.join(','),
      ...model.records.map((r) =>
        [
          r.id,
          r.type,
          `"${String(r.staff?.name ?? r.member?.name ?? '').replace(/"/g, '""')}"`,
          r.date,
          r.checkIn ?? '',
          r.checkOut ?? '',
          r.durationMinutes ?? '',
          `"${String(r.checkInMethod ?? '').replace(/"/g, '""')}"`,
        ].join(',')
      ),
    ];
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
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
   <main className="min-h-full space-y-5 p-4 sm:p-6">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
     <div>
       <h1 className="text-section-title font-bold text-text-primary">{t('TEXT_MY_ATTENDANCE_TAB')}</h1>
       <p className="text-sm text-secondary mt-1">{t('TEXT_TRAINER_MONTHLY_BIOMETRIC_ATTENDANCE_LOG_B8F726BF')}</p>
     </div>
     <TrainerOperationsTrainerAttendanceDateFilterDropdown />
    </div>

    <div className="flex flex-wrap items-center gap-3">
     <button type="button" onClick={() => void model.handleSelfCheckIn()} disabled={model.selfCheckInPending} className="min-h-11 rounded-lg bg-success px-4 text-on-success font-medium disabled:opacity-70 focus-visible:ring-2 focus-visible:ring-focus-ring">{t('TEXT_CHECK_IN')}</button>
     <button type="button" onClick={() => void model.handleSelfCheckOut()} disabled={model.selfCheckOutPending} className="min-h-11 rounded-lg bg-primary px-4 text-on-primary font-medium disabled:opacity-70 focus-visible:ring-2 focus-visible:ring-focus-ring">{t('TEXT_CHECK_OUT')}</button>
     <button type="button" onClick={() => void model.handleRefresh()} disabled={model.isRefreshing} className="min-h-11 rounded-lg border border-border px-4 text-text-primary font-medium hover:bg-input focus-visible:ring-2 focus-visible:ring-focus-ring">{t('TEXT_REFRESH_ATTENDANCE_RECORDS')}</button>
     <button
       type="button"
       onClick={handleExportCsv}
       className="min-h-11 inline-flex items-center gap-1.5 rounded-lg border border-border px-4 text-text-primary font-medium hover:bg-input focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
       data-testid="trainer_attendance-export-csv-button"
     >
       <Download size={15} />
       Export Log
     </button>
    <div className="ms-auto flex gap-2">
      <button type="button" onClick={() => model.setViewMode('calendar')} aria-pressed={model.viewMode==='calendar'} className={`min-h-11 rounded-lg border px-4 font-medium motion-safe:transition-colors ${model.viewMode === 'calendar' ? 'bg-primary text-on-primary border-primary' : 'border-border text-primary'}`}>{t('TEXT_CALENDAR')}</button>
      <button type="button" onClick={() => model.setViewMode('table')} aria-pressed={model.viewMode==='table'} className={`min-h-11 rounded-lg border px-4 font-medium motion-safe:transition-colors ${model.viewMode === 'table' ? 'bg-primary text-on-primary border-primary' : 'border-border text-primary'}`}>{t('TEXT_LIST')}</button>
    </div>
   </div>

   <TrainerAttendanceKPIs stats={model.stats} isPending={model.statsQuery.isPending} isError={model.statsQuery.isError} onRetry={() => void model.statsQuery.refetch()} />
   <TrainerAttendanceMyAttendanceSummaryView model={model} />
   <TrainerAttendanceMyAttendanceView model={model} />
  </main>
 );
}
