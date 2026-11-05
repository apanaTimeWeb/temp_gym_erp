// DATA FLOW: Settings page → ManagerBusinessSettingsQuery → ManagerBusinessSettingsApi → TanStack Query server state → settings UI.
'use client';
import { useQuery } from '@tanstack/react-query';

import { ManagerBusinessSettingsApi } from '@/app/frontend_manager/manager_dashboard/business_settings/api/manager_business_settings.api';
import { ManagerBusinessSettingsQueryKeys } from '@/app/frontend_manager/manager_dashboard/business_settings/api/manager_business_settings.query_keys';

/**
 * @description Reads the current Manager settings through the module API and TanStack Query server-state boundary.
 * @dependencies Uses ManagerBusinessSettingsApi and ManagerBusinessSettingsQueryKeys.
 * @edge-case Retains TanStack Query's native pending/error states and never stores API response data in Zustand or local state.
 */
export function useManagerBusinessSettingsQuery() {
  return useQuery({
    queryKey: ManagerBusinessSettingsQueryKeys.current(),
    queryFn: async () => { const response = await ManagerBusinessSettingsApi.fetchSettings(); if (!response.success) throw new Error(response.message || 'Unable to load business settings'); return response; },
  });
}
