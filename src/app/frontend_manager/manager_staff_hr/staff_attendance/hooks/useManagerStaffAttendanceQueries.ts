// DATA FLOW: URL-backed staff roster parameters → staff query → Staff Attendance UI.
'use client';
import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ManagerStaffPayrollAndAttendanceApi } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/api/manager_staff_hr_staff_attendance.api';
import { ManagerStaffPayrollAndAttendanceQueryKeys } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/api/manager_staff_hr_staff_attendance.query_keys';
import { MOCK_STAFF } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/mocks/fixtures/ManagerStaffAttendanceMockData';
import type { HrInitialData } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/types/manager_staff_hr_staff_attendance.types';

/** This sibling only fetches staff roster data. Payroll and HR summary queries belong to Payroll & Ledger. */
export function useManagerStaffPayrollAndAttendanceQueries(
  params: { search: string; role: string; month: string; page: number; limit: number },
  initialData?: HrInitialData | null,
) {
  const staffQuery = useQuery({
    queryKey: ManagerStaffPayrollAndAttendanceQueryKeys.staff(params),
    queryFn: async () => {
      const response = await ManagerStaffPayrollAndAttendanceApi.fetchStaff({
        search: params.search, role: params.role, page: String(params.page), limit: String(params.limit),
      });
      return response.data ?? { staff: [], total: 0 };
    },
    initialData: initialData ? { staff: initialData.staff, total: initialData.staff.length } : { staff: MOCK_STAFF, total: MOCK_STAFF.length },
  });
  const loadAll = useCallback(async () => { await staffQuery.refetch(); }, [staffQuery]);
  return {
    staff: staffQuery.data?.staff ?? [],
    totalStaff: staffQuery.data?.total ?? 0,
    // Compatibility fields keep the shared type stable without issuing cross-workflow requests.
    payrolls: [], totalPayrolls: 0, summary: null, loadAll,
    isPending: staffQuery.isPending, isError: staffQuery.isError, error: staffQuery.error,
  };
}
