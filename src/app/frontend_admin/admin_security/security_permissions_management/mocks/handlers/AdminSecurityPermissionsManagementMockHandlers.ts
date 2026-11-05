// RESPONSIBILITY: Owns module-local MSW handlers for permissions_management; it simulates only the endpoints and fields supported by the supplied feature contract.
// DATA FLOW: MSW request → request/schema validation → module fixture state → response envelope → feature query/UI (admin_permissions/permissions_management/mocks/handlers/AdminSecurityPermissionsManagementMockHandlers.ts)

import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse } from 'msw';
import { MOCK_ADMIN_PERMISSIONS, MOCK_ADMIN_PERMISSION_OVERRIDES } from '@/app/frontend_admin/admin_security/security_permissions_management/mocks/fixtures/AdminSecurityPermissionsManagementMockFixtures';
import type { StaffOverride } from '@/app/frontend_admin/admin_security/security_permissions_management/types/AdminSecurityPermissionsManagementTypes';
import { updateStaffPermissionPayloadSchema } from '@/app/frontend_admin/admin_security/security_permissions_management/schemas/AdminSecurityPermissionsManagementSchemas';

let permissionsState = structuredClone(MOCK_ADMIN_PERMISSIONS);
let overridesState = structuredClone(MOCK_ADMIN_PERMISSION_OVERRIDES);
const ok = <T>(data: T, message = 'Success') => HttpResponse.json({ success: true, message, data  , requestId: globalThis.crypto.randomUUID()});
const parse = async (request: Request): Promise<unknown> => { try { return await request.clone().json(); } catch { return undefined; } };

/** Reset module-owned mutable MSW state between tests so each test starts from the canonical fixtures. */
export function resetAdminPermissionsMockState(): void {
  permissionsState = structuredClone(MOCK_ADMIN_PERMISSIONS);
  overridesState = structuredClone(MOCK_ADMIN_PERMISSION_OVERRIDES);
}

export const adminPermissionsMockHandlers = [
  http.get('*/frontend_admin/admin_security/security_permissions_management', () => ok(permissionsState)),
  http.get('*/admin/permissions/overrides', () => ok(overridesState)),
  http.patch('*/admin/permissions/:staffId', async ({ params, request }) => {
    const staffId = String(params.staffId ?? '');
    const parsed = updateStaffPermissionPayloadSchema.safeParse(await parse(request));
    if (!parsed.success) return HttpResponse.json({ errorCode: 'ADMIN_API_BAD_REQUEST', statusCode: StatusCodes.BAD_REQUEST, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Invalid permission update payload', data: null }, { status: StatusCodes.BAD_REQUEST });
    const { permission, enabled } = parsed.data;
    const current = overridesState.find((item) => item.staffId === staffId);
    if (!current) return HttpResponse.json({ errorCode: 'ADMIN_API_NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Staff override not found', data: null }, { status: StatusCodes.NOT_FOUND });
    const next: StaffOverride = { ...current, overrides: { ...current.overrides, [permission]: enabled } };
    overridesState = overridesState.map((item) => item.staffId === staffId ? next : item);
    return ok(next, 'Permission updated');
  }),
  http.post('*/admin/permissions/:staffId/reset', ({ params }) => {
    const staffId = String(params.staffId ?? '');
    const current = overridesState.find((item) => item.staffId === staffId);
    if (!current) return HttpResponse.json({ errorCode: 'ADMIN_API_NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Staff override not found', data: null }, { status: StatusCodes.NOT_FOUND });
    overridesState = overridesState.filter((item) => item.staffId !== staffId);
    return ok(null, 'Permissions reset to role defaults');
  }),
];
