// RESPONSIBILITY: Defines feature-local TypeScript contracts for attendance_reports; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_attendance/attendance_reports/types/AdminAttendanceReportsAnalyticsStoreTypes.ts)

// Type contract owned by this module; kept outside implementation files for AI isolation.

import type { ReportDateRange } from '@/app/frontend_admin/admin_attendance/attendance_reports/types/AdminAttendanceReportsTypes';
export interface AdminAttendanceReportsStore {
  dateRange: ReportDateRange;
  setDateRange: (range: ReportDateRange) => void;
  startDate: string;
  endDate: string;
  setCustomDateRange: (start: string, end: string) => void;
  selectedGymId: string;
  setSelectedGymId: (id: string) => void;
}
