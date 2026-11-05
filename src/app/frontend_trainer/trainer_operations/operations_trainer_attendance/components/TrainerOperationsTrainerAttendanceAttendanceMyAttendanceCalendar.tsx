"use client";
// RESPONSIBILITY: Renders the trainer's own monthly attendance calendar history.
// DATA FLOW: props (records from TrainerAttendanceMain) → display only
// Strictly view-only: trainers can browse past and present month logs.

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { format } from 'date-fns';

import { enUS, hi } from 'date-fns/locale';

import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, CheckCircle2, XCircle, Clock, ShieldCheck, UserCheck } from 'lucide-react';

import { useLocale, useTranslations } from 'next-intl';

import { getUser } from '@/lib/api';

import { TRAINER_ATTENDANCE_CALENDAR_STATUS } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/utils/TrainerOperationsTrainerAttendanceAttendanceConstants';

import { buildTrainerAttendanceCalendarDays, buildTrainerAttendanceCalendarRecordMap, getTrainerAttendanceCalendarSummary } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/utils/TrainerOperationsTrainerAttendanceAttendanceCalendarUtils';


import type { TrainerAttendanceMyAttendanceCalendarProps } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/types/TrainerOperationsTrainerAttendanceAttendanceMyAttendanceCalendarTypes';












/**
 * @description Renders the trainer's own monthly attendance calendar history.
 * @dependencies props (records from TrainerAttendanceMain) → display only
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Owns the attendance feature UI responsibility represented by TrainerAttendanceMyAttendanceCalendar, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented attendance module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerAttendanceMyAttendanceCalendar({ records }: TrainerAttendanceMyAttendanceCalendarProps) {
  const t = useTranslations('TRAINER_ATTENDANCE');
  const locale = useLocale();
  const dateFnsLocale = locale === 'hi' ? hi : enUS;
  const weekDays = useMemo(() => Array.from({ length: 7 }, (_, index) => format(new Date(2023, 0, index + 1), 'EEE', { locale: dateFnsLocale })), [dateFnsLocale]);
  const user = getUser();
  const searchParams = useSearchParams();
  const range = searchParams.get('range') || 'this_month';

  const [currentDate, setCurrentDate] = useState(() => {
    const d = new Date();
    if (range === 'last_month') {
      return new Date(d.getFullYear(), d.getMonth() - 1, 1);
    }
    return d;
  });

  useEffect(() => {
    const d = new Date();
    if (range === 'last_month') {
      setCurrentDate(new Date(d.getFullYear(), d.getMonth() - 1, 1));
    } else if (range === 'this_month') {
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

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleJumpToday = () => {
    setCurrentDate(new Date());
  };


  return (
    <div className="p-6 space-y-6">
      {/* Calendar Header with Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-primary flex items-center gap-2">
              <CalendarIcon size={18} strokeWidth={2} className="text-primary" /> {monthName} {year} {t("TEXT_HISTORY")}</h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success-bg text-success border border-border flex items-center gap-1" data-testid="trainer_attendance-attendance-my_attendance_calendar_status_my_record">
              <UserCheck size={18}  strokeWidth={2}/> {user?.name || t('TEXT_MY_RECORD')}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-input text-secondary border border-border flex items-center gap-1">
              <ShieldCheck size={18}  strokeWidth={2}/> {t("TEXT_VIEW_ONLY")}</span>
          </div>
          <p className="text-sm text-secondary mt-0.5">
            {t("TEXT_TRAINER_MONTHLY_BIOMETRIC_ATTENDANCE_LOG_B8F726BF")}</p>
        </div>

        <div className="flex items-center gap-2">
          <button type="button"
            onClick={handleJumpToday}
            className="min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page px-3 py-1.5 text-xs font-semibold bg-input text-primary border border-border rounded-lg hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 motion-safe:ease-in-out"
           data-testid="trainer_attendance-trainerattendancemyattendancecalendar-button_1">
            {t("TEXT_CURRENT_MONTH")}</button>
          <div className="flex items-center bg-input border border-border rounded-lg overflow-hidden">
            <button type="button"
              onClick={handlePrevMonth}
              aria-label={t("TEXT_PREVIOUS_MONTH")}
              className="min-w-11 min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page p-2 hover:bg-card text-secondary hover:text-primary motion-safe:transition-colors motion-safe:duration-base motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95"
             data-testid="trainer_attendance-trainerattendancemyattendancecalendar-button_2">
              <ChevronLeft size={18}  strokeWidth={2}/>
            </button>
            <span className="px-3 text-xs font-bold text-primary select-none">
              {monthName} {year}
            </span>
            <button type="button"
              onClick={handleNextMonth}
              aria-label={t("TEXT_NEXT_MONTH")}
              className="min-w-11 min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page p-2 hover:bg-card text-secondary hover:text-primary motion-safe:transition-colors motion-safe:duration-base motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95"
             data-testid="trainer_attendance-trainerattendancemyattendancecalendar-button_3">
              <ChevronRight size={18}  strokeWidth={2}/>
            </button>
          </div>
        </div>
      </div>

      {/* Monthly Summary Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4 shadow-card">
          <p className="text-xs font-medium text-secondary">{t("TEXT_PRESENT_ON_DUTY")}</p>
          <p className="text-kpi font-bold text-success mt-1 flex items-center gap-2">
            {presentDays} <span className="text-xs text-secondary font-normal">{t("TEXT_DAYS")}</span>
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 shadow-card">
          <p className="text-xs font-medium text-secondary">{t("TEXT_ABSENT")}</p>
          <p className="text-kpi font-bold text-danger mt-1 flex items-center gap-2">
            {absentDays} <span className="text-xs text-secondary font-normal">{t("TEXT_DAYS")}</span>
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 shadow-card">
          <p className="text-xs font-medium text-secondary">{t("TEXT_WEEKLY_OFF_REST")}</p>
          <p className="text-kpi font-bold text-warning mt-1 flex items-center gap-2">
            {weeklyOffDays} <span className="text-xs text-secondary font-normal">{t("TEXT_DAYS")}</span>
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 shadow-card">
          <p className="text-xs font-medium text-secondary">{t("TEXT_ATTENDANCE_RATE")}</p>
          <p className={`text-kpi font-bold mt-1 ${attPct >= 85 ? 'text-success' : 'text-danger'}`}>
            {attPct}%
          </p>
        </div>
      </div>

      {/* Monthly Calendar View */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-card space-y-4">
        <div className="grid grid-cols-7 gap-2 text-center pb-2 border-b border-border">
          {weekDays.map(wd => (
            <div key={wd} className="text-xs font-bold text-secondary uppercase tracking-wider py-1">
              {wd}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {/* Empty offset padding for days before 1st of the month */}
          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <div key={`offset-${i}`} className="h-24 rounded-xl bg-input border border-transparent" />
          ))}

          {/* Calendar Day Cells */}
          {daysArray.map(({ day, status, checkIn, isToday, isPastOrToday }) => {
            let statusStyle = 'bg-input text-secondary border-border';
            let badgeStyle = 'text-secondary';
            let label = t('TEXT_FUTURE_DAY');

            if (isPastOrToday) {
              if (status === TRAINER_ATTENDANCE_CALENDAR_STATUS.PRESENT) {
                statusStyle = 'bg-success-bg text-success border-border hover:border-border';
                badgeStyle = 'bg-success text-on-success';
                label = t('TEXT_PRESENT_ON_DUTY');
              } else if (status === TRAINER_ATTENDANCE_CALENDAR_STATUS.ABSENT) {
                statusStyle = 'bg-danger-bg text-danger border-border hover:border-border';
                badgeStyle = 'bg-danger text-on-danger';
                label = t('TEXT_ABSENT');
              } else if (status === TRAINER_ATTENDANCE_CALENDAR_STATUS.LEAVE) {
                statusStyle = 'bg-warning-bg text-warning border-border hover:border-border';
                badgeStyle = 'bg-warning-bg text-warning';
                label = t('TEXT_WEEKLY_OFF_REST');
              }
            }

            return (
              <div
                key={day}
                className={`h-24 rounded-xl p-2.5 border flex flex-col justify-between motion-safe:transition-all relative ${statusStyle} ${
                  isToday ? 'ring-2 ring-primary  ' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-bold ${isToday ? 'text-primary' : 'text-primary'}`}>
                    {day}
                  </span>
                  {isToday && (
                    <span className="text-xs font-extrabold uppercase px-1.5 py-0.5 rounded bg-primary text-on-primary tracking-wide">
                      {t("TEXT_TODAY")}</span>
                  )}
                </div>

                <div className="mt-auto space-y-1">
                  {isPastOrToday ? (
                    <>
                      <div className="flex items-center justify-between">
                        <span className={`inline-flex items-center gap-1 text-xs font-bold px-1.5 py-0.5 rounded ${badgeStyle}`}>
                          {status === TRAINER_ATTENDANCE_CALENDAR_STATUS.PRESENT && <CheckCircle2 size={18}  strokeWidth={2}/>}
                          {status === TRAINER_ATTENDANCE_CALENDAR_STATUS.ABSENT && <XCircle size={18}  strokeWidth={2}/>}
                          {label}
                        </span>
                      </div>
                      {status === TRAINER_ATTENDANCE_CALENDAR_STATUS.PRESENT && checkIn && (
                        <p className="text-xs text-secondary truncate flex items-center gap-1">
                          <Clock size={18}  strokeWidth={2}/> {checkIn}
                        </p>
                      )}
                    </>
                  ) : (
                    <span className="text-xs text-disabled">—</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-floating border border-border rounded-xl text-xs text-secondary">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="font-semibold text-primary">{t("TEXT_CALENDAR_STATUS")}</span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-success text-on-success" data-testid={"trainer_attendance-my-attendance-calendar-status-state-271"}></span> {t("TEXT_PRESENT_P")}</span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-danger text-on-danger" data-testid={"trainer_attendance-my-attendance-calendar-status-state-273"}></span> {t("TEXT_ABSENT_A")}</span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-warning text-on-warning" data-testid={"trainer_attendance-my-attendance-calendar-status-state-275"}></span> {t("TEXT_WEEKLY_OFF_SUNDAY")}</span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-input"></span> {t("TEXT_FUTURE_DAY")}</span>
        </div>
        <p className="text-disabled">
          {t("TEXT_ATTENDANCE_IS_AUTOMATICALLY_MARKED_UPON__82FBA262")}</p>
      </div>
    </div>
  );
}
