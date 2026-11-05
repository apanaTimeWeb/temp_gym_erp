'use client';
// DATA FLOW: Owning feature API/query/store state → useSuperadminPlatformConfigurationSettingsGeneralUpdateMutation → consuming feature component.
import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsApi } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/api/superadmin_platform_configuration_settings_general.api';
import { SUPERADMIN_PLATFORM_CONFIGURATION_SETTINGS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/api/superadmin_platform_configuration_settings_general.query_keys';
import { isSensitivePlatformSettingKey } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/schemas/superadmin_platform_configuration_settings_general_contract.schemas';

type SettingIntent = { identity: string; idempotencyKey: string };

/** Persists setting updates with one idempotency key per immutable (setting ID, value) intent. */
export function useSuperadminPlatformConfigurationSettingsGeneralUpdateMutation() {
  const queryClient = useQueryClient();
  const intentKeysRef = useRef<Map<string, string>>(new Map());
  const mutation = useMutation({
    mutationFn: async ({ id, value, idempotencyKey }: { id: string; value: string; idempotencyKey: string }) => {
      const response = await settingsApi.updateSetting(id, { value }, idempotencyKey);
      if (!response.success || !response.data) throw new Error(response.message);
      // Mutation cache must not retain server-returned secret material either.
      return isSensitivePlatformSettingKey(response.data.key)
        ? { ...response, data: { ...response.data, value: '' } }
        : response;
    },
    onSuccess: async (_response, variables) => {
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_PLATFORM_CONFIGURATION_SETTINGS_QUERY_KEYS.all });
      intentKeysRef.current.delete(JSON.stringify([variables.id, variables.value]));
    },
  });

  const updateSetting = (input: { id: string; value: string }) => {
    const identity = JSON.stringify([input.id, input.value]);
    let idempotencyKey = intentKeysRef.current.get(identity);
    if (!idempotencyKey) {
      idempotencyKey = crypto.randomUUID();
      intentKeysRef.current.set(identity, idempotencyKey);
    }
    return mutation.mutateAsync({ ...input, idempotencyKey });
  };

  return { updateSetting, isUpdating: mutation.isPending, updateError: mutation.error, variables: mutation.variables };
}
