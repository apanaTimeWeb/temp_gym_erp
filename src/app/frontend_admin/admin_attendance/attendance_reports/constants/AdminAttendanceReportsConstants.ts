// RESPONSIBILITY: Canonical feature-owned static constants and business UI configuration for this Admin feature.
// DATA FLOW: feature hook/API/component → stable feature constants → requests, cache keys, and UI behavior (admin_attendance/attendance_reports/constants/AdminAttendanceReportsAnalyticsConstants.ts)

import type { ReportDateRange } from '@/app/frontend_admin/admin_attendance/attendance_reports/types/AdminAttendanceReportsTypes';



export const DATE_RANGE_OPTIONS: ReadonlyArray<{ value: ReportDateRange; labelKey: string }> = [
  { value: 'this_month', labelKey: 'reports.static.this_month' },
  { value: 'last_month', labelKey: 'reports.static.last_month' },
  { value: 'last_3_months', labelKey: 'reports.static.last_3_months' },
  { value: 'last_6_months', labelKey: 'reports.static.last_6_months' },
  { value: 'this_year', labelKey: 'reports.static.this_year' },
  { value: 'custom', labelKey: 'reports.static.custom_range' },
];

export const REPORTS_ITEMS_PER_PAGE = 10;

// Fail closed until the host binary-response/download contract is supplied.
export const ADMIN_ATTENDANCE_REPORTS_EXPORT_AVAILABLE = false as const;

export const EXPORT_FORMAT_OPTIONS: { value: import('@/app/frontend_admin/admin_attendance/attendance_reports/types/AdminAttendanceReportsTypes').AdminAttendanceReportsExportFormat; labelKey: string }[] = [
  { value: 'pdf', labelKey: 'reports.static.export_as_pdf' },
  { value: 'csv', labelKey: 'reports.static.export_as_csv' },
];
