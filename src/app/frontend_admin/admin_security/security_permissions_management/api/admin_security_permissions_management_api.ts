// RESPONSIBILITY: Owns the Admin Permissions HTTP contract. It exposes only the documented role-default and per-staff override endpoints.
// DATA FLOW: feature hook/view → feature API client → apiFetch host transport → typed ApiResponse/data validation → UI/cache (admin_permissions/permissions_management/api/admin_security_permissions_management_api.ts)

import { z } from 'zod';
import { adminPermissionsManagementApiFetch as apiFetch } from '@/app/frontend_admin/admin_security/security_permissions_management/utils/AdminSecurityPermissionsManagementApiResponse';
import { ADMIN_PERMISSIONS_API } from '@/app/frontend_admin/admin_security/security_permissions_management/config/admin_security_permissions_management.url_config';
import type { RolePermissions, StaffOverride, UpdateStaffPermissionPayload } from '@/app/frontend_admin/admin_security/security_permissions_management/types/AdminSecurityPermissionsManagementTypes';
import { permissionsListSchema, staffOverridesSchema, staffOverrideSchema } from '@/app/frontend_admin/admin_security/security_permissions_management/schemas/AdminSecurityPermissionsManagementSchemas';

export const AdminPermissionsApi = {
  fetchPermissions: async () => apiFetch<RolePermissions[]>(ADMIN_PERMISSIONS_API.permissions, { method: 'GET', dataSchema: permissionsListSchema }),
  fetchOverrides: async () => apiFetch<StaffOverride[]>(ADMIN_PERMISSIONS_API.overrides, { method: 'GET', dataSchema: staffOverridesSchema }),
  updateStaffPermission: async (staffId: string, payload: UpdateStaffPermissionPayload, idempotencyKey: string) => apiFetch<StaffOverride>(ADMIN_PERMISSIONS_API.staff(staffId), { method: 'PATCH', body: JSON.stringify(payload), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: staffOverrideSchema }),
  resetToDefaults: async (staffId: string, idempotencyKey: string) => apiFetch<null>(ADMIN_PERMISSIONS_API.reset(staffId), { method: 'POST', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),
};
