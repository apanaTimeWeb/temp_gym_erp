import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import SuperadminPlatformConfigurationFeaturesManagementPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/components/SuperadminPlatformConfigurationFeaturesManagementPageSuspenseSkeleton';


vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
describe('platform_configuration_features_management suspense isolation', () => {
  it('exposes a stable localized busy status without an external feature import', () => {
    render(<SuperadminPlatformConfigurationFeaturesManagementPageSuspenseSkeleton />);
    const status = screen.getByRole('status');
    expect(status.getAttribute('aria-busy')).toBe('true');
    expect(status.getAttribute('aria-label')).toBe('ui.route_loading');
  });
});
