// RESPONSIBILITY: Provides strongly-typed network calls for the Settings module.
// DATA FLOW: feature hook/view → feature API client → apiFetch host transport → typed ApiResponse/data validation → UI/cache (admin_settings/settings_management/api/admin_settings_management_api.ts)

import { adminSettingsManagementApiFetch as apiFetch } from '@/app/frontend_admin/admin_settings/settings_management/utils/AdminSettingsManagementApiResponse';
import { type ApiResponse } from '@/lib/api';
import { ADMIN_SETTINGS_API } from '@/app/frontend_admin/admin_settings/settings_management/config/admin_settings_management.url_config';
import { AdminSettingsResponseSchema } from '@/app/frontend_admin/admin_settings/settings_management/schemas/AdminSettingsManagementSchemas';
import type { AdminSettingsResponse, AdminSettingsUpdatePayload } from '@/app/frontend_admin/admin_settings/settings_management/types/AdminSettingsManagementTypes';

export const AdminSettingsApi = {
  fetchSettings: async (): Promise<ApiResponse<AdminSettingsResponse['data']>> =>
    apiFetch<AdminSettingsResponse['data']>(ADMIN_SETTINGS_API.fetchSettings, {
      method: 'GET',
      dataSchema: AdminSettingsResponseSchema.shape.data,
    }),

  updateSettings: async (body: AdminSettingsUpdatePayload, idempotencyKey: string): Promise<ApiResponse<AdminSettingsResponse['data']>> =>
    apiFetch<AdminSettingsResponse['data']>(ADMIN_SETTINGS_API.updateSettings, {
      method: 'POST',
      body: JSON.stringify(body),
      dataSchema: AdminSettingsResponseSchema.shape.data,
      headers: { 'Idempotency-Key': idempotencyKey },
    }),
};
