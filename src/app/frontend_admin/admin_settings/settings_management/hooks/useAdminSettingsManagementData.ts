"use client";
// RESPONSIBILITY: Owns the Admin Settings server-state query and exposes only query results to the Settings view layer.
// DATA FLOW: Settings URL tab → TanStack Query → AdminSettingsApi → typed validated settings response → AdminSettingsContent.

import { ADMIN_SETTINGS_QUERY_KEYS } from '@/app/frontend_admin/admin_settings/settings_management/constants/AdminSettingsManagementQueryKeys';

import { useQuery } from '@tanstack/react-query';
import { AdminSettingsApi } from '@/app/frontend_admin/admin_settings/settings_management/api/admin_settings_management_api';
/** @description useAdminSettingsData: Owns the Admin Settings server-state query and exposes only query results to the Settings view layer. @dependencies Consumes AdminSettingsQueryKeys, AdminSettingsApi. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminSettingsData() {
  return useQuery({
    queryKey: ADMIN_SETTINGS_QUERY_KEYS.key(),
    queryFn: AdminSettingsApi.fetchSettings,
    staleTime: 300_000,
  });
}
