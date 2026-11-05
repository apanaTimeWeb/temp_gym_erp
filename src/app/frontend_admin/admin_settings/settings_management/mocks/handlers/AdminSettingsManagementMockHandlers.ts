// RESPONSIBILITY: Owns MSW handlers for the Admin settings feature.
// DATA FLOW: settings API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.

import { http, HttpResponse } from 'msw';
import { MOCK_ADMIN_SETTINGS } from '@/app/frontend_admin/admin_settings/settings_management/mocks/fixtures/AdminSettingsManagementMockFixtures';
let settingsState = structuredClone(MOCK_ADMIN_SETTINGS);

import type { AdminSettingsJsonObject } from '@/app/frontend_admin/admin_settings/settings_management/types/AdminSettingsManagementMockHandlerTypes';
import { MOCK_ADMIN_SETTINGS_ROLE_PERMISSIONS } from '@/app/frontend_admin/admin_settings/settings_management/mocks/fixtures/AdminSettingsManagementMockFixtures';
import { AdminSettingsUpdateSchema } from '@/app/frontend_admin/admin_settings/settings_management/schemas/AdminSettingsManagementSchemas';

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
function asRecord(value: unknown): AdminSettingsJsonObject {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as AdminSettingsJsonObject : {};
}

const ok = <T>(data: T, message = 'Success') =>
  HttpResponse.json({ success: true, message, data  , requestId: globalThis.crypto.randomUUID()});

const paged = <T>(data: T[], page: number, limit: number, message = 'Success') => {
  const safeLimit = Math.max(1, limit);
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * safeLimit;
  const pageData = data.slice(start, start + safeLimit);
  return HttpResponse.json({ success: true, message, data: pageData, meta: { total: data.length, page: safePage, limit: safeLimit, totalPages: Math.max(1, Math.ceil(data.length / safeLimit)), hasNextPage: safePage < Math.max(1, Math.ceil(data.length / safeLimit)), hasPrevPage: safePage > 1 }  , requestId: globalThis.crypto.randomUUID()});
};


export const adminSettingsMockHandlers = [
  http.get('*/admin/permissions/fetchPermissions', ({ request }) => { const url = new URL(request.url); if (url.searchParams.get('consumer') !== 'settings') return; return HttpResponse.json({ success: true, message: 'Success', data: { roleDefaults: MOCK_ADMIN_SETTINGS_ROLE_PERMISSIONS, gymOverrides: [] } , requestId: globalThis.crypto.randomUUID() }); }),
  http.get('*/admin/settings/fetchSettings', () => ok(settingsState)),
  http.post('*/admin/settings/updateSettings', async ({ request }) => { const body = await parseRequestBody(request); if (body === undefined || !body || typeof body !== 'object' || Array.isArray(body)) return HttpResponse.json({ errorCode: 'ADMIN_API_400', statusCode: 400, requestId: globalThis.crypto.randomUUID(), success: false, message: 'A valid settings object is required', data: null }, { status: 400 }); const parsed = AdminSettingsUpdateSchema.safeParse(body); if (!parsed.success) return HttpResponse.json({ errorCode: 'ADMIN_API_400', statusCode: 400, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Settings payload failed validation', data: null }, { status: 400 }); const incoming = asRecord(parsed.data); const next = { ...settingsState }; for (const section of ['profile', 'notifications', 'integration', 'gst', 'payment', 'general']) { const value = incoming[section]; if (value && typeof value === 'object' && !Array.isArray(value)) (next as Record<string, Record<string, unknown>>)[section] = { ...(next as Record<string, Record<string, unknown>>)[section], ...(value as Record<string, unknown>) }; } settingsState = next; return ok(settingsState, 'Settings updated'); })
];
