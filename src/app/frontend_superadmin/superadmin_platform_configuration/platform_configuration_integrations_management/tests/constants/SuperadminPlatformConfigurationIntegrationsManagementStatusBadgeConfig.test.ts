import { describe, expect, it } from 'vitest';

import { getSuperadminPlatformConfigurationIntegrationsStatusBadgeClasses } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/constants/superadmin_platform_configuration_integrations_management_status_badge_config.constants';



describe('getSuperadminPlatformConfigurationIntegrationsStatusBadgeClasses', () => {
  it('maps the documented status to semantic design tokens', () => {
    expect(getSuperadminPlatformConfigurationIntegrationsStatusBadgeClasses('CONNECTED')).toContain('bg-success-bg');
  });
  it('falls back safely for an unknown status', () => {
    expect(getSuperadminPlatformConfigurationIntegrationsStatusBadgeClasses('UNKNOWN_STATUS')).toContain('bg-input');
  });
});
