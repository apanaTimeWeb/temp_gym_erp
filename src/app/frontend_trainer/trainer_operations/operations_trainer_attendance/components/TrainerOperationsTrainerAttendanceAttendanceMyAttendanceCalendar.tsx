"use client";
// RESPONSIBILITY: Renders the trainer's own monthly attendance calendar history and quarterly multi-month log.
// DATA FLOW: props (records from TrainerAttendanceMain) → display only

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { format } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, ShieldCheck, UserCheck } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { getUser } from '@/lib/api';
import { buildTrainerAttendanceCalendarDays, buildTrainerAttendanceCalendarRecordMap, getTrainerAttendanceCalendarSummary } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/utils/TrainerOperationsTrainerAttendanceAttendanceCalendarUtils';
import type { TrainerAttendanceMyAttendanceCalendarProps } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/types/TrainerOperationsTrainerAttendanceAttendanceMyAttendanceCalendarTypes';
import { TrainerAttendanceCalendarMonthGrid } from './TrainerAttendanceCalendarMonthGrid';
import { TrainerAttendanceQuarterlyRecordsTable } from './TrainerAttendanceQuarterlyRecordsTable';

export default function TrainerAttendanceMyAttendanceCalendar({ records }: TrainerAttendanceMyAttendanceCalendarProps) {
  const t = useTranslations('TRAINER_ATTENDANCE');
  const locale = useLocale();
  const dateFnsLocale = locale === 'hi' ? hi : enUS;
  const weekDays = useMemo(() => Array.from({ length: 7 }, (_, index) => format(new Date(2023, 0, index + 1), 'EEE', { locale: dateFnsLocale })), [dateFnsLocale]);
  const user = getUser();
  const searchParams = useSearchParams();
  const range = searchParams.get('range') || 'this_month';
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';

  const [currentDate, setCurrentDate] = useState(() => {
    const d = new Date();
    if (range === 'last_month') return new Date(d.getFullYear(), d.getMonth() - 1, 1);
    return d;
  });

  const [quarterViewTab, setQuarterViewTab] = useState<'calendar' | 'all_records'>('calendar');

  const isThreeMonthsRange = range === 'last_3_months';
  const threeMonthsList = useMemo(() => {
    const base = new Date();
    return [
      new Date(base.getFullYear(), base.getMonth() - 2, 1),
      new Date(base.getFullYear(), base.getMonth() - 1, 1),
      new Date(base.getFullYear(), base.getMonth(), 1),
    ];
  }, []);

  useEffect(() => {
    const d = new Date();
    if (range === 'last_month') {
      setCurrentDate(new Date(d.getFullYear(), d.getMonth() - 1, 1));
    } else {
      setCurrentDate(d);
    }
  }, [range]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = format(currentDate, 'MMMM', { locale: dateFnsLocale });
  const firstDayIndex = new Date(year, month, 1).getDay();

  const daysInMonth = useMemo(() => new Date(year, month + 1, 0).getDate(), [year, month]);
  const today = useMemo(() => new Date(), []);
  const recordMap = useMemo(
    () => buildTrainerAttendanceCalendarRecordMap(records, year, month),
    [records, year, month],
  );
  const daysArray = useMemo(
    () => buildTrainerAttendanceCalendarDays({ year, month, currentDate, today, daysInMonth, recordMap }),
    [year, month, currentDate, today, daysInMonth, recordMap],
  );
  const { presentDays, absentDays, weeklyOffDays, attPct } = useMemo(
    () => getTrainerAttendanceCalendarSummary(daysArray),
    [daysArray],
  );

  // Filter records within the 3-month or custom date range
  const rangeRecords = useMemo(() => {
    if (!startDate && !endDate) return records;
    return records.filter((r) => {
      if (!r.date) return false;
      if (startDate && r.date < startDate) return false;
      if (endDate && r.date > endDate) return false;
      return true;
    }).sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  }, [records, startDate, endDate]);

  return (
    <div className="p-6 space-y-6">
      {/* 3-Month Quarter Selector if range=last_3_months */}
      {isThreeMonthsRange && (
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 space-y-4 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary text-on-primary">
                  Quarterly View (Last 3 Months)
                </span>
                <span className="text-xs font-semibold text-primary">
                  {format(threeMonthsList[0], 'MMM yyyy')} – {format(threeMonthsList[2], 'MMM yyyy')}
                </span>
              </div>
              <p className="text-xs text-secondary mt-1">
                Displaying complete biometric logs for the last 3 months ({rangeRecords.length} records found between {startDate || 'start'} and {endDate || 'now'}).
              </p>
            </div>

            {/* Toggle: Calendar Month Grid vs All 3-Month Records List */}
            <div className="flex items-center gap-1 bg-input p-1 rounded-xl border border-border">
              <button
                type="button"
                onClick={() => setQuarterViewTab('calendar')}
                className={`px-3 py-1 rounded-lg text-xs font-bold motion-safe:transition-all ${
                  quarterViewTab === 'calendar' ? 'bg-card text-primary shadow-sm' : 'text-secondary hover:text-primary'
                }`}
              >
                Month Grid
              </button>
              <button
                type="button"
                onClick={() => setQuarterViewTab('all_records')}
                className={`px-3 py-1 rounded-lg text-xs font-bold motion-safe:transition-all ${
                  quarterViewTab === 'all_records' ? 'bg-primary text-on-primary shadow-sm' : 'text-secondary hover:text-primary'
                }`}
              >
                All 3-Month Records ({rangeRecords.length})
              </button>
            </div>
          </div>

          {/* 3 Month Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {threeMonthsList.map((mDate) => {
              const isSelected = mDate.getMonth() === month && mDate.getFullYear() === year;
              return (
                <button
                  key={mDate.toISOString()}
                  type="button"
                  onClick={() => {
                    setCurrentDate(mDate);
                    setQuarterViewTab('calendar');
                  }}
                  className={`p-3 rounded-xl text-left border motion-safe:transition-all ${
                    isSelected
                      ? 'bg-card border-primary ring-2 ring-primary/30 shadow-sm'
                      : 'bg-card/70 border-border hover:border-primary/50'
                  }`}
                >
                  <p className="text-xs font-bold text-primary">{format(mDate, 'MMMM yyyy')}</p>
                  <p className="text-[11px] text-secondary mt-0.5">Click to view monthly calendar</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* If All 3-Month Records view is selected, render the full multi-month table */}
      {isThreeMonthsRange && quarterViewTab === 'all_records' ? (
        <TrainerAttendanceQuarterlyRecordsTable
          rangeRecords={rangeRecords}
          startDate={startDate}
          endDate={endDate}
        />
      ) : (
        <>
          {/* Calendar Header with Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                  <CalendarIcon size={18} strokeWidth={2} className="text-primary" /> {monthName} {year} {t("TEXT_HISTORY")}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success-bg text-success border border-border flex items-center gap-1" data-testid="trainer_attendance-attendance-my_attendance_calendar_status_my_record">
                  <UserCheck size={14} strokeWidth={2}/> {user?.name || t('TEXT_MY_RECORD')}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-input text-secondary border border-border flex items-center gap-1">
                  <ShieldCheck size={14} strokeWidth={2}/> {t("TEXT_VIEW_ONLY")}
                </span>
              </div>
              <p className="text-sm text-secondary mt-0.5">
                {t("TEXT_TRAINER_MONTHLY_BIOMETRIC_ATTENDANCE_LOG_B8F726BF")}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentDate(new Date())}
                className="min-h-10 px-3 py-1.5 text-xs font-semibold bg-input text-primary border border-border rounded-lg hover:bg-primary-subtle motion-safe:transition-all"
                data-testid="trainer_attendance-trainerattendancemyattendancecalendar-button_1"
              >
                {t("TEXT_CURRENT_MONTH")}
              </button>
              <div className="flex items-center bg-input border border-border rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
                  aria-label={t("TEXT_PREVIOUS_MONTH")}
                  className="min-h-10 p-2 hover:bg-card text-secondary hover:text-primary motion-safe:transition-colors"
                  data-testid="trainer_attendance-trainerattendancemyattendancecalendar-button_2"
                >
                  <ChevronLeft size={16} strokeWidth={2}/>
                </button>
                <span className="px-3 text-xs font-bold text-primary select-none">
                  {monthName} {year}
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
                  aria-label={t("TEXT_NEXT_MONTH")}
                  className="min-h-10 p-2 hover:bg-card text-secondary hover:text-primary motion-safe:transition-colors"
                  data-testid="trainer_attendance-trainerattendancemyattendancecalendar-button_3"
                >
                  <ChevronRight size={16} strokeWidth={2}/>
                </button>
              </div>
            </div>
          </div>

          {/* Monthly Summary Statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-xl p-4 shadow-card">
              <p className="text-xs font-medium text-secondary">{t("TEXT_PRESENT_ON_DUTY")}</p>
              <p className="text-2xl font-bold text-success mt-1 flex items-center gap-2">
                {presentDays} <span className="text-xs text-secondary font-normal">{t("TEXT_DAYS")}</span>
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 shadow-card">
              <p className="text-xs font-medium text-secondary">{t("TEXT_ABSENT")}</p>
              <p className="text-2xl font-bold text-danger mt-1 flex items-center gap-2">
                {absentDays} <span className="text-xs text-secondary font-normal">{t("TEXT_DAYS")}</span>
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 shadow-card">
              <p className="text-xs font-medium text-secondary">{t("TEXT_WEEKLY_OFF_REST")}</p>
              <p className="text-2xl font-bold text-warning mt-1 flex items-center gap-2">
                {weeklyOffDays} <span className="text-xs text-secondary font-normal">{t("TEXT_DAYS")}</span>
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 shadow-card">
              <p className="text-xs font-medium text-secondary">{t("TEXT_ATTENDANCE_RATE")}</p>
              <p className={`text-2xl font-bold mt-1 ${attPct >= 85 ? 'text-success' : 'text-danger'}`}>
                {attPct}%
              </p>
            </div>
          </div>

          {/* Monthly Calendar View */}
          <TrainerAttendanceCalendarMonthGrid
            weekDays={weekDays}
            firstDayIndex={firstDayIndex}
            daysArray={daysArray}
          />
        </>
      )}

      {/* Legend Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-floating border border-border rounded-xl text-xs text-secondary">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="font-semibold text-primary">{t("TEXT_CALENDAR_STATUS")}</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-success text-on-success"></span> {t("TEXT_PRESENT_P")}</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-danger text-on-danger"></span> {t("TEXT_ABSENT_A")}</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-warning text-on-warning"></span> {t("TEXT_WEEKLY_OFF_SUNDAY")}</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-input"></span> {t("TEXT_FUTURE_DAY")}</span>
        </div>
        <p className="text-disabled">
          {t("TEXT_ATTENDANCE_IS_AUTOMATICALLY_MARKED_UPON__82FBA262")}
        </p>
      </div>
    </div>
  );
}
