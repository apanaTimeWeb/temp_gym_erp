// RESPONSIBILITY: Owns MSW handlers for the Admin profile feature.
// DATA FLOW: profile API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.

import { http, HttpResponse } from 'msw';
import { updateAdminProfilePayloadSchema, updateAdminPasswordPayloadSchema } from '@/app/frontend_admin/admin_profile/profile_overview/schemas/AdminProfileOverviewSchemas';

import type { AdminProfileJsonObject } from '@/app/frontend_admin/admin_profile/profile_overview/types/AdminProfileOverviewMockHandlerTypes';
/**
 * parseRequestBody is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
async function parseRequestBody(request: Request): Promise<unknown> {
  try { return await request.clone().json(); } catch { return undefined; }
}

/**
 * asRecord is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function asRecord(value: unknown): AdminProfileJsonObject {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as AdminProfileJsonObject : {};
}

const invalid = () => HttpResponse.json({success:false, message:'Invalid profile request',errorCode:'ADMIN_API_400',statusCode:400,requestId:globalThis.crypto.randomUUID()},{status:400});
const ok = <T>(data: T, message = 'Success') =>
  HttpResponse.json({ success: true, message, data  , requestId: globalThis.crypto.randomUUID()});

const paged = <T>(data: T[], page: number, limit: number, message = 'Success') => {
  const safeLimit = Math.max(1, limit);
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * safeLimit;
  const pageData = data.slice(start, start + safeLimit);
  return HttpResponse.json({ success: true, message, data: pageData, meta: { total: data.length, page: safePage, limit: safeLimit, totalPages: Math.max(1, Math.ceil(data.length / safeLimit)), hasNextPage: safePage < Math.max(1, Math.ceil(data.length / safeLimit)), hasPrevPage: safePage > 1 }  , requestId: globalThis.crypto.randomUUID()});
};

import { MOCK_ADMIN_PROFILE } from '@/app/frontend_admin/admin_profile/profile_overview/mocks/fixtures/AdminProfileOverviewMockFixtures';
import type { AdminProfileData } from '@/app/frontend_admin/admin_profile/profile_overview/types/AdminProfileOverviewTypes';
let profileState: AdminProfileData = structuredClone(MOCK_ADMIN_PROFILE);

export const adminProfileMockHandlers = [
  http.get('*/admin/adminProfile/fetchProfile', () => ok(profileState)),
  http.post('*/admin/adminProfile/updateProfile', async ({ request }) => { const raw = await parseRequestBody(request); const result = updateAdminProfilePayloadSchema.strict().safeParse(raw); if (!result.success) return invalid(); profileState = { ...profileState, ...result.data }; return ok(profileState, 'Profile updated'); }),
  http.post('*/admin/adminProfile/updatePassword', async ({ request }) => { const parsed = updateAdminPasswordPayloadSchema.strict().safeParse(await parseRequestBody(request)); if (!parsed.success) return invalid(); return ok(null, 'Password updated'); })
];
