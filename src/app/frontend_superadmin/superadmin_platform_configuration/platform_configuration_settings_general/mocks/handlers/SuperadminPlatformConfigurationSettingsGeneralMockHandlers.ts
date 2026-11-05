import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse, delay } from 'msw';

import { SUPERADMIN_PLATFORM_CONFIGURATION_SETTINGS_GENERAL_API } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/config/superadmin_platform_configuration_settings_general.url_config';
import { MOCK_PLATFORM_SETTINGS } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/mocks/fixtures/SuperadminPlatformConfigurationSettingsGeneralMockData';
import { PlatformSettingSchema, SettingUpdateSchema, isSuperadminSettingValueValid } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/schemas/superadmin_platform_configuration_settings_general_contract.schemas';

import type { PlatformSetting } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/types/superadmin_platform_configuration_settings_general.types';
import type { ApiResponse } from '@/lib/api';


let mockSettings: PlatformSetting[] = [...MOCK_PLATFORM_SETTINGS];
export function resetSuperadminPlatformConfigurationSettingsMockState(): void { mockSettings = [...MOCK_PLATFORM_SETTINGS]; }
export const superadminSettingsHandlers = [
  http.get(SUPERADMIN_PLATFORM_CONFIGURATION_SETTINGS_GENERAL_API.BASE, async () => {
    await delay(300);
    return HttpResponse.json<ApiResponse<PlatformSetting[]>>({ success: true, message: 'Success', data: [...mockSettings], requestId: crypto.randomUUID()});
  }),
  http.patch(SUPERADMIN_PLATFORM_CONFIGURATION_SETTINGS_GENERAL_API.UPDATE_PATTERN, async ({ params, request }) => {
    await delay(400);
    const id = String(params.id ?? '');
    const index = mockSettings.findIndex((setting) => setting.id === id);
    if (index < 0) return HttpResponse.json<ApiResponse<PlatformSetting | null>>({ success: false, message: 'Setting not found.', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
    const rawBody: unknown = await request.json();
    const parsedBody = SettingUpdateSchema.safeParse(rawBody);
    if (!parsedBody.success || !isSuperadminSettingValueValid(mockSettings[index]!.dataType, parsedBody.data.value)) {
      return HttpResponse.json<ApiResponse<PlatformSetting | null>>({ success: false, message: 'Invalid setting value.', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
    }
    const parsedRecord = PlatformSettingSchema.safeParse({ ...mockSettings[index]!, value: parsedBody.data.value });
    if (!parsedRecord.success) return HttpResponse.json<ApiResponse<PlatformSetting | null>>({ success: false, message: 'Invalid setting value.', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
    mockSettings = mockSettings.map((setting, settingIndex) => settingIndex === index ? parsedRecord.data : setting);
    return HttpResponse.json<ApiResponse<PlatformSetting>>({ success: true, message: 'Setting updated', data: mockSettings[index]!, requestId: crypto.randomUUID()});
  }),
];
