import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import SuperadminPlatformConfigurationFeaturesFeatureRolloutModal from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/components/features_management_modals/SuperadminPlatformConfigurationFeaturesManagementFeatureRolloutModal';

import type { ReactNode } from 'react';

const mockRolloutData = vi.hoisted(() => ({
  tenants: Array.from({ length: 61 }, (_, index) => ({
    id: `tenant-${index + 1}`,
    name: `Tenant ${index + 1}`,
    plan: 'pro',
  })),
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string, values?: { count?: number }) =>
    key === 'ui.save_rollout_gyms' ? `Save rollout (${values?.count ?? 0})` : key,
}));
vi.mock('lucide-react', () => ({ Loader2: () => null, Search: () => null, X: () => null }));
vi.mock('@/components/ui/Tooltip', () => ({ default: ({ children }: { children: ReactNode }) => children }));
vi.mock('@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/hooks/useSuperadminPlatformConfigurationFeaturesManagementFeatureRolloutData', () => ({
  useSuperadminPlatformConfigurationFeaturesManagementFeatureRolloutData: () => ({
    tenants: mockRolloutData.tenants,
    isPending: false,
    isError: false,
    refetch: vi.fn(),
  }),
}));
vi.mock('@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/hooks/useSuperadminPlatformConfigurationFeaturesManagementFeatureRolloutMutation', () => ({
  useSuperadminPlatformConfigurationFeaturesManagementFeatureRolloutMutation: () => ({
    isError: false,
    isPending: false,
    mutateAsync: vi.fn(),
  }),
}));
vi.mock('@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/hooks/useSuperadminPlatformConfigurationFeaturesManagementDialogA11y', () => ({
  useSuperadminPlatformConfigurationFeaturesManagementDialogA11y: () => ({ current: null }),
}));
vi.mock('@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/hooks/useSuperadminPlatformConfigurationFeaturesManagementUnsavedChangesGuard', () => ({
  useSuperadminPlatformConfigurationFeaturesManagementUnsavedChangesGuard: vi.fn(),
}));
vi.mock('@tanstack/react-virtual', () => ({
  useVirtualizer: ({ count }: { count: number }) => ({
    getTotalSize: () => count * 48,
    getVirtualItems: () => Array.from({ length: Math.min(count, 12) }, (_, index) => ({
      index,
      start: index * 48,
      size: 48,
      key: index,
    })),
  }),
}));



describe('Feature rollout tenant-list virtualization', () => {
  beforeEach(() => {
    mockRolloutData.tenants = Array.from({ length: 61 }, (_, index) => ({
      id: `tenant-${index + 1}`,
      name: `Tenant ${index + 1}`,
      plan: 'pro',
    }));
  });

  it('mounts only the virtual window while keeping Select All scoped to every filtered tenant', () => {
    render(
      <SuperadminPlatformConfigurationFeaturesFeatureRolloutModal
        isOpen
        onClose={vi.fn()}
        onSaveRollout={vi.fn().mockResolvedValue(undefined)}
        flag={{ id: 'flag-1', name: 'Experimental flag', description: '', isGlobalEnabled: false, enabledTenantIds: [] }}
      />,
    );

    expect(screen.getByTestId('superadmin-platform-configuration-feature-rollout-virtual-scroll')).toBeTruthy();
    expect(screen.getAllByRole('button').filter((button) => button.getAttribute('data-testid')?.startsWith('superadmin_platform_configuration_features-features-feature-rollout-modal-rollout-'))).toHaveLength(12);

    fireEvent.click(screen.getByTestId('superadmin_platform_configuration_features-superadmin-features-feature-rollout-modal-rollout-modal-select-all'));
    expect(screen.getByRole('button', { name: 'Save rollout (61)' })).toBeTruthy();
  });
});
