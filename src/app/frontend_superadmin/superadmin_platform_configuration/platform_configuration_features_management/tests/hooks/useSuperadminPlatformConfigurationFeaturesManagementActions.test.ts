import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminPlatformConfigurationFeaturesManagementActions } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/hooks/useSuperadminPlatformConfigurationFeaturesManagementActions';



const confirm = vi.fn().mockResolvedValue(true);
vi.mock('@/components/ui/Feedback/ConfirmProvider', () => ({ useConfirm: () => ({ confirm }) }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe('useSuperadminPlatformConfigurationFeaturesManagementActions', () => {
  it('sends the selected flag id, next state, and stable idempotency key to the supplied mutation boundary', async () => {
    confirm.mockResolvedValue(true);
    const updateFeatureFlagStatus = vi.fn().mockResolvedValue({ success: true, message: 'Updated', data: { id: 'flag-1' } });
    const config = { updateFeatureFlagStatus, updateFlag: vi.fn(), rolloutFlag: null };
    const { result } = renderHook(() => useSuperadminPlatformConfigurationFeaturesManagementActions(config as never, (key) => key));
    await result.current.handleToggle({ id: 'flag-1', name: 'Live chat', isGlobalEnabled: false } as never);
    expect(updateFeatureFlagStatus).toHaveBeenCalledWith(expect.objectContaining({ id: 'flag-1', enabled: true, idempotencyKey: expect.any(String) }));
  });
});
