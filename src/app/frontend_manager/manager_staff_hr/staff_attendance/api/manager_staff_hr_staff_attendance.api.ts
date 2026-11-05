import { MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/config/manager_staff_hr_staff_attendance.url_config';
import { z } from 'zod';

import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';


import { staffSchema } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/schemas/manager_staff_hr_staff_attendance.schemas';
import type { ManagerStaffPayrollAndAttendanceStaffAttendanceRecord } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/types/manager_staff_payroll_and_attendance_staff_attendance.types';
import type { Staff } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/types/manager_staff_hr_staff_attendance.types';

/**
 * @description Provides the ManagerStaffPayrollAndAttendanceApi implementation for the hr module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_staff_hr/manager_hr_schemas/ManagerStaffPayrollAndAttendanceSchema; @/app/frontend_manager/manager_staff_hr/manager_hr_url_config; @/app/frontend_manager/manager_staff_hr/manager_hr_types/ManagerStaffPayrollAndAttendanceStaffAttendanceTypes; @/app/frontend_manager/manager_staff_hr/manager_hr_types/ManagerStaffPayrollAndAttendanceTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
function serializeOptionalDate(value: string | Date | undefined): string | undefined {
  if (value === undefined) return undefined;
  return value instanceof Date ? value.toISOString() : value;
}

export const ManagerStaffPayrollAndAttendanceApi = {
  fetchStaff: async (params?: Record<string, string>): Promise<ApiResponse<{ staff: Staff[]; total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.STAFF_BASE}${query ? `?${query}` : ''}`, { dataSchema: z.object({ staff: z.array(staffSchema), total: z.number() }) });
  },

  fetchStaffAttendance: async (staffId: string, month: string): Promise<ApiResponse<{ history: ManagerStaffPayrollAndAttendanceStaffAttendanceRecord[] }>> => {
    return apiFetch(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.STAFF_ATTENDANCE(staffId, month), { dataSchema: z.object({ history: z.array(z.object({ date: z.string(), checkIn: z.string().optional(), checkOut: z.string().optional(), status: z.string() }).passthrough()) }) });
  }
};
