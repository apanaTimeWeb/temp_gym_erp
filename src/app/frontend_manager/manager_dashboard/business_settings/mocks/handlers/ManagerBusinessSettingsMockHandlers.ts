import { MANAGER_BUSINESS_SETTINGS_API } from '@/app/frontend_manager/manager_dashboard/business_settings/config/manager_business_settings.url_config';
import { http, HttpResponse } from 'msw';

import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';



import { MOCK_MANAGER_BUSINESS_SETTINGS } from '@/app/frontend_manager/manager_dashboard/business_settings/mocks/fixtures/ManagerBusinessSettingsMockData';
import { managerAllSettingsSchema } from '@/app/frontend_manager/manager_dashboard/business_settings/schemas/manager_business_settings.schemas';
import type { ManagerAllSettings } from '@/app/frontend_manager/manager_dashboard/business_settings/types/manager_business_settings.types';


let settingsDb: ManagerAllSettings = structuredClone(MOCK_MANAGER_BUSINESS_SETTINGS);

/**
 * @description Provides the ManagerBusinessSettingsMockHandlers implementation for the settings module.
 * @dependencies @/app/frontend_manager/manager_infrastructure/manager_infrastructure_utils/ManagerMockApiUrl; @/app/frontend_manager/manager_dashboard/manager_settings_mocks/manager_settings_mocks_fixtures/ManagerBusinessSettingsMockData; @/app/frontend_manager/manager_dashboard/manager_settings_schemas/ManagerBusinessSettingsSchema; @/app/frontend_manager/manager_dashboard/manager_settings_url_config; @/app/frontend_manager/manager_dashboard/manager_settings_types/ManagerBusinessSettingsTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export function resetManagerBusinessSettingsMockState(): void {
  settingsDb = structuredClone(MOCK_MANAGER_BUSINESS_SETTINGS);
}

export const managerSettingsHandlers = [
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_BUSINESS_SETTINGS_API.BASE), () => HttpResponse.json({ success: true, message: 'Settings fetched', data: settingsDb })),
  http.patch(ManagerInfrastructureMockApiUrl(MANAGER_BUSINESS_SETTINGS_API.BASE), async ({ request }) => {
    const raw: unknown = await request.json();
    const parsed = managerAllSettingsSchema.partial().parse(raw);
    settingsDb = managerAllSettingsSchema.parse({ ...settingsDb, ...parsed });
    return HttpResponse.json({ success: true, message: 'Settings updated successfully', data: settingsDb });
  }),
];
