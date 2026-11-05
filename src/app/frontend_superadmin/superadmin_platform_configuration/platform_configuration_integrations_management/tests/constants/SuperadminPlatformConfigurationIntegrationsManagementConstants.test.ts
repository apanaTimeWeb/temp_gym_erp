// RESPONSIBILITY: Verifies the supported integration API-key scopes.
import { describe, expect, it } from 'vitest';

import { SUPERADMIN_PLATFORM_CONFIGURATION_INTEGRATIONS_KEY_SCOPES, getSuperadminIntegrationStatusLabelKey } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/constants/superadmin_platform_configuration_integrations_management.constants';



describe('SuperadminPlatformConfigurationIntegrationsConstants', () => {
  it('exposes only the documented read/write scopes in deterministic order', () => {
    expect(SUPERADMIN_PLATFORM_CONFIGURATION_INTEGRATIONS_KEY_SCOPES).toEqual(['READ', 'WRITE']);
    expect(new Set(SUPERADMIN_PLATFORM_CONFIGURATION_INTEGRATIONS_KEY_SCOPES).size).toBe(SUPERADMIN_PLATFORM_CONFIGURATION_INTEGRATIONS_KEY_SCOPES.length);
  });

  it('maps known wire status codes to localized label keys and leaves unknown codes for safe fallback', () => {
    expect(getSuperadminIntegrationStatusLabelKey('CONNECTED')).toBe('ui.status_connected');
    expect(getSuperadminIntegrationStatusLabelKey('DEGRADED')).toBe('ui.status_degraded');
    expect(getSuperadminIntegrationStatusLabelKey('FUTURE_STATUS')).toBeNull();
  });
});
