import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import SuperadminPlatformConfigurationWhiteLabelingDrawer from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/components/white_labeling_settings_modals/SuperadminPlatformConfigurationWhiteLabelingSettingsDrawer';
import { useSuperadminPlatformConfigurationWhiteLabelingSettingsStore } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/state/useSuperadminPlatformConfigurationWhiteLabelingSettingsStore';

import type { WhiteLabelDomain } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/types/superadmin_platform_configuration_white_labeling_settings.types';


const mocks = vi.hoisted(() => ({ confirm: vi.fn(), updateStatus: vi.fn() }));
vi.mock('next-intl', () => ({
  useLocale: () => 'en',
  useTranslations: () => (key: string, values?: Record<string, string>) => values ? `${key} ${Object.values(values).join(' ')}` : key,
}));
vi.mock('@/components/ui/Feedback/ConfirmProvider', () => ({ useConfirm: () => ({ confirm: mocks.confirm }) }));
vi.mock('@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/hooks/useSuperadminPlatformConfigurationWhiteLabelingSettingsUpdateDomainStatus', () => ({
  useSuperadminPlatformConfigurationWhiteLabelingSettingsUpdateDomainStatus: () => ({ mutateAsync: mocks.updateStatus, isPending: false }),
}));

const domain: WhiteLabelDomain = {
  id: '123e4567-e89b-12d3-a456-426614174001',
  gymId: '223e4567-e89b-12d3-a456-426614174001',
  gymName: 'CrossFit Pioneers',
  domain: 'pioneers-app.com',
  status: 'pending',
  sslStatus: 'pending',
  logoUrl: null,
  primaryColor: null,
  createdAt: '2026-09-18T14:30:00Z',
};

afterEach(() => {
  vi.clearAllMocks();
  useSuperadminPlatformConfigurationWhiteLabelingSettingsStore.getState().setSelectedDomainId(null);
});

describe('SuperadminPlatformConfigurationWhiteLabelingDrawer interaction lifecycle', () => {
  it('consumes a rejected status mutation at the click boundary', async () => {
    useSuperadminPlatformConfigurationWhiteLabelingSettingsStore.getState().setSelectedDomainId(domain.id);
    mocks.confirm.mockResolvedValue(true);
    mocks.updateStatus.mockRejectedValue(new Error('Expected mutation failure'));
    render(<SuperadminPlatformConfigurationWhiteLabelingDrawer domains={[domain]} />);

    fireEvent.click(screen.getByTestId('superadmin_platform_configuration_white_labeling-drawer-mark-failed'));
    await waitFor(() => expect(mocks.updateStatus).toHaveBeenCalledWith({ id: domain.id, dto: { status: 'failed' } }));
  });


  it('closes the drawer after a successful status update', async () => {
    useSuperadminPlatformConfigurationWhiteLabelingSettingsStore.getState().setSelectedDomainId(domain.id);
    mocks.confirm.mockResolvedValue(true);
    mocks.updateStatus.mockResolvedValue({ success: true, message: 'Updated', data: { ...domain, status: 'active' } });
    render(<SuperadminPlatformConfigurationWhiteLabelingDrawer domains={[domain]} />);

    fireEvent.click(screen.getByTestId('superadmin_platform_configuration_white_labeling-drawer-mark-failed'));
    await waitFor(() => expect(useSuperadminPlatformConfigurationWhiteLabelingSettingsStore.getState().selectedDomainId).toBeNull());
  });

  it('does not steal focus when the selected domain object is refreshed', () => {
    useSuperadminPlatformConfigurationWhiteLabelingSettingsStore.getState().setSelectedDomainId(domain.id);
    const { rerender } = render(<SuperadminPlatformConfigurationWhiteLabelingDrawer domains={[domain]} />);
    const markFailedButton = screen.getByTestId('superadmin_platform_configuration_white_labeling-drawer-mark-failed');
    markFailedButton.focus();

    rerender(<SuperadminPlatformConfigurationWhiteLabelingDrawer domains={[{ ...domain, gymName: 'CrossFit Pioneers Updated' }]} />);

    expect(document.activeElement).toBe(markFailedButton);
  });
});
