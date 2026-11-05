// DATA FLOW: Module API → TanStack Query or typed query result → consuming module-owned UI.
'use client';
import { useQuery } from '@tanstack/react-query';

import { ManagerStaffPayrollAndAttendanceApi } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/api/manager_staff_hr_staff_attendance.api';
import { ManagerStaffPayrollAndAttendanceQueryKeys } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/api/manager_staff_hr_staff_attendance.query_keys';
/** Loads attendance history for payroll calculation through the typed API boundary. */
/**
 * @description Coordinates hr feature state and its documented UI/API boundary through useManagerStaffPayrollAndAttendanceStaffAttendanceQuery.
 * @dependencies Uses ManagerStaffPayrollAndAttendanceApi.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerStaffPayrollAndAttendanceStaffAttendanceQuery owns the hr feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerStaffPayrollAndAttendanceStaffAttendanceQuery(staffId: string, month: string) {
  return useQuery({
    queryKey: ManagerStaffPayrollAndAttendanceQueryKeys.staffAttendance(staffId, month),
    queryFn: () => ManagerStaffPayrollAndAttendanceApi.fetchStaffAttendance(staffId, month),
    enabled: Boolean(staffId && month) });
}
