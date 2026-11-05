import { TRAINER_ATTENDANCE_CALENDAR_STATUS } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/utils/TrainerOperationsTrainerAttendanceAttendanceConstants';

import type { TrainerAttendanceCalendarCell, TrainerAttendanceCalendarDay } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/types/TrainerOperationsTrainerAttendanceAttendanceInteractionTypes';

import type { TrainerAttendanceCalendarStatus, TrainerAttendanceRecord } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/types/TrainerOperationsTrainerAttendanceAttendanceTypes';

/**
 * @description Builds the month-scoped attendance lookup used by the Trainer calendar.
 * @dependencies Consumes validated Trainer attendance records and feature-owned calendar status constants.
 * @edge-case Ignores records without a usable date and preserves one calendar entry per day.
 */
export function buildTrainerAttendanceCalendarRecordMap(records: TrainerAttendanceRecord[], year: number, month: number): Record<number, TrainerAttendanceCalendarCell> {
  const map: Record<number, TrainerAttendanceCalendarCell> = {};
  records.forEach((record) => {
    if (!record.date) return;
    const date = new Date(record.date);
    if (date.getFullYear() !== year || date.getMonth() !== month) return;
    map[date.getDate()] = {
      in: record.checkIn,
      out: record.checkOut,
      status: TRAINER_ATTENDANCE_CALENDAR_STATUS.PRESENT,
    };
  });
  return map;
}

/**
 * @description Derives the visible day cells for one Trainer attendance calendar month.
 * @dependencies Uses the month record map and feature-owned semantic attendance statuses.
 * @edge-case Treats Sundays as weekly-off days and unrecorded past/today weekdays as absent without inventing attendance data.
 */
export function buildTrainerAttendanceCalendarDays(params: {
  year: number;
  month: number;
  currentDate: Date;
  today: Date;
  daysInMonth: number;
  recordMap: Record<number, TrainerAttendanceCalendarCell>;
}): TrainerAttendanceCalendarDay[] {
  const { year, month, currentDate, today, daysInMonth, recordMap } = params;
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  const todayDate = today.getDate();
  const monthIsPast = currentDate < today;

  return Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const date = new Date(year, month, day);
    const isSunday = date.getDay() === 0;
    const isPastOrToday = isCurrentMonth ? day <= todayDate : monthIsPast;
    const existing = recordMap[day];

    let status: TrainerAttendanceCalendarStatus = TRAINER_ATTENDANCE_CALENDAR_STATUS.UPCOMING;
    if (isPastOrToday) {
      status = isSunday
        ? TRAINER_ATTENDANCE_CALENDAR_STATUS.LEAVE
        : existing
          ? TRAINER_ATTENDANCE_CALENDAR_STATUS.PRESENT
          : TRAINER_ATTENDANCE_CALENDAR_STATUS.ABSENT;
    }

    return {
      day,
      status,
      checkIn: existing?.in,
      checkOut: existing?.out,
      isToday: isCurrentMonth && day === todayDate,
      isPastOrToday,
    };
  });
}

/**
 * @description Calculates the derived monthly Trainer attendance summary from rendered calendar days.
 * @dependencies Consumes only the calendar day model owned by the attendance feature.
 * @edge-case Returns zero percent when no tracked attendance days exist.
 */
export function getTrainerAttendanceCalendarSummary(days: TrainerAttendanceCalendarDay[]) {
  const presentDays = days.filter((day) => day.isPastOrToday && day.status === TRAINER_ATTENDANCE_CALENDAR_STATUS.PRESENT).length;
  const absentDays = days.filter((day) => day.isPastOrToday && day.status === TRAINER_ATTENDANCE_CALENDAR_STATUS.ABSENT).length;
  const weeklyOffDays = days.filter((day) => day.isPastOrToday && day.status === TRAINER_ATTENDANCE_CALENDAR_STATUS.LEAVE).length;
  const totalTracked = presentDays + absentDays;
  const attPct = totalTracked > 0 ? Math.round((presentDays / totalTracked) * 100) : 0;
  return { presentDays, absentDays, weeklyOffDays, totalTracked, attPct };
}
