import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse, delay } from 'msw';

import { SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_API } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/config/superadmin_platform_configuration_features_management.url_config';
import { SUPERADMIN_FEATURE_HISTORY, SUPERADMIN_FEATURE_FLAGS, SUPERADMIN_RELEASE_NOTES, SUPERADMIN_FEATURE_TENANTS } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/mocks/fixtures/SuperadminPlatformConfigurationFeaturesManagementMockFixtures';
import { formatSuperadminPlatformConfigurationFeaturesCalendarDate } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/utils/SuperadminPlatformConfigurationFeaturesManagementDateUtils';

import type { FeatureFlag, ReleaseNote, SuperadminFeatureHistoryEntry } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/types/superadmin_platform_configuration_features_management.types';
import type { ApiResponse } from '@/lib/api';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminPlatformConfigurationFeaturesMockHandlers owned by the superadmin_platform_configuration_features feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: http-status-codes, msw, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/mocks/fixtures/SuperadminPlatformConfigurationFeaturesManagementMockFixtures, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/config/superadmin_platform_configuration_features_management.url_config, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/utils/SuperadminPlatformConfigurationFeaturesManagementDateUtils, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/types/superadmin_platform_configuration_features_management.types, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */


const BASE_URL = `*${SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_API.BASE}`;
export let mockFlags: FeatureFlag[] = [...SUPERADMIN_FEATURE_FLAGS];
export let mockNotes: ReleaseNote[] = [...SUPERADMIN_RELEASE_NOTES];
let mockHistory: Record<string, SuperadminFeatureHistoryEntry[]> = Object.fromEntries(Object.entries(SUPERADMIN_FEATURE_HISTORY).map(([id, entries]) => [id, [...entries]]));

export function resetSuperadminPlatformConfigurationFeaturesMockState(): void {
    mockFlags = [...SUPERADMIN_FEATURE_FLAGS];
    mockNotes = [...SUPERADMIN_RELEASE_NOTES];
    mockHistory = Object.fromEntries(Object.entries(SUPERADMIN_FEATURE_HISTORY).map(([id, entries]) => [id, [...entries]]));
}
export const superadminFeaturesHandlers = [
    http.get(`*${SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_API.TENANTS}`, async () => HttpResponse.json({ success: true, message: 'Success', data: SUPERADMIN_FEATURE_TENANTS, requestId: crypto.randomUUID()})),
    http.get(`${BASE_URL}/flags/:id/history`, async ({ params }) => {
        await delay(250);
        const id = String(params.id);
        const history: SuperadminFeatureHistoryEntry[] = mockHistory[id] ?? [];
        return HttpResponse.json<ApiResponse<SuperadminFeatureHistoryEntry[]>>({ success: true, message: 'Feature history loaded', data: history, requestId: crypto.randomUUID()});
    }),
    http.get(BASE_URL, async () => {
        await delay(400);
        return HttpResponse.json<ApiResponse<{
            flags: FeatureFlag[];
            notes: ReleaseNote[];
        }>>({
            success: true,
            message: 'Success',
            data: { flags: mockFlags, notes: mockNotes },
            requestId: crypto.randomUUID(),
        });
    }),
    http.post(`${BASE_URL}/flags`, async ({ request }) => {
        await delay(500);
        const body = await request.json() as Partial<FeatureFlag>;
        const newFlag: FeatureFlag = {
            ...body,
            id: `f${Date.now()}`,
            name: body.name || 'New Feature',
            description: body.description || '',
            isGlobalEnabled: body.isGlobalEnabled || false,
            enabledTenantIds: body.enabledTenantIds || [],
        };
        mockFlags = [newFlag, ...mockFlags];
        return HttpResponse.json<ApiResponse<FeatureFlag>>({
            success: true,
            message: 'Created',
            data: newFlag,
            requestId: crypto.randomUUID(),
        });
    }),
    http.patch(`${BASE_URL}/flags/:id`, async ({ params, request }) => {
        await delay(500);
        const id = params.id as string;
        const body = await request.json() as Partial<FeatureFlag>;
        let updated: FeatureFlag | null = null;
        mockFlags = mockFlags.map(f => {
            if (f.id === id) {
                updated = { ...f, ...body };
                mockHistory[id] = [{ id: `history-${Date.now()}`, action: `UPDATED:${Object.keys(body).sort().join(',')}`, user: 'Superadmin', timestamp: new Date().toISOString() }, ...(mockHistory[id] ?? [])];
                return updated;
            }
            return f;
        });
        if (!updated) {
            return HttpResponse.json<ApiResponse<FeatureFlag>>({ success: false, message: 'Not found', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
        }
        return HttpResponse.json<ApiResponse<FeatureFlag>>({
            success: true,
            message: 'Updated',
            data: updated,
            requestId: crypto.randomUUID(),
        });
    }),
    http.post(`${BASE_URL}/flags/:id/toggle`, async ({ params }) => {
        await delay(400);
        const id = params.id as string;
        let updated: FeatureFlag | null = null;
        mockFlags = mockFlags.map(f => {
            if (f.id === id) {
                updated = { ...f, isGlobalEnabled: !f.isGlobalEnabled };
                mockHistory[id] = [{ id: `history-${Date.now()}`, action: updated.isGlobalEnabled ? 'ENABLED' : 'DISABLED', user: 'Superadmin', timestamp: new Date().toISOString() }, ...(mockHistory[id] ?? [])];
                return updated;
            }
            return f;
        });
        if (!updated) {
            return HttpResponse.json<ApiResponse<FeatureFlag>>({ success: false, message: 'Not found', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
        }
        return HttpResponse.json<ApiResponse<FeatureFlag>>({
            success: true,
            message: 'Toggled',
            data: updated,
            requestId: crypto.randomUUID(),
        });
    }),
    http.delete(`${BASE_URL}/flags/:id`, async ({ params }) => {
        await delay(400);
        const id = params.id as string;
        mockFlags = mockFlags.filter(f => f.id !== id);
        return HttpResponse.json<ApiResponse<null>>({
            success: true,
            message: 'Deleted',
            data: null,
            requestId: crypto.randomUUID(),
        });
    }),
    http.post(`${BASE_URL}/notes`, async ({ request }) => {
        await delay(500);
        const body = await request.json() as Partial<ReleaseNote>;
        const newNote: ReleaseNote = {
            ...body,
            id: `rn${Date.now()}`,
            version: body.version || 'v1.0.0',
            title: body.title || 'New Note',
            content: body.content || '',
            date: body.date || formatSuperadminPlatformConfigurationFeaturesCalendarDate(new Date()),
            isPublished: body.isPublished || false,
        };
        mockNotes = [newNote, ...mockNotes];
        return HttpResponse.json<ApiResponse<ReleaseNote>>({
            success: true,
            message: 'Created',
            data: newNote,
            requestId: crypto.randomUUID(),
        });
    }),
    http.patch(`${BASE_URL}/notes/:id`, async ({ params, request }) => {
        await delay(500);
        const id = params.id as string;
        const body = await request.json() as Partial<ReleaseNote>;
        let updated: ReleaseNote | null = null;
        mockNotes = mockNotes.map(n => {
            if (n.id === id) {
                updated = { ...n, ...body };
                return updated;
            }
            return n;
        });
        if (!updated) {
            return HttpResponse.json<ApiResponse<ReleaseNote>>({ success: false, message: 'Not found', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
        }
        return HttpResponse.json<ApiResponse<ReleaseNote>>({
            success: true,
            message: 'Updated',
            data: updated,
            requestId: crypto.randomUUID(),
        });
    }),
    http.delete(`${BASE_URL}/notes/:id`, async ({ params }) => {
        await delay(400);
        const id = params.id as string;
        mockNotes = mockNotes.filter(n => n.id !== id);
        return HttpResponse.json<ApiResponse<null>>({
            success: true,
            message: 'Deleted',
            data: null,
            requestId: crypto.randomUUID(),
        });
    }),
];
