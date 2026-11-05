// DATA FLOW: Feature API/query state → custom hook → owning component/store → UI result.
'use client';
import { useQuery } from '@tanstack/react-query';

import { SuperadminPlatformConfigurationWhiteLabelingApi } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/api/superadmin_platform_configuration_white_labeling_settings.api';
import { SUPERADMIN_PLATFORM_CONFIGURATION_WHITE_LABELING_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/api/superadmin_platform_configuration_white_labeling_settings.query_keys';

import type { SuperadminPlatformConfigurationWhiteLabelingStatusFilter } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/constants/superadmin_platform_configuration_white_labeling_settings.constants';
import type { WhiteLabelDomainsListResponse } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/types/superadmin_platform_configuration_white_labeling_settings.types';

/**
 * @description Queries white-label domains with URL-synchronized filter state so cache identity matches the visible list.
 * @dependencies Uses the owning module API facade and query-key registry.
 * @edge-case Preserves distinct cache entries for search/status combinations and leaves retry/error handling to TanStack Query.
 */
export function useSuperadminPlatformConfigurationWhiteLabelingSettingsDomains(params: {
  search: string;
  status: SuperadminPlatformConfigurationWhiteLabelingStatusFilter;
}) {
  return useQuery<WhiteLabelDomainsListResponse>({
    queryKey: SUPERADMIN_PLATFORM_CONFIGURATION_WHITE_LABELING_QUERY_KEYS.domains(params),
    queryFn: async () => {
      const response = await SuperadminPlatformConfigurationWhiteLabelingApi.getDomains(params);
      if (!response.success) throw new Error(response.message || 'Failed to load white-label domains');
      return response;
    },
  });
}
