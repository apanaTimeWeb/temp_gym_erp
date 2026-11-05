import { MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API } from '@/app/frontend_manager/manager_staff_hr/staff_directory/config/manager_staff_hr_staff_directory.url_config';
import { z } from 'zod';

import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';


import { staffSchema } from '@/app/frontend_manager/manager_staff_hr/staff_directory/schemas/manager_staff_hr_staff_directory.schemas';
import type { Staff } from '@/app/frontend_manager/manager_staff_hr/staff_directory/types/manager_staff_hr_staff_directory.types';

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

  fetchStaffById: async (id: string): Promise<ApiResponse<Staff>> => {
    return apiFetch(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.STAFF_GET_ONE(id), { dataSchema: staffSchema });
  },

  createStaff: async (body: Omit<Partial<Staff>, 'joinDate'> & { joinDate?: string | Date }, idempotencyKey: string): Promise<ApiResponse<Staff>> => {
    const serializedBody = { ...body, ...(body.joinDate ? { joinDate: serializeOptionalDate(body.joinDate) } : {}) };
    return apiFetch(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.STAFF_BASE, { method: 'POST', body: JSON.stringify(serializedBody), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: staffSchema });
  },

  updateStaff: async (id: string, body: Omit<Partial<Staff>, 'joinDate'> & { joinDate?: string | Date }, idempotencyKey: string): Promise<ApiResponse<Staff>> => {
    const serializedBody = { ...body, ...(body.joinDate ? { joinDate: serializeOptionalDate(body.joinDate) } : {}) };
    return apiFetch(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.STAFF_GET_ONE(id), { method: 'PATCH', body: JSON.stringify(serializedBody), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: staffSchema });
  },

  deleteStaff: async (id: string, idempotencyKey: string): Promise<ApiResponse<{ id: string }>> => {
    return apiFetch(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.STAFF_GET_ONE(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.object({ id: z.string() }) });
  }
};
