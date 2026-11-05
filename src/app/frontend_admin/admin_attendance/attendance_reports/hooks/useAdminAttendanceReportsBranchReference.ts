"use client";
// RESPONSIBILITY: Provides minimal branch options to the Admin reports UI without cross-module imports.
// DATA FLOW: AdminAttendanceReportsBranchReferenceApi → TanStack Query → Admin reports component.

import { ADMIN_ATTENDANCE_REPORTS_QUERY_KEYS } from '@/app/frontend_admin/admin_attendance/attendance_reports/constants/AdminAttendanceReportsQueryKeys';
import { useQuery } from '@tanstack/react-query';
import { AdminAttendanceReportsBranchReferenceApi } from '@/app/frontend_admin/admin_attendance/attendance_reports/api/admin_attendance_reports_branch_reference_api';
/** @description useAdminAttendanceReportsBranchReference: Provides minimal branch options to the Admin reports UI without cross-module imports. @dependencies Consumes AdminAttendanceReportsQueryKeys, AdminAttendanceReportsBranchReferenceApi. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminAttendanceReportsBranchReference() {
  return useQuery({ queryKey: ADMIN_ATTENDANCE_REPORTS_QUERY_KEYS.key('branch-reference'), queryFn: async () => (await AdminAttendanceReportsBranchReferenceApi.fetchReportBranchReferences()).data?.items ?? [], staleTime: 300000 });
}
