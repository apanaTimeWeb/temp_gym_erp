// RESPONSIBILITY: Composes the trainer attendance screen from query-backed sections; attendance API logic stays in hooks.
"use client";
import { useTranslations } from 'next-intl';
import { useTrainerAttendanceMain } from '../hooks/useTrainerOperationsTrainerAttendanceAttendanceMain';
import TrainerAttendanceKPIs from './TrainerOperationsTrainerAttendanceAttendanceKPIs';
import TrainerAttendanceMyAttendanceView from './TrainerOperationsTrainerAttendanceAttendanceMyAttendanceView';
import TrainerAttendanceMyAttendanceSummaryView from './TrainerOperationsTrainerAttendanceAttendanceMyAttendanceSummaryView';
export default function TrainerOperationsTrainerAttendanceMain() {
 const model=useTrainerAttendanceMain();
 const t=useTranslations('TRAINER_ATTENDANCE');
 return <main className="min-h-full space-y-5 p-4 sm:p-6"><div className="flex flex-wrap items-center gap-3">
  <h1 className="me-auto text-section-title font-bold text-primary">{t('TEXT_MY_ATTENDANCE_TAB')}</h1>
  <button type="button" onClick={() => void model.handleSelfCheckIn()} disabled={model.selfCheckInPending} className="min-h-11 rounded-lg bg-success px-4 text-on-success disabled:opacity-70 focus-visible:ring-2 focus-visible:ring-focus-ring">{t('TEXT_CHECK_IN')}</button>
  <button type="button" onClick={() => void model.handleSelfCheckOut()} disabled={model.selfCheckOutPending} className="min-h-11 rounded-lg bg-primary px-4 text-on-primary disabled:opacity-70 focus-visible:ring-2 focus-visible:ring-focus-ring">{t('TEXT_CHECK_OUT')}</button>
  <button type="button" onClick={() => void model.handleRefresh()} disabled={model.isRefreshing} className="min-h-11 rounded-lg border border-border px-4 text-primary focus-visible:ring-2 focus-visible:ring-focus-ring">{t('TEXT_REFRESH_ATTENDANCE_RECORDS')}</button>
  <div className="flex gap-2"><button type="button" onClick={() => model.setViewMode('calendar')} aria-pressed={model.viewMode==='calendar'} className="min-h-11 rounded-lg border border-border px-4 text-primary">{t('TEXT_CALENDAR')}</button><button type="button" onClick={() => model.setViewMode('table')} aria-pressed={model.viewMode==='table'} className="min-h-11 rounded-lg border border-border px-4 text-primary">{t('TEXT_LIST')}</button></div>
 </div><TrainerAttendanceKPIs stats={model.stats} isPending={model.statsQuery.isPending} isError={model.statsQuery.isError} onRetry={() => void model.statsQuery.refetch()}/><TrainerAttendanceMyAttendanceSummaryView model={model}/><TrainerAttendanceMyAttendanceView model={model}/></main>;
}
