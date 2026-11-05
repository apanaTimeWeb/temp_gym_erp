/** Stable module-owned query keys with normalized search identity. */
import { normalizeWhiteLabelSearch } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/constants/superadmin_platform_configuration_white_labeling_settings.constants';
import type { SuperadminPlatformConfigurationWhiteLabelingStatusFilter } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/constants/superadmin_platform_configuration_white_labeling_settings.constants';

export const SUPERADMIN_PLATFORM_CONFIGURATION_WHITE_LABELING_QUERY_KEYS = {
  all: ['superadmin_platform_configuration_white_labeling'] as const,
  domains: (params: { search: string; status: SuperadminPlatformConfigurationWhiteLabelingStatusFilter }) => [
    'superadmin_platform_configuration_white_labeling', 'domains',
    { search: normalizeWhiteLabelSearch(params.search), status: params.status },
  ] as const,
} as const;
