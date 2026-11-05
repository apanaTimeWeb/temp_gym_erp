import { CalendarCheck, UserCheck, Users } from 'lucide-react';

// RESPONSIBILITY: Owns static Trainer Attendance UI/business interaction constants and table metadata.
export const TRAINER_ATTENDANCE_RECORD_TYPE = { MEMBER: 'MEMBER', STAFF: 'STAFF' } as const;
export const TRAINER_ATTENDANCE_HISTORY_PAGE_SIZE = 10;
export const TRAINER_ATTENDANCE_RECORD_TYPES = [TRAINER_ATTENDANCE_RECORD_TYPE.MEMBER, TRAINER_ATTENDANCE_RECORD_TYPE.STAFF] as const;
export const TRAINER_ATTENDANCE_VIEW_MODES = ['calendar', 'table'] as const;
export const TRAINER_ATTENDANCE_CALENDAR_STATUS = { PRESENT: 'P', ABSENT: 'A', LEAVE: 'L', UPCOMING: 'UPCOMING' } as const;
export const TRAINER_ATTENDANCE_CALENDAR_STATUSES = [TRAINER_ATTENDANCE_CALENDAR_STATUS.PRESENT, TRAINER_ATTENDANCE_CALENDAR_STATUS.ABSENT, TRAINER_ATTENDANCE_CALENDAR_STATUS.LEAVE, TRAINER_ATTENDANCE_CALENDAR_STATUS.UPCOMING] as const;
export const TRAINER_ATTENDANCE_SORT_FIELDS = ['name', 'type', 'date', 'checkIn', 'checkOut', 'durationMinutes', 'checkInMethod'] as const;
export const TRAINER_ATTENDANCE_SORT_DIRECTIONS = ['asc', 'desc'] as const;
export const TRAINER_ATTENDANCE_TABLE_HEADERS = ['NAME', 'TYPE', 'DATE', 'CHECK_IN', 'CHECK_OUT', 'DURATION', 'METHOD'] as const;
export const TRAINER_ATTENDANCE_TABS = ['MEMBERS', 'MY_ATTENDANCE'] as const;
export const TRAINER_ATTENDANCE_DATE_FILTER_OPTIONS = [
  { value: 'ALL_TIME', labelKey: 'TEXT_FILTER_ALL_TIME' },
  { value: 'TODAY', labelKey: 'TEXT_TODAY' },
  { value: 'YESTERDAY', labelKey: 'TEXT_YESTERDAY' },
  { value: 'LAST_7_DAYS', labelKey: 'TEXT_LAST_7_DAYS' },
  { value: 'THIS_MONTH', labelKey: 'TEXT_FILTER_THIS_MONTH' },
] as const;

export const TRAINER_ATTENDANCE_KPI_PRESENTATION = [
  { key: 'totalCheckIns', labelKey: 'TEXT_TODAYS_CHECK_INS', icon: CalendarCheck, color: 'text-warning', bg: 'bg-warning-bg' },
  { key: 'memberCheckIns', labelKey: 'TEXT_MEMBER_CHECK_INS', icon: Users, color: 'text-info', bg: 'bg-info-bg' },
  { key: 'staffCheckIns', labelKey: 'TEXT_STAFF_CHECK_INS', icon: UserCheck, color: 'text-success', bg: 'bg-success-bg' },
] as const;
