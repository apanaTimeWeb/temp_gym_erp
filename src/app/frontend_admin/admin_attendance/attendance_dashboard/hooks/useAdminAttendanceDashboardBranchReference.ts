"use client";
// RESPONSIBILITY: Provides minimal branch options to the Admin attendance UI without cross-module imports.
// DATA FLOW: AdminAttendanceBranchReferenceApi → TanStack Query → Admin attendance component.

import { ADMIN_ATTENDANCE_QUERY_KEYS } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/constants/AdminAttendanceDashboardQueryKeys';
import { useQuery } from '@tanstack/react-query';
import { AdminAttendanceBranchReferenceApi } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/api/admin_attendance_dashboard_branch_reference_api';
/** @description useAdminAttendanceBranchReference: Provides minimal branch options to the Admin attendance UI without cross-module imports. @dependencies Consumes AdminAttendanceQueryKeys, AdminAttendanceBranchReferenceApi. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminAttendanceBranchReference() {
  return useQuery({
    queryKey: ADMIN_ATTENDANCE_QUERY_KEYS.key('branch-reference'),
    queryFn: async () => {
      const response = await AdminAttendanceBranchReferenceApi.fetchAttendanceBranchReferences();
      return response.data?.items ?? [];
    },
    staleTime: 300000,
  });
}
