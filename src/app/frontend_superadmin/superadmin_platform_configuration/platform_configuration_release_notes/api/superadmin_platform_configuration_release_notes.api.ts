import { superadminFeaturesManagementApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_release_notes/api/superadmin_platform_configuration_release_notes_api_fetch.api';
import { SUPERADMIN_PLATFORM_CONFIGURATION_RELEASE_NOTES_API as SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_API } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_release_notes/config/superadmin_platform_configuration_release_notes.url_config';
import { SuperadminPlatformConfigurationFeaturesDeleteDataSchema, SuperadminPlatformConfigurationFeaturesHistoryDataSchema, SuperadminPlatformConfigurationFeaturesTenantsDataSchema, SuperadminPlatformConfigurationFeaturesListDataSchema } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_release_notes/schemas/superadmin_platform_configuration_release_notes_api.schemas';
import { ReleaseNoteSchema, FeatureFlagSchema } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_release_notes/schemas/superadmin_platform_configuration_release_notes_types.schemas';

import type { SuperadminFeatureHistoryEntry, FeatureFlag, ReleaseNote, SuperadminPlatformConfigurationFeaturesTenant } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_release_notes/types/superadmin_platform_configuration_release_notes.types';


export const featuresApi = {
    fetchTenants: () => apiFetch<SuperadminPlatformConfigurationFeaturesTenant[]>(SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_API.TENANTS, { dataSchema: SuperadminPlatformConfigurationFeaturesTenantsDataSchema }),
    fetchFeatures: () => apiFetch<{
        flags: FeatureFlag[];
        notes: ReleaseNote[];
    }>(SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_API.BASE, {
        dataSchema: SuperadminPlatformConfigurationFeaturesListDataSchema,
    }),

    fetchFeatureFlagHistory: (id: string) => apiFetch<SuperadminFeatureHistoryEntry[]>(SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_API.FLAG_HISTORY(id), {
        dataSchema: SuperadminPlatformConfigurationFeaturesHistoryDataSchema,
    }),
    createFeatureFlag: (body: Partial<FeatureFlag>, idempotencyKey: string) => apiFetch<FeatureFlag>(SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_API.FLAGS, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: FeatureFlagSchema,
    }),
    updateFeatureFlag: (id: string, body: Partial<FeatureFlag>, idempotencyKey: string) => apiFetch<FeatureFlag>(SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_API.FLAG(id), {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: FeatureFlagSchema,
    }),
    toggleFeatureFlag: (id: string, idempotencyKey: string) => apiFetch<FeatureFlag>(SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_API.FLAG_TOGGLE(id), {
        method: 'POST',
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: FeatureFlagSchema,
    }),
    deleteFeatureFlag: (id: string, idempotencyKey: string) => apiFetch<void>(SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_API.FLAG(id), {
        method: 'DELETE',
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SuperadminPlatformConfigurationFeaturesDeleteDataSchema,
    }),
    createReleaseNote: (body: Partial<ReleaseNote>, idempotencyKey: string) => apiFetch<ReleaseNote>(SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_API.NOTES, {
        method: 'POST',
        body: JSON.stringify({ ...body, date: body.date ?? new Date().toISOString() }),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: ReleaseNoteSchema,
    }),
    updateReleaseNote: (id: string, body: Partial<ReleaseNote>, idempotencyKey: string) => apiFetch<ReleaseNote>(SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_API.NOTE(id), {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: ReleaseNoteSchema,
    }),
    deleteReleaseNote: (id: string, idempotencyKey: string) => apiFetch<void>(SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_API.NOTE(id), {
        method: 'DELETE',
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SuperadminPlatformConfigurationFeaturesDeleteDataSchema,
    }),
};
