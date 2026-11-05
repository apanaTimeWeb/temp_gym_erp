import { superadminWhiteLabelingSettingsApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/api/superadmin_platform_configuration_white_labeling_settings_api_fetch.api';
import { SUPERADMIN_PLATFORM_CONFIGURATION_WHITE_LABELING_SETTINGS_API } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/config/superadmin_platform_configuration_white_labeling_settings.url_config';
import { normalizeWhiteLabelSearch } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/constants/superadmin_platform_configuration_white_labeling_settings.constants';
import { UpdateDomainStatusDataSchema, WhiteLabelDomainsDataSchema } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/schemas/superadmin_platform_configuration_white_labeling_settings_aliases.schemas';

import type { SuperadminPlatformConfigurationWhiteLabelingStatusFilter } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/constants/superadmin_platform_configuration_white_labeling_settings.constants';
import type { UpdateDomainStatusDto, UpdateDomainStatusResponse, WhiteLabelDomainsListResponse } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/types/superadmin_platform_configuration_white_labeling_settings.types';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminPlatformConfigurationWhiteLabelingApi owned by the superadmin_platform_configuration_white_labeling feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/schemas/superadmin_platform_configuration_white_labeling_settings_aliases.schemas, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/api/superadmin_platform_configuration_white_labeling_settings_api_fetch.api, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/config/superadmin_platform_configuration_white_labeling_settings.url_config, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/constants/superadmin_platform_configuration_white_labeling_settings.constants, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/types/superadmin_platform_configuration_white_labeling_settings.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns HTTP transport and runtime response validation for the Superadmin White-labeling feature.


export const SuperadminPlatformConfigurationWhiteLabelingApi = {
  getDomains: async (params: { search: string; status: SuperadminPlatformConfigurationWhiteLabelingStatusFilter }): Promise<WhiteLabelDomainsListResponse> => {
    const query = new URLSearchParams();
    const search = normalizeWhiteLabelSearch(params.search);
    if (search) query.set('search', search);
    if (params.status !== 'all') query.set('status', params.status);
    const suffix = query.toString() ? `?${query.toString()}` : '';
    return apiFetch<Extract<WhiteLabelDomainsListResponse, { success: true }>["data"]>(`${SUPERADMIN_PLATFORM_CONFIGURATION_WHITE_LABELING_SETTINGS_API.DOMAINS}${suffix}`, {
      method: 'GET',
      dataSchema: WhiteLabelDomainsDataSchema,
    });
  },
  updateDomainStatus: async (id: string, dto: UpdateDomainStatusDto, idempotencyKey: string): Promise<UpdateDomainStatusResponse> => apiFetch<Extract<UpdateDomainStatusResponse, { success: true }>["data"]>(SUPERADMIN_PLATFORM_CONFIGURATION_WHITE_LABELING_SETTINGS_API.UPDATE_STATUS(id), {
    method: 'PATCH',
    body: JSON.stringify(dto),
    headers: { 'Idempotency-Key': idempotencyKey },
    dataSchema: UpdateDomainStatusDataSchema,
  }),
};
