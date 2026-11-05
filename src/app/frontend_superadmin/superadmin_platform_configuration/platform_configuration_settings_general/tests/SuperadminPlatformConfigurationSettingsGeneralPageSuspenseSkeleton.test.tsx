import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import SuperadminPlatformConfigurationSettingsGeneralPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/components/SuperadminPlatformConfigurationSettingsGeneralPageSuspenseSkeleton';


vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
describe('platform_configuration_settings_general suspense isolation', () => {
  it('exposes a stable localized busy status without an external feature import', () => {
    render(<SuperadminPlatformConfigurationSettingsGeneralPageSuspenseSkeleton />);
    const status = screen.getByRole('status');
    expect(status.getAttribute('aria-busy')).toBe('true');
    expect(status.getAttribute('aria-label')).toBe('ui.route_loading');
  });
});
