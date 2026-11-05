// RESPONSIBILITY: Staff-directory API contract only. Finance-specific APIs live in Finance autonomous leaves.
// DATA FLOW: HR staff hooks → this API boundary → host apiFetch wrapper → validated staff data.

import { z } from 'zod';
import { adminHrManagementApiFetch as apiFetch } from '@/app/frontend_admin/admin_hr/hr_staff_management/utils/AdminHrStaffManagementApiResponse';
import { ADMIN_HR_API } from '@/app/frontend_admin/admin_hr/hr_staff_management/config/admin_hr_staff_management.url_config';
import type { Staff } from '@/app/frontend_admin/admin_hr/hr_staff_management/types/AdminHrStaffManagementTypes';
import { staffSchema } from '@/app/frontend_admin/admin_hr/hr_staff_management/schemas/AdminHrStaffManagementSchemas';

export const AdminHrApi = {
  fetchStaff: async (params?: Record<string, string>) => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch<{ staff: Staff[]; total: number }>(`${ADMIN_HR_API.staffBase}${query ? `?${query}` : ''}`, {
      method: 'GET',
      dataSchema: z.object({ staff: z.array(staffSchema), total: z.number() }),
    });
  },
  fetchStaffById: async (id: string) => apiFetch<Staff>(ADMIN_HR_API.staffGetOne(id), { method: 'GET', dataSchema: staffSchema }),
  createStaff: async (body: Partial<Staff>, idempotencyKey: string) => apiFetch<Staff>(ADMIN_HR_API.staffBase, {
    method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: staffSchema,
  }),
  updateStaff: async (id: string, body: Partial<Staff>, idempotencyKey: string) => apiFetch<Staff>(ADMIN_HR_API.staffUpdate(id), {
    method: 'PATCH', body: JSON.stringify({ ...body, id }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: staffSchema,
  }),
  deleteStaff: async (id: string, idempotencyKey: string) => apiFetch<null>(ADMIN_HR_API.staffDelete(id), {
    method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null(),
  }),
  bulkDeactivateStaff: async (ids: string[], idempotencyKey: string) => apiFetch<null>(ADMIN_HR_API.bulkDeactivate, {
    method: 'POST', body: JSON.stringify({ ids }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null(),
  }),
};
