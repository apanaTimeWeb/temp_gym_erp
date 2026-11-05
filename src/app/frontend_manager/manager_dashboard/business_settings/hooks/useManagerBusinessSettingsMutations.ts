// DATA FLOW: Settings save intent → dedicated mutation hook → ManagerBusinessSettingsApi → TanStack Query authoritative cache → settings UI.
'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ManagerBusinessSettingsApi } from '@/app/frontend_manager/manager_dashboard/business_settings/api/manager_business_settings.api';
import { ManagerBusinessSettingsQueryKeys } from '@/app/frontend_manager/manager_dashboard/business_settings/api/manager_business_settings.query_keys';
import type { ManagerAllSettings } from '@/app/frontend_manager/manager_dashboard/business_settings/types/manager_business_settings.types';

/**
 * @description Owns Manager settings persistence and reconciles the response into the canonical settings query cache.
 * @dependencies Uses ManagerBusinessSettingsApi, ManagerBusinessSettingsQueryKeys, and the module settings payload type.
 * @edge-case Cache is only updated from the authoritative mutation response; failed saves retain the user's unsaved form state for the caller to recover.
 */
export function useManagerBusinessSettingsMutations() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ draft, idempotencyKey }: { draft: ManagerAllSettings; idempotencyKey: string }) => { const response = await ManagerBusinessSettingsApi.updateSettings(draft, idempotencyKey); if (!response.success) throw new Error(response.message || 'Unable to save business settings'); return response; },
    onSuccess: (response) => {
      queryClient.setQueryData(ManagerBusinessSettingsQueryKeys.current(), response);
      void queryClient.invalidateQueries({ queryKey: ManagerBusinessSettingsQueryKeys.current() });
    },
  });
}
