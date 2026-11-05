import {describe, expect, it, beforeEach} from 'vitest';

import { SUPERADMIN_PLATFORM_CONFIGURATION_SETTINGS_GOVERNANCE_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/mocks/fixtures/SuperadminPlatformConfigurationSettingsGeneralV1MockFixtures';
import { resetSuperadminPlatformConfigurationSettingsMockState } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/mocks/handlers/SuperadminPlatformConfigurationSettingsGeneralMockHandlers';
import { SuperadminPlatformConfigurationSettingsV1ResponseSchema } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/schemas/superadmin_platform_configuration_settings_general_v1_contract.schemas';
import { SuperadminPlatformConfigurationSettingsV1DataSchema } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/schemas/superadmin_platform_configuration_settings_general_v1_contract.schemas';

beforeEach(() => {
  resetSuperadminPlatformConfigurationSettingsMockState();
});

describe('Platform Governance contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminPlatformConfigurationSettingsV1DataSchema.safeParse(SUPERADMIN_PLATFORM_CONFIGURATION_SETTINGS_GOVERNANCE_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
describe('Settings General V1 response discriminant', () => {
  it('accepts the complete success fixture and failure without data', () => {
    expect(SuperadminPlatformConfigurationSettingsV1ResponseSchema.safeParse({ success: true, message: 'ok', requestId: 'req-settings-1', data: SUPERADMIN_PLATFORM_CONFIGURATION_SETTINGS_GOVERNANCE_MOCK_FIXTURE }).success).toBe(true);
    expect(SuperadminPlatformConfigurationSettingsV1ResponseSchema.safeParse({ success: false, message: 'unavailable', requestId: 'req-settings-2', errorCode: 'SERVICE_UNAVAILABLE', statusCode: 503 }).success).toBe(true);
  });
  it('rejects a success branch without data and failure with object data', () => {
    expect(SuperadminPlatformConfigurationSettingsV1ResponseSchema.safeParse({ success: true, message: 'missing data', requestId: 'req-settings-3' }).success).toBe(false);
    expect(SuperadminPlatformConfigurationSettingsV1ResponseSchema.safeParse({ success: false, message: 'failure', requestId: 'req-settings-4', errorCode: 'INVALID_RESPONSE', statusCode: 500, data: {} }).success).toBe(false);
  });
});
