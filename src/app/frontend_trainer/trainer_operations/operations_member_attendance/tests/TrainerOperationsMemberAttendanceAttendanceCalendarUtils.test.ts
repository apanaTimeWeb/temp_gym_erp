import { describe, expect, it } from 'vitest';

import { TRAINER_ATTENDANCE_CALENDAR_STATUS } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/utils/TrainerOperationsMemberAttendanceAttendanceConstants';

import { buildTrainerAttendanceCalendarDays, buildTrainerAttendanceCalendarRecordMap, getTrainerAttendanceCalendarSummary } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/utils/TrainerOperationsMemberAttendanceAttendanceCalendarUtils';

import type { TrainerAttendanceRecord } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/types/TrainerOperationsMemberAttendanceAttendanceTypes';

describe('TrainerAttendanceCalendarUtils', () => {
  it('maps only records belonging to the visible month', () => {
    const records: TrainerAttendanceRecord[] = [
      { id: 'r1', type: 'STAFF', date: '2026-10-05', checkIn: '06:00', checkOut: '14:00' },
      { id: 'r2', type: 'STAFF', date: '2026-11-05', checkIn: '06:00' },
    ];
    const map = buildTrainerAttendanceCalendarRecordMap(records, 2026, 9);
    expect(map[5]).toMatchObject({ status: TRAINER_ATTENDANCE_CALENDAR_STATUS.PRESENT, in: '06:00' });
    expect(map[6]).toBeUndefined();
  });

  it('marks future dates upcoming, Sundays weekly-off, and past unrecorded weekdays absent', () => {
    const days = buildTrainerAttendanceCalendarDays({
      year: 2026,
      month: 9,
      currentDate: new Date('2026-10-01T00:00:00'),
      today: new Date('2026-10-01T00:00:00'),
      daysInMonth: 31,
      recordMap: {},
    });
    expect(days.find((day) => day.day === 1)?.status).toBe(TRAINER_ATTENDANCE_CALENDAR_STATUS.UPCOMING);
    expect(days.find((day) => day.day === 4)?.status).toBe(TRAINER_ATTENDANCE_CALENDAR_STATUS.LEAVE);
    expect(days.find((day) => day.day === 2)?.status).toBe(TRAINER_ATTENDANCE_CALENDAR_STATUS.UPCOMING);
  });

  it('derives attendance percentage from tracked days without counting weekly-off days', () => {
    const days = [
      { day: 1, status: TRAINER_ATTENDANCE_CALENDAR_STATUS.PRESENT, isToday: false, isPastOrToday: true },
      { day: 2, status: TRAINER_ATTENDANCE_CALENDAR_STATUS.ABSENT, isToday: false, isPastOrToday: true },
      { day: 3, status: TRAINER_ATTENDANCE_CALENDAR_STATUS.LEAVE, isToday: false, isPastOrToday: true },
    ];
    expect(getTrainerAttendanceCalendarSummary(days)).toMatchObject({ presentDays: 1, absentDays: 1, weeklyOffDays: 1, totalTracked: 2, attPct: 50 });
  });
});
