import { z } from 'zod';

import { superadminSettingsGeneralApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/api/superadmin_platform_configuration_settings_general_api_fetch.api';
import { SUPERADMIN_PLATFORM_CONFIGURATION_SETTINGS_GENERAL_API } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/config/superadmin_platform_configuration_settings_general.url_config';
import { PlatformSettingSchema, SettingUpdateSchema } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/schemas/superadmin_platform_configuration_settings_general_contract.schemas';

import type { PlatformSetting } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/types/superadmin_platform_configuration_settings_general.types';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminPlatformConfigurationSettingsApi owned by the superadmin_platform_configuration_settings feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/schemas/superadmin_platform_configuration_settings_general_contract.schemas, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/api/superadmin_platform_configuration_settings_general_api_fetch.api, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/config/superadmin_platform_configuration_settings_general.url_config, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/types/superadmin_platform_configuration_settings_general.types, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Modularized API client for the Settings module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.


export const settingsApi = {
    fetchSettings: () => apiFetch<PlatformSetting[]>(SUPERADMIN_PLATFORM_CONFIGURATION_SETTINGS_GENERAL_API.BASE, { dataSchema: z.array(PlatformSettingSchema) }),
    updateSetting: (id: string, body: { value: string }, idempotencyKey: string) => {
        const validatedBody = SettingUpdateSchema.parse(body);
        return apiFetch<PlatformSetting>(SUPERADMIN_PLATFORM_CONFIGURATION_SETTINGS_GENERAL_API.UPDATE(id), { method: 'PATCH', body: JSON.stringify(validatedBody),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: PlatformSettingSchema
        });
    },
};
