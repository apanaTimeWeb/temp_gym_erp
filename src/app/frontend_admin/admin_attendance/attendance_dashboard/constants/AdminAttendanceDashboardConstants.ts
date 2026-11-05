// RESPONSIBILITY: Canonical feature-owned static constants and business UI configuration for this Admin feature.
// DATA FLOW: feature hook/API/component → stable feature constants → requests, cache keys, and UI behavior (admin_attendance/attendance_dashboard/constants/AdminAttendanceDashboardConstants.ts)

import type { AdminAttendanceRecord, AdminAttendanceSummary, AdminAttendanceTrendPoint, DateRangeFilter } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/types/AdminAttendanceDashboardTypes';


export const ATTENDANCE_ITEMS_PER_PAGE = 10;

export const DATE_RANGE_OPTIONS: { value: DateRangeFilter; labelKey: string }[] = [
  { value: 'today',      labelKey: 'attendance.static.today' },
  { value: 'yesterday',  labelKey: 'attendance.static.yesterday' },
  { value: 'this_week',  labelKey: 'attendance.static.this_week' },
  { value: 'this_month', labelKey: 'attendance.static.this_month' },
  { value: 'last_month', labelKey: 'attendance.static.last_month' },
];

export const ATTENDANCE_STATUS_VALUES = { PRESENT: 'present', ABSENT: 'absent', LATE: 'late' } as const;

export const ATTENDANCE_STATUS_LABEL_KEYS: Record<string, string> = { present: 'attendance.static.present', late: 'attendance.static.late', absent: 'attendance.static.absent' };

export const ATTENDANCE_STATUS_OPTIONS = [
  { value: 'all',     labelKey: 'attendance.static.all_status' },
  { value: 'present', labelKey: 'attendance.static.present' },
  { value: 'late',    labelKey: 'attendance.static.late' },
  { value: 'absent',  labelKey: 'attendance.static.absent' },
] as const;

export const ATTENDANCE_TABLE_HEADER_KEYS = [
  'attendance.table.member',
  'attendance.table.branch',
  'attendance.table.plan',
  'attendance.table.trainer',
  'attendance.table.checkIn',
  'attendance.table.checkOut',
  'attendance.table.duration',
  'attendance.table.status',
] as const;
