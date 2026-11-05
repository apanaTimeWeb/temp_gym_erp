import { describe, expect, it } from 'vitest';
import { SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_API, SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_ROUTES } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/config/superadmin_platform_configuration_features_management.url_config';

describe('Superadmin Features URL contract', () => {
  it('centralizes API and route bases', () => {
    expect(SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_ROUTES.MAIN).toBe('/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management');
    expect(SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_API.BASE).toBe('/superadmin/features');
    expect(SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_API.TENANTS).toBe('/superadmin/gyms');
  });
  it('encodes dynamic resource ids in URL builders', () => {
    expect(SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_API.FLAG('flag/1')).toBe('/superadmin/features/flags/flag%2F1');
    expect(SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_API.FLAG_HISTORY('flag-1')).toBe('/superadmin/features/flags/flag-1/history');
    expect(SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_API.FLAG_TOGGLE('flag-1')).toBe('/superadmin/features/flags/flag-1/toggle');
    expect(SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_API.NOTE('note/1')).toBe('/superadmin/features/notes/note%2F1');
  });
});
