import { describe, expect, it } from 'vitest';

import { formatSuperadminPlatformConfigurationFeaturesCalendarDate } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/utils/SuperadminPlatformConfigurationFeaturesManagementDateUtils';



describe('formatSuperadminPlatformConfigurationFeaturesCalendarDate', () => {
  it('uses the local calendar date without UTC shifting', () => {
    const value = new Date(2026, 8, 20, 0, 0, 0);
    expect(formatSuperadminPlatformConfigurationFeaturesCalendarDate(value)).toBe('2026-09-20');
  });
});
