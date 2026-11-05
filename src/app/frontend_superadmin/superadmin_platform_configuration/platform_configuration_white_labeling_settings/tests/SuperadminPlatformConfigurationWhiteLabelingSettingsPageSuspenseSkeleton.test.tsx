import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import SuperadminPlatformConfigurationWhiteLabelingSettingsPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/components/SuperadminPlatformConfigurationWhiteLabelingSettingsPageSuspenseSkeleton';


vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
describe('platform_configuration_white_labeling_settings suspense isolation', () => {
  it('exposes a stable localized busy status without an external feature import', () => {
    render(<SuperadminPlatformConfigurationWhiteLabelingSettingsPageSuspenseSkeleton />);
    const status = screen.getByRole('status');
    expect(status.getAttribute('aria-busy')).toBe('true');
    expect(status.getAttribute('aria-label')).toBe('ui.route_loading');
  });
});
