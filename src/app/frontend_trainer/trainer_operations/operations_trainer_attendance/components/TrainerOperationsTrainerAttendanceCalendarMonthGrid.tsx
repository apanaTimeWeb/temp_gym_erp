"use client";

import { CheckCircle2, Clock, XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { TRAINER_ATTENDANCE_CALENDAR_STATUS } from '../utils/TrainerOperationsTrainerAttendanceAttendanceConstants';
import type { TrainerAttendanceCalendarDay } from '../types/TrainerOperationsTrainerAttendanceAttendanceInteractionTypes';

export interface TrainerOperationsTrainerAttendanceCalendarMonthGridProps {
  weekDays: string[];
  firstDayIndex: number;
  daysArray: TrainerAttendanceCalendarDay[];
}

export function TrainerOperationsTrainerAttendanceCalendarMonthGrid({
  weekDays,
  firstDayIndex,
  daysArray,
}: TrainerOperationsTrainerAttendanceCalendarMonthGridProps) {
  const t = useTranslations('TRAINER_ATTENDANCE');

  return (
    <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-card">
      <div className="overflow-x-auto">
        <div className="min-w-[560px] space-y-4">
      <div className="grid grid-cols-7 gap-2 text-center pb-2 border-b border-border">
        {weekDays.map((wd) => (
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
              statusStyle = 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/25 hover:border-emerald-500/50';
              badgeStyle = 'bg-emerald-500 text-white';
              label = t('TEXT_PRESENT_ON_DUTY');
            } else if (status === TRAINER_ATTENDANCE_CALENDAR_STATUS.ABSENT) {
              statusStyle = 'bg-rose-500/10 text-rose-600 dark:text-rose-300 border-rose-500/25 hover:border-rose-500/50';
              badgeStyle = 'bg-rose-500 text-white';
              label = t('TEXT_ABSENT');
            } else if (status === TRAINER_ATTENDANCE_CALENDAR_STATUS.LEAVE) {
              statusStyle = 'bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-500/25 hover:border-amber-500/50';
              badgeStyle = 'bg-amber-500 text-white';
              label = t('TEXT_WEEKLY_OFF_REST');
            }
          }

          return (
            <div
              key={day}
              className={`h-24 rounded-xl p-2.5 border flex flex-col justify-between motion-safe:transition-all relative ${statusStyle} ${
                isToday ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-primary">
                  {day}
                </span>
                {isPastOrToday && (
                  <span
                    className={`w-2 h-2 rounded-full ${badgeStyle}`}
                    title={label}
                  />
                )}
              </div>

              {isPastOrToday && (
                <div className="text-[11px] font-semibold truncate space-y-0.5">
                  {status === TRAINER_ATTENDANCE_CALENDAR_STATUS.PRESENT && checkIn ? (
                    <span className="flex items-center gap-1 text-success">
                      <Clock size={11} strokeWidth={2.5} />
                      <span className="truncate">{checkIn}</span>
                    </span>
                  ) : status === TRAINER_ATTENDANCE_CALENDAR_STATUS.PRESENT ? (
                    <span className="flex items-center gap-1 text-success">
                      <CheckCircle2 size={11} strokeWidth={2.5} />
                      <span>{t('TEXT_PRESENT_P')}</span>
                    </span>
                  ) : status === TRAINER_ATTENDANCE_CALENDAR_STATUS.ABSENT ? (
                    <span className="flex items-center gap-1 text-danger">
                      <XCircle size={11} strokeWidth={2.5} />
                      <span>{t('TEXT_ABSENT_A')}</span>
                    </span>
                  ) : (
                    <span className="text-warning text-[10px]">
                      {t('TEXT_WEEKLY_OFF_REST')}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
        </div>
      </div>
    </div>
  );
}

export const TrainerAttendanceCalendarMonthGrid = TrainerOperationsTrainerAttendanceCalendarMonthGrid;
export type MonthGridProps = TrainerOperationsTrainerAttendanceCalendarMonthGridProps;
