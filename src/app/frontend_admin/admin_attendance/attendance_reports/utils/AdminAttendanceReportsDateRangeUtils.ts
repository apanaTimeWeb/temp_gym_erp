// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for attendance_reports; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_attendance/attendance_reports/utils/AdminAttendanceReportsAnalyticsDateRangeUtils.ts)

import { endOfMonth, endOfYear, format, isValid, parseISO, startOfMonth, startOfYear, subMonths } from 'date-fns';
import type { ReportDateRange } from '@/app/frontend_admin/admin_attendance/attendance_reports/types/AdminAttendanceReportsTypes';
import type { AdminAttendanceReportsDateRange } from '@/app/frontend_admin/admin_attendance/attendance_reports/types/AdminAttendanceReportsDateRangeTypes';


/** Resolve each supported bounded report preset to local calendar dates, inclusive of both endpoints. @description Implements getAdminAttendanceReportsPresetDateRange for the owning feature’s explicitly typed data. @param preset - Input used by this utility as declared by the signature. @param now - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function getAdminAttendanceReportsPresetDateRange(preset: Exclude<ReportDateRange, 'custom'>, now = new Date()): AdminAttendanceReportsDateRange {
  const thisMonth = startOfMonth(now);
  switch (preset) {
    case 'this_month':
      return { startDate: toAdminAttendanceReportsDateKey(startOfMonth(now)), endDate: toAdminAttendanceReportsDateKey(endOfMonth(now)) };
    case 'last_month': {
      const lastMonth = subMonths(thisMonth, 1);
      return { startDate: toAdminAttendanceReportsDateKey(startOfMonth(lastMonth)), endDate: toAdminAttendanceReportsDateKey(endOfMonth(lastMonth)) };
    }
    case 'last_3_months': {
      const firstMonth = subMonths(thisMonth, 2);
      return { startDate: toAdminAttendanceReportsDateKey(startOfMonth(firstMonth)), endDate: toAdminAttendanceReportsDateKey(endOfMonth(now)) };
    }
    case 'last_6_months': {
      const firstMonth = subMonths(thisMonth, 5);
      return { startDate: toAdminAttendanceReportsDateKey(startOfMonth(firstMonth)), endDate: toAdminAttendanceReportsDateKey(endOfMonth(now)) };
    }
    case 'this_year':
      return { startDate: toAdminAttendanceReportsDateKey(startOfYear(now)), endDate: toAdminAttendanceReportsDateKey(endOfYear(now)) };
  }
}

/** @description Implements isValidAdminAttendanceReportsDateRange for the owning feature’s explicitly typed data. @param startDate - Input used by this utility as declared by the signature. @param endDate - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function isValidAdminAttendanceReportsDateRange(startDate: string, endDate: string): boolean {
  const isDateKey = (value: string) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const parsed = parseISO(value);
    return isValid(parsed) && format(parsed, 'yyyy-MM-dd') === value;
  };
  return isDateKey(startDate) && isDateKey(endDate) && startDate <= endDate;
}


/** Format a valid local date into the canonical YYYY-MM-DD query key used by this report. */
export function toAdminAttendanceReportsDateKey(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}
