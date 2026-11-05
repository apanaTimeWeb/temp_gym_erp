'use client';
// DATA FLOW: Owning feature API/query/store state → useSuperadminPlatformConfigurationSettingsGeneralPage → consuming feature component.
import { useQuery } from '@tanstack/react-query';

import { settingsApi } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/api/superadmin_platform_configuration_settings_general.api';
import { SUPERADMIN_PLATFORM_CONFIGURATION_SETTINGS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/api/superadmin_platform_configuration_settings_general.query_keys';
import { useSuperadminPlatformConfigurationSettingsGeneralUpdateMutation } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/hooks/useSuperadminPlatformConfigurationSettingsGeneralUpdateMutation';
import { redactSensitivePlatformSettingValues } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/schemas/superadmin_platform_configuration_settings_general_contract.schemas';


/**
 * @description Owns platform settings query state and delegates persistence to the dedicated mutation hook.
 * @dependencies Uses the module query-key registry, API read contract, and module-owned update mutation.
 * @edge-case Keeps server state in TanStack Query and reuses a single idempotency key across retries for one save intent.
 */
export function useSuperadminPlatformConfigurationSettingsGeneralPage() {
  const query = useQuery({
    queryKey: SUPERADMIN_PLATFORM_CONFIGURATION_SETTINGS_QUERY_KEYS.all,
    queryFn: async () => {
      const response = await settingsApi.fetchSettings();
      if (!response.success) throw new Error(response.message || 'Failed to load platform settings');
      if (!Array.isArray(response.data)) throw new Error('Invalid platform settings response');
      // Redact secret-bearing values before TanStack Query caches the response.
      return { ...response, data: redactSensitivePlatformSettingValues(response.data) };
    },
  });
  const { updateSetting, isUpdating, updateError, variables } = useSuperadminPlatformConfigurationSettingsGeneralUpdateMutation();
  return { query, updateSetting, isUpdating, updateError, variables };
}
