import { MANAGER_BUSINESS_SETTINGS_API } from '@/app/frontend_manager/manager_dashboard/business_settings/config/manager_business_settings.url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';



import { managerAllSettingsSchema } from '@/app/frontend_manager/manager_dashboard/business_settings/schemas/manager_business_settings.schemas';
import type { ManagerAllSettings } from '@/app/frontend_manager/manager_dashboard/business_settings/types/manager_business_settings.types';


/**
 * @description Provides the ManagerBusinessSettingsApi implementation for the settings module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_dashboard/manager_settings_schemas/ManagerBusinessSettingsSchema; @/app/frontend_manager/manager_dashboard/manager_settings_url_config; @/app/frontend_manager/manager_dashboard/manager_settings_types/ManagerBusinessSettingsTypes; @/lib/api
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerBusinessSettingsApi = {
  fetchSettings: async (): Promise<ApiResponse<ManagerAllSettings>> => apiFetch(MANAGER_BUSINESS_SETTINGS_API.BASE, { dataSchema: managerAllSettingsSchema }),
  updateSettings: async (body: Partial<ManagerAllSettings>, idempotencyKey: string): Promise<ApiResponse<ManagerAllSettings>> => apiFetch(MANAGER_BUSINESS_SETTINGS_API.BASE, { method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: managerAllSettingsSchema }) };
