// RESPONSIBILITY: Defines runtime validation schemas for permissions_management; it does not determine server-owned business rules without a verified contract.
// DATA FLOW: API/form boundary → Zod schema → validated typed data or field-level errors → owning hook/view (admin_permissions/permissions_management/schemas/AdminSecurityPermissionsManagementSchemas.ts)

import { z } from 'zod';
import { PERMISSION_FEATURES } from '@/app/frontend_admin/admin_security/security_permissions_management/constants/AdminSecurityPermissionsManagementConstants';

export const roleTypeSchema = z.enum(['manager', 'trainer', 'receptionist']);
export const rolePermissionsSchema = z.object({ role: roleTypeSchema, permissions: z.record(z.string(), z.boolean()) });
export const staffOverrideSchema = z.object({ staffId: z.string(), staffName: z.string(), role: roleTypeSchema, overrides: z.record(z.string(), z.boolean()) });
export const permissionsListSchema = z.array(rolePermissionsSchema);
export const staffOverridesSchema = z.array(staffOverrideSchema);

/** API writes are intentionally limited to the current UI catalog; API response maps remain open for forward compatibility. */
export const updateStaffPermissionPayloadSchema = z.object({ permission: z.string().min(1), enabled: z.boolean() }).strict().superRefine((payload, context) => {
  if (!PERMISSION_FEATURES.some((feature) => feature.key === payload.permission)) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['permission'], message: 'Permission is not part of the supported catalog.' });
  }
});
